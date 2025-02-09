"use client";

import { ICON_SIZE, QuotesDifficultConstant } from "@/common/constants/control";
import { changeDifficult, changeMode } from "@/common/redux/slices/control";
import { generateDataTyping } from "@/common/redux/slices/typing";
import { AppDispatch, RootState } from "@/common/redux/store";
import { Difficult, TypingMode } from "@/common/types/control__enums";
import { Text } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import HoverLabel from "./HoverLabel";

const QuotesMode = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { mode, difficult } = useSelector((state: RootState) => state.control);

	const changeDifficultQuote = (diff: Difficult) => {
		dispatch(changeDifficult(diff));
		dispatch(generateDataTyping());
	};

	const getDifficult = (diff: Difficult) => {
		return QuotesDifficultConstant.find((item) => item.value === diff)?.label;
	};

	const changeModeQuote = () => {
		dispatch(changeMode(TypingMode.quote));
		dispatch(generateDataTyping());
	};

	return (
		<section
			className={`p-[3.5px] rounded-[9px] h-[40px] translate-y-[1px] border duration-200 ease flex gap-2 items-center justify-between
			${mode === "quote" ? "border-orange-300 w-[140px]" : "w-[41px]"}`}
		>
			<HoverLabel label="Quote mode" className="h-full w-8">
				<div
					onClick={() => mode !== "quote" && changeModeQuote()}
					className={`h-full w-8 flex justify-center items-center rounded-[5px] cursor-pointer duration-300 overflow-hidden group hover:overflow-visible
				${mode === "quote" ? "bg-orange-200 text-orange-400" : "hover:bg-accent"}`}
				>
					<Text
						size={ICON_SIZE}
						className={`text-muted-foreground duration-300
					${mode === "quote" && "text-orange-400"}`}
					/>
				</div>
			</HoverLabel>
			{mode === "quote" && (
				<div className="h-full w-[90px]">
					<motion.div
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.35 }}
						className="h-full flex justify-end items-center gap-1"
					>
						<span className="h-3/4 w-[1px] bg-orange-200 mr-1"></span>
						<HoverLabel label="Difficult" className="h-full w-[80px]">
							<DropdownMenu>
								<DropdownMenuTrigger asChild className="rounded-lg border">
									<div className="bg-accent h-full px-1 min-w-8 w-full flex justify-center items-center rounded-[5px] cursor-pointer overflow-hidden group hover:overflow-visible">
										<span className="text-muted-foreground z-50 font-[700] text-[10px]">
											{getDifficult(difficult)}
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="-translate-y-2 w-48 -translate-x-1"
									align="start"
								>
									{QuotesDifficultConstant.map((item, index: number) => (
										<DropdownMenuItem
											onClick={() => changeDifficultQuote(item.value)}
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

export default QuotesMode;
