"use client";

import { cn } from "@/common/lib/utils";
import { TypedLetter } from "@/common/types/types";

const Letter = (props: TypedLetter) => {
	const letterColor = () => {
		if (!props.typed) return "text-foreground/30";
		return props.correct ? "text-orange-400" : "text-foreground/30 border-b border-[#fff]";
	};

	const letterCursor = props.cursor ? "cursor_active" : "";
	const isSpace = props.content == " " ? "text-transparent" : "";
	const letterContent = props.content == " " ? "_" : props.content;

	return <span className={cn(`${letterColor()} ${letterCursor} ${isSpace}`)}>{letterContent}</span>;
};

export default Letter;
