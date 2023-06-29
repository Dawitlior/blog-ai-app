import { prisma } from '@/app/api/client'
import React from 'react'
import { Post as PostType } from '@prisma/client'
import { FormattedPost } from '@/app/types'
import Sidebar from '@/app/(shared)/Sidebar'
import Content from "@/app/post/[id]/Content"

type Props = {
    params: { id: string }
};

export const revalidate = 60;

const getPost = async (id: string) => {
    const post: PostType | null = await prisma.post.findUnique({
        where: { id }
    });

    if (!post) {
        console.log(`Post with id: ${id} not found`)
        return null;
    }
    /** formatting for the Date object */
    const formattedPost = {
        ...post,
        createdAt: post?.createdAt?.toISOString(),
        updatedAt: post?.updatedAt?.toISOString(),
    };

    {/** IF ITS NOT PRISMA(an Api call)
    const response = await fetch(
        url,
        {
        cache: "force-cache", //SSG (getStaticSideProps)
        cache: "no-store", // SSR (getServerSideProps)
        next: {revalidate: 60}, // ISR (revalidation)
        }
    );
    const post: Post = await postResponse.json()
*/}
    return formattedPost;
}

const Post = async ({ params }: Props) => {
    const { id } = params;
    const post: FormattedPost | null = await getPost(id)

    if (!post) {
        return <div>Post Not Exist</div>
    }
    return (
        <main className="px-10 leading-7">
            <div className="md:flex gap-10 mb-5">
                <div className="basis-3/4">
                    <Content post={post} />
                </div>
                <div className="basis-1/4">
                    <Sidebar />
                </div>
            </div>
        </main>
    )
}

export default Post;