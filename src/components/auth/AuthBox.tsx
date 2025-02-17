"use client";

import { openAuth } from "@/common/redux/slices/auth";
import { AppDispatch } from "@/common/redux/store";
import { supabaseClient } from "@/supabase/client";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { KeyRound } from "lucide-react";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const schema = Joi.object({
	email: Joi.string().email({ tlds: false }).required(),
	password: Joi.string().required(),
});

type Login = {
	email: string;
	password: string;
};

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

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Login>({
		resolver: joiResolver(schema),
	});

	const Login = async (payload: Login) => {
		let { data, error } = await supabaseClient.auth.signInWithPassword(payload);
		// let { data, error } = await supabaseClient.auth.signUp(payload);
		console.log(data, error);
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
