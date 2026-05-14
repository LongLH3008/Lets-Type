"use client";

import { ICON_SIZE } from "@/common/constants/control";
import { setBackspace } from "@/common/redux/slices/control";
import { AppDispatch, RootState } from "@/common/redux/store";
import { Delete } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import HoverLabel from "./HoverLabel";

const BackspaceSwitch = () => {
	const backspace = useSelector((state: RootState) => state.control.backspace);
	const ended = useSelector((state: RootState) => state.stats.ended);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<section
			className={`p-[3.5px] rounded-[9px] h-10 w-[41px] translate-y-[1px] border duration-200 ease flex gap-2 items-center
		${backspace ? "border-orange-300" : ""}
		${ended > 0 ? "opacity-0" : ""}`}
		>
			<HoverLabel
				label={`Turn ${backspace ? "off" : "on"} backspace`}
				className={`${ended > 0 ? "opacity-0" : ""} h-full w-8`}
			>
				<div
					onClick={() => ended == 0 && dispatch(setBackspace())}
					className={`h-full w-8 flex justify-center items-center rounded-[5px] cursor-pointer duration-300 overflow-hidden group hover:overflow-visible
				${backspace ? "bg-orange-200 text-orange-400" : "hover:bg-accent"}`}
				>
					<Delete
						size={ICON_SIZE}
						className={`text-muted-foreground duration-300
					${backspace && "text-orange-400"}`}
					/>
				</div>
			</HoverLabel>
		</section>
	);
};

export default BackspaceSwitch;
