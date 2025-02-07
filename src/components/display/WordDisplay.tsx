"use client";

import { generateDataTyping } from "@/common/redux/slices/dataTyping";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Word from "./Word";

const WordDisplay = () => {
	const { keyboard } = useSelector((state: RootState) => state.control);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(generateDataTyping());
	}, []);

	return (
		<div className={`${keyboard ? "row-span-2" : "row-span-3"} duration-300 flex items-center`}>
			<div className="flex h-fit items-center tracking-wide flex-wrap text-2xl justify-start max-h-44 overflow-hidden w-full">
				<Word />
			</div>
		</div>
	);
};

export default WordDisplay;
