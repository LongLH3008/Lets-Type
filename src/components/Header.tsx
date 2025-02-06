import Link from "next/link";

const Header = () => {
	return (
		<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full max-w-5xl flex justify-between items-center p-3 px-0 text-sm">
				<div className="flex text-lg gap-5 items-center font-semibold">
					<Link href={"/"}>Let's Type!</Link>
				</div>
			</div>
		</nav>
	);
};

export default Header;
