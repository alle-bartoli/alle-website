import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils";

// Configure font.
const jbMono = JetBrains_Mono({ subsets: ["latin"] });

// Website metadata (SEO).
export const metadata: Metadata = {
  title: "Alessandro Bartoli",
  description: "Alessandro Bartoli personal website",
};

/**
 * @dev RootLayout props
 * */
interface IProps {
  children?: React.ReactNode;
}

/**
 * @function RootLayout
 * @param {IProps} props
 * @returns React.JSX.Element
 */
export default function RootLayout(props: IProps): React.JSX.Element {
  return (
    <html lang="en">
      <body className={jbMono.className}>
        <div
          className={cn(
            "max-w-[1000px]",
            "flex-col justify-center items-center",
            "text-xs sm:text-base md:text-xl lg:text-2xl",
            "p-10 sm:p-10 md:p-16 lg:p-20",
            "mx-auto",
          )}
        >
          <main>{props.children}</main>
          <footer className="flex-none absolute text-center bottom-4">
            © {new Date().getFullYear()}, Alessandro Bartoli
          </footer>
        </div>
      </body>
    </html>
  );
}
