
export const NS = `dlf`

const keys = {}

// For exposing parts of the app to `window` during development
export const exposeKey = 'dlf'

export const key = name => {
    const k = `${NS}.${name}`
    allKeys.push(k)
    return k
}

export const purgeAllStorage = () => {
    Object.keys(keys).forEach(key => {
        log.info('purgeAllStorage', 'key =', key)
        localStorage.removeItem(key)
    })
}

//

keys.theme = 'theme'

//

export const themes = ['light', 'dark']

const prefixedKeys = Object.keys(keys)
    .reduce((acc, it) => ({
        ...acc,
        [`${NS}.${it}`]: keys[it]
    }), {})

export { prefixedKeys as keys }
