const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve('db','contacts.json');

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const found = contacts.find((element) => element.id === String(contactId));
    console.table(found);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((c) => c.id !== String(contactId));
    if (contacts.length === newContacts.length) {
      console.log("Contact not found");
      return;
    }
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Contact id=", contactId, " removed!");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const contacts = JSON.parse(data);
    const id = String(Number(contacts[contacts.length - 1].id) + 1);
    const contact = { id, name, email, phone };
    const newContacts = [...contacts, contact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("New contact added! ");
    });
  });
}
module.exports = { listContacts, getContactById, removeContact, addContact };
