import { useState } from "react";
import { ApprovedIcon } from "../icons/approvedIcon";
import { EyeIcon } from "../icons/eyeIcon";
import InstaIcon from "../icons/instaIcon";
import LinkedinIcon from "../icons/linkedinIcon";
import MailIcon from "../icons/mailIcon";
import AddAboutUsPopUp from "../adminPopUpComponents/aboutUsPopUp";
import AboutUsDetailPopUp from "../adminDetailPopUpComponents/aboutUsDetailPopUp";

type AboutUsDataProps = {
	title: string;
	color: string;
	description: string;
	instagram: string;
	email: string;
	linkedin: string;
	image: string;
};

export default function AboutUsManagement() {
	const [addAboutUsPopUp, setAddAboutUsPopUp] = useState<boolean>(false);
	const [aboutUsDetailPopUp, setAboutUsDetailPopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const [aboutUsDetailData, setAboutUsDetailData] = useState<
		AboutUsDataProps[] | null
	>(null);
	const [aboutUsData, setAboutUsData] = useState<AboutUsDataProps[] | null>(
		null
	);

	function handleSubmitAboutUs(aboutUsData: AboutUsDataProps) {
		setAboutUsData((prev) => (prev ? [...prev, aboutUsData] : [aboutUsData]));
	}

	function handleUpdateAboutUs(updatedData: AboutUsDataProps, index: number) {
		setAboutUsData((prev) => {
			if (!prev) return null;

			const newData = [...prev];
			newData[index] = updatedData;

			return newData;
		});
	}

	function handleDeleteAboutUs(index: number) {
		setAboutUsData((prev) => {
			if (!prev) return null;

			const result = prev.filter((_, i) => i !== index);

			return result.length > 0 ? result : null;
		});
	}

	function showDetail(index: number) {
		setIndex(index);
		setAboutUsDetailPopUp(true);

		if (aboutUsData && aboutUsData[index]) {
			setAboutUsDetailData([
				{
					title: aboutUsData[index].title,
					color: aboutUsData[index].color,
					description: aboutUsData[index].description,
					instagram: aboutUsData[index].instagram,
					email: aboutUsData[index].email,
					linkedin: aboutUsData[index].linkedin,
					image: aboutUsData[index].image,
				},
			]);
		}
	}

	return (
		<>
			<section className="flex justify-between items-center bg-black border border-[#404040] p-[20px] rounded-[12px]">
				<h1 className="text-lg lg:text-2xl font-semibold">
					About Us Management Panel
				</h1>
				<button
					onClick={() => {
						setAddAboutUsPopUp(true);
					}}
					className="cursor-pointer bg-[#270081] text-sm lg:text-base p-[16px] rounded-[8px]">
					Add About Us +
				</button>
			</section>
			{aboutUsData && aboutUsData.length > 0 ? (
				aboutUsData.map((data, index) => (
					<section
						key={index}
						className="h-fit flex flex-col bg-black border border-[#404040] p-[28px] rounded-[20px] space-y-[20px]">
						<div className="flex justify-between items-center">
							<div className="flex items-center border-[2px] border-lime-900 gap-x-[8px] px-[16px] py-[10px] rounded-full">
								<ApprovedIcon width={16} height={16} color="#84CC16" />
								<p className="text-xs font-bold text-[#84CC16]">Approved</p>
							</div>
							<div
								onClick={() => showDetail(index)}
								className="cursor-pointer border border-violet-700 p-[8px] rounded-[8px]">
								<EyeIcon width={24} height={24} color="#6D28D9" />
							</div>
						</div>
						<div className="border border-[#404040] p-[28px] rounded-[8px] space-y-[60px]">
							<div className="space-y-[30px]">
								<img className="w-[56px]" src={data.image} alt="" />
								<div>
									<h3 className="text-xs font-medium text-neutral-500">Title</h3>
									<p className="text-sm font-bold">{data.title}</p>
								</div>
								<div>
									<h3 className="text-xs font-medium text-neutral-500">Description</h3>
									<p className="text-sm font-normal">{data.description}</p>
								</div>
							</div>
							<div className="flex gap-y-6 md:gap-x-[60px] gap-x-[25px]">
								<a
									className="flex md:space-x-3 space-x-0 items-center"
									href="https://www.instagram.com/magna.partners/"
									target="_blank"
									rel="noopener noreferrer">
									<div className="md:flex hidden items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
										<InstaIcon size={25} color="white" />
									</div>
									<div
										className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
										aria-label="Magna Partners Instagram">
										<InstaIcon size={25} color="white" />
									</div>
									<div className="md:flex hidden">{data.instagram}</div>
								</a>
								<a
									className="flex md:space-x-3 space-x-0 items-center"
									href="mailto:magnainitiatives.id@gmail.com">
									<div className="md:flex hidden items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
										<MailIcon size={25} color="white" />
									</div>
									<div
										className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
										aria-label="Magna Partners Email">
										<MailIcon size={25} color="white" />
									</div>
									<div className="md:flex hidden">{data.email}</div>
								</a>
								<a
									className="flex md:space-x-3 space-x-0 items-center"
									href="https://www.linkedin.com/company/magna-id/"
									target="_blank"
									rel="noopener noreferrer">
									<div className="md:flex hidden items-center justify-center rounded-full border border-white/20 w-[50px] h-[50px]">
										<LinkedinIcon size={25} color="white" />
									</div>
									<div
										className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
										aria-label="Magna Partners LinkedIn">
										<LinkedinIcon size={25} color="white" />
									</div>
									<div className="md:flex hidden">{data.linkedin}</div>
								</a>
							</div>
						</div>
					</section>
				))
			) : (
				<section className="h-full flex justify-center items-center bg-black border border-[#404040] rounded-[20px]">
					<h1 className="text-xl lg:text-3xl font-black">NO DATA</h1>
				</section>
			)}

			<AddAboutUsPopUp
				open={addAboutUsPopUp}
				close={() => setAddAboutUsPopUp(false)}
				save={handleSubmitAboutUs}
			/>

			{aboutUsDetailData && (
				<AboutUsDetailPopUp
					open={aboutUsDetailPopUp}
					close={() => setAboutUsDetailPopUp(false)}
					save={handleUpdateAboutUs}
					delete={handleDeleteAboutUs}
					data={aboutUsDetailData}
					index={index}
				/>
			)}
		</>
	);
}
