import { useSelector } from "react-redux";
import { RootState } from "../../common/redux/store";
import { TypingMode } from "../../common/types/control__enums";
import Timer from "./Timer";
import WPMCalculator from "./WPMCalculator";

const Counter = () => {
	const typed = useSelector((state: RootState) => state.typing.typed);
	const mode = useSelector((state: RootState) => state.control.mode);

	const checkTyped = typed.filter((item) => item.active == true);

	return (
		<div
			className={`h-[15%] flex items-end gap-10 w-full text-[28px] *:flex *:items-end text-foreground/30 font-[500]`}
		>
			<WPMCalculator />
			{mode == TypingMode.timer ? (
				<Timer />
			) : (
				<div className="justify-center tracking-widest relative">
					<span className="-top-2 absolute left-0 tracking-normal text-sm font-bold">TYPED</span>
					{checkTyped.length}/{typed.length}
				</div>
			)}
		</div>
	);
};

export default Counter;
