const testName = (name, forceCheck) => {
	if (!name.length && !forceCheck) return;

	if ((!name.length) && forceCheck) return 'Le nom est obligatoire';
	if (!(name.length > 2)) return 'Le nom est trop court';
};

const testEmail = (email, forceCheck) => {
	if (!email.length && !forceCheck) return;

	if ((!email.length) && forceCheck) return 'L&apos;email est obligatoire';

	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!regEx.test(email.toLowerCase())) return 'email incorrect';
};

const testMessage = (message, forceCheck) => {
	if (!message.length && !forceCheck) return;

	if ((!message.length) && forceCheck) return 'Le message est obligatoire';
	if (!(message.length > 30)) return 'Le message est trop court';
};

const formValidation = (forceCheck = false) => {
	const formData = getFormData();

	const errors = {
		name: [],
		email: [],
		message: [],
	};

	errors.name = testName(formData.name, forceCheck);
	errors.email = testEmail(formData.email, forceCheck);
	errors.message = testMessage(formData.message, forceCheck);


	return errors
};

const getFormData = () => {
	const formEl = document.getElementById('contactForm');

	const nameInput = formEl.querySelector('input[name="name"]');
	const emailInput = formEl.querySelector('input[name="email"]');
	const messageInput = formEl.querySelector('textarea[name="message"]');

	const formData = {
		name: nameInput.value,
		email: emailInput.value,
		message: messageInput.value,
	};

	return formData;
};

const formIsValid = (forceCheck = false) => {
	const errors = formValidation(forceCheck);

	if (errors.name) return false;
	if (errors.email) return false;
	if (errors.message) return false;

	return true;
}


const sendMail = () => {
	const submitButton = document.getElementById('form-submit');

	submitButton.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!formIsValid(true)) return checkInputs(true);

		const rawFormData = getFormData();
		const formData = new FormData();

		formData.append('name', rawFormData.name);
		formData.append('email', rawFormData.email);
		formData.append('message', rawFormData.message);

		submitButton.innerHTML = `Envoi du message...`;


		submitButton.disabled = true;

		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== xhr.DONE) return;
			if (xhr.status === 201) {
				submitButton.innerText = `Message envoyé !`;
				submitButton.classList.add('success');
			}
		};
		xhr.open("POST", "/sendmail.php");
		xhr.send(formData);
	});
}

const checkInputs = (forceCheck = false) => {
	const errors = formValidation(forceCheck);

	removeFormErrors();

	if (errors.name) {
		const nameContainer = document.querySelector('form#contactForm>div.name');
		printError(errors.name, nameContainer);
	}
	if (errors.email) {
		const emailContainer = document.querySelector('form#contactForm>div.email');
		printError(errors.email, emailContainer);
	}
	if (errors.message) {
		const messageContainer = document.querySelector('form#contactForm>div.message');
		printError(errors.message, messageContainer);
	}
};

const printError = (error, container) => {
	const existingErrorContainer = container.getElementsByClassName('error')[0];

	if (existingErrorContainer) {
		existingErrorContainer.parentNode.removeChild(existingErrorContainer);
	}

	const errorMessageContainer = document.createElement('span');
	errorMessageContainer.innerHTML = `${error}`;
	errorMessageContainer.classList.add('error')
	container.appendChild(errorMessageContainer);
}

const removeFormErrors = () => {
	const formEl = document.getElementById('contactForm');
	const existingErrorContainers = formEl.querySelectorAll('span.error');


	for (let i = 0; i < existingErrorContainers.length; i += 1) {
		const element = existingErrorContainers[i];
		element.parentNode.removeChild(element);
	}
};

const setupFormValidation = () => {

	const formEl = document.getElementById('contactForm');
	const triggerEvents = ['propertychange', 'change', 'keyup', 'input', 'paste'];
	const inputs = [
		formEl.querySelector('input[name="name"]'),
		formEl.querySelector('input[name="email"]'),
		formEl.querySelector('textarea[name="message"]'),
	];

	inputs.forEach((input) => {
		triggerEvents.forEach((event) => {
			input.addEventListener(event, () => {
				checkInputs(false);
			});
		});
	})
};
setupFormValidation();
sendMail();