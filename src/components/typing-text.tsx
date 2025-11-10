import React, { useMemo, useState, useEffect, useRef } from "react"

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
   //
   // If `text` and `children` values don’t change, the computation is not repeated
   const { chars, totalLength, fullText } = useMemo(() => {
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
         fullText: charArray.map((c) => c.char).join(""),
      }
   }, [text, children])

   const [index, setIndex] = useState(0)
   const [started, setStarted] = useState(false)

   /**
    * Effects
    */
   const intervalRef = useRef<number | null>(null)
   useEffect(() => {
      // Skip everything if there's nothing to write
      if (totalLength === 0) return

      // Reset
      setIndex(0)

      // Type multiple characters per interval tick to reduce re-render frequency.
      // Improves performance without changing perceived speed.
      const step = 3

      // Delay before typing starts
      const startTimer = window.setTimeout(() => {
         setStarted(true)

         // Store the interval ID inside a ref so it persists across renders
         // and isn't lost between re-renders (unlike a local variable).
         intervalRef.current = window.setInterval(() => {
            // Stop typing once all characters are visible
            setIndex((i) => {
               if (i >= totalLength) {
                  // If an interval is still active, clear it and reset the ref
                  if (intervalRef.current) {
                     clearInterval(intervalRef.current)
                     intervalRef.current = null // Ensure ref doesn't hold stale ID
                  }
                  return i
               }

               // Otherwise, advance the typing index by "step" characters
               return Math.min(i + step, totalLength)
            })
         }, speed * step) // Multiply speed by step to preserve same visual timing
      }, startDelay)

      return () => {
         clearTimeout(startTimer) // Always clear the delay timer

         // If an interval is still active, clear it and reset the ref
         if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null // Ensure ref doesn't hold stale ID
         }
      }
   }, [totalLength, speed, startDelay])

   // Re-build content by grouping consecutive characters by the same element
   const rendered = useMemo(() => {
      // If no characters, show nothing
      if (chars.length === 0) return null

      // Get only the visible part
      const visibleChars = chars.slice(0, index)
      const result: React.ReactNode[] = []

      // Track the current "group" of consecutive characters
      let currentElement: React.ReactElement | null = null
      let currentText = ""

      // Merges consecutive characters with the same element reference into one string
      // For instance, "World" (all from the same <strong>) will become one
      // <strong>World</strong> node instead of five <strong>W</strong>, <strong>o</strong>, etc.
      for (let i = 0; i < visibleChars.length; i++) {
         const item = visibleChars[i]

         // If same element as previous char, just append the character
         if (item.element === currentElement) {
            currentText += item.char
         } else {
            // When the element changes (e.g. from plain text to <strong>),
            // flush the accumulated text as a React node.
            if (currentText) {
               result.push(
                  currentElement
                     ? React.cloneElement(
                          currentElement,
                          { key: result.length }, // Unique key for React diffing
                          currentText, // New "visible text" for this element
                       )
                     : currentText,
               )
            }

            // Start a new group for the next element
            currentElement = item.element
            currentText = item.char
         }
      }

      // After the loop, this flushes the final pending group that wasn’t emitted inside the loop
      if (currentText) {
         result.push(
            currentElement ? React.cloneElement(currentElement, { key: result.length }, currentText) : currentText,
         )
      }

      return result
   }, [chars, index])

   const done = index >= totalLength

   return (
      <span className={className} aria-label={fullText}>
         {rendered}
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
