import { generateDataTyping } from "@/common/redux/slices/typing";
import { AppDispatch } from "@/common/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Counter from "./Counter";
import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";

const TypingScreen = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(generateDataTyping());
	}, []);

	return (
		<section className={`max-lg:hidden h-full w-[1024px] flex flex-col justify-center`}>
			<Counter />
			<WordDisplay />
			<Keyboard />
		</section>
	);
};

export default TypingScreen;
