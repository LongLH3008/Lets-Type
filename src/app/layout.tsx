import { ReduxProvider } from "@/common/redux/provider";
import Footer from "@/components/Footer";
import GoogleAnalyticsConfig from "@/components/GoogleAnalyticsConfig";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Let's Type!",
	description: "Let's Type -  Help you improve your typing skills and speed with different modes and difficulties.",
	icons: {
		icon: "./favicon.svg",
	},
	openGraph: {
		title: "Let's Type!",
		description:
			"Let's Type -  Help you improve your typing skills and speed with different modes and difficulties.",
		image: "../assets/images/open-graph.png",
		url: "https://letstype-web.vercel.app",
		type: "website",
		site_name: "Let's Type",
	},
	twitter: {
		card: "summary_large_image",
		title: "Let's Type!",
		description:
			"Let's Type -  Help you improve your typing skills and speed with different modes and difficulties.",
		image: "../assets/images/open-graph.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={"font-mono"} suppressHydrationWarning>
			<head>
				<GoogleAnalyticsConfig />
			</head>
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
