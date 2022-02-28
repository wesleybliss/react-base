import cn from 'classnames'

import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import ThemeToggle from '@components/ThemeToggle'

import './Navbar.css'

const Navbar = () => {
    
    return (
        
        <nav className="Navbar">
            
            <div className="flex items-center content-center flex-grow h-full">
                <Link
                    className="branding"
                    to="/">
                    {document.title?.toUpperCase() ?? ''}
                </Link>
            </div>
            
            <div className="flex items-center content-center">
                
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/">ABOUT</NavLink>
                <NavLink to="/">NEWS</NavLink>
                <NavLink to="/">CONTACT</NavLink>
                <NavLink to="/">HELP</NavLink>
                
                <ThemeToggle className={cn(
                    'flex justify-center items-center content-center',
                    'mx-3 px-1 pt-2 text-2xl font-bold',
                )} />
                
            </div>
            
        </nav>
        
    )
    
}

export default Navbar
