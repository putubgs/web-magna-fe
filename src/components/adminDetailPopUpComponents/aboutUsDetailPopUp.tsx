import { FormEvent, useEffect, useState } from "react";
import { ApprovedIcon } from "../icons/approvedIcon";
import { ClockIcon } from "../icons/clockIcon";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { UploadIcon } from "../icons/uploadIcon";
import { PencilIcon } from "../icons/pencilIcon";
import Dropzone from "react-dropzone";

type AboutUsDataProps = {
	title: string;
	color: string;
	description: string;
	instagram: string;
	email: string;
	linkedin: string;
	image: string;
};

type AddAboutUsPopUpProps = {
	open: boolean;
	close: () => void;
	save: (aboutUsData: AboutUsDataProps, index: number) => void;
	data: AboutUsDataProps[];
	index: number;
};

export default function AboutUsDetailPopUp({
	open,
	close,
	save,
	data,
	index,
}: AddAboutUsPopUpProps) {
	const [title, setTitle] = useState<string>("");
	const [color, setColor] = useState<string>("#ffffff");
	const [description, setDescription] = useState<string>("");
	const [instagram, setInstagram] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [linkedin, setLinkedin] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const [submited, setSubmited] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState<boolean>(true);
	const [editDescription, setEditDescription] = useState<boolean>(true);
	const [editInstagram, setEditInstagram] = useState<boolean>(true);
	const [editEmail, setEditEmail] = useState<boolean>(true);
	const [editLinkedin, setEditLinkedin] = useState<boolean>(true);
	const [editImage, setEditImage] = useState<boolean>(true);

	useEffect(() => {
		if (data && data.length > 0) {
			setTitle(data[0].title);
			setColor(data[0].color);
			setDescription(data[0].description);
			setInstagram(data[0].instagram);
			setEmail(data[0].email);
			setLinkedin(data[0].linkedin);
			setPreview(data[0].image);
		}
	}, [data, open]);

	function resetState() {
		setEditTitle(true);
		setEditDescription(true);
		setEditInstagram(true);
		setEditEmail(true);
		setEditLinkedin(true);
		setEditImage(true);
		setSubmited(null);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setPreview(URL.createObjectURL(image));
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const editAboutUsData: AboutUsDataProps = {
			title,
			color,
			description,
			instagram,
			email,
			linkedin,
			image: preview || data[0].image,
		};

		save(editAboutUsData, index);
		setSubmited("save");

		resetState();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-start-4 col-end-10 rounded-t-[6px]">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-2xl font-semibold">About Us</h1>
					<button
						onClick={() => {
							resetState();
							close();
						}}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</button>
				</div>
				<div className="bg-neutral-900 px-[36px] py-[24px] space-y-[32px]">
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
							<li className="grid grid-cols-12 gap-x-[40px]">
								<div className="col-span-10 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Title
									</label>
									<div className="relative flex justify-end items-center">
										<input
											onChange={(e) => setTitle(e.target.value)}
											defaultValue={data[0].title}
											className={`w-full text-base font-normal border ${
												editTitle
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Enter the title"
											disabled={editTitle}
										/>
										{submited == null && (
											<div
												onClick={() => setEditTitle(!editTitle)}
												className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
								<div className="col-span-2 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Color
									</label>
									<div className="flex items-center gap-x-[10px]">
										<input
											onChange={(e) => setColor(e.target.value)}
											className="w-[32px] h-[32px]"
											type="color"
											defaultValue={data[0].color}
										/>
										<label className="text-base" htmlFor="">
											{data[0].color}
										</label>
									</div>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-x-[40px]">
								<div className="relative col-span-12 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Organization Description
									</label>
									<textarea
										onChange={(e) => setDescription(e.target.value)}
										className={`text-base font-normal border ${
											editDescription
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										placeholder="Event Description"
										disabled={editDescription}
										name=""
										id="">
										{data[0].description}
									</textarea>
									{submited == null && (
										<div
											onClick={() => setEditDescription(!editDescription)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
							</li>
							<li className="grid grid-cols-12 gap-x-[20px]">
								<div className="relative col-span-4 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Instagram
									</label>
									<input
										onChange={(e) => setInstagram(e.target.value)}
										defaultValue={data[0].instagram}
										className={`text-base font-normal border ${
											editInstagram
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="text"
										placeholder="Instagram"
										disabled={editInstagram}
									/>
									{submited == null && (
										<div
											onClick={() => setEditInstagram(!editInstagram)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
								<div className="relative col-span-4 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Email
									</label>
									<input
										onChange={(e) => setEmail(e.target.value)}
										defaultValue={data[0].email}
										className={`text-base font-normal border ${
											editEmail
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="text"
										placeholder="Email"
										disabled={editEmail}
									/>
									{submited == null && (
										<div
											onClick={() => setEditEmail(!editEmail)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px]">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
								<div className="relative col-span-4 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Linkedin
									</label>
									<input
										onChange={(e) => setLinkedin(e.target.value)}
										defaultValue={data[0].linkedin}
										className={`text-base font-normal border ${
											editLinkedin
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										type="text"
										placeholder="Linkedin"
										disabled={editLinkedin}
									/>
									{submited == null && (
										<div
											onClick={() => setEditLinkedin(!editLinkedin)}
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
											Upload Logo
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
										Logo Preview
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
