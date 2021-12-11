import PropTypes from 'prop-types'
import classnames from 'classnames'

const Button = ({
    children,
    className,
    type,
    customColors,
    customPadding,
    ...props
}) => {
    
    const isText = type === 'text'
    const isIcon = type === 'icon'
    
    const classes = classnames(
        'text-uppercase font-bold',
        className, {
            'px-2': !customPadding && isIcon,
            'px-8': !customPadding && !isIcon,
            'py-2': !customPadding && isIcon,
            'py-3': !customPadding && !isIcon,
            
            'text-gray-900': !customColors && !isText && !isIcon,
            'text-gray-100': isText,
            
            'bg-gray-100': !customColors && !isText && !isIcon,
            'bg-transparent': isText || isIcon,
            'border border-gray-200 rounded-sm': !customColors && !isText && !isIcon,
            'hover:bg-gray-200 hover:border-gray-300': !customColors && !isText && !isIcon,
            
            'opacity-50': props.disabled,
        }
    )
    
    return (
        
        <button
            className={classes}
            {...props}>
            {children}
        </button>
        
    )
    
}

Button.defaultProps = {
    className: '',
    type: null,
    customColors: false,
    customPadding: false,
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.oneOf(['text', 'icon']),
    customColors: PropTypes.bool,
    customPadding: PropTypes.bool,
}

export default Button
