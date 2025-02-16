"use client";

import { setSession } from "@/common/redux/slices/auth";
import { AppDispatch, RootState } from "@/common/redux/store";
import { supabaseClient } from "@/supabase/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

	console.log(session);

	return (
		<>
			{session !== null ? (
				<UserInfoCard session={session} />
			) : (
				<AuthBox
					triggerButton={<span className="font-[500] text-foreground/70"> Login / Register</span>}
				/>
			)}
		</>
	);
};

export default AuthTrigger;
