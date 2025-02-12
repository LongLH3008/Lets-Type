"use client";

import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import BackspaceSwitch from "./BackspaceSwitch";
import KeyboardSwitch from "./KeyboardSwitch";
import QuotesMode from "./QuotesMode";
import Reload from "./Reload";
import { ThemeSwitcher } from "./ThemeSwitcher";
import TimerMode from "./TimerMode";
import WordsMode from "./WordsMode";

const Control = () => {
	const ended = useSelector((state: RootState) => state.stats.ended);
	return (
		<section className="max-lg:hidden w-full max-w-5xl grid grid-cols-3 *:flex *:items-center">
			<div className="justify-start gap-2">
				{ended == 0 && (
					<div className="contents">
						<BackspaceSwitch />
						<TimerMode />
						<QuotesMode />
						<WordsMode />
					</div>
				)}
			</div>
			<div className="justify-center gap-3">
				<KeyboardSwitch />
				<Reload />
			</div>
			<div className="justify-end">
				<ThemeSwitcher />
			</div>
		</section>
	);
};

export default Control;
