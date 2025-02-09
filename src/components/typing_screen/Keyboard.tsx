import { keyboard_constant } from "@/common/constants/keyboard";
import { RootState } from "@/common/redux/store";
import { IKey, KeyRow } from "@/common/types/keyboard__types";
import { useSelector } from "react-redux";
import Key from "./Key";

const Keyboard = () => {
	const keyboard = useSelector((state: RootState) => state.control.keyboard);

	return (
		<section
			className={`${keyboard ? "h-[40%]" : "h-[20%] opacity-0"} mt-8 duration-300 flex flex-col gap-[6px]`}
		>
			{keyboard_constant.map((keyrow: KeyRow, index: number) => (
				<div key={index} className={`flex justify-center items-center gap-x-[6px]`}>
					{keyrow.map((key: IKey, ind: number) => (
						<Key keyboard={keyboard} keyData={key} index={ind} key={ind} />
					))}
				</div>
			))}
		</section>
	);
};

export default Keyboard;
