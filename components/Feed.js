import { SparklesIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "./Input";

function Feed() {
  return (
    <div className="max-w-2xl flex-grow border-l border-gray-700 text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky flex items-center border-b border-gray-700 bg-black py-2 px-3 text-secondary sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="hoverAnimation ml-auto flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />
    </div>
  );
}

export default Feed;
