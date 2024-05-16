import React from "react";
import { Skeleton } from "./ui/skeleton";

function SkeletonStory() {
  return (
    <div className="max-w-4xl p-6 mx-auto mt-20 opacity-20 md:mt-0">
      <div className="flex items-center justify-between mt-8 mb-10">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
          <div className="space-y-3">
            <Skeleton className="h-4 w-28"></Skeleton>
            <Skeleton className="w-20 h-4"></Skeleton>
          </div>
        </div>

        <Skeleton className="w-24 h-11"></Skeleton>
      </div>
      <Skeleton className="my-6 h-11 w-80"></Skeleton>
      <div className="my-6">
        <Skeleton className="w-full h-4 my-3"></Skeleton>
        <Skeleton className="w-full h-4 my-3"></Skeleton>
        <Skeleton className="w-full h-4 my-3"></Skeleton>
        <Skeleton className="w-2/3 h-4 my-3"></Skeleton>
      </div>
      <Skeleton className="h-[600px]"></Skeleton>
      <div className="my-6">
        <Skeleton className="w-full h-4 my-3"></Skeleton>
        <Skeleton className="w-full h-4 my-3"></Skeleton>
        <Skeleton className="w-full h-4 my-3"></Skeleton>
        <Skeleton className="w-2/3 h-4 my-3"></Skeleton>
      </div>
    </div>
  );
}

export default SkeletonStory;
