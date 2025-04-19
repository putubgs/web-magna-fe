import { FC } from "react";

interface ExitIconProps {
	size?: number;
	color?: string;
	onClick?: () => void;
}

const ExitIcon: FC<ExitIconProps> = ({ size, color, onClick }) => (
	<svg
		onClick={onClick}
		style={{
			width: size ? `${size}px` : "100px",
			height: "auto",
			cursor: "pointer",
		}}
		viewBox="0 0 16 16"
		fill={color}
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8 8L15 15M8 8L1 1M8 8L1 15M8 8L15 1"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

export default ExitIcon;
