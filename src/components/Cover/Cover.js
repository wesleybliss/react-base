
import './Cover.css'

const Cover = ({
    src,
}) => {
    
    return (
        
        <div
            className="Cover w-full h-screen overflow-hidden"
            style={{ backgroundImage: `url('${src}')` }} />
        
    )
    
}

export default Cover
