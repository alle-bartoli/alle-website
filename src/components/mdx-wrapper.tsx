"use client"

import React, { useEffect, useState } from "react"
import { MDXComponents } from "mdx/types"
import { TypingText } from "@/components/typing-text"
import { cn } from "@/utils"

const PAUSES = {
   h1: 100,
   h3: 26,
   ul: 12,
   p: 6,
}

/*
 * Sequential timing.
 * Ensures elements appear sequentially,
 * respecting startDelay per element
 */
function DelayedReveal({
   startDelay,
   children,
}: {
   startDelay: number
   children: (started: boolean) => React.ReactNode
}) {
   const [started, setStarted] = useState(false)

   useEffect(() => {
      const t = window.setTimeout(() => setStarted(true), Math.max(0, startDelay))
      return () => clearTimeout(t)
   }, [startDelay])

   return <>{children(started)}</> // It passes that flag to the children render function so the child knows when to show itself
}

/**
 * This maintains a global timeline for all elements.
 * Every time an element is rendered, it gets its own startDelay value
 * that ensures it appears after the previous one finishes typing.
 */
let cumulativeDelay = 0
const nextDelay = (duration: number, elementType: keyof typeof PAUSES = "p") => {
   const delay = cumulativeDelay
   cumulativeDelay += duration + PAUSES[elementType]
   return delay
}

/**
 * Computes how long a block of text takes to type,
 * given speed in ms per character.
 */
const typingDuration = (text: string, speed: number) => {
   return Math.max(80, (text?.length || 0) * speed) // Ensures there’s always a minimum delay, even for short strings
}

/**
 * Recursively walks through the MDX React node tree and extracts all text inside it,
 * flattening links or nested tags or other elements.
 */
const extractFullText = (children: any): string => {
   if (!children) return ""
   if (typeof children === "string" || typeof children === "number") return String(children)
   if (Array.isArray(children)) return children.map(extractFullText).join("")
   if (children.props?.children) return extractFullText(children.props.children)
   return ""
}

/*
 * MDX Components
 */
export const components: MDXComponents = {
   h1: (props: any) => {
      const text = extractFullText(props.children)
      const speed = 12
      const startDelay = nextDelay(typingDuration(text, speed), "h1")

      return (
         <h1 className={`text-4xl font-bold ${props.className || ""}`}>
            <TypingText speed={speed} startDelay={startDelay} cursor>
               {props.children}
            </TypingText>
         </h1>
      )
   },

   h3: (props: any) => {
      const text = extractFullText(props.children)
      const speed = 11
      const startDelay = nextDelay(typingDuration(text, speed), "h3")

      return (
         <h3 className={`text-2xl mt-4 ${props.className || ""}`}>
            <TypingText speed={speed} startDelay={startDelay} cursor>
               {props.children}
            </TypingText>
         </h3>
      )
   },

   p: (props: any) => {
      const text = extractFullText(props.children)
      const speed = 7
      const startDelay = nextDelay(typingDuration(text, speed), "p")

      return (
         <p className={props.className}>
            <TypingText speed={speed} startDelay={startDelay}>
               {props.children}
            </TypingText>
         </p>
      )
   },

   // Links MUST NOT be wrapped in `TypingText` when they are inside paragraphs.
   // The paragraph's `TypingText` will handle them automatically.
   a: (props: any) => {
      return (
         <a
            href={props.href}
            className={cn(props.className, "text-green-400 hover:text-green-200")}
            target={props.target}
            rel={props.rel}
         >
            {props.children}
         </a>
      )
   },

   ul: (props: any) => {
      // Filter <li> valid elements only excluding blank spaces
      const childrenArray = React.Children.toArray(props.children).filter((child: any) => child?.type === "li")

      return (
         <ul className={props.className}>
            {childrenArray.map((child: any, index) => {
               const text = extractFullText(child?.props?.children)
               const speed = 9
               const startDelay = nextDelay(typingDuration(text, speed), "ul")

               return (
                  <DelayedReveal key={index} startDelay={startDelay}>
                     {(started) => (
                        <li
                           style={{
                              listStyleType: "disc",
                              paddingLeft: "1.25rem",
                              visibility: started ? "visible" : "hidden",
                           }}
                        >
                           <TypingText speed={speed} startDelay={0} cursor={false}>
                              {child.props?.children}
                           </TypingText>
                        </li>
                     )}
                  </DelayedReveal>
               )
            })}
         </ul>
      )
   },

   // Horizontal dividers
   hr: (props: any) => {
      const startDelay = nextDelay(160)
      return (
         <DelayedReveal startDelay={startDelay}>
            {(started) => (
               <hr
                  {...props}
                  style={{
                     opacity: started ? 1 : 0,
                     border: "none",
                     height: 1,
                     background: "rgba(255,255,255,0.06)",
                     margin: "1.25rem 0",
                     transition: "opacity 220ms ease-out",
                  }}
               />
            )}
         </DelayedReveal>
      )
   },
}
