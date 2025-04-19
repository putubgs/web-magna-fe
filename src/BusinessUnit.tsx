import { useParams } from "react-router";
import { AboutData } from "./data/aboutData";
import Header from "./components/header";
import CountUp from "react-countup";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { UpComingEvents } from "./components/upComingEvents";
import { iconMapper } from "./data/iconMapperData";
import { HeroBackground } from "./components/heroBackground";
import ExitIcon from "./components/icons/exitIcon";

function BusinessUnit() {
	const countUpRef = useRef(null);
	const [inView, setInView] = useState(false);
	const [prevEventGalleryPopUp, setPrevEventGalleryPopUp] =
		useState<boolean>(false);

	// get each bu data by params url
	const { bu } = useParams<{ bu: string }>();

	const buData = AboutData.find(
		(item) => item.title.toLowerCase().replace(/\s+/g, "") == bu
	);

	// reset scroll position
	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, []);

	// run the count up when reach the achievement section & scroll effect while pop up
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.4 }
		);

		if (countUpRef.current) {
			observer.observe(countUpRef.current);
		}

		if (prevEventGalleryPopUp) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			if (countUpRef.current) observer.unobserve(countUpRef.current);
		};
	}, [prevEventGalleryPopUp]);

	return (
		<>
			{/* header */}
			<Header />

			{/* hero section */}
			<section className="h-full grid grid-cols-12 space-y-56 px-56 py-40">
				<div className="col-span-7 space-y-[30px]">
					<h1 className="text-7xl font-[600]">{buData?.title}</h1>
					<h3 className="text-xl font-[400]">{buData?.description}</h3>
					<div className="flex items-center gap-x-5">
						{buData?.contacts.top.map((contact, index) => {
							const Icon = iconMapper[contact.icon];
							return (
								<a
									key={index}
									className="w-[50px] h-[50px] flex justify-center items-center border border-white p-3 rounded-full"
									href={`mailto:${buData?.mailLink}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${buData?.title}'s Email Address`}>
									<Icon size={25} color="#fff" />
								</a>
							);
						})}
					</div>
				</div>
				<div className="col-span-5">
					<div className="flex justify-center h-full items-center">
						<div
							className="absolute w-[35px] h-[35px] lg:w-[300px] lg:h-[300px] rotate-[25deg] rounded-[6px] lg:rounded-[30px] transition-transform duration-300 hover-trigger-element"
							style={{ backgroundColor: buData?.bgColor }}></div>
						<div className="absolute w-[35px] h-[35px] lg:w-[300px] lg:h-[300px] rotate-0 rounded-[6px] lg:rounded-[30px] bg-white">
							<div className="flex justify-center items-center h-full">
								<img
									src={buData?.logo}
									alt={`${buData?.title} logo`}
									className="w-[27px] lg:w-[200px] h-[27px] lg:h-[200px] object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-12 flex justify-between items-start">
					{buData?.taglines.map((tagline, index) => (
						<div key={index} className="w-[300px]">
							<h2 className="text-3xl font-[800]">{tagline.title}</h2>
							<p className="text-lg font-[400]">{tagline.description}</p>
						</div>
					))}
				</div>
				<HeroBackground haxColor={buData?.bgColor} />
			</section>

			{/* up coming events section */}
			{buData?.upComingEventsData && (
				<UpComingEvents upComingEventsData={buData.upComingEventsData} />
			)}

			{/* achievement section */}
			<section
				ref={countUpRef}
				className="relative overflow-hidden flex flex-col items-center text-center space-y-[32px] px-56 py-[96px]">
				<div className="space-y-[20px] px-72">
					<h2 className="text-2xl font-semibold">Why Leading Businesses</h2>
					<h1 className="text-5xl gilda-font">Choose Magna Partners</h1>
					<p className="text-lg font-normal">
						These numbers are more than just figures, they represent our dedication to
						making a meaningful difference and driving progress. We continue to strive
						for excellence, aiming to create even greater impacts in the years to
						come.
					</p>
				</div>
				<div className="w-full flex justify-between gap-[14px] border border-white bg-white/15 backdrop-blur-lg px-[80px] py-[30px] rounded-[12px]">
					{buData?.achievements.map((item, i) => (
						<div key={i} className="flex flex-col items-center gap-[12px]">
							<h1 className="text-5xl font-semibold">
								{inView && <CountUp end={item.end} duration={2} />}
								{item.suffix}
							</h1>
							<p className="text-base font-normal">{item.label}</p>
						</div>
					))}
				</div>
				<div className="absolute -z-10 w-[400px] h-[400px] bg-[#137CF8] rounded-full -left-[50px] bottom-0 blur-[140px]"></div>
				<div className="absolute -z-10 w-[400px] h-[400px] bg-[#137CF8] rounded-full right-[50px] top-0 blur-[140px]"></div>
				<img
					className="absolute -z-10 bottom-0 left-0 w-full h-full"
					src="/assets/img/impact-img.png"
					alt=""
				/>
			</section>

			{/* clients reviews section */}
			<section className="flex flex-col items-center space-y-[40px] px-96 py-[80px]">
				<h1 className="text-5xl gilda-font">What They Say?</h1>
				<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
					{buData?.clientsReviews.map((reviewData, index) => (
						<div
							key={index}
							className="break-inside-avoid border border-[#262626] space-y-[20px] p-[24px] mb-6 inline-block w-full">
							<div className="space-y-[4px]">
								<h1 className="text-lg font-semibold">{reviewData.name}</h1>
								<h2 className="text-base font-normal">{reviewData.position}</h2>
							</div>
							<p className="text-base font-normal">"{reviewData.description}"</p>
						</div>
					))}
				</div>
			</section>

			{/* previous event gallery section */}
			<section className="px-56 py-[40px] space-y-[40px]">
				<div className="text-center flex flex-col items-center gap-y-[20px] px-96">
					<h1 className="text-5xl gilda-font">Previous Event Gallery</h1>
					<p className="text-lg font-normal">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, lorem
						quis tempor suscipit, nisl enim pellentesque turpis,{" "}
					</p>
				</div>
				<div className="flex justify-between px-60">
					{buData?.previousEventGallery.map((event, index) => (
						<div
							onClick={() => setPrevEventGalleryPopUp(true)}
							key={index}
							className="relative w-[304px] h-[304px] rounded-[8px]">
							<img
								className="w-full h-full object-cover rounded-[8px]"
								src={event.imageUrl}
								alt="Previous Event Image"
							/>
							<div className="absolute top-0 z-10 w-full h-full bg-black/10 rounded-[8px]"></div>
							<div className="absolute bottom-5 left-3 space-y-[12px]">
								<p className="bg-gradient-to-r from-[#82cfff] to-[#B2EBFF] text-transparent bg-clip-text font-semibold backdrop-blur-xl px-[12px] py-[4px] rounded-[8px]">
									{event.date}
								</p>
								<h1 className="text-2xl font-bold text-white">{event.title}</h1>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* contact section */}
			<section className="text-center flex flex-col items-center gap-y-[40px] px-56 py-[80px]">
				<h1 className="text-5xl gilda-font">How We Can Help You?</h1>
				<p className="text-lg font-normal">
					If you have any issues, please reach out to our designated contact person.
				</p>
				<div className="flex justify-between gap-x-7">
					{buData?.contacts.middle.map((contact, index) => {
						const Icon = iconMapper[contact.icon];
						return (
							<a
								key={index}
								href={contact.link}
								target="_blank"
								rel="noopener noreferrer">
								<button className="flex items-center text-xl font-normal border border-white rounded-full px-[60px] py-[12px] gap-[10px]">
									{contact.title}
									<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
										<Icon size={16} color="white" />
									</div>
								</button>
							</a>
						);
					})}
				</div>
			</section>

			{/* contact section */}
			<section className="relative px-56 py-[80px] space-y-[64px]">
				<div className="text-center flex flex-col items-center gap-y-[20px]">
					<h2 className="text-2xl font-semibold">Contact Us</h2>
					<h1 className="text-5xl gilda-font">
						Stay connected with Magna Partners!
					</h1>
				</div>
				<div className="flex justify-center gap-x-[56px]">
					{buData?.contacts.bottom.map((contact, index) => {
						const Icon = iconMapper[contact.icon];
						return (
							<button
								key={index}
								className="flex items-center text-xl font-normal gap-[10px]">
								<div className="flex justify-center items-center border border-full rounded-full w-[36px] h-[36px]">
									<Icon size={16} color="white" />
								</div>
								{contact.title}
							</button>
						);
					})}
				</div>
				<img
					className="absolute -z-10 bottom-0 left-0 w-full h-full"
					src="/assets/img/footer-bg.webp"
					alt=""
				/>
			</section>

			{/* prev event gallery pop up */}
			{prevEventGalleryPopUp && (
				<section className="fixed inset-0 z-50 w-full h-screen bg-black/80 grid grid-cols-12 items-center">
					<div className="col-start-5 col-end-9 flex flex-col items-end gap-y-[10px]">
						<ExitIcon
							onClick={() => setPrevEventGalleryPopUp(false)}
							size={20}
							color="white"
						/>
						<div className="relative w-full h-[500px] rounded-[8px]">
							<img
								className="w-full h-full object-cover rounded-[8px]"
								src="/assets/img/prevEventImage.png"
								alt="Previous Event Image"
							/>
							<div className="absolute top-0 z-10 w-full h-full bg-black/10 rounded-[8px]"></div>
							<div className="absolute bottom-5 left-3 space-y-[12px]">
								<p className="bg-gradient-to-r from-[#82cfff] to-[#B2EBFF] text-transparent bg-clip-text font-semibold backdrop-blur-xl px-[12px] py-[4px] rounded-[8px]">
									March 03, 2024
								</p>
								<h1 className="text-2xl font-bold text-white">Judul Event</h1>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}

export default BusinessUnit;
