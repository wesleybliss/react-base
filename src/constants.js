import { key, getPrefixedKeys } from 'react-wire-persisted/lib/utils'

export const NS = `react-base`

//

key('theme')

//

export const themes = ['light', 'dark']

const prefixedKeys = getPrefixedKeys(NS)

export { prefixedKeys as keys }
