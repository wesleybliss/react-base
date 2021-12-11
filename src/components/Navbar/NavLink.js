import cn from 'classnames'

import { Link } from 'react-router-dom'

const NavLink = ({
    className,
    children,
    ...props
}) => {
    
    return (
        
        <Link
            className={cn(
                'mx-3 px-1 pt-4',
                'text-gray-200 hover:text-white',
                'text-lg font-bold',
                className,
            )}
            {...props}>
            {children}
        </Link>
        
    )
    
}

export default NavLink
