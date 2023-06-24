"use client";
import { FormattedPost } from "@/app/types";
import React, { useState } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/loading";
import Image from "next/image";
import SocialLinks from "@/app/(shared)/SocialLinks";
import { useEditor, EditorContent, } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
type Props = {
  post: FormattedPost | null;
};

const Content = ({ post }: Props) => {
  if (!post) return <Loading />;

  const [isEditable, setIsEditable] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>(post.title);
  const [titleError, setTitleError] = useState<string>("");
  const [content, setContent] = useState<string>(post.content);
  const [contentError, setContentError] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
  })

  const handleSubmit = () => { };
  return (
    <div className="prose w-full max-w-full mb-10">
      {/** BREADCRUMBS */}
      <h5 className="text-wh-300">{`home > ${post.category} > ${post.title}`}</h5>

      {/**category */}
      <div className="flex justify-between items-center">
        <h4 className="bg-accent-orange py-2 px-5 tex-wh-900 text-sm font-bold">
          {post.category}
        </h4>
        <div className="mt-4">
          {isEditable ? (
            <div className="flex justify-between gap3">
              <button onClick={() => console.log("cancel edit")}>
                <XMarkIcon className="h-6 w-6 text-accent-red" />
              </button>
            </div>
          ) : (
            <button onClick={() => console.log("cancel edit")}>
              <PencilSquareIcon className="h6 w-6 text-accent-red" />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={(e) => {
                  console.log("change title", e.target.value);
                }}
                value={title}
              />
            </div>
          ) : (
            <h3 className="font-bold text-xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3 ">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs">{post.createdAt}</h6>
          </div>
        </>
        {/* IMAGE */}
        <div className="relative w-auto mt-2 mb-16 h-96">
          <Image
            fill
            src={post.image}
            alt={post.title}
            sizes="(max-width: 480px) 100vw,
                    (max-width: 748px) 75vw
                    (max-width: 1060px) 50vw
                    33vw"
            style={{ objectFit: "cover" }}
          />
        </div>

            <div className={isEditable ? "border-2 rounded-md bg-wh-50 p-3" : "w-full max-w-full "}>
            {isEditable && (
              <></>
            )}
            <EditorContent editor={editor} />
            </div>

        {/* SUBMIT BUTTON */}
        {isEditable && (
          <div className="flex justify-end">
            <button className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5">
              SUBMIT
            </button>
          </div>
        )}
      </form>

      {/* SOCIAL LINKS */}
      <div className="hidden md:block mt-10 w-1/3">
        <SocialLinks isDark/>
      </div>
    </div>
  );
};

export default Content;
