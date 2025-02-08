"use client";

import { formatTimer } from "@/common/functions/display";
import { RootState } from "@/common/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
	const timer = useSelector((state: RootState) => state.control.timer);
	const typing = useSelector((state: RootState) => state.control.typing);
	const [time, setTime] = useState<number>(timer);

	useEffect(() => {
		setTime(timer);
	}, [timer]);

	useEffect(() => {
		if (time === 0 || !typing) return;

		const intervalTime = setInterval(() => {
			setTime((prevTime) => Math.max(prevTime - 1, 0));
		}, 1000);

		return () => clearInterval(intervalTime);
	}, [typing]);

	return <span className="tracking-[2.5px] text-xl">{formatTimer(time)}</span>;
};

export default Timer;
