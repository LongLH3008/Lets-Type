import dynamic from "next/dynamic";

const Stats = dynamic(() => import("./display/Stats"), { ssr: true });
const WordDisplay = dynamic(() => import("./display/WordDisplay"), { ssr: true });
const Keyboard = dynamic(() => import("./display/Keyboard"), { ssr: true });

const TypingScreen = () => {
	return (
		<section className={`h-full w-[1024px] flex flex-col gap-10`}>
			<Stats />
			<WordDisplay />
			<Keyboard />
		</section>
	);
};

export default TypingScreen;
