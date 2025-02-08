import dynamic from "next/dynamic";

const Counter = dynamic(() => import("./display/Counter"));
const WordDisplay = dynamic(() => import("./display/WordDisplay"));
const Keyboard = dynamic(() => import("./display/Keyboard"));

const TypingScreen = () => {
	return (
		<section className={`h-full w-[1024px] flex flex-col gap-10`}>
			<Counter />
			<WordDisplay />
			<Keyboard />
		</section>
	);
};

export default TypingScreen;
