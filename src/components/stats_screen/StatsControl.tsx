import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";

type Props = {};

const StatsControl = (props: Props) => {
	const wpm = useSelector((state: RootState) => state.stats.wpm);

	return <div>StatsControl</div>;
};

export default StatsControl;
