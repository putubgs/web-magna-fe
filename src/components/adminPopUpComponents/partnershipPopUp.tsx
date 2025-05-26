import Dropzone from "react-dropzone";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { UploadIcon } from "../icons/uploadIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { FormEvent, useState } from "react";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";

type PartnershipProps = {
	partnerName: string;
	image: string;
};

type PartnershipPopUpProps = {
	open: boolean;
	close: () => void;
	save: (PartnerData: PartnershipProps) => void;
};

export default function PartnershipPopUp({
	open,
	close,
	save,
}: PartnershipPopUpProps) {
	const [partnerName, setPartnerName] = useState<string>("");
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete = partnerName && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editPartnerName, setEditPartnerName] = useState<boolean>(false);
	const [editImage, setEditImage] = useState<boolean>(false);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	function resetForm() {
		setPartnerName("");
		setImageFileName("");
		setPreview("");
		setSubmited(null);
		setEditPartnerName(false);
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
			setEditPartnerName(true);
			setEditImage(true);
		} else if (submited == "submit") {
			const partnershipData: PartnershipProps = {
				partnerName,
				image: preview,
			};

			save(partnershipData);
			resetForm();
			close();
		}
	}

	function handleDelete() {
		resetForm();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-16">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
						Partnership
					</h1>
					<div
						onClick={() => (partnerName || preview ? setDangerPopUp(true) : close())}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</div>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<InformationIcon width={20} height={20} color="white" />
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="gap-x-[40px]">
								<div className="relative w-full flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Partner Name"
										inputPlaceholder="Enter the partner name"
										setData={setPartnerName}
										setEditData={setEditPartnerName}
										editData={editPartnerName}
										submited={`${submited}`}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								{!editImage && (
									<div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-7 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Upload Partnership Logo
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
										submited == "submit"
											? "col-span-12 sm:col-span-4 md:col-span-3 2xl:col-span-2"
											: "col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2"
									} flex flex-col gap-y-[6px]`}>
									<label className="text-xs sm:text-base font-bold" htmlFor="">
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
												className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
								{preview && (
									<div className="col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3 flex flex-col gap-y-[6px]">
										<label className="hidden md:block text-transparent" htmlFor="">
											lorem
										</label>
										{!submited && (
											<div className="flex justify-between items-center bg-[#270081] px-[15px] py-[6px] rounded-[8px]">
												<p className="text-xs">{imageFileName}</p>
												<ExitIcon onClick={() => setPreview("")} size={10} />
											</div>
										)}
									</div>
								)}
							</li>
						</ul>
						<div className="flex gap-x-[20px]">
							<div
								onClick={() => submited == "submit" && setDangerPopUp(!dangerPopUp)}
								className={`w-[80px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
									submited == "submit" && "cursor-pointer border border-rose-800"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == "submit" && "Delete"}
							</div>
							<button
								type={`${formComplete ? "submit" : "button"}`}
								className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
									formComplete
										? "cursor-pointer border border-white text-white"
										: "cursor-not-allowed border border-gray-700 text-gray-700"
								} px-[24px] py-[14px] rounded-full`}>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>

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
