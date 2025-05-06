interface AdminCalendarIconProps {
	height: number;
	width: number;
	color: string;
}

export const AdminCalendarIcon = (props: AdminCalendarIconProps) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 24 25"
			fill={props.color}
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17 12.5H12V17.5H17V12.5ZM16 1.5V3.5H8V1.5H6V3.5H5C3.89 3.5 3.01 4.4 3.01 5.5L3 19.5C3 20.0304 3.21071 20.5391 3.58579 20.9142C3.96086 21.2893 4.46957 21.5 5 21.5H19C20.1 21.5 21 20.6 21 19.5V5.5C21 4.4 20.1 3.5 19 3.5H18V1.5H16ZM19 19.5H5V8.5H19V19.5Z"
				fill={props.color}
			/>
		</svg>
	);
};
