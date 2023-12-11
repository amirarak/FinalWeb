import { buttonLoader, endPoints, getAllUsers, requester } from './api.js'

const registerLink = document.querySelector('.register-link-a')
const backLink = document.querySelector('.register-link-back')

// here we switch to the login form

registerLink.onclick = () => {
	const loginWrapper = document.querySelector('.login')
	const signUpWrapper = document.querySelector('.sign-up')
	loginWrapper.classList.add('not-active')
	loginWrapper.classList.remove('active')

	setTimeout(() => {
		signUpWrapper.classList.add('active')
		signUpWrapper.classList.remove('not-active')
	}, 400)
}

// function of switching to the login form

const goToLogin = () => {
	const loginWrapper = document.querySelector('.login')
	const signUpWrapper = document.querySelector('.sign-up')

	signUpWrapper.classList.remove('active')
	signUpWrapper.classList.add('not-active')
	setTimeout(() => {
		loginWrapper.classList.remove('not-active')
		loginWrapper.classList.add('active')
	}, 400)
}

// added a function to the button to switch to the login form

backLink.onclick = goToLogin

// registration

const formSignUp = document.querySelector('.form-sign-up')
formSignUp.onsubmit = async e => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const user = {}

	// get data from form

	formData.forEach((value, name) => {
		user[name] = value
	})

	buttonLoader()
	try {
		const users = await getAllUsers()
		if (users.find(item => item.email === user.email))
			return alert('Такой пользователь уже есть')
		await requester(endPoints.USERS, 'POST', JSON.stringify(user))
		goToLogin()
	} catch (e) {
		alert(e)
	} finally {
		buttonLoader()
	}
}

//login

const formLogin = document.querySelector('.form-login')
formLogin.onsubmit = async e => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const user = {}

	// get data from form

	formData.forEach((value, name) => {
		user[name] = value
	})

	buttonLoader()
	try {
		const users = await getAllUsers()
		const foundUser = users.find(
			item => item.email === user.email && item.password === user.password
		)
		if (!foundUser) return alert('пользователь не найден')
		localStorage.setItem('user', JSON.stringify(foundUser))
		window.location.href = '/pages/todoPage.html'
	} catch (e) {
		alert(e)
	} finally {
		buttonLoader()
	}
}
