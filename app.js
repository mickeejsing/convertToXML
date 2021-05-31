import { FormatConverter } from './src/FormatConverter.js'
import fs from 'fs'

try {
    var data = fs.readFileSync('./data.txt', 'utf8')
} catch (err) {
    console.error(err)
}

const fc = new FormatConverter(data)
const xml = fc.convertTextToTags()

console.log(xml)