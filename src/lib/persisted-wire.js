import { createWire } from '@forminator/react-wire'
import { isPrimitive } from '@lib/utils'
import { NS } from '@constants'

const logReads = false
const logWrites = false

// All keys in the DB for easy reset (see further down this file)
const registry = {}

const fakeLocalStorage = {
    getItem: (/* key */) => null,
    setItem: (/* key, value */) => { },
    removeItem: (/* key */) => { },
}

const getLocalStorage = () => {
    try { return localStorage || fakeLocalStorage }
    catch (e) { return fakeLocalStorage }
}

class StorageDb {
    
    constructor(key) {
        this.key = key
    }
    
    getItem() {
        const val = localStorage.getItem(this.key)
        if (logReads) console.log('READ', val)
        if (val === undefined || val === null) return null
        try {
            return JSON.parse(val)
        } catch (e) {
            return val
        }
    }
    
    setItem(value) {
        let val = value
        // Don't allow "null" & similar values to be stringified
        if (val !== undefined && val !== null)
            val = isPrimitive(value) ? value : JSON.stringify(value)
        if (logWrites) console.log('WRITE', val)
        return localStorage.setItem(this.key, val)
    }
    
    removeItem() {
        return localStorage.removeItem(this.key)
    }
    
}

/**
 * Creates a localStorage persistent Wire object
 * 
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export const createPersistedWire = (key, value = null) => {
    
    // Track this writable entry so we can easily clear all
    registry[key] = value
    
    // console.info(key, registry)
    
    const wire = createWire(value)
    const storage = new StorageDb(key)
    
    const getValue = () => wire.getValue()
    
    const setValue = newValue => {
        if (logWrites) console.log('SET', storage.key, newValue)
        storage.setItem(newValue)
        return wire.setValue(newValue)
    }
    
    const subscribe = fn => {
        wire.subscribe(fn)
    }
    
    const preValue = storage.getItem() || value
    
    if (preValue !== value)
        setValue(preValue)
    
    return {
        ...wire,
        getValue,
        setValue,
        subscribe,
    }
    
}

const resetAllStorage = (withDefaults = true, excludeKeys = []) => {
    
    Object.keys(localStorage).forEach(it => {
        
        const isAppKey = it.startsWith(`${NS}.`)
        const isExcluded = excludeKeys.includes(it)
        
        if (isAppKey && !isExcluded) {
            console.log('RESET', it, excludeKeys)
            if (withDefaults)
                if (Object.prototype.hasOwnProperty.call(registry, it))
                    getLocalStorage().setItem(it, registry[it])
                else
                    getLocalStorage().removeItem(it)
            else
                getLocalStorage().removeItem(it)
        }
        
    })
    
}

export const resetAll = (excludeKeys = []) =>
    resetAllStorage(true, excludeKeys) && window.location.reload()

export const removeAll = (excludeKeys = []) =>
    resetAllStorage(false, excludeKeys) && window.location.reload()
