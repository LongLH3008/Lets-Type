import BackspaceSwitch from "./BackspaceSwitch";
import KeyboardSwitch from "./KeyboardSwitch";
import QuotesMode from "./QuotesMode";
import Reload from "./Reload";
import { ThemeSwitcher } from "./ThemeSwitcher";
import TimerMode from "./TimerMode";
import WordsMode from "./WordsMode";

const Control = () => {
	return (
		<section className="w-full max-w-5xl grid grid-cols-3 *:flex *:items-center">
			<div className="justify-start gap-2">
				<BackspaceSwitch />
				<TimerMode />
				<QuotesMode />
				<WordsMode />
			</div>
			<div className="justify-center gap-3">
				<KeyboardSwitch />
				<Reload />
			</div>
			<div className="justify-end">
				<ThemeSwitcher />
			</div>
		</section>
	);
};

export default Control;
