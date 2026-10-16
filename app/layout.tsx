import type {Metadata} from "next";
import "./globals.css";
import "./fixes.css";

export const metadata: Metadata = {title: "ActionProof — AI support reconciliation", description: "Catch support promises that do not match commerce-system outcomes."};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
