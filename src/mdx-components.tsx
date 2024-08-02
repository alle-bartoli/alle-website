import type { MDXComponents } from "mdx/types";

/**
 * @function useMDXComponents
 * @param {MDXComponents} components
 * @returns MDXComponents
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
