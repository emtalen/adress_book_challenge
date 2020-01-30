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
    let contacts = JSON.parse(localstorage.getItem('contacts'))
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
    let div = document.getElementById('contact-list')
    if (contacts) {
        div.innerHTML = ''
        i = 0
        contacts.forEach(contact => {
			var newDiv = document.createElement("div");
			newDiv.classList.add("contact-card");
			newDiv.innerHTML =
				`
				<div class="contact-name">${contact.name}</div>
				<div class="contact-email">${contact.email}</div>
				<div class="contact-phone">${contact.phone}</div>
				<div class="contact-company">${contact.company}</div>
				<div class="contact-notes">${contact.notes}</div>
				<div class="contact-twitter">@${contact.twitter}</div>
				<input type="button" value="Update" id="update-button" onclick="updateContact(${i})"/>
				<input type="button" value="Delete" id="delete-button" onclick="deleteContact(${i})"/>
				`
			div.appendChild(newDiv)
			i++;
		})
	} else {
        div.innerHTML = '<p>You have no contacts in your address book</p>'    
    }
}

const toggleFormVisibility = (contactForm) => {
	if (contactForm.style.display === '') {
		contactForm.style.display = 'none'
	} else {
		contactForm.style.display = ''
	}
}

document.addEventListener('DOMContentLoaded', () => {
	renderContacts()
const  contactForm = document.getElementById('new-contact-form')
    const toggleFormVisibilityButton = document.getElementById('add-contact')
    contactForm.style.display= 'none'

    toggleFormVisibilityButton.addEventListener('click', toggleFormVisibility(contactForm))


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
    }
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
	contactForm.reset()
   })
})
