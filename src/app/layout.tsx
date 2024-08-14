import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils";

// Configure font.
const jbMono = JetBrains_Mono({ subsets: ["latin"] });

/**
 * @dev Home page metadata.
 */
export const metadata: Metadata = {
  applicationName: "Alessandro Bartoli personal website",
  title: {
    default: "Alessandro Bartoli | Dev",
    template: "%s | Alessandro Bartoli",
  },
  description: "Alessandro Bartoli personal website.",
  keywords: [
    "Sviluppatori italiani",
    "Software",
    "Software Modena",
    "Development",
    "Sviluppo software",
    "Typescript",
    "Javascript",
    "Rust",
    "Delphi",
    "Cloud architecture",
    "Developer architect",
    "Software engineering",
    "Full Stack developer",
    "Frontend developer",
    "Backend developer",
    "Blockchain",
    "Web3",
  ],
  authors: [
    { name: "Alessia Morellini", url: "https://alessia-morellini.com" },
    { name: "Alessandro Bartoli", url: "https://alessandrobartoli.dev" },
  ],
  creator: "Alessandro Bartoli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.alessandrobartoli.dev",
    siteName: "Alessandro Bartoli personal website",
    //images: [
    // {
    //  url: "/path/to/default-og-image.jpg", // TODO: Replace with your image path.
    // width: 800,
    // height: 600,
    // alt: "Alessandro Bartoli",
    // },
    //],
  },
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
