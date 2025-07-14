import { FormEvent, useEffect, useState } from "react";
import ExitIcon from "../icons/exitIcon";
import { InformationIcon } from "../icons/informationIcon";
import DangerPopUp from "../dialog/dangerPopUp";
import InputField from "../adminComponents/inputField";
import ImageInputField from "../adminComponents/imageInputField";
import { DeleteAndSaveButtonForEdit } from "../adminComponents/deleteAndSaveButton";
import Tooltip from "../tooltip";

type SuperAdminPartnershipManagementProps = {
	partnerName: string;
	image: string;
};

type PartnershipPopUpProps = {
	open: boolean;
	close: () => void;
	save: (
		eventData: SuperAdminPartnershipManagementProps,
		index: number
	) => void;
	delete: (index: number) => void;
	data: SuperAdminPartnershipManagementProps[];
	index: number;
};

export default function SuperAdminPartnershipManagementDetailPopUp({
	open,
	close,
	save,
	delete: deleteData,
	data,
	index,
}: PartnershipPopUpProps) {
	const [partnerName, setPartnerName] = useState<string>("");
	const [preview, setPreview] = useState<string>("");
	const formComplete = partnerName && preview;
	const [submited, setSubmited] = useState<string | null>(null);
	const [editPartnerName, setEditPartnerName] = useState<boolean>(true);
	const [editImage, setEditImage] = useState<boolean>(true);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	const tooltipData = [
		["Data", "Min", "Max"],
		[["Logo", "1 image", "1 image"]],
	];

	useEffect(() => {
		if (data && data.length > 0) {
			setPartnerName(data[0].partnerName);
			setPreview(data[0].image);
		}
	}, [data, open]);

	function resetState() {
		setEditPartnerName(true);
		setPreview("");
		setSubmited(null);
		setEditImage(true);
	}

	function handleImage(file: File[]) {
		const image = file[0];

		setPreview(URL.createObjectURL(image));
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const partnershipData: SuperAdminPartnershipManagementProps = {
			partnerName,
			image: preview,
		};

		save(partnershipData, index);
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
			<div className="col-span-12 xl:col-start-2 xl:col-end-12 2xl:col-start-3 2xl:col-end-11 rounded-t-[6px] px-2 sm:px-5 xl:px-5">
				<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
					<h1 className="text-xs sm:text-xl md:text-2xl font-semibold">
						Partnership
					</h1>
					<button
						onClick={() => {
							resetState();
							close();
						}}
						className="cursor-pointer border border-white rounded-[4px] p-2"
					>
						<ExitIcon size={13} />
					</button>
				</div>
				<div className="bg-neutral-900 flex flex-col items-end px-5 sm:px-[36px] py-[24px] space-y-[20px] sm:space-y-[32px]">
					<div className="relative cursor-pointer">
						<InformationIcon width={20} height={20} color="white" />
						<Tooltip tooltipData={tooltipData} />
					</div>
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-end gap-y-[32px]"
					>
						<ul className="w-full border border-neutral-700 px-[20px] py-[24px] rounded-[8px] space-y-[40px]">
							<li className="w-full gap-x-[40px]">
								<div className="relative w-full flex flex-col gap-y-[6px]">
									<InputField
										inputLabel="Partner Name"
										inputPlaceholder="Enter Partner Name"
										setData={setPartnerName}
										setEditData={setEditPartnerName}
										editData={editPartnerName}
										submited={null}
										data={data[0].partnerName}
									/>
								</div>
							</li>
							<li className="grid grid-cols-12 gap-[20px]">
								<ImageInputField
									setPreview={setPreview}
									preview={preview}
									handleImage={handleImage}
									setEditImage={setEditImage}
									editImage={editImage}
									submited={submited}
								/>
							</li>
						</ul>
						<DeleteAndSaveButtonForEdit
							submited={submited}
							formComplete={formComplete}
							handleDangerPopUp={handleDangerPopUp}
							saveLabel="Save"
						/>
					</form>
				</div>
			</div>

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDelete}
				title="Delete This Partner?"
				message="Are you sure you want to delete this partner?"
			/>
		</section>
	);
}
