"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ScrollIntoViewWord = () => {
	const scrollIndex = useSelector((state: RootState) => state.dataTyping.scrollToViewWordIndex);

	useEffect(() => {
		if (scrollIndex === -1) return;
		const currentWord = document.getElementById(`word_${scrollIndex}`);
		currentWord?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, [scrollIndex]);
	console.log("scroll");

	return <div className="opacity-0 size-0 -z-50">scroll in to word {scrollIndex} view</div>;
};

export default ScrollIntoViewWord;
