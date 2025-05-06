import { useState } from "react";
import { LeftChevronIcon } from "../icons/leftChevronIcon";
import { PencilIcon } from "../icons/pencilIcon";
import { TrashCanIcon } from "../icons/trashCanIcon";
import GalleryPopUp from "../adminPopUpComponents/galleryPopUp";
import GalleryDetailPopUp from "../adminDetailPopUpComponents/galleryDetailPopUp";

type GalleryProps = {
	eventName: string;
	date: string;
	image: string;
};

export default function GalleryManagement() {
	const [galleryPopUp, setGalleryPopUp] = useState<boolean>(false);
	const [galleryDetailPopUp, setGalleryDetailPopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [galleryDetailData, setGalleryDetailData] = useState<
		GalleryProps[] | null
	>(null);
	const [galleryData, setGalleryData] = useState<GalleryProps[] | null>(null);

	function handleSubmitGallery(galleryData: GalleryProps) {
		setGalleryData((prev) => (prev ? [...prev, galleryData] : [galleryData]));
	}

	function handleUpdateGallery(updatedData: GalleryProps, index: number) {
		setGalleryData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData[index] = updatedData;

			return newData;
		});
	}

	function handleDeleteGallery(index: number) {
		setGalleryData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData.splice(index, 1);

			return newData;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setGalleryDetailPopUp(true);

		if (galleryData && galleryData[index]) {
			setGalleryDetailData([
				{
					eventName: galleryData[index].eventName,
					date: galleryData[index].date,
					image: galleryData[index].image,
				},
			]);
		}
	}

	return (
		<>
			<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
				<h1 className="text-2xl font-semibold">Gallery Management Panel</h1>
				<button
					onClick={() => setGalleryPopUp(true)}
					className="cursor-pointer bg-[#270081] text-base p-[16px] rounded-[8px]">
					Add Picture +
				</button>
			</section>
			<section className="h-fit bg-black flex flex-col justify-between border border-[#404040] rounded-[20px] p-4">
				<table className="table-auto w-full text-white">
					<thead>
						<tr className="border-b border-[#D4D4D4] text-left">
							<th className="text-lg font-bold py-3 px-4">No</th>
							<th className="text-lg font-bold py-3 px-4">Photo</th>
							<th className="text-lg font-bold py-3 px-0">Event Name</th>
							<th className="text-lg font-bold py-3 px-4">Date</th>
							<th className="text-lg font-bold py-3 px-4">Actions</th>
						</tr>
					</thead>
					<tbody className="h-auto">
						{galleryData ? (
							galleryData.map((data, index) => (
								<tr key={index} className="border-b border-[#D4D4D4]">
									<td className="py-4 px-4 align-top text-sm font-medium">1</td>
									<td className="py-4 px-4 align-top">
										<img className="w-[150px]" src={data.image} alt="Event Poster" />
									</td>
									<td className="py-4 px-2 align-top">
										<p className="text-base font-semibold leading-tight">
											{data.eventName}
										</p>
									</td>
									<td className="py-4 px-4 align-top text-base font-semibold whitespace-nowrap">
										{`${data.date.split("-")[2]}/${data.date.split("-")[1]}/${
											data.date.split("-")[0]
										}`}
									</td>
									<td className="py-4 px-4 align-top">
										<div className="flex items-center gap-x-[16px]">
											<div
												onClick={() => showDetail(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#FF8800] p-[8px] rounded-[8px]">
												<PencilIcon width={18} height={18} color="#FF8800" />
											</div>
											<div
												onClick={() => handleDeleteGallery(index)}
												className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-[#C00707] p-[8px] rounded-[8px]">
												<TrashCanIcon width={14} height={18} color="#C00707" />
											</div>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr className="h-[250px]">
								<td colSpan={5}>
									<div className="flex flex-col justify-center items-center text-white">
										<h1 className="text-3xl font-black">NO DATA</h1>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="flex justify-end items-center mt-4 gap-2">
					<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20">
						<LeftChevronIcon width={20} height={20} color="white" />
					</button>
					<div className="bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 appearance-none">
						<select className="bg-none p-0">
							<option className="bg-none p-0">1</option>
						</select>
					</div>
					<p className="text-white">of 1</p>
					<button className="h-full bg-[#1c1c1c] text-white px-3 py-1 rounded-md border border-white/20 rotate-180">
						<LeftChevronIcon width={20} height={20} color="white" />
					</button>
				</div>
			</section>

			<GalleryPopUp
				open={galleryPopUp}
				close={() => setGalleryPopUp(false)}
				save={handleSubmitGallery}
			/>

			{galleryDetailData && (
				<GalleryDetailPopUp
					open={galleryDetailPopUp}
					close={() => setGalleryDetailPopUp(false)}
					save={handleUpdateGallery}
					data={galleryDetailData}
					index={index}
				/>
			)}
		</>
	);
}
