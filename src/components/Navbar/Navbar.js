import cn from 'classnames'

import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import ThemeToggle from '@components/ThemeToggle'

const Navbar = () => {
    
    return (
        
        <nav className={cn(
            'Navbar absolute top-0 left-0 right-0',
            'w-full max-w-screen-2xl mx-auto',
            'flex items-center content-center pl-4 pb-4',
            'text-white',
        )}>
            
            <div className="flex items-center content-center flex-grow h-full">
                <Link
                    className={cn(
                        'flex flex-col items-center content-center pt-4 text-lg font-bold opacity-50',
                        'hover:opacity-100',
                        'transition-opacity duration-500 ease-in-out',
                        'w-18 text-justify break-normal'
                    )}
                    to="/">
                    {document.title?.toUpperCase() ?? ''}
                </Link>
            </div>
            
            <div className="flex items-center content-center">
                
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/">ABOUT</NavLink>
                <NavLink to="/">NEWS</NavLink>
                <NavLink to="/">PROJECTS</NavLink>
                <NavLink to="/">COMMUNITY</NavLink>
                
                <ThemeToggle className={cn(
                    'flex justify-center items-center content-center',
                    'mx-3 px-1 pt-4 text-gray-200 hover:text-white text-lg font-bold',
                )} />
                
            </div>
            
        </nav>
        
    )
    
}

export default Navbar
