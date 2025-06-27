import { useEffect, useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { TrashCanIcon } from "../icons/trashCanIcon";
import TestimoniPopUp from "../adminPopUpComponents/testimoniPopUp";
import TestimoniDetailPopUp from "../adminDetailPopUpComponents/testimoniDetailPopUp";
import DangerPopUp from "../dialog/dangerPopUp";
import SuccessPopUp from "../dialog/sucessPopUp";

type TestimoniProps = {
	name: string;
	position: string;
	testimoni: string;
};

type SuccessPopUpProps = {
	title: string;
	message: string;
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
		() => {
			try {
				const getData = localStorage.getItem("testimoniData");

				if (!getData || getData == null || getData == "") {
					return null;
				}

				const parsedData = JSON.parse(getData);

				return parsedData.length > 0 ? parsedData : null;
			} catch {
				localStorage.removeItem("testimoniData");
			}
		}
	);

	const [dangerPopUp, setDangerPopUp] = useState<boolean>(false);
	const [successPopUp, setSuccessPopUp] = useState<boolean>(false);
	const [successPopUpComponent, setSuccessPopUpComponent] =
		useState<SuccessPopUpProps | null>(null);

	useEffect(() => {
		if (testimoniData == null) {
			localStorage.removeItem("testimoniData");
		} else {
			localStorage.setItem("testimoniData", JSON.stringify(testimoniData));
		}
	}, [testimoniData]);

	function handleSubmitTestimoni(testimoniData: TestimoniProps) {
		setSuccessPopUpComponent({
			title: "Testimoni Added!",
			message: "You've successfully added a new testimoni to the panel",
		});
		setSuccessPopUp(true);

		setTestimoniData((prev) =>
			prev ? [...prev, testimoniData] : [testimoniData]
		);
	}

	function handleUpdateTestimoni(updatedData: TestimoniProps, index: number) {
		setTestimoniData((prev) => {
			if (!prev) return null;

			const currentData = prev[index];

			const change =
				currentData.name !== updatedData.name ||
				currentData.position !== updatedData.position ||
				currentData.testimoni !== updatedData.testimoni;

			if (change) {
				const newData = [...prev];
				newData[index] = updatedData;

				setSuccessPopUpComponent({
					title: "Testimoni Updated!",
					message: "The testimoni have been successfully updated",
				});
				setSuccessPopUp(true);

				return newData;
			} else {
				return prev;
			}
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
					className="cursor-pointer bg-primary text-sm lg:text-base p-[16px] rounded-[8px]">
					Add Testimoni +
				</button>
			</section>
			<section className="overflow-scroll xl:overflow-auto h-[500px] bg-black flex flex-col justify-start border border-[#404040] rounded-[20px] p-4">
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
					<tbody className="relative">
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
							<tr className="h-[250px]">
								<td colSpan={5}>
									<div className="flex flex-col justify-center items-center text-white">
										<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div
					className={`mt-3 w-[1000px] xl:w-full ${
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

			{successPopUpComponent && (
				<SuccessPopUp
					open={successPopUp}
					close={() => setSuccessPopUp(false)}
					onConfirm={() => setSuccessPopUp(false)}
					title={successPopUpComponent.title}
					message={successPopUpComponent.message}
				/>
			)}
		</>
	);
}
