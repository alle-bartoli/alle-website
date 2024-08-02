import React from "react";
import Link from "next/link";
import "./globals.css";

/**
 * @function NotFound
 * @returns React.JSX.Element
 */
export default function NotFound(): React.JSX.Element {
  return (
    <main className="p-16 text-base sm:text-base md:text-xl lg:text-2xl">
      <h1 className="mb-12">Page not found (404)</h1>
      <p className="mb-12">
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        <br />
        <br />
        <br />
        <Link href="/">Back to home</Link>
      </p>
    </main>
  );
}
