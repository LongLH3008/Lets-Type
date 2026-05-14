"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { RootState } from "@/common/redux/store";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useSelector } from "react-redux";

const chartConfig = {
	raw: {
		label: "",
		color: "hsl(var(--chart-1))",
	},
	wpm: {
		label: "",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function StatsWpmChart() {
	const wpmRecords = useSelector((state: RootState) => state.stats.wpmRecords);
	const calcHighestWpm = () => {
		const raw = wpmRecords
			.map((rec) => rec.rawWpm)
			.sort((a, b) => Number(a) - Number(b))
			.pop();
		const wpm = wpmRecords
			.map((rec) => rec.wpm)
			.sort((a, b) => Number(a) - Number(b))
			.pop();
		const res = Number(wpm) > Number(raw) ? raw : wpm;
		return Math.ceil(Number(res));
	};

	const maxY = calcHighestWpm();

	const chartData = wpmRecords.map((record, index: number) => {
		// if (index > 0) {
		return {
			second: index,
			wpm: Math.ceil(Number(record.wpm)),
			raw: Math.ceil(Number(record.rawWpm)),
		};
		// }
	});

	return (
		<ChartContainer config={chartConfig} className="h-fit max-h-[25dvh] w-full">
			<LineChart
				accessibilityLayer
				data={chartData}
				height={240}
				width={1024}
				margin={{
					left: -20,
					right: 12,
					top: 20, // Điều chỉnh top margin để tránh tràn
					bottom: 40, // Điều chỉnh bottom margin để trục X không bị cắt
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="second"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => String(value).slice(0, 3)}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} domain={[0, maxY]} />
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Line
					dataKey="raw"
					stroke="#5d5d5d"
					strokeWidth={2}
					dot={false} // Không hiển thị các chấm trên đường
				/>
				<Line
					dataKey="wpm"
					stroke="#ff9c00"
					strokeWidth={2}
					dot={false} // Không hiển thị các chấm trên đường
				/>
			</LineChart>
		</ChartContainer>
	);
}
