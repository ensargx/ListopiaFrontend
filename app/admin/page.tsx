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
        title: `Admin - Dashboard`,
        description: `Only Staff`,
        icons: {
            icon: `path to asset file`,
        },
    };
}
