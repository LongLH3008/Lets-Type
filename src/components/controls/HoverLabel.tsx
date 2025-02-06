import { cn } from "@/common/lib/utils";
import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; label: string };

const HoverLabel = ({ children, className, label }: Props) => {
	return (
		<div className={cn(`size-fit group overflow-hidden hover:overflow-visible relative ${className}`)}>
			{children}
			<span
				className={cn(
					`text-nowrap rounded-md p-1 px-2 z-50 shadow-lg border -translate-x-1/2 left-1/2 absolute -translate-y-10 top-0 text-[11px] opacity-0 group-hover:opacity-100 duration-300 text-zinc-700 font-[500] bg-white`
				)}
			>
				{label}
			</span>
		</div>
	);
};

export default HoverLabel;
