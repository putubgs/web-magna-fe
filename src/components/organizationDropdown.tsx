import { ChevronDown } from "lucide-react";
import { useState } from "react";

const organizations = [
  "Career Compas",
  "Tech Fusion",
  "Competition Realms",
  "Link to Work",
  "SisuLab",
  "VirtualXplore",
  "College Copilot",
];

type OrganizationDropdownProps = {
  organization: string;
  setOrganization: (value: string) => void;
};

export default function OrganizationDropdown({
  organization,
  setOrganization,
}: OrganizationDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative block w-72 ${
        organization ? "text-white" : "text-neutral-500"
      }`}
    >
      <p className="text-xs sm:text-base font-bold text-white ">
        Organization
      </p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full mt-1 border border-neutral-500 text-left px-4 py-2 rounded-md flex justify-between items-center`}
      >
        {organization || "Select Organization"}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          className={`absolute z-10 mt-1 w-full bg-neutral-900 border border-neutral-500 rounded-md shadow-lg max-h-60 overflow-auto`}
        >
          {organizations.map((org, index) => (
            <li
              key={index}
              onClick={() => {
                setOrganization(org);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-white hover:text-black"
            >
              {org}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
