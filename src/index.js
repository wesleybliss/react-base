import React from 'react'
import ReactDOM from 'react-dom'
import { NS } from '@constants'
import { setNamespace } from 'react-wire-persisted'
import App from './App'

import './styles/index.css'

setNamespace(NS)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

if (module.hot)
    module.hot.accept()
