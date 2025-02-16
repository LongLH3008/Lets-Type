import { SupabaseSessionAuthState } from "@/common/types/redux_initialstate_types";
import Image from "next/image";

const UserInfoCard = ({ session }: { session: SupabaseSessionAuthState }) => {
	return (
		<section className="group relative overflow-hidden hover:overflow-visible rounded-[10px] p-[3.5px] border hover:border-foreground/50 duration-300">
			<figure className="rounded-[5px] size-8 overflow-hidden flex items-center justify-center">
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
				className="w-32 rounded-md shadow-md border h-48 opacity-0 -z-50 absolute top-[110%] right-0
            group-hover:opacity-100 group-hover:z-10"
			></div>
		</section>
	);
};

export default UserInfoCard;
