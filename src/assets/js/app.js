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
    form.elements.twitter.value = contactToUpdate.twitter
    form.elements.notes.value = contactToUpdate.notes
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
				<div id="contact-name">${contact.name}</div>
				<div id="contact-email">${contact.email}</div>
				<div id="contact-phone">${contact.phone}</div>
				<div id="contact-company">${contact.company}</div>
				<div id="contact-twitter">@${contact.twitter}</div>
				<div id="contact-notesr">${contact.notes}</div>
				<button id="update-button" onclick="updateContact(${i})"><i class="far fa-edit"></i></button>
				<button id="delete-button" onclick="deleteContact(${i})"><i class="fas fa-trash-alt"></i></button>
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
	const  toggleFormVisibilityButton = document.getElementById('add-contact')
	contactForm.style.display = 'none'
 
	toggleFormVisibilityButton.addEventListener('click', () => {
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
		    twitter:  twitter.value,
		    notes:  notes.value,
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
