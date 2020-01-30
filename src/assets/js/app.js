const storage = window.localStorage
let contactToUpdate = null

const deleteContact = (toRemove) => {
        let newContacts = JSON.parse(storage.getItem('contacts'))
        newContacts.splice(toRemove, 1);
        storage.clear()
    storage.setItem('contacts', JSON.stringify(newContacts))
    renderContacts()
}

const displayUpdateFields = (id) => {
    let contacts = JSON.parse(storage.getItem('contacts'))
    let contactToUpdate = contacts[id]
    let form = document.getElementById('new-contact-form')
    let indexField = document.createElement('input')
    indexField.type = 'hidden'
    indexField.name = 'index'
    indexField.value = id
    form.appendChild(indexField)
    form.elements.type.value = 'updateContact'
    form.elements.name.value = contactToUpdate.name
    form.elements.email.value = contactToUpdate.email
    form.elements.phone.value = contactToUpdate.phone
    form.elements.company.value = contactToUpdate.company
    form.elements.notes.value = contactToUpdate.notes
    form.elements.twitter.value = contactToUpdate.twitter
    form.elements.submit.value = "Update Contact"
}

const updateContact = (toRemove) => {
    toggleFormVisibility(contactForm)
        displayUpdateFields(toRemove)
        let newContacts = JSON.parse(storage.getItem('contacts'))
        newContacts.splice(toRemove, 1)
}

const renderContacts = () => {
    const contacts = JSON.parse(storage.getItem('contacts'))
   
    let div = document.querySelector('#contact-list')
    if (contacts) {
        div.innerHTML = ''
        i = 0
        const ul = document.createElement('ul')
        
        contacts.forEach(contact => {
        let  li = document.createElement('li')

		li.innerHTML = `
		  <span>${contact.name}</span> |
		  <span>${contact.email}</span> |
          <span>${contact.phone}</span> |
          <span>${contact.company}</span> |
          <span>${contact.notes}</span> |
          <span>${contact.twitter}</span> |
          <button id="delete-button" onclick=deleteContact('${i}')>Delete</button>
          <button id="update-button" onclick=updateContact('${i}')>Update</button>
	    `
        ul.appendChild(li)

        i++;
    })
    div.appendChild(ul)


    }else {
        div.innerHTML = '<p>You have no contacts in your address book</p>'
    }
}


document.addEventListener('DOMContentLoaded', () => {
	renderContacts()
const  contactForm = document.getElementById('new-contact-form')
    const toggleFormVisibilityButton = document.getElementById('add-contact')
    contactForm.style.display= 'none'

    toggleFormVisibilityButton.addEventListener('click' () => {
        if (contactForm.style.display === '') {
            contactForm.style.display = 'none'
        } else {
            contactForm.style.display = ''
        }
    })


contactForm.addEventListener('submit', event  => {
    event.preventDefault()
    const { name, email, phone, company, notes, twitter } = contactForm.elements
    const  contact = {
		name:  name.value,
		email:  email.value,
		phone:  phone.value,
		company:  company.value,
		notes:  notes.value,
		twitter:  twitter.value,
	}

    let  contacts = JSON.parse(storage.getItem('contacts')) || []
    if (contactForm.elements.type.value === 'newContact') {
        contacts.push(contact)
    } else {
        contact[parseInt(contactForm.elements.index.value)] = contact
        contactForm.elements.submit.value = "Save Contact"
        toggleFormVisibility(contactForm)
        debugger
    }
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
	contactForm.reset()
   })
})


