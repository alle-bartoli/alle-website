/**
 * @dev Vanilla typing animation. Replaces the React TypingText component.
 *
 * Elements with `data-typing` are animated sequentially.
 * Each character is revealed progressively with a blinking cursor.
 * Nested HTML (links, bold, etc.) is preserved during the reveal.
 */

interface ICharEntry {
   char: string
   /** Index of the wrapper node in the flat node list, -1 for bare text */
   nodeIndex: number
}

interface ITypingElement {
   el: HTMLElement
   speed: number
   chars: ICharEntry[]
   /** Unique inline child nodes (links, spans, etc.) */
   nodes: Node[]
}

const SPEEDS: Record<string, number> = {
   H1: 12,
   H3: 11,
   P: 7,
   LI: 9,
}

const PAUSES: Record<string, number> = {
   H1: 100,
   H3: 26,
   LI: 12,
   P: 6,
}

const STEP = 3

/**
 * @dev Build a character map from an element's childNodes,
 * preserving references to inline wrapper nodes (a, strong, em, etc.).
 */
function buildCharMap(el: HTMLElement): Pick<ITypingElement, "chars" | "nodes"> {
   const chars: ICharEntry[] = []
   const nodes: Node[] = []

   for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
         const text = child.textContent || ""
         for (const ch of text) {
            chars.push({ char: ch, nodeIndex: -1 })
         }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
         const idx = nodes.length
         nodes.push(child.cloneNode(true))
         const text = child.textContent || ""
         for (const ch of text) {
            chars.push({ char: ch, nodeIndex: idx })
         }
      }
   }

   return { chars, nodes }
}

/**
 * @dev Render `count` characters into the element, reconstructing
 * inline wrappers as needed.
 */
function renderChars(el: HTMLElement, typing: ITypingElement, count: number): void {
   const fragment = document.createDocumentFragment()
   let currentNodeIndex = -1
   let currentText = ""

   const flush = () => {
      if (!currentText) return
      if (currentNodeIndex === -1) {
         fragment.appendChild(document.createTextNode(currentText))
      } else {
         const wrapper = typing.nodes[currentNodeIndex].cloneNode(false)
         wrapper.textContent = currentText
         fragment.appendChild(wrapper)
      }
      currentText = ""
   }

   for (let i = 0; i < count; i++) {
      const entry = typing.chars[i]
      if (entry.nodeIndex !== currentNodeIndex) {
         flush()
         currentNodeIndex = entry.nodeIndex
      }
      currentText += entry.char
   }
   flush()

   el.textContent = ""
   el.appendChild(fragment)
}

function createCursor(): HTMLSpanElement {
   const cursor = document.createElement("span")
   cursor.setAttribute("aria-hidden", "true")
   cursor.className = "inline-block align-middle ml-1 w-[0.55ch] h-[1em] bg-current"
   cursor.style.animation = "typing-blink 1s steps(2, start) infinite"
   return cursor
}

function typingDuration(length: number, speed: number): number {
   return Math.max(80, length * speed)
}

/**
 * @dev Main entry point. Orchestrates the sequential typing animation
 * across all `[data-typing]` elements.
 */
function init(): void {
   const elements = document.querySelectorAll<HTMLElement>("[data-typing]")
   if (!elements.length) return

   const queue: Array<{ el: HTMLElement; type: string }> = []

   elements.forEach((el) => {
      const tag = el.tagName
      if (tag === "UL") {
         const items = el.querySelectorAll<HTMLElement>(":scope > li")
         items.forEach((li) => {
            li.style.visibility = "hidden"
            li.style.listStyleType = "none"
            queue.push({ el: li, type: "LI" })
         })
      } else if (tag === "HR") {
         el.style.opacity = "0"
         el.style.border = "none"
         el.style.height = "1px"
         el.style.background = "rgba(255,255,255,0.06)"
         el.style.margin = "1.25rem 0"
         el.style.transition = "opacity 220ms ease-out"
         queue.push({ el, type: "HR" })
      } else {
         el.style.visibility = "hidden"
         queue.push({ el, type: tag })
      }
   })

   let cumulativeDelay = 0

   const scheduleElement = (item: { el: HTMLElement; type: string }, delay: number) => {
      if (item.type === "HR") {
         setTimeout(() => {
            item.el.style.opacity = "1"
         }, delay)
         return
      }

      const speed = SPEEDS[item.type] || 7
      const { chars, nodes } = buildCharMap(item.el)

      if (chars.length === 0) {
         setTimeout(() => {
            item.el.style.visibility = "visible"
         }, delay)
         return
      }

      const ariaLabel = chars.map((c) => c.char).join("")
      const typing: ITypingElement = { el: item.el, speed, chars, nodes }
      const showCursor = item.type !== "LI"

      setTimeout(() => {
         item.el.setAttribute("aria-label", ariaLabel)
         item.el.textContent = ""
         item.el.style.visibility = "visible"
         if (item.type === "LI") {
            item.el.style.listStyleType = "disc"
         }

         const cursor = createCursor()
         let charIndex = 0

         if (showCursor) item.el.appendChild(cursor)

         const interval = setInterval(() => {
            charIndex = Math.min(charIndex + STEP, chars.length)
            renderChars(item.el, typing, charIndex)

            if (showCursor) item.el.appendChild(cursor)

            if (charIndex >= chars.length) {
               clearInterval(interval)
               if (showCursor && cursor.parentNode) {
                  cursor.parentNode.removeChild(cursor)
               }
            }
         }, speed * STEP)
      }, delay)
   }

   for (const item of queue) {
      const delay = cumulativeDelay

      if (item.type === "HR") {
         scheduleElement(item, delay)
         cumulativeDelay += 160
      } else {
         const { chars } = buildCharMap(item.el)
         const speed = SPEEDS[item.type] || 7
         const duration = typingDuration(chars.length, speed)
         const pause = PAUSES[item.type] || 6

         scheduleElement(item, delay)
         cumulativeDelay += duration + pause
      }
   }
}

document.addEventListener("DOMContentLoaded", init)
