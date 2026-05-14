import { useSelector } from "react-redux";
import { RootState } from "../../common/redux/store";
import { TypingMode } from "../../common/types/control__enums";
import Timer from "./Timer";
import TotalTyped from "./TotalTyped";
import WPMCalculator from "./WPMCalculator";

const Counter = () => {
	const mode = useSelector((state: RootState) => state.control.mode);

	return (
		<div
			className={`h-[15%] flex items-center justify-between w-full text-[28px] *:flex *:items-start text-foreground/30 font-[500]`}
		>
			<div className="gap-10">
				<WPMCalculator />
				{mode == TypingMode.timer ? <Timer /> : <TotalTyped />}
			</div>
			<div className="flex !items-start gap-10 text-sm">
				<div className="flex items-center gap-2">
					<span className="text-foreground/70 border-foreground/70 font-[500] text-base border-t">
						a
					</span>
					<span>Retyped</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-foreground/70 border-foreground/70 font-[500] text-base border-b">
						a
					</span>
					<span>Incorrect</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-foreground/70 border-foreground/70 font-[500] text-base ">a</span>
					<span>Correct</span>
				</div>
			</div>
		</div>
	);
};

export default Counter;
