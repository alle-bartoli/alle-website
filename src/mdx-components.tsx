import type { MDXComponents } from "mdx/types"

// Override components
const components: MDXComponents = {
   a: ({ children }) => <a className="text-green-400 hover:text-green-200">{children}</a>,
}

export function useMDXComponents(): MDXComponents {
   return components
}
