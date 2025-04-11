import {CardDescription} from "../ui/card";

export const TruncatedTitle = ({ title, maxLength }: { title: string, maxLength: number }) => {
    const truncatedTitle = title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    return (
        <CardDescription className="flex text-xl font-bold m-2 px-6 w-full truncate justify-items-center">
            {truncatedTitle}
        </CardDescription>
    );
};