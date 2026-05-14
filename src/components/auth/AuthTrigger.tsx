"use client";

import { setSession } from "@/common/redux/slices/auth";
import { AppDispatch, RootState } from "@/common/redux/store";
import { supabaseClient } from "@/supabase/client";
import { User } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HoverLabel from "../controls/HoverLabel";
import AuthBox from "./AuthBox";
import UserInfoCard from "./UserInfoCard";

const AuthTrigger = () => {
	const dispatch = useDispatch<AppDispatch>();
	const session = useSelector((state: RootState) => state.auth.session);

	useEffect(() => {
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			dispatch(setSession(session));
		});

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			dispatch(setSession(session));
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<>
			{session !== null ? (
				<UserInfoCard session={session} />
			) : (
				<HoverLabel label="Login / Register" classNameLabel="translate-y-0 top-[130%]">
					<AuthBox
						triggerButton={
							<div className="font-[500] rounded-[10px] p-[3.5px] border text-foreground/70 group">
								<span className="rounded-[5px] group-hover:bg-accent duration-200 size-7 overflow-hidden flex items-center justify-center">
									<User size={18} />
								</span>
							</div>
						}
					/>
				</HoverLabel>
			)}
		</>
	);
};

export default AuthTrigger;
