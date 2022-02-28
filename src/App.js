import { useRef, useEffect } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '@store'
import { themes } from '@constants'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import cn from 'classnames'

import Home from '@routes/Home'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

// setProvider(LocalStorageProvider, NS)

const App = () => {
    
    const refApp = useRef()
    
    const theme = useWireValue(store.theme)
    
    const applyTheme = () => {
        themes.forEach(it => {
            if (document.documentElement.classList.contains(it))
                document.documentElement.classList.remove(it)
        })
        document.documentElement.classList.add(theme)
    }
    
    useEffect(applyTheme, [theme])
    
    useEffect(() => {
        window.app = {}
        window.app.store = store
    })
    
    return (
        
        <Router>
            
            <div
                ref={refApp}
                className={cn(
                    'App',
                    'w-full h-screen',
                    'flex flex-col',
                    'text-gray-800 text-xl',
                    'dark:text-gray-100',
                    'overflow-y-auto scrollbar-minimal',
                )}>
                
                <Navbar />
                
                <article className="flex-grow w-full h-screen max-w-screen-2xl mx-auto">
                    
                    <Routes>
                        
                        <Route exact path="/" element={<Home />} />
                        
                    </Routes>
                    
                    <Footer />
                    
                </article>
                
            </div>
            
        </Router>
        
    )
}

export default App
