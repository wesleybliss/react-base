
const ProgressBar = ({
    progress,
    className,
    bgClassName,
    progressClassName,
}) => {
    
    return (
        
        <div className={`relative pt-1 ${className}`}>
            <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${bgClassName}`}>
                <div
                    className={`
                        shadow-none flex flex-col text-center
                        whitespace-nowrap text-white justify-center
                        transition-all
                        ${progressClassName}
                    `}
                    style={{ width: `${progress}%` }}>
                    &nbsp;
                </div>
            </div>
        </div>
        
    )
    
}

ProgressBar.defaultProps = {
    className: '',
    bgClassName: 'bg-gray-700',
    progressClassName: 'bg-gray-400',
}

export default ProgressBar
