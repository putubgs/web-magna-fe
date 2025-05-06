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
	const location = useLocation();
	const url = new URLSearchParams(location.search);
	const panel = url.get("panel");

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
						width={24}
						height={24}
						color={`${panel == "about-us" ? "white" : "#A3A3A3"}`}
					/>
					{!responsiveSidebar && "About Us"}
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
						width={24}
						height={24}
						color={`${panel == "event" ? "white" : "#A3A3A3"}`}
					/>
					{!responsiveSidebar && "Event"}
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
						width={24}
						height={24}
						color={`${panel == "impact" ? "white" : "#A3A3A3"}`}
					/>
					{!responsiveSidebar && "Impact"}
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
						width={24}
						height={24}
						color={`${panel == "partnership" ? "white" : "#A3A3A3"}`}
					/>
					{!responsiveSidebar && "Partnership"}
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
						width={24}
						height={24}
						color={`${panel == "testimoni" ? "white" : "#A3A3A3"}`}
					/>
					{!responsiveSidebar && "Testimoni"}
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
						width={24}
						height={24}
						color={`${panel == "gallery" ? "white" : "#A3A3A3"}`}
					/>
					{!responsiveSidebar && "Gallery"}
				</li>
			</Link>
		</>
	);
}
