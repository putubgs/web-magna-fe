import { RightArrowIcon } from "./icons/rightArrowIcon";
import { logos3 } from "../data/companyData";

export const BecomeOurPartners = () => {
	return (
		<section className="flex flex-col items-center px-10 sm:px-[50px] lg:px-[90px] xl:px-40 2xl:px-80 py-[80px] gap-y-[40px]">
			<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gilda-font">
				Let's Become Our Partner!
			</h1>
			<div className="hidden md:grid grid-cols-10 gap-[14px]">
				{logos3.map((logo) => (
					<img
						className="col-span-2 xl:col-span-2 rounded-[12px] object-cover"
						src={logo.src}
						alt={logo.alt}
					/>
				))}
			</div>
			<div className="grid md:hidden grid-cols-12 gap-[14px]">
				{logos3.slice(0, 6).map((logo) => (
					<img
						className="col-span-4 xl:col-span-2 rounded-[12px] object-cover"
						src={logo.src}
						alt={logo.alt}
					/>
				))}
			</div>
			<button className="flex items-center text-sm md:text-xl font-normal border border-white rounded-full px-7 sm:px-[60px] py-[12px] gap-[10px]">
				Become Our Partner{" "}
				<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
					<RightArrowIcon fill="white" width={16} height={10} />
				</div>
			</button>
		</section>
	);
};
