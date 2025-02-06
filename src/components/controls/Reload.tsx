"use client";

import { ICON_SIZE } from "@/common/constants/keyboard";
import { generateDataTyping } from "@/common/redux/slices/dataTyping";
import { AppDispatch, RootState } from "@/common/redux/store";
import { RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import HoverLabel from "./HoverLabel";

const Reload = () => {
	const [isReload, setIsReload] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const controlState = useSelector((state: RootState) => state.control);

	const reload = () => {
		setIsReload(true);
		dispatch(generateDataTyping());
		setTimeout(() => setIsReload(false), 400);
	};

	return (
		<HoverLabel label="Reload">
			<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
				<Button
					disabled={isReload}
					onClick={reload}
					variant={"ghost"}
					size={"icon"}
					className="border rounded-lg cursor-pointer"
				>
					<RotateCw
						size={ICON_SIZE}
						className={`text-muted-foreground ${isReload && "animate-spin opacity-30"} ease-linear duration-300`}
					/>
				</Button>
			</motion.div>
		</HoverLabel>
	);
};

export default Reload;
