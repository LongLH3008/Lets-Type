import Control from "./controls/Control";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-4 py-4">
			<Control />
			<p className="text-[10px]">
				Created by{" "}
				<a
					href="https://github.com/LongLH3008"
					target="_blank"
					className="font-bold hover:underline"
					rel="noreferrer"
				>
					LongLH
				</a>{" "}
				&copy; 2025
			</p>
		</footer>
	);
};

export default Footer;
