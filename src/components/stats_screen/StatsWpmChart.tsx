"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function StatsWpmChart() {
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
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Line
					dataKey="mobile"
					stroke="var(--color-mobile)"
					strokeWidth={2}
					dot={false} // Không hiển thị các chấm trên đường
				/>
				<Line
					dataKey="desktop"
					stroke="var(--color-desktop)"
					strokeWidth={2}
					dot={false} // Không hiển thị các chấm trên đường
				/>
			</LineChart>
		</ChartContainer>
	);
}
