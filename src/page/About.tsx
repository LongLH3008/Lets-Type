"use client";

import { ICON_SIZE } from "@/common/constants/control";
import { AlarmClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const About = () => {
	const router = useRouter();

	useEffect(() => {
		const handleEnter = (e: KeyboardEvent) => {
			e.preventDefault();
			if (e.key === "Enter") router.push("/");
		};
		document.addEventListener("keyup", handleEnter);
		return () => document.removeEventListener("keyup", handleEnter);
	}, []);

	return (
		<section className="w-full h-full flex flex-col gap-2">
			<h3 className="text-foreground/70 font-bold text-3xl">Mode</h3>
			<div className="w-full p-5 rounded-[9px] border">
				<div className="flex items-center gap-3 text-foreground/60">
					<span className="size-9 bg-orange-200 text-orange-400 flex items-center justify-center bg-accent rounded-md">
						<AlarmClock size={ICON_SIZE} />
					</span>
					Timer
				</div>
			</div>
		</section>
	);
};

export default About;
