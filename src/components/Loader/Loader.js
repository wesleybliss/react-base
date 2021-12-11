
import './Loader.css'

const Loader = ({
    className,
    size,
    center,
}) => {
    
    const styles = {
        '--lds-dual-ring-size': size,
        '--lds-dual-ring-color': 'rgba(255, 255, 255, 0.7)',
    }
    
    if (!center) return (
        <div className={`lds-dual-ring ${className}`} style={styles} />
    )
    
    return (
        
        <div className={`w-full flex justify-center ${className}`}>
            <div className="lds-dual-ring" style={styles} />
        </div>
        
    )
    
}

Loader.defaultProps = {
    className: '',
    size: '80px',
    center: true,
}

export default Loader
