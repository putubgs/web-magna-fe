import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { GalleryIcon } from "./icons/galleryIcon";
import { ImpactIcon } from "./icons/impactIcon";
import { PeopleIcon } from "./icons/peopleIcon";
import { TestimoniIcon } from "./icons/testimoniIcon";
import { AdminCalendarIcon } from "./icons/adminCalendarIcon";
import { PartnershipIcon } from "./icons/partnershipIcon";

export default function AdminSideBar({
	responsiveSidebar,
}: {
	responsiveSidebar: boolean;
}) {
	const [sectionLabel, setSectionLabel] = useState<boolean>(!responsiveSidebar);
	const location = useLocation();
	const url = new URLSearchParams(location.search);
	const panel = url.get("panel");

	useEffect(() => {
		let delay: number;

		if (responsiveSidebar) {
			setSectionLabel(false);
		} else {
			delay = setTimeout(() => {
				setSectionLabel(true);
			}, 100);
		}

		return () => clearTimeout(delay);
	}, [responsiveSidebar]);

	return (
		<>
			<hr className="border-[#A3A3A3]" />
			<Link className="block" to={"/admin?panel=about-us"}>
				<li
					className={`flex ${responsiveSidebar && "justify-center"} items-center ${
						panel == "about-us"
							? "bg-[#270081] text-white text-base font-bold"
							: "bg-transparent text-[#A3A3A3] text-base font-normal"
					} gap-[20px] p-[10px] rounded-[8px]`}>
					<PeopleIcon
						className="w-6 lg:w-7"
						color={`${panel == "about-us" ? "white" : "#A3A3A3"}`}
					/>
					{sectionLabel && (
						<span className="text-sm lg:text-base whitespace-nowrap transition-opacity duration-200">
							About Us
						</span>
					)}
				</li>
			</Link>
			<hr className="border-[#A3A3A3]" />
			<Link className="block" to={"/admin?panel=event"}>
				<li
					className={`flex ${responsiveSidebar && "justify-center"} items-center ${
						panel == "event"
							? "bg-[#270081] text-white text-base font-bold"
							: "bg-transparent text-[#A3A3A3] text-base font-normal"
					} gap-[20px] p-[10px] rounded-[8px]`}>
					<AdminCalendarIcon
						className="w-6 lg:w-7"
						color={`${panel == "event" ? "white" : "#A3A3A3"}`}
					/>
					{sectionLabel && (
						<span className="text-sm lg:text-base whitespace-nowrap transition-opacity duration-200">
							Event
						</span>
					)}
				</li>
			</Link>
			<hr className="border-[#A3A3A3]" />
			<Link className="block" to={"/admin?panel=impact"}>
				<li
					className={`flex ${responsiveSidebar && "justify-center"} items-center ${
						panel == "impact"
							? "bg-[#270081] text-white text-base font-bold"
							: "bg-transparent text-[#A3A3A3] text-base font-normal"
					} gap-[20px] p-[10px] rounded-[8px]`}>
					<ImpactIcon
						className="w-6 lg:w-7"
						color={`${panel == "impact" ? "white" : "#A3A3A3"}`}
					/>
					{sectionLabel && (
						<span className="text-sm lg:text-base whitespace-nowrap transition-opacity duration-200">
							Impact
						</span>
					)}
				</li>
			</Link>
			<hr className="border-[#A3A3A3]" />
			<Link className="block" to={"/admin?panel=partnership"}>
				<li
					className={`flex ${responsiveSidebar && "justify-center"} items-center ${
						panel == "partnership"
							? "bg-[#270081] text-white text-base font-bold"
							: "bg-transparent text-[#A3A3A3] text-base font-normal"
					} gap-[20px] p-[10px] rounded-[8px]`}>
					<PartnershipIcon
						className="w-6 lg:w-7"
						color={`${panel == "partnership" ? "white" : "#A3A3A3"}`}
					/>
					{sectionLabel && (
						<span className="text-sm lg:text-base whitespace-nowrap transition-opacity duration-200">
							Partnership
						</span>
					)}
				</li>
			</Link>
			<hr className="border-[#A3A3A3]" />
			<Link className="block" to={"/admin?panel=testimoni"}>
				<li
					className={`flex ${responsiveSidebar && "justify-center"} items-center ${
						panel == "testimoni"
							? "bg-[#270081] text-white text-base font-bold"
							: "bg-transparent text-[#A3A3A3] text-base font-normal"
					} gap-[20px] p-[10px] rounded-[8px]`}>
					<TestimoniIcon
						className="w-6 lg:w-7"
						color={`${panel == "testimoni" ? "white" : "#A3A3A3"}`}
					/>
					{sectionLabel && (
						<span className="text-sm lg:text-base whitespace-nowrap transition-opacity duration-200">
							Testimoni
						</span>
					)}
				</li>
			</Link>
			<hr className="border-[#A3A3A3]" />
			<Link className="block" to={"/admin?panel=gallery"}>
				<li
					className={`flex ${responsiveSidebar && "justify-center"} items-center ${
						panel == "gallery"
							? "bg-[#270081] text-white text-base font-bold"
							: "bg-transparent text-[#A3A3A3] text-base font-normal"
					} gap-[20px] p-[10px] rounded-[8px]`}>
					<GalleryIcon
						className="w-6 lg:w-7"
						color={`${panel == "gallery" ? "white" : "#A3A3A3"}`}
					/>
					{sectionLabel && (
						<span className="text-sm lg:text-base whitespace-nowrap transition-opacity duration-200">
							Gallery
						</span>
					)}
				</li>
			</Link>
		</>
	);
}
