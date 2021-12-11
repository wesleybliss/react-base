import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from '@lib/persisted-wire'
import { keys } from '@constants'

export const history = createWire(null)

export const theme = createPersistedWire(keys.theme, 'light')
