const { glob } = require('glob')
const { promisify } = require('util')
const globPromise = promisify(glob)
module.exports = async (client) => {
    const eventfiles = await globPromise(`${process.cwd()}/DistubeEvents/*.js`)
    eventfiles.map((value) => require(value))
}