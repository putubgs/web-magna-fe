import { RightArrowIcon } from "./icons/rightArrowIcon";
import { logos3 } from "../data/companyData";

export const BecomeOurPartners = () => {
	return (
		<section className="flex flex-col items-center px-[50px] lg:px-[90px] xl:px-40 2xl:px-80 py-[80px] gap-y-[40px]">
			<h1 className="text-5xl gilda-font">Let's Become Our Partner!</h1>
			<div className="grid grid-cols-10 gap-[14px]">
				{logos3.map((logo) => (
					<img
						className="col-span-3 xl:col-span-2 rounded-[12px] object-cover"
						src={logo.src}
						alt={logo.alt}
					/>
				))}
			</div>
			<button className="flex items-center text-xl font-normal border border-white rounded-full px-[60px] py-[12px] gap-[10px]">
				Become Our Partner{" "}
				<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
					<RightArrowIcon fill="white" width={16} height={10} />
				</div>
			</button>
		</section>
	);
};
