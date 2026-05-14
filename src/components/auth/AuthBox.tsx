"use client";

import { openAuth } from "@/common/redux/slices/auth";
import { AppDispatch } from "@/common/redux/store";
import { supabaseClient } from "@/supabase/client";
import { KeyRound } from "lucide-react";
import { ReactElement } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const AuthBox = ({ triggerButton }: { triggerButton: ReactElement }) => {
	const dispatch = useDispatch<AppDispatch>();

	const signInWithGG = async () => {
		const res = await supabaseClient.auth.signInWithOAuth({
			provider: "google",
		});
	};

	const signInWithGit = async () => {
		const res = await supabaseClient.auth.signInWithOAuth({
			provider: "github",
		});
	};

	return (
		<Dialog>
			<DialogTrigger onClick={() => dispatch(openAuth())}>{triggerButton}</DialogTrigger>
			<DialogContent className="sm:max-w-[300px]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<KeyRound /> Login
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<DialogDescription>Use your social account</DialogDescription>
					<div className="flex flex-col items-center gap-2 w-full *:w-full">
						<Button type="button" onClick={signInWithGG} className="flex gap-2">
							<FaGoogle /> Google
						</Button>
						<Button type="button" onClick={signInWithGit} className="flex gap-2">
							<FaGithub /> Git
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthBox;
