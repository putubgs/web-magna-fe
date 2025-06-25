import { ChevronDown, PencilIcon, Search } from "lucide-react";
import { AdminCalendarIcon } from "../icons/adminCalendarIcon";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { useEffect, useState } from "react";
import EventDetailPopUp from "../adminDetailPopUpComponents/eventDetailPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";
import DangerPopUp from "../dialog/dangerPopUp";

type SuperAdminEventManagementProps = {
	buName?: string;
	eventName?: string;
	date?: string;
	startTime: string;
	endTime: string;
	registrationUrl?: string;
	startDate?: string;
	endDate?: string;
	eventDescription: string;
	image: string;
};

type SuccessPopUpProps = {
	title: string;
	message: string;
};

export default function SuperAdminEventManagement() {
	const [
		superAdminEventManagementDetailPopUp,
		setSuperAdminEventManagementDetailPopUp,
	] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [
		superAdminEventManagementDetailData,
		setSuperAdminEventManagementDetailData,
	] = useState<SuperAdminEventManagementProps[] | null>(null);
	const [superAdminEventManagementData, setSuperAdminEventManagementData] =
		useState<SuperAdminEventManagementProps[]>([]);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		const eventData = localStorage.getItem("eventData");
		if (eventData) {
			const parsedData = JSON.parse(eventData);
			setSuperAdminEventManagementData(parsedData || []);
		}
	}, []);

	function handleUpdateEvent(
		updatedData: SuperAdminEventManagementProps,
		index: number
	) {
		setSuperAdminEventManagementDetailData((prev) => {
			if (!prev) return null;

			const currentData = prev[0];

			const compare = (
				current: string | undefined,
				updated: string | undefined
			): boolean => {
				const currentValue = current;
				const updatedValue = updated;
				return currentValue !== updatedValue;
			};

			const change =
				currentData.eventName !== updatedData.eventName ||
				currentData.date !== updatedData.date ||
				currentData.startTime !== updatedData.startTime ||
				currentData.endDate !== updatedData.endDate ||
				currentData.eventDescription !== updatedData.eventDescription ||
				currentData.image !== updatedData.image ||
				compare(currentData.registrationUrl, updatedData.registrationUrl) ||
				compare(currentData.startDate, updatedData.startDate) ||
				compare(currentData.endDate, updatedData.endDate);

			if (change) {
				setSuperAdminEventManagementData((prevMain) => {
					const newData = [...prevMain];
					newData[index] = updatedData;

					localStorage.setItem("eventData", JSON.stringify(newData));

					return newData;
				});

				const newDetailData = [updatedData];

				setSuccessPopUpComponent({
					title: "Event Updated!",
					message: "The event have been successfully updated",
				});

				setSuccessPopUp(true);

				return newDetailData;
			} else {
				return prev;
			}
		});
	}

	function handleDeleteEvent() {
		setSuperAdminEventManagementData((prev) => {
			const newData = [...prev];
			newData.splice(index, 1);

			localStorage.removeItem("eventData");

			return newData;
		});

		setDangerPopUp(false);
		setSuperAdminEventManagementDetailPopUp(false);

		setSuccessPopUpComponent({
			title: "Event Deleted!",
			message: "The event has been successfully deleted",
		});
		setSuccessPopUp(true);
	}

	function showDetail(index: number) {
		setIndex(index);
		setSuperAdminEventManagementDetailPopUp(true);

		if (superAdminEventManagementData && superAdminEventManagementData[index]) {
			setSuperAdminEventManagementDetailData([
				{
					buName: superAdminEventManagementData[index].buName,
					date: superAdminEventManagementData[index].date,
					eventName: superAdminEventManagementData[index].eventName,
					startTime: superAdminEventManagementData[index].startTime,
					endTime: superAdminEventManagementData[index].endTime,
					registrationUrl: superAdminEventManagementData[index].registrationUrl,
					startDate: superAdminEventManagementData[index].startDate,
					endDate: superAdminEventManagementData[index].endDate,
					eventDescription: superAdminEventManagementData[index].eventDescription,
					image: superAdminEventManagementData[index].image,
				},
			]);
		}
	}

	const getData = (): SuperAdminEventManagementProps[] => {
		try {
			const eventData = localStorage.getItem("eventData");

			if (!eventData || eventData === "") {
				return [];
			}

			const parsedData = JSON.parse(eventData);

			return Array.isArray(parsedData) ? parsedData : [];
		} catch {
			localStorage.removeItem("eventData");

			return [];
		}
	};

	const eventData = getData();

	return (
		<>
			<section className="bg-black border border-[#404040] p-[20px] rounded-[12px] space-y-[24px]">
				<section className="flex justify-between items-center">
					<h1 className="text-lg lg:text-2xl font-semibold">
						Event Management Panel
					</h1>
				</section>
				<section className="grid grid-cols-12 gap-x-[20px]">
					<div className="col-span-9 flex items-center bg-neutral-800 gap-[10px] p-[12px] rounded-[8px]">
						<Search />
						<input
							className="w-full h-full text-white placeholder-white outline-none"
							type="text"
							placeholder="Sarch"
						/>
					</div>
					<div className="col-span-1 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
						<p>Date</p>
						<AdminCalendarIcon className="w-5 h-5" color="#fff" />
					</div>
					<div className="col-span-2 bg-neutral-800 flex justify-center items-center gap-x-[10px] rounded-[8px]">
						<p>Organization</p>
						<ChevronDown />
					</div>
				</section>
			</section>
			<section className="overflow-scroll xl:overflow-auto h-full bg-black flex flex-col border border-[#404040] p-[28px] rounded-[20px] gap-[28px]">
				<h1 className="text-2xl font-semibold">Event</h1>
				<table className="table-auto w-[1000px] xl:w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">BU Name</th>
							<th className="text-base lg:text-lg font-bold py-3 px-10">Event Name</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Date</th>
							<th className="text-base lg:text-lg font-bold py-3 px-">Actions</th>
						</tr>
					</thead>
					<tbody className="relative">
						{eventData.length > 0 ? (
							eventData.map((data: SuperAdminEventManagementProps, index: number) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">
										{index + 1}
									</td>
									<td className="py-4 px-4 align-top text-sm font-medium">
										{data.buName}
									</td>
									<td className="py-4 px-10 align-top">
										<p className="text-base font-medium leading-tight">
											{data.eventName}
										</p>
									</td>
									<td className="py-4 px-0 align-top text-base font-normal whitespace-nowrap">
										{data.date}
									</td>
									<td className="py-4 px-4 align-top">
										<div className="flex items-center gap-x-[16px]">
											<div className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
												<div
													onClick={() => showDetail(index)}
													className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
													<PencilIcon width={18} height={18} color="#FF8800" />
												</div>
											</div>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr className="h-[250px]">
								<td colSpan={5}>
									<div className="flex flex-col justify-center items-center text-white">
										<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div
					className={`w-[1000px] xl:w-full ${
						superAdminEventManagementData && superAdminEventManagementData.length > 0
							? "flex"
							: "hidden"
					} justify-end items-center gap-2`}>
					<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
						<LeftChevronIcon width={23} height={23} color="white" />
					</button>
					<div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
						<select className="bg-none p-0">
							<option className="bg-none p-0">1</option>
						</select>
					</div>
					<p className="text-white">of 1</p>
					<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
						<LeftChevronIcon width={23} height={23} color="white" />
					</button>
				</div>
			</section>

			{superAdminEventManagementDetailData && (
				<EventDetailPopUp
					open={superAdminEventManagementDetailPopUp}
					close={() => setSuperAdminEventManagementDetailPopUp(false)}
					save={handleUpdateEvent}
					delete={handleDeleteEvent}
					data={superAdminEventManagementDetailData}
					index={index}
				/>
			)}

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDeleteEvent}
				title="Delete"
				message="Are you sure you want to delete this?"
			/>

			{successPopUpComponent && (
				<SuccessPopUp
					open={successPopUp}
					close={() => setSuccessPopUp(false)}
					onConfirm={() => setSuccessPopUp(false)}
					title={successPopUpComponent.title}
					message={successPopUpComponent.message}
				/>
			)}
		</>
	);
}
