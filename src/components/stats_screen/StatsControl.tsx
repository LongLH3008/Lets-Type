import { ICON_SIZE } from "@/common/constants/control";
import { RootState } from "@/common/redux/store";
import { TypingMode } from "@/common/types/control__enums";
import { Activity } from "lucide-react";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";
import QuotesMode from "../controls/QuotesMode";
import TimerMode from "../controls/TimerMode";
import WordsMode from "../controls/WordsMode";

type Props = {};

const StatsControl = (props: Props) => {
	const mode = useSelector((state: RootState) => state.control.mode);
	const started = useSelector((state: RootState) => state.stats.started);
	const ended = useSelector((state: RootState) => state.stats.ended);

	const start = new Date(started).toLocaleTimeString();
	const end = new Date(ended).toLocaleTimeString();

	return (
		<section className="flex gap-5 items-center justify-between">
			<HoverLabel label="Playing time">
				<div className="h-[40px] p-[3.5px] text-foreground/70 text-[12px] flex items-center gap-2 border border-orange-400 rounded-[9px]">
					<span className="w-8 h-full rounded-[5px] text-orange-400 bg-orange-200 flex items-center justify-center">
						<Activity size={ICON_SIZE} />
					</span>
					<span className="bg-accent h-full p-1 flex items-center rounded-[5px] px-2">
						{start} - {end}
					</span>
				</div>
			</HoverLabel>
			{mode === TypingMode.word && <WordsMode />}
			{mode === TypingMode.quote && <QuotesMode />}
			{mode === TypingMode.timer && <TimerMode />}
		</section>
	);
};

export default StatsControl;
