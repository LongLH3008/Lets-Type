import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

const StatsDuration = () => {
	const started = useSelector((state: RootState) => state.stats.started);
	const ended = useSelector((state: RootState) => state.stats.ended);

	const calc = Math.floor((ended - started) / 1000);
	const isMinute = calc > 0 && calc % 60 == 0;
	const isSecond = calc < 60;

	return (
		<div className="relative font-[700] text-5xl flex flex-col items-start gap-0">
			<span className="text-base font-bold uppercase">dur</span>
			<HoverLabel label="Duration">
				{isMinute || isSecond ? (
					<span className="">{isMinute ? calc / 60 : calc}</span>
				) : (
					<div className="">
						<span>{Math.floor(calc / 60)}</span>:
						<span>{(calc % 60).toString().padStart(2, "0")}</span>
					</div>
				)}
			</HoverLabel>
			{isMinute || isSecond ? (
				<span className="text-base font-bold tracking-tight">
					{isMinute ? "minute" : "second"}
					{calc > 0 ? "s" : ""}
				</span>
			) : (
				<div className="flex w-full justify-between items-end text-sm">
					<span>min{calc > 0 ? "s" : ""}</span>
					<span>sec{calc > 0 ? "s" : ""}</span>
				</div>
			)}
		</div>
	);
};

export default StatsDuration;
