"use client"

import Content from "@/markdown/README.mdx"
import { components } from "@/components/mdx-wrapper"

/**
 * Home page.
 *
 * @returns {React.JSX.Element}
 */
export default function HomePage(): React.JSX.Element {
   return <Content components={components} />
}
