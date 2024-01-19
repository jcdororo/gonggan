"use client";
import React, { useState } from "react";
import Surroundings from "./Surroundings";
import { PlaceType } from "../interface";
import { BiCurrentLocation } from "react-icons/bi";

import { BsFillPinMapFill } from "react-icons/bs";

interface SpaceProps {
  category: string;
  places: PlaceType[];
}

export default function Space({ category, places }: SpaceProps) {
  return (
    <>
      <div className="flex items-center justify-center mx-2 mt-8 md:mt-0 gap-3 bg-sygnature-beige w-48 h-12 rounded-3xl shadow-lg">
        <BiCurrentLocation size="24" className="pb-[1px] animate-pulse" />
        <p className="text-2xl font-bold pr-[9px]">{category} 공간</p>
      </div>
      <div className="my-4 md:mx-2 w-full h-[200px] md:h-[425px] overflow-y-scroll  rounded-xl shadow-xl">
        <Surroundings places={places} />
      </div>
    </>
  );
}
