import React, { useMemo, useState, useEffect } from "react"

interface ITypingTextProps {
   /** Text to type out; if not provided, children will be used */
   text?: string

   /** React nodes to type out if `text` is not provided */
   children?: React.ReactNode

   /** Milliseconds per character (typing speed) */
   speed?: number

   /** Delay in milliseconds before typing starts */
   startDelay?: number

   /** Whether to show a blinking cursor during typing */
   cursor?: boolean

   /** Additional CSS classes */
   className?: string
}

/**
 * TypingText component types out text or children with a typing animation.
 *
 * @param {ITypingTextProps} props
 * @returns {React.JSX.Element}
 */
export function TypingText({
   text,
   children,
   speed = 20,
   startDelay = 120,
   cursor = true,
   className,
}: ITypingTextProps): React.JSX.Element {
   // Build a characters map with its JSX elements
   const { chars, totalLength } = useMemo(() => {
      if (text) {
         return {
            chars: text.split("").map((char) => ({ char, element: null })), // Stores each character with a reference to its parent element (if any)
            totalLength: text.length,
         }
      }

      if (!children) return { chars: [], totalLength: 0 }

      const charArray: Array<{ char: string; element: React.ReactElement | null }> = []

      const processNode = (node: any, parentElement: React.ReactElement | null = null): void => {
         if (!node) return

         if (typeof node === "string") {
            // Add each character with its parent element
            for (const char of node) {
               charArray.push({ char, element: parentElement })
            }
            return
         }

         if (typeof node === "number") {
            const str = String(node)
            for (const char of str) {
               charArray.push({ char, element: parentElement })
            }
            return
         }

         if (Array.isArray(node)) {
            node.forEach((child) => processNode(child, parentElement))
            return
         }

         // If React element (as <a>)
         if (React.isValidElement(node)) {
            // Process the children passing element as a parent
            const element = node as React.ReactElement<{ children?: React.ReactNode }>
            processNode(element.props.children, node)
            return
         }
      }

      processNode(children)

      return {
         chars: charArray,
         totalLength: charArray.length,
      }
   }, [text, children])

   const [index, setIndex] = useState(0)
   const [started, setStarted] = useState(false)

   useEffect(() => {
      if (totalLength === 0) return

      setIndex(0)
      setStarted(false)
      let intervalId: number | null = null

      const startTimer = window.setTimeout(() => {
         setStarted(true)
         intervalId = window.setInterval(() => {
            setIndex((i) => {
               if (i >= totalLength) {
                  if (intervalId) window.clearInterval(intervalId)
                  return i
               }
               return i + 1
            })
         }, speed)
      }, startDelay)

      return () => {
         window.clearTimeout(startTimer)
         if (intervalId) window.clearInterval(intervalId)
      }
   }, [totalLength, speed, startDelay])

   // Re-build content by grouping consecutive characters by the same element
   const renderContent = () => {
      if (chars.length === 0) return null

      const visibleChars = chars.slice(0, index)
      const result: React.ReactNode[] = []
      let currentElement: React.ReactElement | null = null
      let currentText = ""

      visibleChars.forEach((item, idx) => {
         if (item.element === currentElement) {
            // Same element, accumulate text
            currentText += item.char
         } else {
            // Different element, save the save the previous one
            if (currentText) {
               if (currentElement) {
                  result.push(React.cloneElement(currentElement, { key: result.length }, currentText))
               } else {
                  result.push(currentText)
               }
            }
            // Start new group
            currentElement = item.element
            currentText = item.char
         }

         // Last character
         if (idx === visibleChars.length - 1 && currentText) {
            if (currentElement) {
               result.push(React.cloneElement(currentElement, { key: result.length }, currentText))
            } else {
               result.push(currentText)
            }
         }
      })

      return result
   }

   const done = index >= totalLength
   const fullText = chars.map((c) => c.char).join("")

   return (
      <span className={className} aria-label={fullText}>
         {renderContent()}
         {cursor && started && !done && (
            <span
               aria-hidden
               className="inline-block align-middle ml-1 w-[0.55ch] h-[1em] bg-current"
               style={{ animation: "typing-blink 1s steps(2, start) infinite" }}
            />
         )}
      </span>
   )
}
