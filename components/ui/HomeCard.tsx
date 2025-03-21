import {Movie} from "@/components/utils/image_urls";
import {useState} from "react";
import {Card, CardAction, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {TruncatedTitle} from "@/components/utils/TruncatedTitle";
import {CircleCheck, CirclePlus, Eye, EyeClosed} from "lucide-react";
import * as React from "react";

export function HomeCard({ id, title, rating, description, url }: Movie) {
    const [watchLater, setWatchLater] = useState(false);
    const [addList, setAddList] = useState(false);

    const handleWatchLater = () => {
        console.log("Watch Later önce:", watchLater);
        setWatchLater(prev => !prev);
        console.log("Watch Later sonra:", !watchLater);
    };

    const handleAddList = () => {
        console.log("Add List önce:", addList);
        setAddList(prev => !prev);
        console.log("Add List sonra:", !addList);
    };

    return (
        <Card >
            <CardContent className="flex flex-col items-center justify-center text-center p-5">
                <Image
                    loading="lazy"
                    src={url}
                    alt={`Poster ${id + 1}`}
                    width={200}
                    height={300}
                    className="object-cover rounded-md shadow-lg border-gray-900"
                />
                <TruncatedTitle title={title} maxLength={90} />
                <p className="text-gray-600">{description}</p>
                <div className="mt-2 flex items-center justify-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1">{rating}</span>
                </div>
            </CardContent>
            <CardAction className="flex m-5 gap-5">
                <button
                    onClick={handleWatchLater}
                >
                    {watchLater ? <Eye /> : <EyeClosed />}
                    {watchLater ? "Added": "Watch Later"}

                </button>
                <button
                    onClick={handleAddList}
                >
                    {addList ? <CircleCheck /> : <CirclePlus />}
                    {addList ? "Added": "Add List"}
                </button>
            </CardAction>
        </Card>
    );
}
