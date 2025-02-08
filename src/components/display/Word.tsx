import { RootState } from "@/common/redux/store";
import { TypedWord } from "@/common/types/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Letter from "./Letter";

const Word = () => {
	const words = useSelector((state: RootState) => state.dataTyping.typed);

	useEffect(() => {
		const currentIndex = words.findIndex((e) => !e.active);
		if (currentIndex === -1) return;

		const timer = setTimeout(() => {
			const currentWord = document.getElementById(`word_${currentIndex}`);
			currentWord?.scrollIntoView({ behavior: "smooth", block: "center" });
		}, 0);

		return () => clearTimeout(timer);
	}, [words]);

	return (
		<>
			{words?.map((item: TypedWord, index: number) => (
				<div id={`word_${index}`} className={`word py-3`} key={index}>
					{item.letter.map((lett, ind: number) => (
						<Letter {...lett} key={ind} />
					))}
				</div>
			))}
		</>
	);
};

export default Word;
