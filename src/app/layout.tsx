import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { ReduxProvider } from "../common/redux/provider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ReduxProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<main className="h-screen flex flex-col items-center">
							<Header />
							<section className="flex flex-col overflow-hidden h-[90%] gap-10 max-w-5xl py-10">
								{children}
							</section>
							<Footer />
						</main>
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
