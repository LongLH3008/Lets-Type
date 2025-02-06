"use client";

import { ICON_SIZE } from "@/common/constants/keyboard";
import { TotalWordsMode, WordsDifficultConstant } from "@/common/constants/mode";
import { changeDifficult, changeMode, setTotalWord } from "@/common/redux/slices/control";
import { generateDataTyping } from "@/common/redux/slices/dataTyping";
import { AppDispatch, RootState } from "@/common/redux/store";
import { Difficult, TypingMode } from "@/common/types/enums";
import { CaseLower, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import HoverLabel from "./HoverLabel";

type Props = {};

const WordsMode = (props: Props) => {
	const [totalCustom, setTotalCustom] = useState<number>(0);
	const dispatch = useDispatch<AppDispatch>();
	const { totalWords, difficult, mode } = useSelector((state: RootState) => state.control);

	const changeDifficultWord = (diff: Difficult) => {
		dispatch(changeDifficult(diff));
		dispatch(generateDataTyping());
	};

	const showDifficult = (diff: Difficult) => {
		return WordsDifficultConstant.find((item) => item.value === diff)?.label;
	};

	const setTotal = (totalWord: number) => {
		dispatch(setTotalWord(totalWord));
		if (totalCustom !== 0) setTotalCustom(0);
		dispatch(generateDataTyping());
	};

	const changeValueTotalCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 3 || e.target.value.includes("e")) {
			return setTotal(0);
		}
		const num = Number(e.target.value);
		if (num < 10) return setTotal(10);
		if (num > 200) return setTotal(200);
		setTotalCustom(Number(num));
	};

	return (
		<section
			className={`p-[3.5px] rounded-[9px] h-[40px] translate-y-[1px] border duration-200 ease flex gap-2 items-center
			${mode === "word" ? "border-orange-300 w-[177px]" : "w-[41px]"}`}
		>
			<HoverLabel label="Word mode" className="h-full w-8">
				<div
					onClick={() => mode !== "word" && dispatch(changeMode(TypingMode.word))}
					className={`h-full w-8 flex justify-center items-center rounded-[5px] cursor-pointer duration-300 overflow-hidden group hover:overflow-visible
					${mode === "word" ? "bg-orange-200 text-orange-400" : "hover:bg-accent"}`}
				>
					<CaseLower
						size={20}
						className={`text-muted-foreground duration-300
						${mode === "word" && "text-orange-400"}`}
					/>
				</div>
			</HoverLabel>
			{mode === "word" && (
				<div className="h-full w-[128px]">
					<motion.div
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.35 }}
						className="h-full flex justify-end items-center gap-1"
					>
						<span className="h-3/4 w-[1px] bg-orange-200 mr-1"></span>
						<HoverLabel label="Total" className="h-full w-8">
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="rounded-lg border">
									<div className="bg-accent h-full w-8 flex flex-col justify-center items-center rounded-[5px] cursor-pointer">
										<span className="text-muted-foreground z-50 font-[700] text-[12px]">
											{totalWords}
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="-translate-y-2 w-fit -translate-x-1"
									align="start"
								>
									<DropdownMenuItem className="px-1 flex items-center gap-2 focus:bg-transparent hover:bg-transparent">
										<Input
											type="number"
											onClick={(e) => e.stopPropagation()}
											onChange={(e) => changeValueTotalCustom(e)}
											className={`w-12 h-fit text-[10px] p-1 duration-300 ${totalCustom == 200 && "text-orange-400 text-[12px]"}`}
											min={15}
											max={200}
											value={totalCustom}
										></Input>
										<span
											onClick={() =>
												totalCustom > 0 && setTotal(totalCustom)
											}
											className="size-7 cursor-pointer hover:bg-accent duration-300 flex items-center justify-center rounded-sm"
										>
											<Check size={ICON_SIZE} />
										</span>
									</DropdownMenuItem>
									{TotalWordsMode.map((item, index: number) => (
										<DropdownMenuItem
											onClick={() => setTotal(item.value)}
											className="text-[10px] cursor-pointer"
											key={index}
										>
											{item.label}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</HoverLabel>
						<HoverLabel label="Difficult" className="h-full w-[80px]">
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="rounded-lg border">
									<div className="bg-accent h-full px-1 min-w-8 w-full flex justify-center items-center rounded-[5px] cursor-pointer overflow-hidden group hover:overflow-visible">
										<span className="text-muted-foreground z-50 font-[700] text-[10px]">
											{showDifficult(difficult)}
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="-translate-y-2 w-48 -translate-x-1"
									align="start"
								>
									{WordsDifficultConstant.map((item, index: number) => (
										<DropdownMenuItem
											onClick={() => changeDifficultWord(item.value)}
											className="text-[10px] cursor-pointer flex-col font-[600] items-start"
											key={index}
										>
											{item.label}
											<span className="text-wrap font-normal">
												{item.desc}
											</span>
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

export default WordsMode;
