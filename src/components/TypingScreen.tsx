"use client";

import { generateDataTyping } from "@/common/redux/slices/dataTyping";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TypingScreen = () => {
	const { data } = useSelector((state: RootState) => state.dataTyping);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		console.log("chạy");
		dispatch(generateDataTyping());
	}, []);

	return (
		<section className="h-full w-[1024px] flex justify-center items-center">
			<div className="flex items-start gap-4 tracking-wide flex-wrap text-2xl justify-start h-48 w-full overflow-hidden">
				{data?.map((item: string, index: number) => (
					<span key={index} className="tracking-wider opacity-30 bg-accent">
						{item}
					</span>
				))}
			</div>
		</section>
	);
};

export default TypingScreen;
