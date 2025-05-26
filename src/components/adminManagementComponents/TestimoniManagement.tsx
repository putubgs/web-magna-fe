import { useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { TrashCanIcon } from "../icons/trashCanIcon";
import TestimoniPopUp from "../adminPopUpComponents/testimoniPopUp";
import TestimoniDetailPopUp from "../adminDetailPopUpComponents/testimoniDetailPopUp";
import DangerPopUp from "../dialog/dangerPopUp";

type TestimoniProps = {
	name: string;
	position: string;
	testimoni: string;
};

export default function TestimoniManagement() {
	const [testimoniPopUp, setTestimoniPopUp] = useState<boolean>(false);
	const [testimoniDetailPopUp, setTestimoniDetailPopUp] =
		useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [testimoniDetailData, setTestimoniDetailData] = useState<
		TestimoniProps[] | null
	>(null);
	const [testimoniData, setTestimoniData] = useState<TestimoniProps[] | null>(
		null
	);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);

	function handleSubmitTestimoni(testimoniData: TestimoniProps) {
		setTestimoniData((prev) =>
			prev ? [...prev, testimoniData] : [testimoniData]
		);
	}

	function handleUpdateTestimoni(updatedData: TestimoniProps, index: number) {
		setTestimoniData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData[index] = updatedData;

			return newData;
		});
	}

	function handleDeletePopUp(index: number) {
		setIndex(index);
		setDangerPopUp(true);
	}

	function handleDeleteTestimoni() {
		setTestimoniData((prev) => {
			if (!prev) return null;

			const result = prev.filter((_, i) => i !== index);

			return result.length > 0 ? result : null;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setTestimoniDetailPopUp(true);

		if (testimoniData && testimoniData[index]) {
			setTestimoniDetailData([
				{
					name: testimoniData[index].name,
					position: testimoniData[index].position,
					testimoni: testimoniData[index].testimoni,
				},
			]);
		}
	}

	return (
		<>
			<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
				<h1 className="text-lg lg:text-2xl font-semibold">
					Testimonial Management Panel
				</h1>
				<button
					onClick={() => setTestimoniPopUp(true)}
					className="cursor-pointer bg-[#270081] text-sm lg:text-base p-[16px] rounded-[8px]">
					Add Testimoni +
				</button>
			</section>
			<section className="overflow-scroll xl:overflow-auto h-[500px] bg-black flex flex-col justify-between border border-[#404040] rounded-[20px] p-4">
				<table className="table-fixed w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-base lg:text-lg font-bold py-3 px-4 w-[40px]">No</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4 w-[200px]">
								Name
							</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4 w-[260px]">
								Position
							</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4 w-[400px]">
								Review
							</th>
							<th className="text-base lg:text-lg font-bold py-3 px-4 w-[120px]">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="relative h-[200px]">
						{testimoniData && testimoniData.length > 0 ? (
							testimoniData.map((data, index) => (
								<tr key={index} className="align-top border-b border-[#D4D4D4]">
									<td className="py-6 px-4 text-sm font-medium">{index + 1}</td>
									<td className="py-6 px-4 text-sm font-medium">{data.name}</td>
									<td className="py-6 px-4 text-base font-normal">{data.position}</td>
									<td className="py-6 px-4 text-base font-normal">{data.testimoni}</td>
									<td className="py-6 px-4">
										<div className="flex items-center gap-4">
											<div
												onClick={() => showDetail(index)}
												className="cursor-pointer w-[36px] h-[36px] flex justify-center items-center border border-[#FF8800] rounded-md">
												<PencilIcon width={18} height={18} color="#FF8800" />
											</div>
											<div
												onClick={() => handleDeletePopUp(index)}
												className="cursor-pointer w-[36px] h-[36px] flex justify-center items-center border border-[#C00707] rounded-md">
												<TrashCanIcon width={16} height={18} color="#C00707" />
											</div>
										</div>
									</td>
								</tr>
							))
						) : (
							<td colSpan={5}>
								<div className="flex flex-col justify-center items-center text-white">
									<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
								</div>
							</td>
						)}
						<div
							className={`absolute right-3 -bottom-20 ${
								testimoniData && testimoniData.length > 0 ? "flex" : "hidden"
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

			<TestimoniPopUp
				open={testimoniPopUp}
				close={() => setTestimoniPopUp(false)}
				save={handleSubmitTestimoni}
			/>

			{testimoniDetailData && (
				<TestimoniDetailPopUp
					open={testimoniDetailPopUp}
					close={() => setTestimoniDetailPopUp(false)}
					save={handleUpdateTestimoni}
					delete={handleDeleteTestimoni}
					data={testimoniDetailData}
					index={index}
				/>
			)}

			<DangerPopUp
				open={dangerPopUp}
				close={() => setDangerPopUp(false)}
				onConfirm={handleDeleteTestimoni}
				title="Delete"
				message="Are you sure you want to delete this?"
			/>
		</>
	);
}
