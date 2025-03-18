'use client';

import { Separator } from '@/components/ui/separator';
import React from 'react';
import Image from 'next/image';


export default function Logo(){
    return (
        <div className='text-2xl font-bold'>
            <div className="flex items-center space-x-1">
                   <p className="text-white logo-font" style={{ fontSize: '34px' }}>
                    Listopia
                   </p>
                   <Separator orientation='vertical' className = 'bg-white/20 h-[20px]' />
                   <Image src="/listopia.svg" alt="Logo" width={30} height={30}/>
                </div>
        </div>
    );
};