import React from 'react';

// Nextjs ISR caching strategy
export const revalidate = false;

export default function page(){
    return (
        <div>
            content
        </div>
    );
};

// Nextjs dynamic metadata
export function generateMetadata() {
    return {
        title: `Page - Title here`,
        description: `Page - Description here`,
        icons: {
            icon: `path to asset file`,
        },
    };
}
