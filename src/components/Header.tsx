// import logo from "@/assets/icons/icon.svg";
import logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import AuthTrigger from "./auth/AuthTrigger";

const Header = () => {
	return (
		<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full max-w-5xl flex max-lg:justify-center justify-between items-center p-3 px-0 text-sm">
				<div className="flex max-lg:text-base text-foreground/70 text-lg gap-5 items-center font-semibold">
					<Image src={logo} className="size-12" width={1} height={1} alt="Let's Type!" />
					<Link href={"/"} className="font-[700] text-foreground/70">
						Let's Type!
					</Link>
				</div>
				<div className="max-lg:hidden flex justify-end text-[12px] gap-2 items-center">
					<Link href={"/"} className="font-[500] text-foreground/70">
						About
					</Link>{" "}
					<AuthTrigger />
				</div>
			</div>
		</nav>
	);
};

export default Header;
