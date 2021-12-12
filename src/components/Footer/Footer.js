import cn from 'classnames'

import { Link } from 'react-router-dom'

const Footer = () => {
    
    return (
        
        <div
            className={cn(
                'Footer',
                'grid grid-cols-3 gap-10 items-center content-center',
                'w-full p-6',
                'text-gray-200',
                'bg-gray-900',
            )}>
            
            <div className="">
                <h4 className="text-xl text-center font-bold">
                    SECTION
                </h4>
                <div className="flex flex-col justify-start items-center">
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                </div>
            </div>
            
            <div className="">
                <h4 className="text-xl text-center font-bold">
                    SECTION
                </h4>
                <div className="flex flex-col justify-center items-center">
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                </div>
            </div>
            
            <div className="">
                <h4 className="text-xl text-center font-bold">
                    SECTION
                </h4>
                <div className="flex flex-col justify-end items-center">
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                    <Link className="" to="/">ITEM</Link>
                </div>
            </div>
            
        </div>
        
    )
    
}

export default Footer
