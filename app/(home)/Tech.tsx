import React from "react";
import Card from "@/app/(shared)/Card";
import { Post } from "@prisma/client";

type Props = {
  techPosts: Array<Post>;
};

const Tech = ({ techPosts }: Props) => {
  return (
    <section>
      <hr className="border-1" />
      <div className="flex items-center gap-3 my-8">
        <h4 className="bg-accent-orange py-2 px-5 text-wh-900 text-sm font-bold">
          HOT
        </h4>
        <p className="font-bold text-2xl">Latest news in technologies</p>
      </div>
      <div className="sm:grid grid-cols-2 grid-rows-3 gap-x-8 gap-y-8 my-5">
        <Card
          className="col-span-1 row-span-3"
          isLongForm
          post={techPosts[0]}
          imageHeight="h-96"
        />
        <Card
          className="col-span-1 row-span-1 mt-10 sm:mt-0 flex justify-between gap-3"
          isSmallCard
          post={techPosts[1]}
          imageHeight="h-48"
        />
        <Card
          className="col-span-1 row-span-1 mt-10 sm:mt-0 flex justify-between gap-3"
          isSmallCard
          post={techPosts[2]}
          imageHeight="h-48"
        />
        <Card
          className="col-span-1 row-span-1 mt-10 sm:mt-0 flex justify-between gap-3"
          isSmallCard
          post={techPosts[3]}
          imageHeight="h-48"
        />
      </div>
    </section>
  );
};

export default Tech;
