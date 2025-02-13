import { ICON_SIZE } from "@/common/constants/control";
import { animationFrame } from "@/common/functions/animationFrame";
import { RootState } from "@/common/redux/store";
import { Check, Eraser, Type, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

const StatsTyped = () => {
	const { correct, edited, incorrect } = useSelector((state: RootState) => state.stats);
	const refsCount = useRef<(HTMLSpanElement | null)[]>([]);

	const setCountRef = (index: number) => (el: HTMLDivElement | null) => {
		refsCount.current[index] = el;
	};

	useEffect(() => {
		const values = [correct.length + incorrect.length, correct.length, incorrect.length, edited.length];
		animationFrame({
			duration: 1000,
			cleanupAnimationFrame: true,
			animationFrameAction: (progress) => {
				for (let el = 0; el < refsCount.current.length; el++) {
					const element = refsCount.current[el];
					if (!element) return;
					element.innerText = Math.floor(values[el] * progress).toString();
				}
			},
		});
	}, [incorrect]);

	return (
		<div className="col-span-2 relative font-[500] text-5xl flex flex-col items-start">
			<span className="text-base uppercase">typed words</span>
			<div className="grid grid-cols-4 w-full gap-4 items-center *:flex *:justify-start *:w-full *:text-start">
				<HoverLabel label="Total typed">
					<span ref={setCountRef(0)}>0</span>
				</HoverLabel>
				<HoverLabel classNameLabel="left-0 translate-x-0" label="Correct">
					<span ref={setCountRef(1)}>0</span>
				</HoverLabel>
				<HoverLabel classNameLabel="left-0 translate-x-0" label="Incorrect">
					<span ref={setCountRef(2)}>0</span>
				</HoverLabel>
				<HoverLabel classNameLabel="left-0 translate-x-0" label="Retyped">
					<span ref={setCountRef(3)}>0</span>
				</HoverLabel>
			</div>
			<div className="grid w-full grid-cols-4 gap-4 items-center *:flex *:justify-start pt-1">
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
