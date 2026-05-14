import { calcWpm } from "@/common/redux/slices/stats";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const WPMCalculator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wpmRecords = useSelector((state: RootState) => state.stats.wpmRecords);
    const typing = useSelector((state: RootState) => state.control.typing);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (!typing) return;

        intervalRef.current = setInterval(() => {
            dispatch(calcWpm());
        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [typing]);

    return (
        <div className="relative text-orange-400 flex items-center">
            <span className="-top-2 absolute left-0 text-sm font-bold">WPM</span>
            {wpmRecords[wpmRecords.length - 1]?.wpm ?? "0.00"}
        </div>
    );
};

export default WPMCalculator;
