const fs = require('fs').promises;
const path = require('path');
require('colors');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const parseData = JSON.parse(data);
        return console.log(parseData);
    } catch (err) {
        console.log(err);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const parseData = JSON.parse(data);

        parseData.map(contact => {
            if (contactId === contact.id) {
                console.log(`${contact.name}\n${contact.email}\n${contact.phone}`.green)
            }
        });
    } catch (err) {
        return console.log(err);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const parseData = JSON.parse(data);
        const index = parseData.findIndex(contact => contact.id === contactId);

        if (index > 0) {
            parseData.splice(index, 1);
            console.log(`Contact has been removed`.green);
            const updatedContacts = JSON.stringify(parseData, null, 2);

            return fs.writeFile(contactsPath, updatedContacts, 'utf-8');
        } else {
            console.log(`This contact does not exist`.red)
        }
    } catch (err) {
        return console.log(err);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};