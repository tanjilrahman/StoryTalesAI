import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ClipPath from "../assets/svg/ClipPath";

function SkeletonStoryCard() {
  return (
    <>
      <div className="block relative p-0.5 opacity-20">
        <Skeleton
          className="absolute inset-0.5"
          style={{ clipPath: "url(#benefits)" }}
        >
          <div className="absolute inset-0 transition-opacity cursor-pointer hover:opacity-70"></div>
        </Skeleton>
        <div className="relative z-2 flex flex-col min-h-[30rem] pointer-events-none">
          <div className="relative px-8 mt-auto z-2"></div>
        </div>
        <ClipPath />
      </div>
    </>
  );
}

export default SkeletonStoryCard;
