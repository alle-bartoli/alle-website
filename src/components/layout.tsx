/*******************************************************************************
*                                                                              *
* Layout Component.                                                            *
*                                                                              *
*******************************************************************************/
import React from 'react';
import '../styles/global.css'



// Define props type.
type LayoutProps = {
    fullWidth: boolean,
    children?: React.ReactNode
};



export const Layout: React.FC<LayoutProps> = ( { children,  fullWidth = false}) => {
    return(
        <div 
            className={`
                ${fullWidth ? 'w-full' : 'max-w-[1000px]'} 
                flex-col justify-items-center items-center
                text-xs sm:text-base md:text-xl lg:text-2xl
                p-10 sm:p-10 md:p-16 lg:p-20
                mx-auto 
            `}
        >
            
            <main>{ children }</main>

            <footer className='flex-none absolute text-center bottom-0 py-10'>
                © {new Date().getFullYear()}, Alessandro Bartoli
            </footer>
        </div>
    ) 
};