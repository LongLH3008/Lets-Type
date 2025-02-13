import { cn } from "@/common/lib/utils";
import { RootState } from "@/common/redux/store";
import { TypedCharacter, TypedWord } from "@/common/types/typing__types";
import { useRef } from "react";
import { useSelector } from "react-redux";

const LetterHistory = (props: TypedCharacter) => {
	const isCorrect = () => {
		if (!props.active) return "text-foreground/30";
		return props.correct ? "text-foreground/70" : "border-b-foreground/50";
	};

	const letterCursor = props.cursor ? "cursor_active" : "";
	const isSpace = props.content == " " ? "text-transparent border-t-none" : "";
	const letterContent = props.content == " " ? "_" : props.content;
	const isEdited = props.edited && props.typed !== "" ? "border-t-foreground/50" : "";

	return (
		<span
			className={cn(
				`text-foreground/30 border-y mr-[1px] border-r-[0.5px] border-l-2 border-transparent font-[500] duration-200 ${isCorrect()} ${letterCursor} ${isSpace} ${isEdited}`
			)}
		>
			{letterContent}
		</span>
	);
};

const WordAnalysis = () => {
	return <div>abc</div>;
};

const StatsWordsHistory = () => {
	const words = useSelector((state: RootState) => state.typing.typed);
	const detailWordRef = useRef<HTMLDivElement | null>(null);

	const showResult = (word: TypedWord) => {
		const checkRetyped = word.character.filter((char) => char.edited);
		const checkIncorrect = word.character.filter((char) => !char.correct);
		if (checkRetyped.length == 0 && checkIncorrect.length == 0) return;
		if (detailWordRef.current && detailWordRef.current.classList.contains("opacity-0")) {
			detailWordRef.current.classList.remove("opacity-0");
			detailWordRef.current.innerHTML = `
				<div class="flex flex-col text-foreground/70">
					<div class="flex items-center text-sm gap-3">
					${
						checkRetyped.length > 0
							? `
					<svg class="scale-75" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eraser"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>

					`
							: ""
					}
					<div class="flex items-center text-sm gap-3">
					${
						checkIncorrect.length > 0
							? `
							<svg class="scale-75" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					`
							: ""
					}
					<span> ${word.content}</span>
					<div class="flex"> ${word.character.map((char) => `<span class="mr-[2px] border-foreground/70 ${char.typed == " " ? "text-transparent border-b" : ""} ${char.edited ? "overline" : ""} ${!char.correct ? "underline underline-offset-[5px]" : ""}">${char.typed == " " && char.content !== " " ? "_" : char.typed}</span>`).join("")}</div>
					</div>
				</div>
			`;
		}
	};

	const hideResult = () => {
		if (detailWordRef.current && !detailWordRef.current.classList.contains("opacity-0")) {
			detailWordRef.current.classList.add("opacity-0");
		}
	};

	return (
		<section className="col-span-5 flex flex-col gap-5">
			<div className="flex justify-between">
				<span className="text-base font-[500] uppercase">words history</span>
				<div className="flex !items-start gap-5 text-[12px]">
					<div className="flex items-center gap-2">
						<span className="text-foreground/70 border-foreground/70 font-[500] border-t">
							a
						</span>
						<span>Retyped</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-foreground/70 border-foreground/70 font-[500] border-b">
							a
						</span>
						<span>Incorrect</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-foreground/70 border-foreground/70 font-[500] ">a</span>
						<span>Correct</span>
					</div>
				</div>
			</div>
			<div className="h-fit max-h-36 overflow-y-scroll history_scroll flex flex-wrap text-sm gap-y-3 items-start w-full">
				{words?.map((item: TypedWord, index: number) => (
					<div onMouseEnter={() => showResult(item)} onMouseLeave={() => hideResult()} key={index}>
						{item.character.map((char, ind: number) => (
							<LetterHistory {...char} key={ind} />
						))}
					</div>
				))}
			</div>
			<div ref={detailWordRef} className="h-10 text-sm duration-300 opacity-0">
				abc
			</div>
		</section>
	);
};

export default StatsWordsHistory;
