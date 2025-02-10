import { ICON_SIZE } from "@/common/constants/control";
import { RootState } from "@/common/redux/store";
import { Check, Eraser, Type, X } from "lucide-react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

const StatsTyped = () => {
	const { correct, edited, incorrect } = useSelector((state: RootState) => state.stats);

	return (
		<div className="relative font-[700] text-5xl flex flex-col items-start">
			<span className="text-base font-bold uppercase">typed</span>
			<div className="grid grid-cols-4 gap-8 items-center *:flex *:justify-center *:w-full *:text-center">
				<HoverLabel label="Total typed">
					<div>{correct.length + incorrect.length}</div>
				</HoverLabel>
				<HoverLabel label="Correct">
					<span>{correct.length}</span>
				</HoverLabel>
				<HoverLabel label="Incorrect">
					<span>{incorrect.length}</span>
				</HoverLabel>
				<HoverLabel label="Edited">
					<span>{edited.length}</span>
				</HoverLabel>
			</div>
			<div className="grid w-full grid-cols-4 gap-8 items-center *:flex *:justify-center pt-1">
				<span className="text-center">
					<Type size={14} />
				</span>
				<span className="text-center">
					<Check size={ICON_SIZE} />
				</span>
				<span className="text-center">
					<X size={ICON_SIZE} />
				</span>
				<span className="text-center">
					<Eraser size={ICON_SIZE} />
				</span>
			</div>
		</div>
	);
};

export default StatsTyped;
