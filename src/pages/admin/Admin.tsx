import { useLocation } from "react-router";
import AdminSideBar from "../../components/adminSidebar";
import EventManagement from "../../components/adminComponents/EventManagement";
import AboutUsManagement from "../../components/adminComponents/AboutUsManagement";
import ImpactManagement from "../../components/adminComponents/ImpactManagement";
import PartnershipManagement from "../../components/adminComponents/PartnershipManagement";
import TestimoniManagement from "../../components/adminComponents/TestimoniManagement";
import GalleryManagement from "../../components/adminComponents/GalleryManagement";
import { DoubleArrowIcon } from "../../components/icons/doubleArrowIcon";
import { RightArrowIcon } from "../../components/icons/rightArrowIcon";
import { useState } from "react";

export default function Admin() {
	const location = useLocation();
	const url = new URLSearchParams(location.search);
	const panel = url.get("panel");

	const [responsiveSidebar, setResponsiveSidebar] = useState<boolean>(false);

	function handleMobileResponsive() {
		return responsiveSidebar
			? setResponsiveSidebar(false)
			: setResponsiveSidebar(true);
	}

	return (
		<>
			<section className="h-screen flex flex-col overflow-hidden">
				<header className="fixed w-full bg-black flex justify-between items-center p-[20px] px-[40px]">
					<section>
						<a className="flex items-center space-x-4 cursor-pointer" href="/">
							<img
								src="/assets/logo/business-units/Magna.png"
								alt="Magna Logo"
								width={30}
								height={56}
							/>
							<div className="md:text-[24px] text-[18px] font-extrabold">
								Magna Partners
							</div>
						</a>
					</section>
					<section className="flex items-center gap-[30px]">
						<div className="space-y-[6px]">
							<h3 className="text-xl font-semibold">Link To Work</h3>
							<p className="text-sm">LinkToWork@gmail.com</p>
						</div>
						<img
							className="w-[56px]"
							src="/assets/logo/business-units/ltw-logo.webp"
							alt=""
						/>
					</section>
				</header>
				<section
					className={`h-full ${
						!responsiveSidebar ? "grid grid-cols-12" : "flex"
					}  bg-[#0B0D12]`}>
					<aside
						className={`transition-all duration-500 ease-in-out ${
							responsiveSidebar ? "w-[100px]" : "col-span-2"
						} py-[40px] h-full bg-black flex flex-col justify-between p-[20px]`}>
						<div className="flex flex-col justify-between gap-20">
							<div></div>
							<ul className="space-y-[20px]">
								<li
									onClick={handleMobileResponsive}
									className="flex justify-center items-center text-[#737373] text-base gap-[20px] py-[10px] cursor-pointer">
									{!responsiveSidebar && "Minimize Sidebar"}
									{!responsiveSidebar ? (
										<DoubleArrowIcon width={18} height={18} />
									) : (
										<div className="rotate-180">
											<DoubleArrowIcon width={18} height={18} />
										</div>
									)}
								</li>
								<AdminSideBar responsiveSidebar={responsiveSidebar} />
							</ul>
						</div>
						<div className="flex justify-center">
							<button
								className={`flex items-center text-sm md:text-xl font-normal ${
									!responsiveSidebar && "border-[2px] border-[#404040]"
								}  rounded-full px-7 sm:px-[60px] py-[12px] gap-[10px]`}>
								{!responsiveSidebar && "Logout"}
								<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
									<RightArrowIcon fill="white" width={16} height={10} />
								</div>
							</button>
						</div>
					</aside>
					<main
						className={`overflow-y-auto ${
							responsiveSidebar ? "col-span-11 w-full" : "col-span-10"
						} flex flex-col gap-[20px] px-[20px] pt-28 pb-5`}>
						{panel == "about-us" && <AboutUsManagement />}
						{panel == "event" && <EventManagement />}
						{panel == "impact" && <ImpactManagement />}
						{panel == "partnership" && <PartnershipManagement />}
						{panel == "testimoni" && <TestimoniManagement />}
						{panel == "gallery" && <GalleryManagement />}
					</main>
				</section>
			</section>
		</>
	);
}
