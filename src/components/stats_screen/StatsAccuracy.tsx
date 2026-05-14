import { ICON_SIZE } from "@/common/constants/control";
import { animationFrame } from "@/common/functions/animationFrame";
import { RootState } from "@/common/redux/store";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

type countRef = {
	acc: HTMLSpanElement | null;
	correct: HTMLSpanElement | null;
	incorrect: HTMLSpanElement | null;
};

const StatsAccuracy = () => {
	const { correct, incorrect } = useSelector((state: RootState) => state.stats);
	const countRef = useRef<countRef>({ acc: null, correct: null, incorrect: null });

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

	const setRef = (key: keyof countRef) => (el: HTMLSpanElement | null) => {
		countRef.current[key] = el;
	};

	useEffect(() => {
		animationFrame({
			duration: 1000,
			animationFrameAction: (progress) => {
				if (countRef.current.acc !== null) {
					const number = Math.floor(calcAcc() * progress);
					countRef.current.acc.innerText = number.toString() + "%";
				}
				if (countRef.current.correct !== null) {
					countRef.current.correct.innerText = Math.floor(correct_chars * progress).toString();
				}
				if (countRef.current.incorrect !== null) {
					countRef.current.incorrect.innerText = Math.floor(
						(total_chars - correct_chars) * progress
					).toString();
				}
			},
		});
	}, [incorrect]);

	return (
		<div className="relative text-5xl flex flex-col items-start gap-0">
			<span className="text-base uppercase">acc</span>
			<HoverLabel label="Accuracy">
				<span ref={setRef("acc")}>0%</span>
			</HoverLabel>
			<span className="text-base tracking-tight flex items-center gap-2">
				<HoverLabel label="Correct chars">
					<div className="flex items-center gap-1">
						<span ref={setRef("correct")}>0</span>
						<Check size={ICON_SIZE} />
					</div>
				</HoverLabel>
				<HoverLabel label="Incorrect chars">
					<div className="flex items-center gap-1">
						<span ref={setRef("incorrect")}>0</span>
						<X size={ICON_SIZE} />
					</div>
				</HoverLabel>
			</span>
		</div>
	);
};

export default StatsAccuracy;
