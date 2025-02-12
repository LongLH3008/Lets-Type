"use client";

import { ICON_SIZE } from "@/common/constants/control";
import { toggleKeyboard } from "@/common/redux/slices/control";
import { AppDispatch, RootState } from "@/common/redux/store";
import { Keyboard, KeyboardOff } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import HoverLabel from "./HoverLabel";

const KeyboardSwitch = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { keyboard } = useSelector((state: RootState) => state.control);
	const ended = useSelector((state: RootState) => state.stats.ended);

	return (
		<HoverLabel label={`Turn ${keyboard ? "off" : "on"} keyboard`}>
			{ended == 0 && (
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
					<Button
						onClick={() => dispatch(toggleKeyboard())}
						variant={"ghost"}
						size={"icon"}
						className="relative cursor-pointer overflow-hidden"
					>
						<Keyboard
							size={ICON_SIZE}
							className={`text-muted-foreground absolute left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300
                ${!keyboard ? "top-1/2" : "opacity-0 -top-1/2"}`}
						/>
						<KeyboardOff
							size={ICON_SIZE}
							className={`text-muted-foreground absolute left-1/2 -translate-x-1/2 translate-y-1/2 duration-300
                ${keyboard ? "bottom-1/2" : "opacity-0 -bottom-1/2"}`}
						/>
					</Button>
				</motion.div>
			)}
		</HoverLabel>
	);
};

export default KeyboardSwitch;
