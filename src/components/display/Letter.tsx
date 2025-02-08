"use client";

import { cn } from "@/common/lib/utils";
import { TypedLetter } from "@/common/types/types";

const Letter = (props: TypedLetter) => {
	const letterColor = () => {
		if (!props.typed) return "text-foreground/20";
		return props.correct ? "text-orange-400" : "text-foreground/50 border-b-foreground/50";
	};

	const letterCursor = props.cursor ? "cursor_active" : "";
	const isSpace = props.content == " " ? "text-transparent" : "";
	const letterContent = props.content == " " ? "_" : props.content;

	return (
		<span
			className={cn(
				`border-b border-r-[0.5px] border-l-2 border-transparent font-[500] duration-200 ${letterColor()} ${letterCursor} ${isSpace}`
			)}
		>
			{letterContent}
		</span>
	);
};

export default Letter;
