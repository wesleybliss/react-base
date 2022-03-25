
const esbuildResolvePlugin = (options = { exclude: [] }) => ({
    
    name: 'esbuild-resolve-plugin',
    
    setup(build) {
        
        build.onResolve({ filter: /.*/ }, async (args) => {
            
            if (options.exclude.includes(args.path))
                return undefined
            
            try {
                
                const uri = require.resolve(args.path)
                return { path: uri }
                
            } catch (e) {
                
                try {
                    
                    const nm = path.join(__dirname, '../node_modules', args.path)
                    
                    await fs.stat(nm)
                    return { path: nm }
                    
                } catch (e) {
                    
                    // Returning `undefined` lets the plugins continue chaining
                    // Thanks for making that SO FUCKING TINY in the docs
                    return undefined
                    
                }
                
            }
            
        })
        
    },
    
})

module.exports = esbuildResolvePlugin
