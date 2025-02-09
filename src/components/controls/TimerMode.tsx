"use client";

import { ICON_SIZE, TimerConstant } from "@/common/constants/control";
import { changeMode, setTime } from "@/common/redux/slices/control";
import { generateDataTyping } from "@/common/redux/slices/typing";
import { AppDispatch, RootState } from "@/common/redux/store";
import { TypingMode } from "@/common/types/control__enums";
import { AlarmClock, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import HoverLabel from "./HoverLabel";

const TimerMode = () => {
	const [second, setSecond] = useState<number>(0);
	const dispatch = useDispatch<AppDispatch>();
	const { mode, timer } = useSelector((state: RootState) => state.control);

	const setTimer = (time: number) => {
		dispatch(setTime(time));
		if (second !== 0) setSecond(0);
	};

	const changeValueSecondTimer = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 3 || e.target.value.includes("e")) {
			return setSecond(0);
		}
		const num = Number(e.target.value);
		if (num < 15) return setSecond(15);
		if (num > 300) return setSecond(300);
		setSecond(Number(num));
	};

	const changeModeTimer = () => {
		dispatch(changeMode(TypingMode.timer));
		dispatch(generateDataTyping());
	};

	return (
		<section
			className={`p-[3.5px] rounded-[9px] h-[40px] translate-y-[1px] border duration-200 ease flex gap-2 items-center
		${mode === "timer" ? "border-orange-300 w-[90px]" : "w-[41px]"}`}
		>
			<HoverLabel label="Timer mode" className="h-full w-8">
				<div
					onClick={() => mode !== "timer" && changeModeTimer()}
					className={`h-full w-8 flex justify-center items-center rounded-[5px] cursor-pointer duration-300 overflow-hidden group hover:overflow-visible
				${mode === "timer" ? "bg-orange-200 text-orange-400" : "hover:bg-accent"}`}
				>
					<AlarmClock
						size={ICON_SIZE}
						className={`text-muted-foreground duration-300
					${mode === "timer" && "text-orange-400"}`}
					/>
				</div>
			</HoverLabel>
			{mode === "timer" && (
				<div className="h-full">
					<motion.div
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.35 }}
						className="h-full flex items-center gap-1"
					>
						<span className="h-3/4 w-[1px] bg-orange-200 mr-1"></span>
						<HoverLabel label="Time (second)" className="h-full w-8">
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="rounded-lg border">
									<div className="bg-accent h-full w-8 flex flex-col justify-center items-center rounded-[5px] cursor-pointer">
										<span className="text-muted-foreground z-50 font-[700] text-[12px]">
											{timer}
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="-translate-y-2 w-fit -translate-x-1"
									align="start"
								>
									<DropdownMenuItem className="px-1 flex items-center gap-2 focus:bg-transparent hover:bg-transparent">
										<Input
											onClick={(e) => e.stopPropagation()}
											onChange={(e) => changeValueSecondTimer(e)}
											type="number"
											className={`w-12 h-fit text-[10px] px-1 duration-300 ${second == 300 && "text-orange-400 text-[12px]"}`}
											min={15}
											max={300}
											value={second}
										></Input>
										<span
											onClick={() =>
												second !== 0 && setTimer(Number(second))
											}
											className="size-7 bg-transparent cursor-pointer hover:bg-accent duration-300 flex items-center justify-center rounded-sm"
										>
											<Check size={ICON_SIZE} />
										</span>
									</DropdownMenuItem>
									{TimerConstant.map((item, index: number) => (
										<DropdownMenuItem
											onClick={() => setTimer(item.value)}
											className="text-[10px] cursor-pointer flex items-center gap-2"
											key={index}
										>
											{item.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</HoverLabel>
					</motion.div>
				</div>
			)}
		</section>
	);
};

export default TimerMode;
