import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { storage, db } from "config/firebase";
import Picker from "@emoji-mart/react";

function Input() {
  // handler textarea
  const [input, setInput] = useState("");

  // handler img value
  const [selectedFile, setSelectedFile] = useState(null);

  // shows or not emojis
  const [showEmojis, setShowEmojis] = useState(false);

  // handler loading when sendPost
  const [loading, setLoading] = useState(false);

  // reference input file to img icon
  const filePickerRef = useRef(null);

  // sending posts to firestore function
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    // create new posts using firestore function in posts collection
    const docRef = await addDoc(collection(db, "posts"), {
      text: input,
      timestamp: serverTimestamp(), // make beautifull timestamp
    });

    // membuat folder baru pada storage firebase
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // melakukan upload file img
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef); // url img
        // update collections posts
        await updateDoc(doc(db, "posts", docRef.id), { image: downloadURL });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  // adding img to textarea dlm bentuk url
  const addImageToPost = (e) => {
    const reader = new FileReader();

    // mengambil data dari file img
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // ubah data img -> url
    }

    // simpan url img ke state agar img preview muncul
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  };


  return (
    <div className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 ${loading && "opacity-60"}`}>
      <img src="/profile.jpg" alt="" className="h-11 w-11 cursor-pointer rounded-full" />
      <div className="w-full divide-y divide-gray-800">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="h-5 text-white" />
              </div>
              <img src={selectedFile} alt="" className="max-h-80 rounded-2xl object-contain" />
            </div>
          )}

        </div>

        {/* Bottom Input icon */}
        {!loading &&
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div className="icon" onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className="h-[22px] text-primary" />
                <input type="file" onChange={addImageToPost} ref={filePickerRef} hidden />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="h-[22px] text-primary" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="h-[22px] text-primary" />
              </div>

              <div className="icon">
                <CalendarIcon className="h-[22px] text-primary" />
              </div>

              {/* Emoji modals */}
              {showEmojis && (
                <div className="absolute mt-[465px] -ml-10 overflow-hidden rounded-3xl">
                  {/* add emoji to textarea field function */}
                  <Picker theme="dark" onEmojiSelect={(e) => setInput(input + e.native)} />
                </div>
              )}
            </div>

            {/* Input Tweet Buttton */}
            <button
              className="rounded-full bg-[#1d9bf0] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]"
              disabled={!input.trim() && !selectedFile} // buat button disable jika input dan selectedFile = false
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        }

      </div>
    </div>
  );
}

export default Input;
