import { FormEvent, useEffect, useRef, useState } from "react";
import { ApprovedIcon } from "../icons/approvedIcon";
import { ClockIcon } from "../icons/clockIcon";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { UploadIcon } from "../icons/uploadIcon";
import { PencilIcon } from "../icons/pencilIcon";
import Dropzone from "react-dropzone";
import { Sketch } from "@uiw/react-color";
import DangerPopUp from "../dialog/dangerPopUp";
import WarningPopUp from "../dialog/warningPopUp";
import InputField from "../adminComponents/inputField";
import TextAreaField from "../adminComponents/textAreaField";

type AboutUsDataProps = {
	title: string;
	color: string;
	description: string;
	instagram: string;
	email: string;
	linkedin: string;
	image: string;
};

type AboutUsPopUpProps = {
	open: boolean;
	close: () => void;
	save: (aboutUsData: AboutUsDataProps) => void;
};

export default function AboutUsPopUp({ open, close, save }: AboutUsPopUpProps) {
	const [title, setTitle] = useState<string>("");
	const [color, setColor] = useState<string>("#ffffff");
	const [colorPicker, setColorPicker] = useState<boolean>(false);
	const colorPickerRef = useRef<HTMLDivElement>(null);
	const [description, setDescription] = useState<string>("");
	const [instagram, setInstagram] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [linkedin, setLinkedin] = useState<string>("");
	const [imageFileName, setImageFileName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete =
		title && color && description && instagram && email && linkedin && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState<boolean>(false);
	const [editColor, setEditColor] = useState<boolean>(false);
	const [editDescription, setEditDescription] = useState<boolean>(false);
	const [editInstagram, setEditInstagram] = useState<boolean>(false);
	const [editEmail, setEditEmail] = useState<boolean>(false);
	const [editLinkedin, setEditLinkedin] = useState<boolean>(false);
	const [editImage, setEditImage] = useState<boolean>(false);
	const [hex, setHex] = useState("#ffffff");

	const [warningPopUp, setWarningPopUp] = useState<boolean>(false);
	const [warningPopUpDescription, setWarningPopUpDescription] =
		useState<string>("");

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				colorPickerRef.current &&
				!colorPickerRef.current.contains(event.target as Node)
			) {
				setColorPicker(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setColor(hex);
	}, [hex]);

	function resetForm() {
		setTitle("");
		setColor("#ffffff");
		setHex("#ffffff");
		setDescription("");
		setInstagram("");
		setEmail("");
		setLinkedin("");
		setPreview("");
		setSubmited(null);
		setEditTitle(false);
		setEditColor(false);
		setEditDescription(false);
		setEditInstagram(false);
		setEditEmail(false);
		setEditLinkedin(false);
		setEditImage(false);
	}

	function handleColorChange(newHex: string) {
		setHex(newHex);
		setColor(newHex);
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

	function validateEmail(email: string) {
		return String(email).match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submited == null) {
			setSubmited("submit");
			setEditTitle(true);
			setEditColor(true);
			setEditDescription(true);
			setEditInstagram(true);
			setEditEmail(true);
			setEditLinkedin(true);
			setEditImage(true);
		} else if (submited == "submit") {
			const aboutUsData: AboutUsDataProps = {
				title,
				color,
				description,
				instagram,
				email,
				linkedin,
				image: preview,
			};

			if (!validateUrl(instagram)) {
				setWarningPopUp(true);
				setWarningPopUpDescription("Invalid Instagram URL");
			} else if (!validateEmail(email)) {
				setWarningPopUp(true);
				setWarningPopUpDescription("Invalid Email Format");
			} else if (!validateUrl(linkedin)) {
				setWarningPopUp(true);
				setWarningPopUpDescription("Invalid Linkedin URL");
			} else {
				save(aboutUsData);
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
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-16 2xl:px-20">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-sm sm:text-xl md:text-2xl font-semibold">About Us</h1>
					<div
						onClick={() =>
							title || description || instagram || email || linkedin || preview
								? setDangerPopUp(true)
								: close()
						}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</div>
				</div>
				<div className="bg-neutral-900 px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<div className="flex justify-between items-start">
						<div
							className={`flex items-center border-[2px] ${
								submited == "save" ? "border-lime-900" : "border-orange-400"
							} py-[10px] px-[16px] rounded-[20px] gap-x-[8px]`}>
							{submited == "save" ? (
								<ApprovedIcon width={16} height={16} color="#84CC16" />
							) : (
								<ClockIcon width={14} height={14} color="#FB923C" />
							)}
							<p
								className={`text-xs font-bold ${
									submited == "save" ? "text-lime-500" : "text-orange-400"
								}`}>
								{submited == "save" ? "Approved" : "Waiting"}
							</p>
						</div>
						<InformationIcon width={20} height={20} color="white" />
					</div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
								<div className="col-span-12 sm:col-span-8 md:col-span-9 flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Title"
										inputPlaceholder="Enter Title"
										setData={setTitle}
										setEditData={setEditTitle}
										editData={editTitle}
										submited={`${submited}`}
									/>
								</div>
								<div className="col-span-12 sm:col-span-4 md:col-span-3 flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Color
									</label>
									<div className="flex items-center gap-x-[10px] relative">
										<div
											onClick={() => setColorPicker(!colorPicker)}
											className="w-[30px] h-[25px] cursor-pointer border border-neutral-700"
											style={{ backgroundColor: hex }}></div>
										<input
											value={hex}
											onChange={(e) => handleColorChange(e.target.value)}
											className={`w-full text-xs sm:text-base font-normal border ${
												editColor
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Hex code"
											disabled={editColor}
										/>
										{colorPicker && !editColor && (
											<div
												ref={colorPickerRef}
												className="absolute z-10 top-full left-0 mt-2">
												<Sketch
													color={hex}
													onChange={(color) => {
														handleColorChange(color.hex);
													}}
													disableAlpha={true}
													presetColors={[]}
												/>
											</div>
										)}
										{submited == "submit" && (
											<div
												onClick={() => setEditColor(!editColor)}
												className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
							</li>
							<li className="w-full gap-x-[40px]">
								<div className="relative flex flex-col gap-y-[6px]">
									<TextAreaField
										textAreaLabel="Organization Description"
                    textAreaPlaceholder="Event Description"
										setData={setDescription}
										setEditData={setEditDescription}
										editData={editDescription}
										submited={`${submited}`}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Instagram
									</label>
									<div className="flex items-center">
										<input
											onChange={(e) => setInstagram(e.target.value)}
											className={`w-full text-xs sm:text-base font-normal border ${
												editInstagram
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="https://instagram.com/example"
											disabled={editInstagram}
										/>
										{submited == "submit" && (
											<div
												onClick={() => setEditInstagram(!editInstagram)}
												className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
								<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Email
									</label>
									<div className="flex items-center">
										<input
											onChange={(e) => setEmail(e.target.value)}
											className={`w-full text-xs sm:text-base font-normal border ${
												editEmail
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="example@gmail.com"
											disabled={editEmail}
										/>
										{submited == "submit" && (
											<div
												onClick={() => setEditEmail(!editEmail)}
												className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
								<div className="relative col-span-12 lg:col-span-4 flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Linkedin
									</label>
									<div className="flex items-center">
										<input
											onChange={(e) => setLinkedin(e.target.value)}
											className={`w-full text-xs sm:text-base font-normal border ${
												editLinkedin
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="https://linkedin.com/in/example"
											disabled={editLinkedin}
										/>
										{submited == "submit" && (
											<div
												onClick={() => setEditLinkedin(!editLinkedin)}
												className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								{!editImage && (
									<div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-8 flex flex-col gap-y-[6px]">
										<label className="text-xs sm:text-base font-bold" htmlFor="">
											Upload Logo
										</label>
										<div className="flex items-center justify-center w-full">
											<Dropzone onDrop={(file) => handleImage(file)}>
												{({ getRootProps, getInputProps }) => (
													<label
														{...getRootProps()}
														htmlFor="dropzone-file"
														className="flex flex-col items-center justify-center w-full h-40 border-2 border-neutral-400 border-dashed rounded-lg cursor-pointer">
														<div className="flex flex-col items-center justify-center pt-5 pb-6">
															<UploadIcon color="white" />
															<p className="mb-2 text-xs sm:text-sm text-white">
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
										Logo Preview
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
												onClick={() => {
													setEditImage(!editImage);
													setPreview("");
												}}
												className="cursor-pointer absolute right-2 top-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
								{preview && (
									<div className="col-span-12 sm:col-span-3 lg:col-span-2 flex flex-col gap-y-[6px]">
										<label className="hidden md:block text-transparent" htmlFor="">
											lorem
										</label>
										{submited !== "submit" && (
											<div className="flex justify-between items-center bg-[#270081] px-[15px] py-[6px] rounded-[8px]">
												<p className="text-xs">{imageFileName}</p>
												<ExitIcon onClick={() => setPreview("")} size={10} />
											</div>
										)}
									</div>
								)}
							</li>
						</ul>
						<div className="flex gap-x-[10px] sm:gap-x-[20px]">
							<div
								onClick={() => submited == "submit" && setDangerPopUp(!dangerPopUp)}
								className={`w-[80px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
									submited == "submit" && "cursor-pointer border border-rose-800"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == "submit" && "Delete"}
							</div>
							<button
								type={`${formComplete ? "submit" : "button"}`}
								className={`w-[200px] sm:w-[300px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
									formComplete
										? "cursor-pointer border border-white text-white"
										: "cursor-not-allowed border border-gray-700 text-gray-700"
								} px-[24px] py-[14px] rounded-full`}>
								Save & Request Approval
							</button>
						</div>
					</form>
				</div>
			</div>

			<WarningPopUp
				open={warningPopUp}
				close={() => setWarningPopUp(false)}
				title="Warning!"
				message={warningPopUpDescription}
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
