import { cn } from "../../lib/utils"
import React from 'react';

export default function Container({
    className,
    children
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("w-full h-full", className)}>
            {children}
        </div>
    );
}
