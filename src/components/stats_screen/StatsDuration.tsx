import { animationFrame } from "@/common/functions/animationFrame";
import { RootState } from "@/common/redux/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

type countRef = {
	secondNumber: HTMLSpanElement | null;
	minuteNumber: HTMLSpanElement | null;
	number: HTMLSpanElement | null;
};

const StatsDuration = () => {
	const started = useSelector((state: RootState) => state.stats.started);
	const ended = useSelector((state: RootState) => state.stats.ended);
	const countRef = useRef<countRef>({ secondNumber: null, minuteNumber: null, number: null });

	const calc = Math.floor((ended - started) / 1000);
	const isMinute = calc > 0 && calc % 60 == 0;
	const isSecond = calc < 60;

	const setCountRef = (key: keyof countRef) => (el: HTMLDivElement | null) => {
		if (countRef.current) countRef.current[key] = el;
	};

	useEffect(() => {
		animationFrame({
			duration: 1000,
			cleanupAnimationFrame: true,
			animationFrameAction: (progress) => {
				if (countRef.current.number !== null) {
					const number = Math.floor((isMinute ? calc / 60 : calc) * progress);
					countRef.current.number.innerText = number.toString();
				}
				if (countRef.current.minuteNumber !== null) {
					const number = Math.floor((calc / 60) * progress);
					countRef.current.minuteNumber.innerText = number.toString();
				}
				if (countRef.current.secondNumber !== null) {
					const number = Math.floor((calc % 60) * progress);
					countRef.current.secondNumber.innerText = number.toString().padStart(2, "0");
				}
			},
		});
	}, [ended]);

	return (
		<div className="relative font-[700] text-5xl flex flex-col items-start gap-0">
			<span className="text-base font-bold uppercase">dur</span>
			<HoverLabel label="Duration">
				{isMinute || isSecond ? (
					<span ref={setCountRef("number")} className="">
						{0}
					</span>
				) : (
					<div className="">
						<span ref={setCountRef("minuteNumber")}>{0}</span>:
						<span ref={setCountRef("secondNumber")}>{0}</span>
					</div>
				)}
			</HoverLabel>
			{isMinute || isSecond ? (
				<span className="text-base font-bold tracking-tight">
					{isMinute ? "minute" : "second"}
					{calc > 0 ? "s" : ""}
				</span>
			) : (
				<div className="flex w-fit justify-between items-end text-sm">
					<span>
						min{calc > 0 ? "s" : ""} | sec{calc > 0 ? "s" : ""}
					</span>
				</div>
			)}
		</div>
	);
};

export default StatsDuration;
