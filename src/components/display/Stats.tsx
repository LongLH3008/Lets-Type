"use client";

import { RootState } from "@/common/redux/store";
import { TypingMode } from "@/common/types/enums";
import { useSelector } from "react-redux";
import Timer from "./Timer";

const Stats = () => {
	const data = useSelector((state: RootState) => state.dataTyping.data);
	const typed = useSelector((state: RootState) => state.dataTyping.typed);
	const mode = useSelector((state: RootState) => state.control.mode);

	const checkTyped = typed.filter((item) => item.active == true);

	return (
		<div
			className={`flex h-[20%] w-full justify-center tracking-[2.5px] items-center text-foreground/40 text-xl font-[500]`}
		>
			{mode == TypingMode.timer ? (
				<Timer />
			) : (
				<span>
					{checkTyped.length} / {data.length}
				</span>
			)}
		</div>
	);
};

export default Stats;
