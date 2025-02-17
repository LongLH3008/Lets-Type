import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import HoverLabel from "./HoverLabel";

const FeedBack = () => {
	return (
		<section
			className={`p-[3.5px] rounded-[9px] h-[40px] translate-y-[1px] border duration-200 ease flex gap-2 items-center justify-between`}
		>
			<HoverLabel label="Send your feedback" className="h-full w-8">
				<Link
					href={`mailto:longlh3008.work@gmail.com?subject=Let'sType!%20-%20Feedback&body=Feedback%20content:%20`}
					className={`h-full hover:bg-accent w-8 flex justify-center items-center rounded-[5px] cursor-pointer duration-300 overflow-hidden group hover:overflow-visible`}
				>
					<MessageSquareText size={18} className={`text-muted-foreground duration-300`} />
				</Link>
			</HoverLabel>
		</section>
	);
};

export default FeedBack;
