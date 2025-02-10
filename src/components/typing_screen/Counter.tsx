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
			className={`h-[15%] flex items-end gap-10 w-full text-[28px] *:flex *:items-end text-foreground/30 font-[500]`}
		>
			<WPMCalculator />
			{mode == TypingMode.timer ? <Timer /> : <TotalTyped />}
		</div>
	);
};

export default Counter;
