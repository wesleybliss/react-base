import cn from 'classnames'

import { Link } from 'react-router-dom'

import './Footer.css'

const Footer = () => {
    
    return (
        
        <div className="Footer">
            
            <section>
                <h4>
                    SECTION
                </h4>
                <div>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                </div>
            </section>
            
            <section>
                <h4>
                    SECTION
                </h4>
                <div>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                </div>
            </section>
            
            <section>
                <h4>
                    SECTION
                </h4>
                <div>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                    <Link to="/">ITEM</Link>
                </div>
            </section>
            
        </div>
        
    )
    
}

export default Footer
