import { SupabaseSessionAuthState } from "@/common/types/redux_initialstate_types";
import { supabaseClient } from "@/supabase/client";
import { CircleUserRound, LogOut } from "lucide-react";
import Image from "next/image";

const UserInfoCard = ({ session }: { session: SupabaseSessionAuthState }) => {
	const signOut = async () => {
		const { error } = await supabaseClient.auth.signOut();
	};
	return (
		<section className="group relative overflow-hidden hover:overflow-visible rounded-[10px] p-[3.5px] border hover:border-foreground/50 duration-300">
			<figure className="rounded-[5px] size-7 overflow-hidden flex items-center justify-center">
				<Image
					src={session?.user.user_metadata.avatar_url}
					width={1}
					height={1}
					layout="responsive"
					className="h-full w-auto"
					alt={`Let'sTyped! - ${session?.user.user_metadata.name}`}
				></Image>
			</figure>
			<div
				className="pt-3 absolute top-full right-0
            group-hover:opacity-100 group-hover:z-10 opacity-0 -z-50"
			>
				<div className="w-28 bg-popover rounded-[9px] border-foreground/50 shadow-md border flex gap-1 flex-col p-1 *:px-2 *:py-1">
					<span className="hover:bg-accent text-foreground/50 hover:cursor-pointer hover:text-foreground/70 rounded-[5px] flex items-center gap-2">
						<CircleUserRound size={12} /> Profile
					</span>
					<span
						onClick={() => signOut()}
						className="hover:bg-accent text-foreground/50 hover:cursor-pointer hover:text-foreground/70 rounded-[5px] flex items-center gap-2"
					>
						<LogOut size={12} /> Sign out
					</span>
				</div>
			</div>
		</section>
	);
};

export default UserInfoCard;
