import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";

function Post({ id, post, postPage }) {
  return (
    <div className="flex cursor-pointer border-b border-gray-700 p-3">
      {!postPage && (
        <img
          src={post?.userImg}
          alt="Profile Picture"
          className="mr-4 h-11 w-11 rounded-full"
        />
      )}

      <div className="flex w-full flex-col space-y-2">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Picture"
              className="mr-4 h-11 w-11 rounded-full"
            />
          )}
          <div className="text-secondary">
            <div className="group inline-block">
              <h4
                className={`text-[15px] font-bold text-secondary group-hover:underline sm:text-base ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag} &bull;
              </span>
            </div>
            <span className="text-sm hover:underline sm:text-[15px]">
              {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
            </span>
            {!postPage && (
              <p className="mt-0.5 text-[15px] text-secondary sm:text-base">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group ml-auto flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-primary" />
          </div>
        </div>
        {postPage && (
          <p className="mt-0.5 text-[15px] text-secondary sm:text-base">
            {post?.text}
          </p>
        )}
        <img
          src={post?.image}
          alt=""
          className="mr-2 max-h-[750px] rounded-2xl object-cover"
        />
      </div>
    </div>
  );
}

export default Post;
