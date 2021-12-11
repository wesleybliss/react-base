const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const prompt = question => new Promise(
    resolve => rl.question(`${question} `, resolve)
)

const updatePackage = name => {
    const src = path.resolve(__dirname, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(src, 'utf8'))
    pkg.name = name
    console.info('Updated package', JSON.stringify(pkg, null, 4))
}

const main = async () => {
    
    console.info('Initializing')
    
    const name = await prompt('Enter a project name')
    
    updatePackage(name)
    
    console.info('Done')
    rl.close()
    
}

main()
