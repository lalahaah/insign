import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "InSign - AI Contract Analysis for Global Talent",
    description: "See what's inside your contract. Professional contract analysis powered by AI.",
    keywords: ["contract", "analysis", "AI", "legal-tech", "korea"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        {children}
                        <Toaster position="top-center" expand />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
