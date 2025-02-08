import useActionKeyboard from "@/common/hooks/useActionKeyboard";
import { RootState } from "@/common/redux/store";
import { TypedWord } from "@/common/types/types";
import { useSelector } from "react-redux";
import Letter from "./Letter";

const Word = () => {
	const words = useSelector((state: RootState) => state.dataTyping.typed);
	useActionKeyboard();

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
