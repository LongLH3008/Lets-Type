import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ScrollIntoViewWord = (props: { container: React.RefObject<HTMLDivElement | null> }) => {
	const scrollIndex = useSelector((state: RootState) => state.typing.scrollToViewWordIndex);

	useEffect(() => {
		if (scrollIndex === -1) return;
		const currentWord = document.getElementById(`word_${scrollIndex}`);
		if (!currentWord) return;
		const { scrollHeight, clientHeight } = props.container.current as HTMLDivElement;
		if (scrollHeight - 186 > clientHeight) {
			currentWord?.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [scrollIndex]);

	// console.log(`scroll
	// clientheight: ${props.container.current?.clientHeight}
	// scrollheight: ${props.container.current?.scrollHeight}`);

	return <div className="opacity-0 size-0 -z-50">scroll in to word {scrollIndex} view</div>;
};

export default ScrollIntoViewWord;
