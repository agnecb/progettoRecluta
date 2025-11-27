"use client";

import PostCard from "../molecules/PostCard";
import { Separator } from "../ui/separator";

interface Post {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    likes?: number;
    comments?: number;
}

interface FeedProps {
    posts: Post[];
}

export default function Feed({ posts }: FeedProps) {
    if (posts.length === 0) {
        return <p className="text-gray-400 text-center py-10">Nessun post disponibile</p>;
    }

    return (
        <div>
            {posts.map((post, i) => (
                <div key={post.id}>
                    <PostCard {...post} />
                    {i < posts.length - 1 && <Separator className="my-0 bg-gray-400/20" />}
                </div>
            ))}

        </div>
    );
}
