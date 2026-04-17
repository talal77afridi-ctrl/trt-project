import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../src/app/globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "TRT | Premium Fashion Destination",
	description: "TRT delivers a polished ecommerce storefront with a premium, editorial feel.",
	icons: {
		icon: [
			{ url: "/assets/logo/favicon-round.svg?v=5", type: "image/svg+xml" },
			{ url: "/assets/logo/logo2.png?v=5", type: "image/png" },
		],
		shortcut: "/assets/logo/favicon-round.svg?v=5",
		apple: "/assets/logo/logo2.png?v=5",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
			<body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">{children}</body>
		</html>
	);
}
