'use client';

import React from 'react';
import Image from 'next/image';
import {Separator} from "@/components/ui/separator";


export default function Logo(){
    return (
        <div className='text-2xl font-bold'>
            <div className="flex items-center space-x-1">
                   <h6 className="text-white logo-font" style={{ fontSize: '34px' }}>
                    Listopia
                   </h6>
                   <Separator orientation='vertical' className = 'bg-white/20 h-[20px]' />
                   <Image src="/listopia.svg" alt="Logo" width={30} height={30}/>
                </div>
        </div>
    );
};