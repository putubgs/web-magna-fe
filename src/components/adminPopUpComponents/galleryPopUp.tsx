import Dropzone from "react-dropzone";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { UploadIcon } from "../icons/uploadIcon";
import { FormEvent, useState } from "react";

type GalleryProps = {
	eventName: string;
	date: string;
	image: string;
};

type GalleryPopUpProps = {
	open: boolean;
	close: () => void;
	save: (galleryData: GalleryProps) => void;
};

export default function GalleryPopUp({ open, close, save }: GalleryPopUpProps) {
	const [eventName, setEventName] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete = eventName && date && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editEventName, setEditEventName] = useState<boolean>(false);
	const [editDate, setEditDate] = useState<boolean>(false);
	const [editImage, setEditImage] = useState<boolean>(false);

	function resetForm() {
		setEventName("");
		setDate("");
		setPreview("");
		setSubmited(null);
		setEditEventName(false);
		setEditDate(false);
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
			setEditImage(true);
		} else if (submited == "submit") {
			const galleryData: GalleryProps = {
				eventName,
				date,
				image: preview,
			};

			save(galleryData);
			resetForm();
			close();
		}
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-start-4 col-end-10 rounded-t-[6px]">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-2xl font-semibold">Previous Event Gallery</h1>
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
						className="flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="grid grid-cols-12 gap-x-[20px]">
								<div className="relative col-span-6 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Event Name
									</label>
									<input
										onChange={(e) => setEventName(e.target.value)}
										className={`text-base font-normal border ${
											editEventName
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px]`}
										type="text"
										placeholder="Enter the Event Name"
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
								<div className="relative col-span-6 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Date
									</label>
									<input
										onChange={(e) => setDate(e.target.value)}
										className={`scheme-dark border ${
											editDate
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px]`}
										type="date"
									/>
									{submited && (
										<div
											onClick={() => setEditDate(!editDate)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
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
											Upload Image
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
						<button
							className={`cursor-pointer w-[150px] h-[50px] ${
								formComplete && "border border-white"
							} px-[24px] py-[14px] rounded-full`}>
							{formComplete && "Save"}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
