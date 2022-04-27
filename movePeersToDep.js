const fsp = require("node:fs/promises")

const run = async () => {
    //1. get all of the package.jsons inside ./packages
    const packageJsons = await fsp.readdir("./packages")

    const res = []
    for(const pkg of packageJsons) {
        const pathToJson = `./packages/${pkg}/package.json`
        const packageJson = await fsp.readFile(pathToJson)
        const asJson = JSON.parse(packageJson)

        // 2. check whether the given package has peer deps
        if('peerDependencies' in asJson) {
            // 3. move over them to dependencies block
            const peerDependencies = asJson['peerDependencies']
            // 4. since peerDependencies can define a range of versions
            // try to get the first version from the range
            const regex = /(\d*([.]?\d*\.\d*)?)/gm
            const peers = Object.entries(peerDependencies).map(([k,v]) => {
                const [peerDepVersion] = v.match(regex).filter(Boolean)

                return [k, `^${peerDepVersion}`]
            })
            const actualPeerDeps = Object.fromEntries(peers)
            const dependencies = asJson['dependencies']
            const merged = {...actualPeerDeps, ...dependencies}

            // 5. merge the newly created obj with the deps in filter

            const newJson = {...asJson, dependencies: merged}
            delete newJson['peerDependencies']
            if('peerDependenciesMeta' in newJson) {
                delete newJson['peerDependenciesMeta']
            }
            fsp.writeFile(pathToJson, JSON.stringify(newJson))
        }
    }
    return res
}

run().then(res => {

    console.log({res})
}
).catch(err => {

    console.error(err)
    process.exit(1)
})
