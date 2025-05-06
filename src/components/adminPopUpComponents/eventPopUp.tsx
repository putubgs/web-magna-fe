import Dropzone from "react-dropzone";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { FormEvent, useState } from "react";
import { UploadIcon } from "../icons/uploadIcon";

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
	const [togel, setTogel] = useState<boolean>(false);
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const [eventName, setEventName] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");
	const [registrationUrl, setRegistrationUrl] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
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

	function resetForm() {
		setEventName("");
		setDate("");
		setStartTime("");
		setEndTime("");
		setRegistrationUrl("");
		setStartDate("");
		setEndDate("");
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
				startDate,
				endDate,
				eventDescription,
				image: preview,
			};

			save(eventData);
			resetForm();
			close();
		}
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-start-4 col-end-10 rounded-t-[6px]">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-2xl font-semibold">Upcoming Event</h1>
					<button
						onClick={() => {
							close();
							resetForm();
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
										className={`w-full text-base font-normal border ${
											editEventName
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="text"
										placeholder="Enter the title"
									/>
									{submited && (
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
										className={`cursor-pointer scheme-dark border ${
											editDate
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="date"
									/>
									{submited && (
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
													className={`cursor-pointer w-full scheme-dark border ${
														editStartTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-[12px] py-[8px] rounded-[4px] outline-none`}
													type="time"
												/>
												{submited && (
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
													className={`cursor-pointer w-full scheme-dark border ${
														editEndTime
															? "bg-neutral-800 border-transparent"
															: "bg-transparent border-neutral-500"
													} px-[12px] py-[8px] rounded-[4px] outline-none`}
													type="time"
												/>
												{submited && (
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
											className={`text-base font-normal border ${
												editRegistrationUrl
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Enter the Registration Url"
										/>
										{submited && (
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
														className={`cursor-pointer w-full scheme-dark border ${
															editStartDate
																? "bg-neutral-800 border-transparent"
																: "bg-transparent border-neutral-500"
														} px-[12px] py-[8px] rounded-[4px]`}
														type="date"
													/>
													{submited && (
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
													/>
													{submited && (
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
										name=""
										id=""></textarea>
									{submited && (
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
										submited ? "col-span-3" : "col-span-2"
									} flex flex-col gap-y-[6px]`}>
									<label className="text-base font-bold" htmlFor="">
										Image Preview
									</label>
									<div
										className={`relative h-40 flex justify-center items-center  ${
											!preview && "border-2 border-neutral-400 border-dashed"
										} rounded-lg`}>
										{preview ? (
											<img
												className="w-full h-full object-cover rounded-[8px]"
												src={preview}
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
								{preview && (
									<div className="col-span-2 flex flex-col gap-y-[6px]">
										<label className="text-transparent" htmlFor="">
											lorem
										</label>
										{!submited && (
											<div className="flex justify-between items-center bg-[#270081] px-[15px] py-[6px] rounded-[8px]">
												<p className="text-xs">{imageFileName}</p>
												<ExitIcon size={10} />
											</div>
										)}
									</div>
								)}
							</li>
						</ul>
						<div className="flex gap-x-[20px]">
							<button
								type="submit"
								className={`cursor-pointer w-[150px] h-[50px] text-rose-800 ${
									submited && "border border-rose-800"
								} px-[24px] py-[14px] rounded-full`}>
								{submited && "Delete"}
							</button>
							<button
								type="submit"
								className={`cursor-pointer w-[300px] h-[50px] ${
									formComplete && "border border-white"
								} px-[24px] py-[14px] rounded-full`}>
								{formComplete && "Save"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
