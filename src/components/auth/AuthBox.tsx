"use client";

import { supabaseClient } from "@/supabase/client";
import { KeyRound } from "lucide-react";
import { ReactElement } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

const AuthBox = ({ triggerButton }: { triggerButton: ReactElement }) => {
	const signOut = async () => {
		const { error } = await supabaseClient.auth.signOut();
	};

	const signUp = async () => {
		const res = await supabaseClient.auth.signInWithOAuth({
			provider: "google",
		});
		console.log(res);
	};

	return (
		<Dialog>
			<DialogTrigger onClick={(e) => e.stopPropagation()}>{triggerButton}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<KeyRound /> Login
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<DialogDescription>Personal account</DialogDescription>
					<Input id="name" placeholder="Email / username" className="col-span-3" />
					<Input id="username" placeholder="Password" className="col-span-3" />
					<Button type="submit" className="col-span-3">
						Login now
					</Button>
					<div className="flex col-span-3 text-[12px] text-foreground/70 justify-between">
						<span className="hover:underline">Register</span>
						<span className="hover:underline">Forgot password</span>
					</div>
				</div>
				<div className="relative">
					<hr className="-z-10" />
					<span className="absolute bg-accent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-foreground/70 text-sm rounded-sm">
						Or
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<DialogDescription>Others account</DialogDescription>
					<div className="flex items-center gap-2 w-full *:w-full">
						<Button type="button" onClick={signUp} className="flex gap-2">
							<FaGoogle /> Google
						</Button>
						<Button type="submit" className="flex gap-2">
							<FaGithub /> Git
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthBox;
