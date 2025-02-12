import { cn } from "@/common/lib/utils";
import { RootState } from "@/common/redux/store";
import { TypedCharacter, TypedWord } from "@/common/types/typing__types";
import { useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";

const LetterHistory = (props: TypedCharacter) => {
	const isCorrect = () => {
		if (!props.active) return "text-foreground/20";
		return props.correct ? "text-foreground/70" : "";
	};

	return (
		<span className={cn(`border-y border-transparent font-[500] duration-200 ${isCorrect()}`)}>
			{props.content}
		</span>
	);
};

const StatsWordsHistory = () => {
	const words = useSelector((state: RootState) => state.typing.typed);

	return (
		<section className="col-span-5 flex flex-col gap-5">
			<span className="text-base font-bold uppercase">words history</span>
			<div className="h-fit max-h-48 history_scroll flex flex-wrap text-[16px] gap-x-3 gap-y-2 items-start w-full">
				{words?.map((item: TypedWord, index: number) => (
					<HoverLabel label={`abc`}>
						<div
							key={index}
							className={`${item.character.some((char) => char.edited) ? "border-t" : ""}
						${item.character.some((char) => !char.correct) ? "border-b text-red-500" : ""} border-foreground/50`}
						>
							{item.character.map((char, ind: number) => (
								<LetterHistory {...char} key={ind} />
							))}
						</div>
					</HoverLabel>
				))}
			</div>
		</section>
	);
};

export default StatsWordsHistory;
