import { FormEvent, useEffect, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";
import DangerPopUp from "../dialog/dangerPopUp";

type TestimoniDataProps = {
	name: string;
	position: string;
	testimoni: string;
};

type TestimoniPopUpProps = {
	open: boolean;
	close: () => void;
	save: (TestimoniData: TestimoniDataProps, index: number) => void;
	delete: (index: number) => void;
	data: TestimoniDataProps[];
	index: number;
};

export default function TestimoniDetailPopUp({
	open,
	close,
	save,
	delete: deleteData,
	data,
	index,
}: TestimoniPopUpProps) {
	const [name, setName] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [testimoni, setTestimoni] = useState<string>("");
	const formComplete = name && position && testimoni;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editName, setEditName] = useState<boolean>(true);
	const [editPosition, setEditPosition] = useState<boolean>(true);
	const [editTestimoni, setEditTestimoni] = useState<boolean>(true);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	useEffect(() => {
		if (data && data.length > 0) {
			setName(data[0].name);
			setPosition(data[0].position);
			setTestimoni(data[0].testimoni);
		}
	}, [data, open]);

	function resetState() {
		setEditName(true);
		setEditPosition(true);
		setEditTestimoni(true);
		setSubmited(null);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const editTestimoniData: TestimoniDataProps = {
			name,
			position,
			testimoni,
		};

		save(editTestimoniData, index);
		setSubmited("save");

		resetState();
		close();
	}

	function handleDangerPopUp() {
		setDangerPopUp(true);
	}

	function handleDelete() {
		deleteData(index);
		resetState();
		close();
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 items-center bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-28">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">Testimoni</h1>
					<button
						onClick={() => {
							resetState();
							close();
						}}
						className="cursor-pointer border border-white rounded-[4px] p-2">
						<ExitIcon size={13} />
					</button>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<InformationIcon width={20} height={20} color="white" />
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]">
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[20px] sm:space-y-[40px]">
							<li className="w-full flex flex-col sm:flex-row gap-[20px] sm:gap-[40px]">
								<div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Name
									</label>
									<div className="flex items-center">
										<input
											onChange={(e) => setName(e.target.value)}
											defaultValue={data[0].name}
											className={`w-full text-xs sm:text-base font-normal border ${
												editName
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Name"
											disabled={editName}
										/>
										{submited == null && (
											<div
												onClick={() => setEditName(!editName)}
												className="cursor-pointer absolute right-1 sm:right-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
								<div className="relative w-full sm:w-[50%] flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Position / instution
									</label>
									<div className="flex items-center">
										<input
											onChange={(e) => setPosition(e.target.value)}
											defaultValue={data[0].position}
											className={`w-full text-xs sm:text-base font-normal border ${
												editPosition
													? "bg-neutral-800 border-transparent"
													: "bg-transparent border-neutral-500"
											} px-[12px] py-[8px] rounded-[4px] outline-none`}
											type="text"
											placeholder="Position"
											disabled={editPosition}
										/>
										{submited == null && (
											<div
												onClick={() => setEditPosition(!editPosition)}
												className="cursor-pointer absolute right-1 sm:right-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
												<p className="text-xs text-neutral-400">Edit</p>
												<PencilIcon width={14} height={14} color="#A3A3A3" />
											</div>
										)}
									</div>
								</div>
							</li>
							<li className="w-full gap-x-[40px]">
								<div className="relative w-full flex flex-col gap-y-[6px]">
									<label className="text-xs sm:text-base font-bold" htmlFor="">
										Testimoni
									</label>
									<textarea
										onChange={(e) => setTestimoni(e.target.value)}
										className={`w-full h-28 md:h-20 text-xs sm:text-base font-normal border ${
											editTestimoni
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px] outline-none`}
										placeholder="Testimoni"
										name=""
										id=""
										disabled={editTestimoni}>
										{data[0].testimoni}
									</textarea>
									{submited == null && (
										<div
											onClick={() => setEditTestimoni(!editTestimoni)}
											className="cursor-pointer absolute right-1 sm:right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
							</li>
						</ul>
						<div className="flex gap-x-[20px]">
							<div
								onClick={() => submited == null && handleDangerPopUp()}
								className={`w-[80px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base text-rose-800 ${
									submited == null && "cursor-pointer border border-rose-800"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == null && "Delete"}
							</div>
							<button
								type={`${formComplete ? "submit" : "button"}`}
								className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[50px] flex justify-center items-center text-xs sm:text-base ${
									submited == null && formComplete
										? "cursor-pointer border border-white text-white"
										: "cursor-not-allowed border border-gray-700 text-gray-700"
								} px-[24px] py-[14px] rounded-full`}>
								{submited == null && "Save"}
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
