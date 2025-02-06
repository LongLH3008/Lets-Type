"use client";

import { decrement, increment, incrementAsync, incrementByAmount } from "@/common/redux/slices/control";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useDispatch, useSelector } from "react-redux";

const TestRedux: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // Cung cấp kiểu AppDispatch
	const { value, loading } = useSelector((state: RootState) => state.control);

	return (
		<div className="flex flex-col items-center gap-5">
			<h1>{loading ? "Loading..." : value}</h1>
			<div className="flex items-center gap-2 *:p-1 *:border justify-center">
				<button onClick={() => dispatch(increment())}>Increment</button>
				<button onClick={() => dispatch(decrement())}>Decrement</button>
				<button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
				<button onClick={() => dispatch(incrementAsync(10))}>Increment Async</button>
			</div>
		</div>
	);
};

export default TestRedux;
