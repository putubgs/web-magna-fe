import { useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { TrashCanIcon } from "../icons/trashCanIcon";
import EventPopUp from "../adminPopUpComponents/eventPopUp";
import EventDetailPopUp from "../adminDetailPopUpComponents/eventDetailPopUp";

type EventProps = {
	eventName: string;
	date: string;
	startTime: string;
	endTime: string;
	registrationUrl?: string;
	startDate?: string;
	endDate?: string;
	eventDescription: string;
	image: string;
};

export default function EventManagement() {
	const [eventPopUp, setEventPopUp] = useState<boolean>(false);
	const [eventDetailPopUp, setEventDetailPopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [eventDetailData, setEventDetailData] = useState<EventProps[] | null>(
		null
	);
	const [eventData, setEventData] = useState<EventProps[] | null>(null);

	function handleSubmitEvent(eventData: EventProps) {
		setEventData((prev) => (prev ? [...prev, eventData] : [eventData]));
	}

	function handleUpdateEvent(updatedData: EventProps, index: number) {
		setEventData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData[index] = updatedData;

			return newData;
		});
	}

	function handleDeleteEvent(index: number) {
		setEventData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData.splice(index, 1);

			return newData;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setEventDetailPopUp(true);

		if (eventData && eventData[index]) {
			setEventDetailData([
				{
					eventName: eventData[index].eventName,
					date: eventData[index].date,
					startTime: eventData[index].startTime,
					endTime: eventData[index].endTime,
					registrationUrl: eventData[index].registrationUrl,
					startDate: eventData[index].startDate,
					endDate: eventData[index].endDate,
					eventDescription: eventData[index].eventDescription,
					image: eventData[index].image,
				},
			]);
		}
	}

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold">Events Management Panel</h1>
					<button
						onClick={() => setEventPopUp(true)}
						className="cursor-pointer bg-[#270081] text-base p-[16px] rounded-[8px]">
						Add Event +
					</button>
				</div>
				<div className="grid grid-cols-12 gap-[31px]">
					<div className="col-span-6 bg-[#1D1D1D] rounded-[8px] p-[20px] space-y-[11px]">
						<h1 className="text-2xl font-semibold">0</h1>
						<h3 className="text-base text-[#A3A3A3] font-medium">Active Event</h3>
					</div>
					<div className="col-span-6 bg-[#1D1D1D] rounded-[8px] p-[20px] space-y-[11px]">
						<h1 className="text-2xl font-semibold">0</h1>
						<h3 className="text-base text-[#A3A3A3] font-medium">Expired Event</h3>
					</div>
				</div>
			</section>
			<section className="h-full bg-black flex flex-col justify-between border border-[#404040] p-[28px] rounded-[20px]">
				<table className="table-auto w-full text-white">
					<thead>
						<tr className="border-b border-[#D4 D4D4] text-left">
							<th className="text-lg font-bold py-3 px-4">No</th>
							<th className="text-lg font-bold py-3 px-4">Poster</th>
							<th className="text-lg font-bold py-3 px-0">Event Name</th>
							<th className="text-lg font-bold py-3 px-4">Date</th>
							<th className="text-lg font-bold py-3 px-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{eventData ? (
							eventData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">
										{index + 1}
									</td>
									<td className="py-4 px-4 align-top">
										<img
											className="w-[150px] h-[150px] object-cover"
											src={data.image}
											alt="Event Poster"
										/>
									</td>
									<td className="py-4 align-top">
										<p className="text-base font-semibold leading-tight">
											{data.eventName}
										</p>
									</td>
									<td className="py-4 px-4 align-top text-base font-semibold whitespace-nowrap">
										{`${data.date.split("-")[2]}/${data.date.split("-")[1]}/${
											data.date.split("-")[0]
										}`}
									</td>
									<td className="py-4 px-4 align-top">
										<div className="flex items-center gap-x-[16px]">
											<div
												onClick={() => showDetail(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
												<PencilIcon width={18} height={18} color="#FF8800" />
											</div>
											<div
												onClick={() => handleDeleteEvent(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#C00707] p-[8px] rounded-[8px]">
												<TrashCanIcon width={14} height={18} color="#C00707" />
											</div>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr className="h-[250px]">
								<td colSpan={5}>
									<div className="flex flex-col justify-center items-center text-white">
										<h1 className="text-3xl font-black">NO DATA</h1>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="flex justify-end items-center mt-4 gap-2">
					<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
						<LeftChevronIcon width={20} height={20} color="white" />
					</button>
					<div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
						<select className="bg-none p-0">
							<option className="bg-none p-0">1</option>
						</select>
					</div>
					<p className="text-white">of 1</p>
					<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
						<LeftChevronIcon width={20} height={20} color="white" />
					</button>
				</div>
			</section>

			<EventPopUp
				open={eventPopUp}
				close={() => setEventPopUp(false)}
				save={handleSubmitEvent}
			/>

			{eventDetailData && (
				<EventDetailPopUp
					open={eventDetailPopUp}
					close={() => setEventDetailPopUp(false)}
					save={handleUpdateEvent}
					data={eventDetailData}
					index={index}
				/>
			)}
		</>
	);
}
