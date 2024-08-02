/**
 * @description ClassNames optimizer composer.
 * @function cn
 * @param {string[]} classes
 * @returns string
 */
export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
