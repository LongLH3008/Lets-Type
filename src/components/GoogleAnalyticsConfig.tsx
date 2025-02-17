import Script from "next/script";

type Props = {};

const GoogleAnalyticsConfig = (props: Props) => {
	return (
		<>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=G-SZ5VSS2G2C`} // Thay G-SZ5VSS2G2C bằng mã GA của bạn
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-SZ5VSS2G2C'); // Thay G-SZ5VSS2G2C bằng mã GA của bạn
          			`}
			</Script>
		</>
	);
};

export default GoogleAnalyticsConfig;
