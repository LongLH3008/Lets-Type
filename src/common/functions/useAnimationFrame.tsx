"use client";
import { useCallback, useEffect, useRef } from "react";

type Props = {
	duration: number; // milliseconds
	rafAction: (progress: number) => void;
};

type Response = {
	cancel: (handle: number) => void;
	start: (time: number) => void;
	rafId: number;
};

// Use Request Animation Frame
const useRAF = ({ duration, rafAction }: Props): Response => {
	const rafId = useRef<number>(0);
	const startRef = useRef<number | null>(null);

	const cancel = useCallback(() => {
		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
			rafId.current = 0;
		}
	}, [duration, rafAction]);

	const start = useCallback(() => {
		cancel();
		startRef.current = null;

		const updateFrame = (timestamp: number) => {
			// Timestamp parameter is default from window.
			// Set it to start if the function is not started
			if (!startRef.current) startRef.current = timestamp;

			// Progress calc (%)
			const progress = Math.min((timestamp - startRef.current) / duration, 1);

			// Do action in frame
			rafAction(progress);

			// if progress < 100% then keep running (Đệ quy - Recursive)
			if (progress < 1) rafId.current = requestAnimationFrame(updateFrame);
		};

		requestAnimationFrame(updateFrame);
	}, []);

	useEffect(() => {
		return () => cancel();
	}, [cancel]);

	return { cancel, rafId: rafId.current, start };
};
export default useRAF;
