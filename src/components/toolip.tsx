import { useRef, useEffect } from "react";

type TooltipProps = {
  toolipData: (string | string[])[][];
  toolipGuide?: string[];
  className?: string;
  onClose: () => void;
};

export default function Toolip({
  toolipData,
  onClose,
  toolipGuide,
  className,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={`absolute z-10 top-8 -right-5 flex flex-col ${className}`}>
      <div className="mr-4 flex justify-end">
        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-neutral-800 z-20"></div>
        <div className="w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-neutral-800 z-20"></div>
      </div>
      <table
        ref={tooltipRef}
        className="shadow-2xl rounded-t-[12px] overflow-hidden"
      >
        <thead className="bg-neutral-800 rounded-t-2xl">
          <tr className="font-bold text-white">
            {toolipData[0].map((data, index) => (
              <td
                key={index}
                className="text-center whitespace-nowrap px-20 py-[12px]"
              >
                {data}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="bg-neutral-900">
          {toolipData[1].map((data, index) => (
            <tr key={index}>
              <td className="text-center whitespace-nowrap px-10 py-[12px] font-bold">
                {data[0]}
              </td>
              <td className="text-center whitespace-nowrap px-20 py-[12px]">
                {data[1]}
              </td>
              <td className="text-center whitespace-nowrap px-20 py-[12px]">
                {data[2]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toolipGuide?.map((guide, index) => (
        <div key={index} className="w-full bg-neutral-900 py-[12px] border-t-[0.5px] border-white text-center whitespace-nowrap text-neutral-200 text-sm">
		  {guide}
		</div>
      ))}
    </div>
  );
}
