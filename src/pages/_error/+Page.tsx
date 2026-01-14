/**
 * @dev Error page (404).
 */
export default function ErrorPage() {
   return (
      <div className="p-16 text-base sm:text-base md:text-xl lg:text-2xl">
         <h1 className="mb-12">Page not found (404)</h1>
         <p className="mb-12">
            Sorry, we couldn't find what you were looking for.
            <br />
            <br />
            <br />
            <br />
            <a href="/" className="text-green-400 hover:text-green-200 underline">
               Back to home
            </a>
         </p>
      </div>
   )
}
