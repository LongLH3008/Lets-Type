"use client";

import { ICON_SIZE } from "@/common/constants/keyboard";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import HoverLabel from "./HoverLabel";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	return (
		<HoverLabel label="Theme switcher">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="p-[3.5px] rounded-[9px] h-10 border flex gap-2 items-center overflow-hidden">
						<span className="h-full bg-accent w-8 flex flex-col justify-center items-center rounded-[5px] cursor-pointer">
							{theme === "light" ? (
								<Sun
									key="light"
									size={ICON_SIZE}
									className={"text-muted-foreground duration-300"}
								/>
							) : theme === "dark" ? (
								<Moon
									key="dark"
									size={ICON_SIZE}
									className={"text-muted-foreground duration-300"}
								/>
							) : (
								<Laptop
									key="system"
									size={ICON_SIZE}
									className={"text-muted-foreground duration-300"}
								/>
							)}
						</span>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-content" align="start">
					<DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setTheme("light")}>
						<Sun size={ICON_SIZE} className="text-muted-foreground" />
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setTheme("dark")}>
						<Moon size={ICON_SIZE} className="text-muted-foreground" />
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex gap-2 cursor-pointer"
						onClick={() => setTheme("system")}
					>
						<Laptop size={ICON_SIZE} className="text-muted-foreground" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</HoverLabel>
	);
};

export { ThemeSwitcher };
