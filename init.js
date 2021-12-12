const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { exec } = require('child_process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const prompt = question => new Promise(
    resolve => rl.question(`${question} `, resolve)
)

const execAsync = cmd => new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
        if (err) return reject(err)
        if (stderr) return reject(stderr)
        resolve(stdout)
    })
})

const updatePackage = name => {
    const src = path.resolve(__dirname, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(src, 'utf8'))
    pkg.name = name.replace(/\s/, '-').toLowerCase()
    // console.info('Updated package', JSON.stringify(pkg, null, 4))
    fs.writeFileSync(src, JSON.stringify(pkg, null, 2), 'utf8')
}

const copyEnv = name => {
    const data = fs.readFileSync(path.resolve(__dirname, 'sample.env'), 'utf8')
    const lines = data.split('\n').map(it => {
        if (it.startsWith('APP_TITLE'))
            return `APP_TITLE="${name}"`
        return it
    })
    const out = lines.join('\n')
    const outFile = path.resolve(__dirname, '.env')
    fs.writeFileSync(outFile, out, 'utf8')
}

const main = async () => {
    
    const confirm = await prompt(
        'This will delete & reinitialize Git in this directory.\n' +
        'This is permanent!\n' +
        'Are you sure you want to proceed?'
    )
    
    if (confirm.toLowerCase().trim() !== 'y')
        return rl.close()
    
    const name = await prompt('Enter a project name')
    
    try {
        
        copyEnv(name)
        updatePackage(name)
        
        await execAsync('rm init.js')
        await execAsync('rm -rf .git')
        await execAsync('git init')
        await execAsync('git add --all')
        await execAsync('git commit -am "Initial commit"')
        
    } catch (e) {
        
        console.error(e)
        
    }
    
    console.info('Done')
    rl.close()
    
}

main()
