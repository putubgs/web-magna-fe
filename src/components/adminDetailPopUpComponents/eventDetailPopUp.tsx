import { FormEvent, useEffect, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { UploadIcon } from "../icons/uploadIcon";
import { PencilIcon } from "../icons/pencilIcon";
import Dropzone from "react-dropzone";

type EventDataProps = {
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
	save: (EventData: EventDataProps, index: number) => void;
	data: EventDataProps[];
	index: number;
};

export default function EventDetailPopUp({
	open,
	close,
	save,
	data,
	index,
}: EventPopUpProps) {
	const [togel, setTogel] = useState<boolean>(false);
	const [eventName, setEventName] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");
	const [registrationUrl, setRegistrationUrl] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [eventDescription, setEventDescription] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const [submited, setSubmited] = useState<string | null>(null);
	const [editEventName, setEditEventName] = useState<boolean>(true);
	const [editDate, setEditDate] = useState<boolean>(true);
	const [editStartTime, setEditStartTime] = useState<boolean>(true);
	const [editEndTime, setEditEndTime] = useState<boolean>(true);
	const [editRegistrationUrl, setEditRegistrationUrl] = useState<boolean>(true);
	const [editStartDate, setEditStartDate] = useState<boolean>(true);
	const [editEndDate, setEditEndDate] = useState<boolean>(true);
	const [editEventDescription, setEditEventDescription] =
		useState<boolean>(true);
	const [editImage, setEditImage] = useState<boolean>(true);

	useEffect(() => {
		if (data && data.length > 0) {
			setEventName(data[0].eventName);
			setDate(data[0].date);
			setStartTime(data[0].startTime);
			setEndTime(data[0].endTime);
			setRegistrationUrl(data[0].registrationUrl ?? "");
			setStartDate(data[0].startDate ?? "");
			setEndDate(data[0].endDate ?? "");
			setEventDescription(data[0].eventDescription ?? "");
			setPreview(data[0].image);
		}
	}, [data, open]);

	function resetState() {
		setEditEventName(true);
		setEditDate(true);
		setEditStartTime(true);
		setEditEndTime(true);
		setEditRegistrationUrl(true);
		setEditStartDate(true);
		setEditEndDate(true);
		setEditEventDescription(true);
		setEditImage(true);
		setSubmited(null);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setPreview(URL.createObjectURL(image));
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const editEventData: EventDataProps = {
			eventName,
			date,
			startTime,
			endTime,
			registrationUrl,
			startDate,
			endDate,
			eventDescription,
			image: preview || data[0].image,
		};

		save(editEventData, index);
		setSubmited("save");

		resetState();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-start-4 col-end-10 rounded-t-[6px]">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-2xl font-semibold">Upcoming Event</h1>
					<button
						onClick={() => {
							resetState();
							close();
						}}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</button>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-[36px] py-[24px] space-y-[32px]">
					<InformationIcon width={20} height={20} color="white" />
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="grid grid-cols-12 gap-x-[40px]">
								<div className="relative col-span-12 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Event Name
									</label>
									<input
										onChange={(e) => setEventName(e.target.value)}
										value={eventName}
										className={`w-full text-base font-normal border ${
											editEventName
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="text"
										placeholder="Enter the title"
										disabled={editEventName}
									/>
									{submited == null && (
										<div
											onClick={() => setEditEventName(!editEventName)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
							</li>
							<li className="grid grid-cols-12 gap-x-[20px]">
								<div className="relative col-span-6 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Date
									</label>
									<input
										onChange={(e) => setDate(e.target.value)}
										value={date}
										className={`cursor-pointer scheme-dark border ${
											editDate
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="date"
										disabled={editDate}
									/>
									{submited == null && (
										<div
											onClick={() => setEditDate(!editDate)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
								<table className="col-span-6">
									<thead>
										<tr>
											<td className="w-[50%]">Start Time</td>
											<td className="px-5"></td>
											<td className="w-[50%]">End Time</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="relative w-[50%]">
												<input
													onChange={(e) => setStartTime(e.target.value)}
													value={startTime}
													className={`cursor-pointer w-full scheme-dark border ${
														editStartTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-[12px] py-[8px] rounded-[4px] outline-none`}
													type="time"
													disabled={editStartTime}
												/>
												{submited == null && (
													<div
														onClick={() => setEditStartTime(!editStartTime)}
														className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
														<p className="text-xs text-neutral-400">Edit</p>
														<PencilIcon width={14} height={14} color="#A3A3A3" />
													</div>
												)}
											</td>
											<td className="px-5">-</td>
											<td className="relative w-[50%]">
												<input
													onChange={(e) => setEndTime(e.target.value)}
													value={endTime}
													className={`cursor-pointer w-full scheme-dark border ${
														editEndTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-[12px] py-[8px] rounded-[4px] outline-none`}
													type="time"
												/>
												{submited == null && (
													<div
														onClick={() => setEditEndTime(!editEndTime)}
														className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
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
									className={`w-[60px] h-[30px] ${
										!togel ? "bg-[#270081]" : "bg-neutral-400"
									} flex items-center rounded-full px-[5px] relative cursor-pointer`}>
									<div
										className={`absolute left-[5px] w-[21px] h-[21px] bg-white rounded-full transition-all duration-300 ${
											togel ? "translate-x-0" : "translate-x-[30px]"
										}`}></div>
								</div>
								<p className="text-base font-bold">Registration Informations</p>
							</li>
							{!togel && (
								<li className="grid grid-cols-12 gap-x-[20px]">
									<div className="relative col-span-6 flex flex-col gap-y-[6px]">
										<label className="text-base font-bold" htmlFor="">
											Registration Url
										</label>
										<input
											onChange={(e) => setRegistrationUrl(e.target.value)}
											value={registrationUrl}
											className={`text-base font-normal border ${
												editRegistrationUrl
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Enter the Registration Url"
											disabled={editRegistrationUrl}
										/>
										{submited == null && (
											<div
												onClick={() => setEditRegistrationUrl(!editRegistrationUrl)}
												className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
									<table className="col-span-6">
										<thead>
											<tr>
												<td className="w-[50%]">Start Date</td>
												<td className="px-5"></td>
												<td className="w-[50%]">End Date</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="relative">
													<input
														onChange={(e) => setStartDate(e.target.value)}
														value={startDate}
														className={`cursor-pointer w-full scheme-dark border ${
															editStartDate
																? "bg-neutral-800 border-transparent"
																: "bg-transparent border-neutral-500"
														} px-[12px] py-[8px] rounded-[4px]`}
														type="date"
														disabled={editStartDate}
													/>
													{submited == null && (
														<div
															onClick={() => setEditStartDate(!editStartDate)}
															className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
															<p className="text-xs text-neutral-400">Edit</p>
															<PencilIcon width={14} height={14} color="#A3A3A3" />
														</div>
													)}
												</td>
												<td className="px-5">-</td>
												<td className="relative">
													<input
														onChange={(e) => setEndDate(e.target.value)}
														className={`cursor-pointer w-full scheme-dark border ${
															editEndDate
																? "bg-neutral-800 border-transparent"
																: "bg-transparent border-neutral-500"
														} px-[12px] py-[8px] rounded-[4px] outline-none`}
														type="date"
														disabled={editEndDate}
													/>
													{submited == null && (
														<div
															onClick={() => setEditEndDate(!editEndDate)}
															className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
															<p className="text-xs text-neutral-400">Edit</p>
															<PencilIcon width={14} height={14} color="#A3A3A3" />
														</div>
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</li>
							)}
							<li className="grid grid-cols-12 gap-x-[40px]">
								<div className="relative col-span-12 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Event Description
									</label>
									<textarea
										onChange={(e) => setEventDescription(e.target.value)}
										className={`text-base font-normal border ${
											editEventDescription
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										placeholder="Event Description"
										disabled={editEventDescription}
										name=""
										id="">
										{data[0].eventDescription}
									</textarea>
									{submited == null && (
										<div
											onClick={() => setEditEventDescription(!editEventDescription)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
							</li>
							<li className="grid grid-cols-12 gap-x-[20px]">
								{!editImage && (
									<div className="col-span-8 flex flex-col gap-y-[6px]">
										<label className="text-base font-bold" htmlFor="">
											Upload Poster
										</label>
										<div className="flex items-center justify-center w-full">
											<Dropzone onDrop={(file) => handleImage(file)}>
												{({ getRootProps, getInputProps }) => (
													<label
														{...getRootProps()}
														htmlFor="dropzone-file"
														className="flex flex-col items-center justify-center w-full h-40   border-2 border-neutral-400 border-dashed rounded-lg cursor-pointer">
														<div className="flex flex-col items-center justify-center pt-5 pb-6">
															<UploadIcon color="white" />
															<p className="mb-2 text-sm text-white">
																Drag & drop <span className="font-semibold">or browse</span>
															</p>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																JPG, PNG, or SVG | MAX 10 mb
															</p>
														</div>
														<input {...getInputProps()} className="hidden" />
													</label>
												)}
											</Dropzone>
										</div>
									</div>
								)}
								<div
									className={`${
										submited == null ? "col-span-3" : "col-span-2"
									} flex flex-col gap-y-[6px]`}>
									<label className="text-base font-bold" htmlFor="">
										Image Preview
									</label>
									<div
										className={`relative h-40 flex justify-center items-center  ${
											!preview && "border-2 border-neutral-400 border-dashed"
										} rounded-lg`}>
										{editImage ? (
											<img
												className="w-full h-full object-cover rounded-[8px]"
												src={data[0].image}
												alt=""
											/>
										) : (
											<p className="text-xs text-center px-7">No Image To Preview</p>
										)}
										{editImage && (
											<div
												onClick={() => setEditImage(!editImage)}
												className="cursor-pointer absolute right-2 top-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
							</li>
						</ul>
						<div className="flex gap-x-[20px]">
							<button
								onClick={() => {
									resetState();
									close();
								}}
								type="submit"
								className={`cursor-pointer w-[150px] h-[50px] text-rose-800 ${
									submited == null && "border border-rose-800"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == null && "Delete"}
							</button>
							<button
								type="submit"
								className={`cursor-pointer w-[300px] h-[50px] ${
									submited == null && "border border-white"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == null && "Save"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
