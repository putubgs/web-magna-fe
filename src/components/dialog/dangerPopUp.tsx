import { useEffect, useState } from "react";
import { DangerIcon } from "../icons/dangerIcon";
import ExitIcon from "../icons/exitIcon";

type DangerPopUpProps = {
	open: boolean;
	close: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
};

export default function DangerPopUp({
	open,
	close,
	onConfirm,
	title,
	message,
}: DangerPopUpProps) {
	const [popUpHeight, setPopUpHeight] = useState<number>(0);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant",
		});

		if (open) {
			const eventDetailPopup = document.querySelector(
				"section.overflow-y-auto.absolute"
			);
			if (eventDetailPopup) {
				const height = eventDetailPopup.scrollHeight;
				setPopUpHeight(height);
			}
		}
	}, [open]);

	if (!open) return null;

	return (
		<main
			className="overflow-y-auto absolute top-0 left-0 bg-black/50 w-full flex justify-center items-center"
			style={{ height: popUpHeight > 0 ? `${popUpHeight}px` : "100vh" }}>
			<section className="w-[512px] bg-neutral-800 rounded-[16px] py-[24px] space-y-[16px]">
				<div className="flex items-start px-[16px] gap-x-[16px]">
					<div>
						<DangerIcon width={36} height={36} color="#EF4444" />
					</div>
					<div className="w-full flex justify-between items-start">
						<div className="space-y-[8px]">
							<h3 className="text-2xl font-bold">{title}</h3>
							<p>{message}</p>
						</div>
						<div onClick={close}>
							<ExitIcon className={"mt-1"} size={15} color="#999CA0" />
						</div>
					</div>
				</div>
				<hr className="mt-[24px] w-full bg-white" />
				<div className="flex justify-end px-[16px] gap-x-[8px]">
					<div
						onClick={close}
						className="cursor-pointer border border-[#999CA0] px-[18px] py-[8px] rounded-[8px]">
						Cancel
					</div>
					<div
						onClick={() => {
							onConfirm();
							close();
						}}
						className="cursor-pointer border border-[#270081] bg-[#270081] px-[18px] py-[8px] rounded-[8px]">
						Delete
					</div>
				</div>
			</section>
		</main>
	);
}
