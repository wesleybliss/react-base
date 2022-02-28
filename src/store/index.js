import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from '@constants'

export const history = createWire(null)

export const theme = createPersistedWire(keys.theme, 'light')
