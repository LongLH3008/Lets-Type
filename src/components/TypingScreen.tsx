import Keyboard from "./display/Keyboard";
import Stats from "./display/Stats";
import WordDisplay from "./display/WordDisplay";

const TypingScreen = () => {
	return (
		<section className={`h-full w-[1024px] grid grid-rows-5 gap-10`}>
			<Stats />
			<WordDisplay />
			<Keyboard />
		</section>
	);
};

export default TypingScreen;
