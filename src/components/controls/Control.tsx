"use client";

import { RootState } from "@/common/redux/store";
import { CornerDownRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import BackspaceSwitch from "./BackspaceSwitch";
import FeedBack from "./FeedBack";
import KeyboardSwitch from "./KeyboardSwitch";
import QuotesMode from "./QuotesMode";
import Reload from "./Reload";
import { ThemeSwitcher } from "./ThemeSwitcher";
import TimerMode from "./TimerMode";
import WordsMode from "./WordsMode";

const Control = () => {
	const ended = useSelector((state: RootState) => state.stats.ended);
	const path = usePathname();

	return (
		<section className="max-lg:hidden w-full max-w-5xl grid grid-cols-3 *:flex *:items-center">
			<div className="justify-start gap-2">
				{path === "/" && ended == 0 && (
					<div className="contents">
						<BackspaceSwitch />
						<TimerMode />
						<QuotesMode />
						<WordsMode />
					</div>
				)}
			</div>
			<div className="justify-center gap-3">
				{path === "/" ? (
					<>
						<KeyboardSwitch />
						<Reload />
					</>
				) : (
					<Link
						href={"/"}
						className={`p-[3.5px] rounded-[9px] h-[40px] translate-y-[1px] border border-orange-300 ease flex gap-2 items-center justify-between`}
					>
						<span
							className={`h-full bg-orange-100 text-orange-400 font-bold w-fit gap-2 px-2 flex justify-center items-center rounded-[5px] cursor-pointer duration-300 overflow-hidden group hover:overflow-visible`}
						>
							<CornerDownRight
								size={16}
								className={`text-orange-400 font-bold duration-1000`}
							/>
							Enter - Type now
						</span>
					</Link>
				)}
			</div>
			<div className="justify-end gap-3 items-center">
				<FeedBack />
				<ThemeSwitcher />
			</div>
		</section>
	);
};

export default Control;
