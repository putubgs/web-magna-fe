import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { FormEvent, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import TimePicker from "../timePicker";
import DangerPopUp from "../dialog/dangerPopUp";
import WarningPopUp from "../dialog/warningPopUp";
import InputField from "../adminComponents/inputField";
import TextAreaField from "../adminComponents/textAreaField";
import ImageInputField from "../adminComponents/imageInputField";
import DeleteAndSaveButtonForAdd from "../adminComponents/deleteAndSaveButton";
import DateInputField from "../adminComponents/dateInputField";
import Toolip from "../toolip";

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

type EventPopUpProps = {
	open: boolean;
	close: () => void;
	save: (eventData: EventProps) => void;
};

export default function EventPopUp({ open, close, save }: EventPopUpProps) {
	const [toolip, setToolip] = useState<boolean>(false);

	const [togel, setTogel] = useState<boolean>(false);
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const [eventName, setEventName] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");
	const [registrationUrl, setRegistrationUrl] = useState<string>("");
	const [startDate, setStartDate] = useState<string>();
	const [endDate, setEndDate] = useState<string>();
	const [eventDescription, setEventDescription] = useState<string>("");
	const formComplete =
		eventName &&
		date &&
		startTime &&
		endTime &&
		eventDescription &&
		preview &&
		(togel || (registrationUrl && startDate && endDate));
	const [submited, setSubmited] = useState<string | null>(null);
	const [editEventName, setEditEventName] = useState<boolean>(false);
	const [editDate, setEditDate] = useState<boolean>(false);
	const [editStartTime, setEditStartTime] = useState<boolean>(false);
	const [editEndTime, setEditEndTime] = useState<boolean>(false);
	const [editRegistrationUrl, setEditRegistrationUrl] = useState<boolean>(false);
	const [editStartDate, setEditStartDate] = useState<boolean>(false);
	const [editEndDate, setEditEndDate] = useState<boolean>(false);
	const [editEventDescription, setEditEventDescription] =
		useState<boolean>(false);
	const [editImage, setEditImage] = useState<boolean>(false);

	const [datePickerPopUp, setDatePickerOpen] = useState<string>("");
	const [timePickerPopUp, setTimePickerOpen] = useState<string>("");

	const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
	const [warningPopUpDescription, setWarningPopUpDescription] =
		useState<string>("");

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const toolipData = [
		["Data", "Min", "Max"],
		[
			["Event Name", "-", "100 characters"],
			["Event Date", "-", "-"],
			["Registration Url", "-", "-"],
			["Registration Start Date", "-", "-"],
			["Registration End Date", "-", "-"],
			["Event Description", "-", "200 characters"],
			["Poster", "1 image", "1 image"],
		],
	];

	function resetForm() {
		setTogel(false);
		setEventName("");
		setDate("");
		setStartTime("");
		setEndTime("");
		setRegistrationUrl("");
		setStartDate(undefined);
		setEndDate(undefined);
		setEventDescription("");
		setPreview("");
		setSubmited(null);
		setEditEventName(false);
		setEditDate(false);
		setEditStartTime(false);
		setEditEndTime(false);
		setEditRegistrationUrl(false);
		setEditStartDate(false);
		setEditEndDate(false);
		setEditEventDescription(false);
		setEditImage(false);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setImageFileName(image.name);
		setPreview(URL.createObjectURL(image));
	}

	function validateUrl(url: string) {
		const pattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return !!pattern.test(url);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submited == null) {
			setSubmited("submit");
			setEditEventName(true);
			setEditDate(true);
			setEditStartTime(true);
			setEditEndTime(true);
			setEditRegistrationUrl(true);
			setEditStartDate(true);
			setEditEndDate(true);
			setEditEventDescription(true);
			setEditImage(true);
		} else if (submited == "submit") {
			const eventData: EventProps = {
				eventName,
				date,
				startTime,
				endTime,
				registrationUrl,
				eventDescription,
				startDate,
				endDate,
				image: preview,
			};

			if (!validateUrl(registrationUrl) && !togel) {
				setWarningPopUp(true);
				setWarningPopUpDescription("Invalid Registration URL");
			} else {
				save(eventData);
				resetForm();
				close();
			}
		}
	}

	function handleDelete() {
		resetForm();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-5">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
						Upcoming Event
					</h1>
					<div
						onClick={() =>
							eventName ||
							date ||
							startTime ||
							endTime ||
							eventDescription ||
							preview ||
							togel ||
							registrationUrl ||
							startDate ||
							endDate
								? setDangerPopUp(true)
								: close()
						}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</div>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<div
						onClick={() => setToolip(!toolip)}
						className="relative cursor-pointer">
						<InformationIcon width={20} height={20} color="white" />
						{toolip && (
							<Toolip toolipData={toolipData} onClose={() => setToolip(false)} />
						)}
					</div>
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="gap-x-[40px]">
								<div className="relative w-full flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Event Name"
										inputPlaceholder="Enter the event name"
										setData={setEventName}
										setEditData={setEditEventName}
										editData={editEventName}
										submited={`${submited}`}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								<div className="relative col-span-12 md:col-span-4 lg:col-span-6 flex flex-col gap-[6px]">
									<DateInputField
										setDatePickerOpen={setDatePickerOpen}
										setDatePickerOpenType="date"
										setDate={setDate}
										date={date}
										setEditDate={setEditDate}
										editDate={editDate}
										submited={submited}
										datePickerPopUp={datePickerPopUp}
										selectedDate={date}
										label="Date"
									/>
								</div>
								<table className="col-span-12 md:col-span-8 lg:col-span-6">
									<thead>
										<tr>
											<td className="w-[50%] text-xs sm:text-base font-bold">
												Start Time
											</td>
											<td className="px-2 sm:px-5"></td>
											<td className="w-[50%] text-xs sm:text-base font-bold">End Time</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="relative w-[50%]">
												<div
													onClick={() => setTimePickerOpen("startTime")}
													className={`cursor-pointer flex items-center h-full mt-[6px] rounded-[4px] border ${
														editStartTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
													<Calendar className="w-4 sm:w-7" color="#737373" />
													<p
														className={`w-full flex justify-between items-center text-xs sm:text-base ${
															startTime ? "text-white" : "text-neutral-500"
														}`}>
														{startTime
															? startTime.split(" ")[0] +
															  ":" +
															  startTime.split(" ")[1] +
															  startTime.split(" ")[2]
															: "Select A Time"}
														<ChevronDown />
													</p>
												</div>
												<TimePicker
													close={() => setTimePickerOpen("")}
													open={timePickerPopUp == "startTime" && !editStartTime}
													time={(value) => setStartTime(value)}
												/>
												{submited && (
													<div
														onClick={() => setEditStartTime(!editStartTime)}
														className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
														<p className="text-xs text-neutral-400">Edit</p>
														<PencilIcon width={14} height={14} color="#A3A3A3" />
													</div>
												)}
											</td>
											<td className="px-2 sm:px-5">-</td>
											<td className="relative w-[50%]">
												<div
													onClick={() => setTimePickerOpen("endTime")}
													className={`cursor-pointer flex items-center h-full mt-[6px] rounded-[4px] border ${
														editEndTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-2 sm:px-4 py-[4px] sm:py-[8px] gap-x-1 sm:gap-x-3`}>
													<Calendar className="w-4 sm:w-7" color="#737373" />
													<p
														className={`w-full flex justify-between items-center text-xs sm:text-base ${
															endTime ? "text-white" : "text-neutral-500"
														}`}>
														{endTime
															? endTime.split(" ")[0] +
															  ":" +
															  endTime.split(" ")[1] +
															  endTime.split(" ")[2]
															: "Select A Time"}
														<ChevronDown />
													</p>
												</div>
												<TimePicker
													close={() => setTimePickerOpen("")}
													open={timePickerPopUp == "endTime" && !editEndTime}
													time={(value) => setEndTime(value)}
												/>
												{submited && (
													<div
														onClick={() => setEditEndTime(!editEndTime)}
														className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
														<p className="text-xs text-neutral-400">Edit</p>
														<PencilIcon width={14} height={14} color="#A3A3A3" />
													</div>
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</li>
							<li className="flex items-center gap-x-[20px]">
								<div
									onClick={() => setTogel(!togel)}
									className={`w-[40px] sm:w-[60px] h-[20px] sm:h-[30px] ${
										!togel ? "bg-primary" : "bg-neutral-400"
									} flex items-center rounded-full px-[5px] relative cursor-pointer`}>
									<div
										className={`absolute left-[5px] w-[11px] sm:w-[21px] h-[11px] sm:h-[21px] bg-white rounded-full transition-all duration-300 ${
											togel ? "translate-x-0" : "translate-x-[20px] sm:translate-x-[30px]"
										}`}></div>
								</div>
								<p className="text-xs sm:text-base font-bold">
									Registration Informations
								</p>
							</li>
							{!togel && (
								<li className="grid grid-cols-12 gap-[20px]">
									<div className="relative col-span-12 md:col-span-4 lg:col-span-6 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Registration Url
										</label>
										<div className="flex items-center">
											<input
												onChange={(e) => setRegistrationUrl(e.target.value)}
												className={`w-full text-xs sm:text-base font-normal border ${
													editRegistrationUrl
														? "bg-neutral-800 border-transparent"
														: "bg-transparent border-neutral-500"
												} px-[12px] py-[8px] rounded-[4px] outline-none`}
												type="text"
												placeholder="Enter the Registration Url"
												disabled={editRegistrationUrl}
											/>
											{submited && (
												<div
													onClick={() => setEditRegistrationUrl(!editRegistrationUrl)}
													className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
													<p className="text-xs text-neutral-400">Edit</p>
													<PencilIcon width={14} height={14} color="#A3A3A3" />
												</div>
											)}
										</div>
									</div>
									<table className="col-span-12 md:col-span-8 lg:col-span-6">
										<thead>
											<tr>
												<td className="w-[50%] text-xs sm:text-base font-bold">
													Start Date
												</td>
												<td className="px-2 sm:px-5"></td>
												<td className="w-[50%] text-xs sm:text-base font-bold">End Date</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="relative">
													<DateInputField
														setDatePickerOpen={setDatePickerOpen}
														setDatePickerOpenType="startDate"
														setDate={setStartDate}
														date={startDate}
														setEditDate={setEditStartDate}
														editDate={editStartDate}
														submited={submited}
														datePickerPopUp={datePickerPopUp}
														selectedDate={date}
														selectedStartDate={startDate}
													/>
												</td>
												<td className="px-2 sm:px-5">-</td>
												<td className="relative">
													<DateInputField
														setDatePickerOpen={setDatePickerOpen}
														setDatePickerOpenType="endDate"
														setDate={setEndDate}
														date={endDate}
														setEditDate={setEditEndDate}
														editDate={editEndDate}
														submited={submited}
														datePickerPopUp={datePickerPopUp}
														selectedDate={date}
														selectedStartDate={startDate}
														selectedEndDate={endDate}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</li>
							)}
							<li className="w-full gap-x-[40px]">
								<div className="relative col-span-12 flex flex-col gap-y-[6px]">
									<TextAreaField
										textAreaLabel="Event Description"
										textAreaPlaceholder="Event Description"
										setData={setEventDescription}
										setEditData={setEditEventDescription}
										editData={editEventDescription}
										submited={`${submited}`}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								<ImageInputField
									type="add"
									setPreview={setPreview}
									preview={preview}
									handleImage={handleImage}
									imageFileName={imageFileName}
									setEditImage={setEditImage}
									editImage={editImage}
									submited={submited}
								/>
							</li>
						</ul>
						<DeleteAndSaveButtonForAdd
							submited={submited}
							formComplete={formComplete}
							handleDangerPopUp={() => setDangerPopUp(!dangerPopUp)}
							saveLabel="Save"
						/>
					</form>
				</div>
			</div>

			<WarningPopUp
				open={warningPopUp}
				close={() => setWarningPopUp(false)}
				title="Warning!"
				message={warningPopUpDescription}
				onConfirm={() => setWarningPopUp(false)}
			/>

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDelete}
				title="Delete"
				message="Are you sure you want to delete this?"
			/>
		</section>
	);
}
