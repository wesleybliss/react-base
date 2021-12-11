import { useWireValue } from '@forminator/react-wire'
import * as store from '@store'
import * as actions from '@actions'
import cn from 'classnames'

import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeToggle = ({
    className,
}) => {
    
    const theme = useWireValue(store.theme)
    
    const ThemeIcon = theme === 'light' ? FaSun : FaMoon
    
    return (
        
        <div className={className}>
            
            <ThemeIcon
                className={cn(
                    'cursor-pointer', {
                        'text-gray-800 dark:text-gray-200': !className,
                    }
                )}
                onClick={actions.toggleTheme} />
            
        </div>
        
    )
    
}

ThemeToggle.defaultProps = {
    className: '',
}

export default ThemeToggle
