import { ICON_SIZE } from "@/common/constants/control";
import { RootState } from "@/common/redux/store";
import { Check, X } from "lucide-react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

const StatsAccuracy = () => {
	const { correct, incorrect } = useSelector((state: RootState) => state.stats);

	const correct_chars = [...correct, ...incorrect].reduce((init: number, word) => {
		const corrects = word.character.filter((char) => char.correct).length;
		return corrects + init;
	}, 0);

	const total_chars = [...correct, ...incorrect].reduce((init: number, word) => {
		const chars = word.character.length;
		return chars + init;
	}, 0);

	const calcAcc = () => {
		if (correct_chars == 0) return 0;
		return Math.floor((correct_chars / total_chars) * 100);
	};

	return (
		<div className="relative font-[700] text-5xl flex flex-col items-start gap-0">
			<span className="text-base font-bold uppercase">acc</span>
			<HoverLabel label="Accuracy">
				<span className="">{calcAcc()}%</span>
			</HoverLabel>
			<span className="text-base font-bold tracking-tight flex items-center gap-2">
				<HoverLabel label="Correct chars">
					<span className="flex items-center gap-1">
						{correct_chars} <Check size={ICON_SIZE} />
					</span>
				</HoverLabel>
				<HoverLabel label="Incorrect chars">
					<span className="flex items-center gap-1">
						{total_chars - correct_chars} <X size={ICON_SIZE} />
					</span>
				</HoverLabel>
			</span>
		</div>
	);
};

export default StatsAccuracy;
