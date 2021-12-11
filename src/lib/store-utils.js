import { createWire } from '@forminator/react-wire'

const intervalWires = {}

export const createIntervalWire = (
    tag,
    initialValue,
    fn,
    delayMillis = 3000,
    runImmediate = true
) => {
    
    const wire = createWire(initialValue)
    
    const handler = async () => {
        try {
            const value = await fn()
            wire.setValue(value)
        } catch (e) {
            console.warn(`createIntervalWire: failed for ${tag}`, e)
        }
    }
    
    clearInterval(intervalWires[tag])
    setInterval(handler, delayMillis)
    
    if (runImmediate)
        handler()
    
    return wire
    
}
