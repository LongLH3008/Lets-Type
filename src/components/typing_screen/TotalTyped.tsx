import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";

type Props = {};

const TotalTyped = (props: Props) => {
	const typed = useSelector((state: RootState) => state.typing.typed);

	const checkTyped = typed.filter((item) => item.active == true);

	return (
		<div className="justify-center tracking-widest relative">
			<span className="-top-2 absolute left-0 tracking-normal text-sm font-bold">TYPED</span>
			{checkTyped.length}/{typed.length}
		</div>
	);
};

export default TotalTyped;
