import { useLocation } from "react-router";
import AdminSideBar from "../../components/adminSidebar";
import EventManagement from "../../components/adminManagementComponents/EventManagement";
import AboutUsManagement from "../../components/adminManagementComponents/AboutUsManagement";
import ImpactManagement from "../../components/adminManagementComponents/ImpactManagement";
import PartnershipManagement from "../../components/adminManagementComponents/PartnershipManagement";

import TestimoniManagement from "../../components/adminManagementComponents/TestimoniManagement";
import GalleryManagement from "../../components/adminManagementComponents/GalleryManagement";
import { DoubleArrowIcon } from "../../components/icons/doubleArrowIcon";
import { RightArrowIcon } from "../../components/icons/rightArrowIcon";
import { useEffect, useState } from "react";
import SuperAdmin from "../../components/superAdminManagementComponents/SuperAdmin";
import SuperAdminPartnershipManagement from "../../components/superAdminManagementComponents/SuperAdminPartnershipManagement";

export default function Admin() {
	const location = useLocation();
	const url = new URLSearchParams(location.search);
	const panel = url.get("panel");

	const [responsiveSidebar, setResponsiveSidebar] = useState<boolean>(false);
	const [showLogoutText, setShowLogoutText] = useState<boolean>(
		!responsiveSidebar
	);
	const [showMinimizeText, setShowMinimizeText] = useState<boolean>(
		!responsiveSidebar
	);

	// Pake localStorage -> get role (admin/super-admin)
	const userRole = localStorage.getItem("userRole");

	function handleMobileResponsive() {
		return responsiveSidebar
			? setResponsiveSidebar(false)
			: setResponsiveSidebar(true);
	}

	useEffect(() => {
		let delay: number;

		if (responsiveSidebar) {
			setShowLogoutText(false);
			setShowMinimizeText(false);
		} else {
			delay = setTimeout(() => {
				setShowLogoutText(true);
				setShowMinimizeText(true);
			}, 100);
		}

		return () => clearTimeout(delay);
	}, [responsiveSidebar]);

	return (
		<>
			<section className="h-screen flex flex-col overflow-hidden">
				<header className="fixed w-full bg-black flex justify-between items-center p-[20px] px-[40px]">
					<section>
						<a
							className="flex items-center space-x-4 cursor-pointer"
							href="/"
						>
							<img
								src="/assets/logo/business-units/Magna.png"
								alt="Magna Logo"
								width={30}
								height={56}
							/>
							<div className="text-base lg:text-[24px] font-extrabold">
								Magna Partners
							</div>
						</a>
					</section>
					<section className="flex items-center gap-[15px] md:gap-[30px]">
						<div className="space-y-[6px]">
							<h3 className="text-base lg:text-xl font-semibold">
								Link To Work
							</h3>
							<p className="text-sm">LinkToWork@gmail.com</p>
						</div>
						<img
							className="w-[56px]"
							src="/assets/logo/business-units/ltw-logo.webp"
							alt=""
						/>
					</section>
				</header>
				<section className={`h-full flex bg-[#0B0D12]`}>
					<aside
						className={`transition-all ease-in-out duration-300 ${
							responsiveSidebar ? "w-[100px]" : "w-[400px]"
						} py-[40px] h-full bg-black flex flex-col justify-between p-[20px]`}
					>
						<div className="flex flex-col justify-between gap-20">
							<div></div>
							<ul className="space-y-[20px]">
								<li
									onClick={handleMobileResponsive}
									className="flex justify-center items-center text-[#737373] text-sm md:text-base gap-[10px] md:gap-[20px] py-[10px] cursor-pointer"
								>
									{showMinimizeText && "Minimize Sidebar"}
									{!responsiveSidebar ? (
										<DoubleArrowIcon className="w-6 lg:w-7" />
									) : (
										<div className="rotate-180">
											<DoubleArrowIcon className="w-6 lg:w-7" />
										</div>
									)}
								</li>
								<AdminSideBar
									responsiveSidebar={responsiveSidebar}
								/>
							</ul>
						</div>
						<div className="flex justify-center">
							<a
								href="/login"
								className={`flex items-center text-base lg:text-xl font-normal ${
									!responsiveSidebar &&
									"border-[2px] border-[#404040]"
								}  rounded-full px-[30px] lg:px-[60px] py-[8px] lg:py-[12px] gap-[10px]`}
							>
								{showLogoutText && "Logout"}
								<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
									<RightArrowIcon
										className="w-3 lg:w-5"
										fill="white"
									/>
								</div>
							</a>
						</div>
					</aside>
					<main
						className={`w-full overflow-y-auto ${
							responsiveSidebar
								? "col-span-11 w-full"
								: "col-span-10"
						} flex flex-col gap-[20px] px-[20px] pt-28 pb-5`}
					>
						{panel == "admin-manage" &&
							userRole === "super-admin" && <SuperAdmin />}
						{panel == "about-us" && <AboutUsManagement />}
						{panel == "event" && <EventManagement />}
						{panel == "impact" && <ImpactManagement />}
						{panel == "partnership" &&
							(userRole === "super-admin" ? (
								<SuperAdminPartnershipManagement />
							) : userRole === "admin" ? (
								<PartnershipManagement />
							) : null)}
						{panel == "testimoni" && <TestimoniManagement />}
						{panel == "gallery" && <GalleryManagement />}
					</main>
				</section>
			</section>
		</>
	);
}
