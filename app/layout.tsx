import { Metadata } from "next";
import StoreProvider from "./StoreProvider";
// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
// Styles
import "./globals.css";

export const metadata: Metadata = {
  title: "Today's Tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
