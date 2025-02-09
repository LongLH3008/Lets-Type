import { TabletSmartphone } from "lucide-react";

const DeviceUnsupported = () => {
	return (
		<div className="h-screen hidden max-lg:flex flex-col gap-5 items-center justify-center text-3xl font-[500] text-foreground/50">
			<TabletSmartphone size={60} />
			Device Unsupported
		</div>
	);
};

export default DeviceUnsupported;
