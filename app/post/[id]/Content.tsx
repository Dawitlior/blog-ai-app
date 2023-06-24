"use client";
import { FormattedPost } from "@/app/types";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/loading";

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
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
