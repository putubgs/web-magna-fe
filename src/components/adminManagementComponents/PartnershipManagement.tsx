import { useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import PartnershipPopUp from "../adminPopUpComponents/partnershipPopUp";
import PartnershipDetailPopUp from "../adminDetailPopUpComponents/partnershipDetailPopUp";

type PartnershipProps = {
	partnerName: string;
	image: string;
};

export default function PartnershipManagement() {
	const [partnershipPopUp, setPartnershipPopUp] = useState<boolean>(false);
	const [partnershipDetailPopUp, setPartnershipDetailPopUp] =
		useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [partnershipDetailData, setPartnershipDetailData] = useState<
		PartnershipProps[] | null
	>(null);
	const [partnershipData, setPartnershipData] = useState<
		PartnershipProps[] | null
	>(null);

	function handleSubmitPartnership(partnershipData: PartnershipProps) {
		setPartnershipData((prev) =>
			prev ? [...prev, partnershipData] : [partnershipData]
		);
	}

	function handleUpdatePartnership(
		updatedData: PartnershipProps,
		index: number
	) {
		setPartnershipData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData[index] = updatedData;

			return newData;
		});
	}

	function handleDeletePartnership(index: number) {
		setPartnershipData((prev) => {
			if (!prev) return null;

			const result = prev.filter((_, i) => i !== index);

			return result.length > 0 ? result : null;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setPartnershipDetailPopUp(true);

		if (partnershipData && partnershipData[index]) {
			setPartnershipDetailData([
				{
					partnerName: partnershipData[index].partnerName,
					image: partnershipData[index].image,
				},
			]);
		}
	}

	return (
		<>
			<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
				<h1 className="text-lg lg:text-2xl font-semibold">
					Partnership Management Panel
				</h1>
				<button
					onClick={() => setPartnershipPopUp(true)}
					className="cursor-pointer bg-[#270081] text-sm lg:text-base p-[16px] rounded-[8px]">
					Add Partnership +
				</button>
			</section>
			<section className="overflow-scroll xl:overflow-auto h-[500px] bg-black flex flex-col justify-between border border-[#404040] rounded-[20px] p-4">
				<table className="table-auto w-[700px] xl:w-full h-fit text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-20">Logo</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4">Partner</th>
							<th className="text-base lg:text-lg font-bold py-3 px-1">Actions</th>
						</tr>
					</thead>
					<tbody className="relative">
						{partnershipData ? (
							partnershipData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">
										{index + 1}
									</td>
									<td className="py-4 px-20 align-top">
										<img className="w-[50px] h-[50px]" src={data.image} alt="" />
									</td>
									<td className="py-4 px-4 align-top text-base font-normal whitespace-nowrap">
										{data.partnerName}
									</td>
									<td className="py-4 px-4 align-top">
										<div className="flex items-center gap-x-[16px]">
											<div
												onClick={() => showDetail(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
												<PencilIcon width={18} height={18} color="#FF8800" />
											</div>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr className="h-[250px]">
								<td colSpan={5}>
									<div className="flex flex-col justify-center items-center text-white">
										<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
									</div>
								</td>
							</tr>
						)}
						<div
							className={`absolute right-3 -bottom-20 ${
								partnershipData && partnershipData.length > 0 ? "flex" : "hidden"
							} justify-end items-center gap-2`}>
							<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
								<LeftChevronIcon width={23} height={23} color="white" />
							</button>
							<div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
								<select className="bg-none p-0">
									<option className="bg-none p-0">1</option>
								</select>
							</div>
							<p className="text-white">of 1</p>
							<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
								<LeftChevronIcon width={23} height={23} color="white" />
							</button>
						</div>
					</tbody>
				</table>
			</section>

			<PartnershipPopUp
				open={partnershipPopUp}
				close={() => setPartnershipPopUp(false)}
				save={handleSubmitPartnership}
			/>

			{partnershipDetailData && (
				<PartnershipDetailPopUp
					open={partnershipDetailPopUp}
					close={() => setPartnershipDetailPopUp(false)}
					save={handleUpdatePartnership}
					delete={handleDeletePartnership}
					data={partnershipDetailData}
					index={index}
				/>
			)}
		</>
	);
}
