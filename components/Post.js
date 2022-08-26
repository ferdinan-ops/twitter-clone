import {
  ChatIcon,
  DotsHorizontalIcon,
  SwitchHorizontalIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Moment from "react-moment";
import { modalState, postIdState } from "atoms/moduleAtom";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { db, storage } from "config/firebase";
import { deleteObject, ref } from "firebase/storage";

function Post({ id, post, postPage }) {
  const [postId, setPostId] = useRecoilState(postIdState);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments")), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [id]);

  useEffect(() => {
    // mengambil banyak dari like berdasarkan uid session
    setLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [id]);

  const handlerComment = (e) => {
    e.stopPropagation();
    setPostId(id);
    setIsOpen(true);
  };

  const deletePost = async (e) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "posts", id));
      if (post?.image) {
        const imageRef = ref(storage, `posts/${id}/image`);
        await deleteObject(imageRef);
      }
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (e) => {
    e.stopPropagation();
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  return (
    <div
      className="flex cursor-pointer border-b border-gray-700 p-3"
      onClick={() => Router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt="Profile Picture"
          className="mr-4 h-11 w-11 rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="flex w-full flex-col space-y-2">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Picture"
              className="mr-4 h-11 w-11 rounded-full"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="text-[#6e767d]">
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
            <span className="ml-1 text-sm hover:underline sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
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

        {/* Post text and image section */}
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

        {/* Post Icon */}
        <div
          className={`flex w-10/12 justify-between text-secondary ${
            postPage && "mx-auto"
          }`}
        >
          {/* Comment Icon */}
          <div
            className="group flex items-center space-x-1"
            onClick={handlerComment}
          >
            <div className="icon group-hover:bg-primary/10">
              <ChatIcon className="h-5 group-hover:text-primary" />
            </div>
            {comments.length > 0 && (
              <span className="text-sm group-hover:text-primary">
                {comments.length}
              </span>
            )}
          </div>

          {/* delete and switch icon */}
          {session.user.uid === post?.id ? (
            <div
              className="group flex items-center space-x-1"
              onClick={deletePost}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="group flex items-center space-x-1">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          {/* Like Icon */}
          <div className="group flex items-center space-x-1" onClick={likePost}>
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`text-sm group-hover:text-pink-600 ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          {/* Share Icon */}
          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-primary" />
          </div>

          {/* Chart icon */}
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
