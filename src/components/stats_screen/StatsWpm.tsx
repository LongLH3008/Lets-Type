import { animationFrame } from "@/common/functions/animationFrame";
import { RootState } from "@/common/redux/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const StatsWpm = () => {
	const wpm = useSelector((state: RootState) => state.stats.wpm);
	const countRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		animationFrame({
			duration: 1000,
			cleanupAnimationFrame: true,
			animationFrameAction: (process) => {
				if (countRef.current) {
					countRef.current.innerText = Math.min(Number(wpm) * process)
						.toFixed(2)
						.toString();
				}
			},
		});
	}, [wpm]);

	return (
		<div className="relative font-[700] text-5xl text-orange-400 flex flex-col items-start gap-0">
			<span className="text-base font-bold uppercase">wpm</span>
			<span ref={countRef} className="">
				0
			</span>
			<span className="text-base font-bold tracking-tight">words / min</span>
		</div>
	);
};

export default StatsWpm;
