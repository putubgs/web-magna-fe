interface CalendarIconProps {
	height: number;
	width: number;
}

export const CalendarIcon = (props: CalendarIconProps) => {
	return (
		<svg
			height={props.height}
			width={props.width}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17 4H3C1.89543 4 1 4.89543 1 6V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V6C19 4.89543 18.1046 4 17 4Z"
				stroke="#A3A3A3"
			/>
			<path
				d="M1 8C1 6.114 1 5.172 1.586 4.586C2.172 4 3.114 4 5 4H15C16.886 4 17.828 4 18.414 4.586C19 5.172 19 6.114 19 8H1Z"
				fill="#A3A3A3"
			/>
			<path d="M5 1V4M15 1V4" stroke="#A3A3A3" stroke-linecap="round" />
			<path
				d="M8.5 10H5.5C5.22386 10 5 10.2239 5 10.5V11.5C5 11.7761 5.22386 12 5.5 12H8.5C8.77614 12 9 11.7761 9 11.5V10.5C9 10.2239 8.77614 10 8.5 10Z"
				fill="#A3A3A3"
			/>
			<path
				d="M8.5 14H5.5C5.22386 14 5 14.2239 5 14.5V15.5C5 15.7761 5.22386 16 5.5 16H8.5C8.77614 16 9 15.7761 9 15.5V14.5C9 14.2239 8.77614 14 8.5 14Z"
				fill="#A3A3A3"
			/>
			<path
				d="M14.5 10H11.5C11.2239 10 11 10.2239 11 10.5V11.5C11 11.7761 11.2239 12 11.5 12H14.5C14.7761 12 15 11.7761 15 11.5V10.5C15 10.2239 14.7761 10 14.5 10Z"
				fill="#A3A3A3"
			/>
			<path
				d="M14.5 14H11.5C11.2239 14 11 14.2239 11 14.5V15.5C11 15.7761 11.2239 16 11.5 16H14.5C14.7761 16 15 15.7761 15 15.5V14.5C15 14.2239 14.7761 14 14.5 14Z"
				fill="#A3A3A3"
			/>
		</svg>
	);
};
