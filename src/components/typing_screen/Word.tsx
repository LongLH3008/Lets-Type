import useActionKeyboard from "@/common/hooks/useActionKeyboard";
import { RootState } from "@/common/redux/store";
import { TypedWord } from "@/common/types/typing__types";
import { useSelector } from "react-redux";
import Letter from "./Letter";

const Word = () => {
	const words = useSelector((state: RootState) => state.typing.typed);
	useActionKeyboard();

	return (
		<>
			{words?.map((item: TypedWord, index: number) => (
				<div id={`word_${index}`} className={`word py-3`} key={index}>
					{item.character.map((char, ind: number) => (
						<Letter {...char} key={ind} />
					))}
				</div>
			))}
		</>
	);
};

export default Word;
