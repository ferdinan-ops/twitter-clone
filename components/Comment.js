import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import React from "react";
import Moment from "react-moment";

function Comment({ id, comment }) {
  return (
    <div className="flex cursor-pointer border-b border-gray-700 p-3">
      <img
        src={comment.userImg}
        alt=""
        className="mr-4 h-11 w-11 rounded-full"
      />
      <div className="flex w-full flex-col space-y-2">
        <div className="flex justify-between">
          <div className="text-secondary">
            <div className="group inline-block">
              <h4 className="inline-block text-[15px] font-bold text-secondary group-hover:underline sm:text-base">
                {comment.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment.tag} &bull;
              </span>
            </div>
            <span className="ml-1 text-sm hover:underline sm:text-[15px]">
              <Moment fromNow>{comment.timestamp.toDate()}</Moment>
            </span>
            <p className="mt-0.5 max-w-lg overflow-scroll text-[15px] text-secondary sm:text-base">
              {comment.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-primary" />
          </div>
        </div>

        <div className="flex w-10/12 justify-between text-[#6e767d]">
          <div className="icon group">
            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="group flex items-center space-x-1">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="text-sm group-hover:text-pink-600"></span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
