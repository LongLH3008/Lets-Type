"use client";

import { RootState } from "@/common/redux/store";
import { TypingMode } from "@/common/types/enums";
import { useSelector } from "react-redux";
import Timer from "./Timer";

const Stats = () => {
	const { data, typed } = useSelector((state: RootState) => state.dataTyping);
	const { mode } = useSelector((state: RootState) => state.control);

	const checkTyped = typed.filter((item) => item.active == true);

	return (
		<div
			className={`flex h-[20%] w-full justify-center tracking-[2.5px] items-center opacity-30 text-xl font-[500]`}
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
