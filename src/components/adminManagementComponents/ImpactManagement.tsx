import { FormEvent, useState } from "react";
import { PencilIcon } from "../icons/pencilIcon";
import { TrashCanIcon } from "../icons/trashCanIcon";
import { InformationIcon } from "../icons/informationIcon";
import ExitIcon from "../icons/exitIcon";

export default function ImpactManagement() {
	const [impactPopUp, setImpactPopUp] = useState<boolean>(false);
	const [submited, setSubmited] = useState<boolean>(false);
	const [check, setCheck] = useState<boolean>(false);
	const formComplete = check;

	const impacts = [
		{ label: "Impact Event Registrant", value: "25K+" },
		{ label: "Impact Partnership", value: "-" },
		{ label: "Impact Social Media Follower", value: "-" },
		{ label: "Impact Reached University", value: "-" },
		{ label: "Impact Mentees Accepted", value: "50K+" },
		{ label: "Impact Event Participant", value: "-" },
		{ label: "Impact Event Participant", value: "12K+" },
		{ label: "Impact Mentors Onboarded", value: "-" },
	];

	const impactsCategory = [
		"Event Registrants Count",
		"Event Participant Count",
		"Partnership Count",
		"Social Media Followers Count",
		"Universities Reaches Count",
		"Mentees Accepted Count",
		"Mentors Onboarded Count",
	];

	const handleCheck = () => {
		const checkbox = document.querySelectorAll<HTMLInputElement>(
			'input[type="checkbox"]'
		);
		const checked = Array.from(checkbox).some((checkbox) => checkbox.checked);

		setCheck(checked);
	};

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setSubmited(true);
	}

	return (
		<>
			<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
				<h1 className="text-lg md:text-2xl font-semibold">
					Impact Management Panel
				</h1>
				<button
					onClick={() => setImpactPopUp(true)}
					className="cursor-pointer bg-[#270081] text-sm md:text-base p-[16px] rounded-[8px]">
					Add Impact +
				</button>
			</section>
			{/* <section className="h-full flex justify-center items-center bg-black border border-[#404040] rounded-[20px]">
				<h1 className="text-3xl font-black">NO DATA</h1>
			</section> */}
			<section className="flex flex-col bg-black border border-[#404040] p-[28px] rounded-[20px] space-y-[20px]">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold italic text-neutral-400">
						The effect created by your organization!
					</h1>
					<div className="flex p-[8px] rounded-[8px] gap-x-[16px]">
						<button className="w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
							<PencilIcon width={18} height={18} color="#FF8800" />
						</button>
						<button className="w-[34px] h-[34px] flex justify-center items-center border border-[#C00707] p-[8px] rounded-[8px]">
							<TrashCanIcon width={14} height={18} color="#C00707" />
						</button>
					</div>
				</div>
				<div className="border border-[#404040] p-[28px] rounded-[8px] overflow-x-auto">
					<table className="table-auto text-white text-base">
						<tbody>
							{impacts.map((item, index) => (
								<tr key={index} className="align-top">
									<td className="text-neutral-500 py-2">{item.label}</td>
									<td className="px-5 py-2">:</td>
									<td className="pl-2 py-2 font-bold whitespace-nowrap">{item.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* popup */}
			{impactPopUp && (
				<section className="overflow-y-auto absolute top-0 left-0 w-full h-full grid grid-cols-12 bg-white/20 backdrop-blur-[4px] py-10">
					<div className="col-start-4 col-end-10 rounded-t-[6px]">
						<div className="flex justify-between items-center border-b border-neutral-300 bg-black px-[24px] py-[10px] rounded-t-[6px]">
							<h1 className="text-2xl font-semibold">Impact</h1>
							<button
								onClick={() => setImpactPopUp(false)}
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
									<table className="w-full">
										<thead>
											<tr>
												<th className="px-4 text-left">Displayed?</th>
												<th className="px-4 text-center">Impact Category</th>
												<th className="px-4 text-center">Value</th>
											</tr>
										</thead>
										<tbody className="space-y-4">
											{impactsCategory.map((impactCategory, index) => (
												<tr key={index}>
													<td className="px-10 py-3">
														<input
															onChange={handleCheck}
															className="cursor-pointer w-[30px] h-[30px] scheme-dark"
															type="checkbox"
														/>
													</td>
													<td className="px-4 py-3 rounded-[4px]">
														<p className="bg-neutral-800 text-neutral-400 px-[12px] py-[8px] rounded-[4px]">
															{impactCategory}
														</p>
													</td>
													<td className="px-4 py-3">
														<input
															type="text"
															placeholder="Value of The Content"
															className="w-full bg-transparent border border-neutral-700 px-[12px] py-[8px] rounded-[4px]"
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
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
			)}
		</>
	);
}
