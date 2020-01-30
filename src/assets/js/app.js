const storage = window.localStorage

const deleteContact = (toRemove) => {
        let newContacts = JSON.parse(storage.getItem('contacts'))
        newContacts.splice(toRemove, 1);
        storage.clear()
    storage.setItem('contacts', JSON.stringify(newContacts))
    renderContacts()
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

    toggleFormVisibilityButton.addEventListener('click', () => {
        if (contactForm.style.display === '') {
            contactForm.style.display = 'none'
        } else {
            contactForm.style.display = ''
        }
    })


contactForm.addEventListener('submit', event  => {
	event.preventDefault()

	// 1. Read all the input fields and get their values
	const { name, email, phone, company, notes, twitter } = contactForm.elements

	const  contact = {
		name:  name.value,
		email:  email.value,
		phone:  phone.value,
		company:  company.value,
		notes:  notes.value,
		twitter:  twitter.value
	}

	console.log(contact)

	let  contacts = JSON.parse(storage.getItem('contacts')) || []

	contacts.push(contact)

	// 2. Save them to our storage
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
	contactForm.reset()
   })
})

function removeAll() {
        contactList = document.getElementById('#contact-list')
        localStorage.clear();
        contactList.style.display = ''

        console.log
}

