import { useState } from "react";
import { CalendarIcon } from "./icons/calendarIcon";
import { ClockIcon } from "./icons/clockIcon";
import { LeftArrowIcon } from "./icons/leftArrowIcon";
import { RightArrowIcon } from "./icons/rightArrowIcon";

type UpComingEventsProps = {
	upComingEventsData: {
		title: string;
		description: string;
		date: string;
		time: string;
		image: string;
	}[];
};

export const UpComingEvents = ({ upComingEventsData }: UpComingEventsProps) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < upComingEventsData.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
	};

	return (
		<section className="flex flex-col justify-center items-center space-y-[56px] px-10 md:px-96 pb-[80px]">
			<div className="text-center px-4 md:px-40 space-y-[20px]">
				<h1 className="gilda-font text-[32px] md:text-[48px] font-[400]">
					Up Coming Events
				</h1>
				<p className="text-[16px] md:text-[18px]">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, lorem
					quis tempor suscipit, nisl enim pellentesque turpis,
				</p>
			</div>

			<div className="relative w-full overflow-hidden">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
					{upComingEventsData.map((event, index) => (
						<div
							key={index}
							className="min-w-full grid grid-cols-1 md:grid-cols-12 items-center border-4 border-[#262626] rounded-[8px] p-5 gap-[24px] md:gap-[56px]">
							<img
								className="md:col-span-3 w-full"
								src={event.image}
								alt={event.title}
							/>
							<div className="md:col-span-9 space-y-[24px]">
								<h1 className="text-[20px] font-[800]">{event.title}</h1>
								<p className="text-sm font-normal">{event.description}</p>
								<div className="space-x-[24px]">
									<div className="inline-flex gap-x-[10px]">
										<CalendarIcon width={18} height={18} />
										<p className="text-sm font-normal">{event.date}</p>
									</div>
									<div className="inline-flex gap-x-[10px]">
										<ClockIcon width={18} height={18} />
										<p className="text-sm font-normal">{event.time}</p>
									</div>
								</div>
								<button className="text-white text-base font-semibold bg-transparent border border-white rounded-full px-[28px] py-[14px]">
									Register Now
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="space-x-[24px]">
				<button
					onClick={handlePrev}
					disabled={currentIndex === 0}
					className={`p-[13px] rounded-[8px] ${
						currentIndex === 0
							? "bg-[#262626] border border-transparent"
							: "bg-transparent border border-white"
					}`}>
					<LeftArrowIcon
						fill={currentIndex === 0 ? "#737373" : "white"}
						width={18}
						height={16}
					/>
				</button>
				<button
					onClick={handleNext}
					disabled={currentIndex === upComingEventsData.length - 1}
					className={`p-[13px] rounded-[8px] ${
						currentIndex === upComingEventsData.length - 1
							? "bg-[#262626] border border-transparent"
							: "bg-transparent border border-white"
					}`}>
					<RightArrowIcon
						fill={currentIndex == upComingEventsData.length - 1 ? "#737373" : "white"}
						width={18}
						height={16}
					/>
				</button>
			</div>
		</section>
	);
};
