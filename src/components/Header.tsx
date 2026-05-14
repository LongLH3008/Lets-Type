import logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaExclamation } from "react-icons/fa";
import AuthTrigger from "./auth/AuthTrigger";
import HoverLabel from "./controls/HoverLabel";

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
					<HoverLabel label="About Let's Type!" classNameLabel="translate-y-0 top-[130%]">
						<Link
							href={"/about"}
							className="font-[500] rounded-[10px] p-[3.5px] border text-foreground/70 group"
						>
							<span className="rounded-[5px] group-hover:bg-accent duration-200 size-7 overflow-hidden flex items-center justify-center">
								<FaExclamation size={12} />
							</span>
						</Link>
					</HoverLabel>
					<AuthTrigger />
				</div>
			</div>
		</nav>
	);
};

export default Header;
