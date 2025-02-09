import { formatTimer } from "@/common/functions/control";
import { RootState } from "@/common/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
	const timer = useSelector((state: RootState) => state.control.timer);
	const started = useSelector((state: RootState) => state.stats.started);
	const [time, setTime] = useState<number>(timer);

	useEffect(() => {
		setTime(timer);
	}, [timer]);

	useEffect(() => {
		if (time === 0 || started == 0) return;

		const intervalTime = setInterval(() => {
			setTime((prevTime) => Math.max(prevTime - 1, 0));
		}, 1000);

		return () => clearInterval(intervalTime);
	}, [started]);

	return (
		<div className="justify-center tracking-tight relative">
			<span className="-top-2 absolute left-0 tracking-normal text-sm font-bold">TIME</span>
			{formatTimer(time)}
		</div>
	);
};

export default Timer;
