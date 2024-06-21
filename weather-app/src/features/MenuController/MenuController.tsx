"use client";

import { Locations } from "@/sharedTypes";
import Link from "next/link";

type MenuControllerProps = {
  active: string;
};

export default function MenuController({ active }: MenuControllerProps) {
  return (
    <div className="flex gap-3">
      {Locations.map((location) => (
        <Link
          key={location.name}
          href={`/city/${location.url}`}
          className={`py-1 px-4 flex-grow hover:bg-black bg-[#e1dcd7] text-center uppercase hover:text-white rounded-md font-semibold cursor-pointer ${
            active === location.url ? "bg-black text-white hover:bg-black" : ""
          }`}
        >
          {location.name}
        </Link>
      ))}
    </div>
  );
}
