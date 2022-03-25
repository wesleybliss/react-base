const fs = require('fs/promises')
const path = require('path')
const resolve = require('resolve/async')
const aliases = require('./aliases')

const resolveAsync = file => new Promise((_resolve, _reject) => {
    resolve(file, (err, res) => {
        if (err) _reject(err)
        else _resolve(res)
    })
})

const getAlias = fullPath => {
    
    if (fullPath.includes('/')) {
        
        const parts = fullPath.split('/')
        const base = parts[0]
        
        return path.join(aliases[base], parts.slice(1).join('/'))
        
    }
    
    return aliases[fullPath]
    
}

const escapeRegExp = string =>
    // $& means the whole matched string
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const re = new RegExp(`^(${Object.keys(aliases).map(x => escapeRegExp(x)).join('|')})(.*)`)

const esbuildAliasPlugin = {
    name: 'esbuild-alias-plugin',
    setup(build) {
        build.onResolve({ filter: re }, async (args) => {
            
            try {
                const uri = require.resolve(args.path)
                return { path: uri }
            } catch (e) {
                try {
                    const nm = path.join(__dirname, '../node_modules', args.path)
                    await fs.stat(nm)
                    return { path: nm }
                } catch (e) {}
            }
            
            // { kind, path, resolveDir } = args
            
            let file = getAlias(args.path)
            
            // console.info('Aliasing path:', args.path, 'file', file)
            
            try {
                
                // First check if the node exists
                const stat = await fs.stat(file)
                
                // If it's a directory, default to index.js
                if (stat.isDirectory())
                    file = path.join(file, 'index.js')
                
            } catch (e) {
                
                // The initial node did not exist, so try appending the extension
                try {
                    
                    // Try to stat the file with an extension
                    await fs.stat(file + '.js')
                    
                    file = file + '.js'
                    
                } catch (e) {
                    
                    // Nothing worked, so bail
                    throw e
                    
                }
                
            }
            
            try {
                
                const res = await resolveAsync(file)
                
                await fs.stat(res)
                
                // console.info('Unaliased file:', file)
                return { path: res }
                
            } catch (e) {
                
                console.info('Using default resolver for', { path: args.path, resolveDir: args.resolveDir })
                return { path: await resolveAsync(args.path) }
                
            }
            
        })
    },
}

module.exports = esbuildAliasPlugin
