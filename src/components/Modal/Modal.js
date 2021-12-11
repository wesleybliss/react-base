import { FaTimes } from 'react-icons/fa'

import './Modal.css'

const Modal = ({
    children,
    open,
    title,
    onClose,
}) => {
    
    const handleClose = e => {
        if (onClose) onClose(e)
    }
    
    if (!open) return null
    
    return (
        
        <section className="modal-container flex flex-col" id="modal">
            
            <div className="modal-content rounded-sm">
                
                <div className="modal-header flex justify-between items-center content-center w-full p-4">
                    {title && (<h3 className="text-2xl">{title}</h3>)}
                    <button onClick={handleClose}>
                        <FaTimes />
                    </button>
                </div>
                
                <div className="modal-body w-full px-4">
                    {children}
                </div>
                
            </div>
            
        </section>
        
    )
    
}

export default Modal
