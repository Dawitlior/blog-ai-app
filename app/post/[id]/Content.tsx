"use client";
import { FormattedPost } from "@/app/types";
import React, { useState } from "react";
import Loading from "@/app/loading";
import Image from "next/image";
import SocialLinks from "@/app/(shared)/SocialLinks";
import { useEditor, EditorContent, Editor, } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./editorMenuBar";
import CategoryAndEdit from "./CategoryAndEdit";
type Props = {
  post: FormattedPost | null;
};

const Content = ({ post }: Props) => {
  if (!post) return <Loading />;

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(post.title);
  const [titleError, setTitleError] = useState<string>("");
  const [tempTitle, setTempTitle] = useState<string>(title);

  const [content, setContent] = useState<string>(post.content);
  const [contentError, setContentError] = useState<string>("");
  const [tempContent, setTempContent] = useState<string>(content);

  const date = new Date(post?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("en-US", options)

   
  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  }

  const handleOnChangeTitle = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    if(title) setTitleError("")
    setTitle(e.target.value)
  }

  const handleOnChangeContent = ({editor}: any) => {
    if(!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML())
  }

  const editor = useEditor({
    extensions: [StarterKit,],
    onUpdate: handleOnChangeContent,
    content: content ,
    editable: isEditable
  })

  const handleSubmit = () => { };

  return (
    <div className="prose w-full max-w-full mb-10">
      {/** BREADCRUMBS */}
      <h5 className="text-wh-300">{`home > ${post.category} > ${post.title}`}</h5>

      {/**category and edit */}
      <CategoryAndEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        title={title}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        editor={editor}
        post={post}
      />

      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              />
            </div>
          ) : (
            <h3 className="font-bold text-xl mt-3">{title}</h3>
          )}
          <div className="flex gap-3 ">
            <h5 className="font-semibold text-xs">By {post.author}</h5>
            <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
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
              <>
              <EditorMenuBar editor={editor} />
              <hr className="border-1 mt-2 mb-5" />
              </>
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
