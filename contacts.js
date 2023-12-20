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
        let message = `Cant find this contact`.red

        parseData.map(contact => {
            if (contactId == contact.id) {
                message = `${contact.name}\n${contact.email}\n${contact.phone}`.green
            }
        });

        console.log(message)
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
    const nanoid = import('nanoid');
    const ID = (await nanoid).nanoid;

    try {
        const newContact = {
            name,
            email,
            phone,
            id: ID(21),
        };

        const data = await fs.readFile(contactsPath, 'utf-8');
        const dataParse = JSON.parse(data);

        if (dataParse.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
            return console.log(`This Contact already exist on list`.red);
        } else {
            dataParse.push(newContact);
        }

        const updatedContacts = JSON.stringify(dataParse, null, 2);

        fs.writeFile(contactsPath, updatedContacts, 'utf-8');
        return console.log(`Contact added`.green);
    } catch (err) {
        return console.log(err);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};