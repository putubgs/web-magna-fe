import { FormEvent, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import { PencilIcon } from "../icons/pencilIcon";

type TestimoniProps = {
	name: string;
	position: string;
	testimoni: string;
};

type TestimoniPopUpProps = {
	open: boolean;
	close: () => void;
	save: (testimoniData: TestimoniProps) => void;
};

export default function TestimoniPopUp({
	open,
	close,
	save,
}: TestimoniPopUpProps) {
	const [name, setName] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [testimoni, setTestimoni] = useState<string>("");
	const formComplete = name && position && testimoni;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editName, setEditName] = useState<boolean>(false);
	const [editPosition, setEditPosition] = useState<boolean>(false);
	const [editTestimoni, setEditTestimoni] = useState<boolean>(false);

	function resetForm() {
		setName("");
		setPosition("");
		setTestimoni("");
		setSubmited(null);
		setEditName(false);
		setEditPosition(false);
		setEditTestimoni(false);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (submited == null) {
			setSubmited("submit");
			setEditName(true);
			setEditPosition(true);
			setEditTestimoni(true);
		} else if (submited == "submit") {
			const testimoniData: TestimoniProps = {
				name,
				position,
				testimoni,
			};

			save(testimoniData);
			resetForm();
			close();
		}
	}

	if (!open) return null;

	return (
		<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 bg-white/20 backdrop-blur-[4px] py-10">
			<div className="col-start-4 col-end-10 rounded-t-[6px]">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-2xl font-semibold">Testimoni</h1>
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
								<div className="relative col-span-6 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Name
									</label>
									<input
										onChange={(e) => setName(e.target.value)}
										className={`text-base font-normal border ${
											editName
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px]`}
										type="text"
										placeholder="Name"
									/>
									{submited && (
										<div
											onClick={() => setEditName(!editName)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
								<div className="relative col-span-6 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Position / instution
									</label>
									<input
										onChange={(e) => setPosition(e.target.value)}
										className={`text-base font-normal border ${
											editPosition
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px]`}
										type="text"
										placeholder="Position"
									/>
									{submited && (
										<div
											onClick={() => setEditPosition(!editPosition)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
							</li>
							<li className="grid grid-cols-12 gap-x-[40px]">
								<div className="relative col-span-12 flex flex-col gap-y-[6px]">
									<label className="text-base font-bold" htmlFor="">
										Testimoni
									</label>
									<textarea
										onChange={(e) => setTestimoni(e.target.value)}
										className={`text-base font-normal border ${
											editTestimoni
												? "bg-neutral-800 border-transparent"
												: "bg-transparent border-neutral-500"
										} px-[12px] py-[8px] rounded-[4px]`}
										placeholder="Testimoni"
										name=""
										id=""></textarea>
									{submited && (
										<div
											onClick={() => setEditTestimoni(!editTestimoni)}
											className="cursor-pointer absolute right-2 bottom-2 flex items-center bg-neutral-700 gap-x-[10px] px-[8px] py-[5px] rounded-[8px] outline-none">
											<p className="text-xs text-neutral-400">Edit</p>
											<PencilIcon width={14} height={14} color="#A3A3A3" />
										</div>
									)}
								</div>
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
