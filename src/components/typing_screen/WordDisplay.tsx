import ScrollIntoViewWord from "@/common/hooks/useScrollIntoViewWord";
import { useRef } from "react";
import Word from "./Word";

const WordDisplay = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	return (
		<div className={`h-fit duration-300 flex items-center relative`}>
			<div
				ref={containerRef}
				className="flex items-center tracking-wide flex-wrap text-3xl justify-start max-h-48 overflow-hidden w-full"
			>
				<Word />
				<ScrollIntoViewWord container={containerRef} />
			</div>
		</div>
	);
};

export default WordDisplay;
