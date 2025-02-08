"use client";

import useActionKeyboard from "@/common/hooks/useActionKeyboard";
import { generateDataTyping } from "@/common/redux/slices/dataTyping";
import { AppDispatch } from "@/common/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Word from "./Word";

const WordDisplay = () => {
	const dispatch = useDispatch<AppDispatch>();
	useActionKeyboard();

	useEffect(() => {
		dispatch(generateDataTyping());
	}, []);

	return (
		<div className={`h-full duration-300 flex items-center`}>
			<div className="flex h-fit items-center tracking-wide flex-wrap text-2xl justify-start max-h-44 overflow-hidden w-full">
				<Word />
			</div>
		</div>
	);
};

export default WordDisplay;
