import "./globals.css";
import { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" >
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}
