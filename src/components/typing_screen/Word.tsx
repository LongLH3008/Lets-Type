import { generateDataTyping } from "@/common/redux/slices/typing";
import { AppDispatch, RootState } from "@/common/redux/store";
import { TypedWord } from "@/common/types/typing__types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Letter from "./Letter";

const Word = () => {
	const dispatch = useDispatch<AppDispatch>();
	const words = useSelector((state: RootState) => state.typing.typed);

	useEffect(() => {
		if (words.length == 0) {
			dispatch(generateDataTyping());
		}
	}, []);

	return (
		<>
			{words?.map((item: TypedWord, index: number) => (
				<div id={`word_${index}`} className={`word pb-4`} key={index}>
					{item.character.map((char, ind: number) => (
						<Letter {...char} key={ind} />
					))}
				</div>
			))}
		</>
	);
};

export default Word;
