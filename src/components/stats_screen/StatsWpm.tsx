import { animationFrame } from "@/common/functions/animationFrame";
import { RootState } from "@/common/redux/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

type countRef = {
	wpm: HTMLSpanElement | null;
	rawWpm: HTMLSpanElement | null;
};

const StatsWpm = () => {
	const wpmRecords = useSelector((state: RootState) => state.stats.wpmRecords);
	const countRef = useRef<countRef>({ rawWpm: null, wpm: null });

	const setRef = (key: keyof countRef) => (el: HTMLSpanElement | null) => {
		countRef.current[key] = el;
	};

	useEffect(() => {
		const wpm = wpmRecords[wpmRecords.length - 1].wpm;
		const rawWpm = wpmRecords[wpmRecords.length - 1].rawWpm;
		animationFrame({
			duration: 1000,
			cleanupAnimationFrame: true,
			animationFrameAction: (process) => {
				if (countRef.current.wpm !== null) {
					countRef.current.wpm.innerText = (Number(wpm) * process).toFixed(2).toString();
				}

				if (countRef.current.rawWpm !== null) {
					countRef.current.rawWpm.innerText = `Raw ${(Number(rawWpm) * process).toFixed(2)}`;
				}
			},
		});
	}, [wpmRecords]);

	return (
		<div className="relative text-5xl text-orange-400 flex flex-col items-start gap-0">
			<span className="text-base uppercase">wpm</span>
			<HoverLabel label="Words per min" classNameLabel="left-0 translate-x-0">
				<span ref={setRef("wpm")}>0.0</span>
			</HoverLabel>
			<HoverLabel label="(Raw) words per min" classNameLabel="left-0 translate-x-0">
				<span ref={setRef("rawWpm")} className="text-base tracking-tight">
					Raw 0.0
				</span>
			</HoverLabel>
		</div>
	);
};

export default StatsWpm;
