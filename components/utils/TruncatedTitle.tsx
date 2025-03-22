import {CardDescription} from "@/components/ui/card";
import * as React from "react";

export const TruncatedTitle = ({ title, maxLength }: { title: string, maxLength: number }) => {
    const truncatedTitle = title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    return (
        <CardDescription className="text-xl font-bold m-2 px-6 w-full truncate justify-items-center">
            {truncatedTitle}
        </CardDescription>
    );
};