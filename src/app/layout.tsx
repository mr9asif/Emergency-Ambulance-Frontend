import AuthInitializer from "@/features/auth/components/AuthInitializer";
import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftRescue",
  description: "Emergency Ambulance Dispatch Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthInitializer />
          {children}
        </QueryProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
