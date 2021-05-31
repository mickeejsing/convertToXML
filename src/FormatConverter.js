export class FormatConverter {

    constructor(doc) {
        this.doc = doc
        this.address = 'A'
        this.person = 'P'
        this.firstname = 'F'
        this.telephone = 'T'
    }

    convertTextToTags() {
        const lines = this.doc.split(/\r?\n/)
        let xml = 'jens'

        lines.forEach(line => {
            if(line[0] === this.address) {
                xml+= '<adress></adress>'
            } else if(line[0] === this.person) {
                xml+= '<person></person>'
            } else if(line[0] === this.firstname) {
                xml+= '<firstname></firstname>'
            } else if(line[0] === this.telephone) {
                xml+= '<telephone></telephone>'
            } else {
                throw new TypeError('The format is invalid.')
            }
        })

        return xml
    }

}