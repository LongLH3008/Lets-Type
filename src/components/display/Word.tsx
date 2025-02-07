import { RootState } from "@/common/redux/store";
import { TypedWord } from "@/common/types/types";
import { useSelector } from "react-redux";
import Letter from "./Letter";

const Word = () => {
	const { typed: words } = useSelector((state: RootState) => state.dataTyping);

	console.log(words);

	return (
		<>
			{words?.map((item: TypedWord, index: number) => (
				<div className="word py-3" key={index}>
					{item.letter.map((lett, ind: number) => (
						<Letter {...lett} key={ind} />
					))}
				</div>
			))}
		</>
	);
};

export default Word;
