export const baseUrl = 'https://657611950febac18d403a7af.mockapi.io/api/v1'

// function for convenient writing of a request

export const requester = async (url, method, body) => {
	try {
		const response = (
			await fetch(url, {
				method,
				body,
				headers: { 'Content-Type': 'application/json' },
			})
		).json()
		return response
	} catch (e) {
		console.error(e)
		throw e
	}
}

// all endpoints for api

export const endPoints = {
	USERS: baseUrl + '/auth_users',
	USERS_DETAIL: user_id => `${baseUrl}/auth_users/${user_id}`,
	TASKS: user_id => `${baseUrl}/auth_users/${user_id}/user_task`,
	TASK_DETAIL: (user_id, task_id) =>
		`${baseUrl}/auth_users/${user_id}/user_task/${task_id}`,
}

// for a request to get all users

export const getAllUsers = async () => {
	try {
		const users = await requester(endPoints.USERS)
		return users
	} catch (e) {
		alert(e)
	}
}

let buttonsTextList = []
//To load after clicking

export const buttonLoader = btnNode => {
	if (btnNode) {
		if (btnNode.innerHTML !== '<span class="loader"></span>') {
			buttonsTextList[0] = btnNode.innerHTML
			btnNode.innerHTML = '<span class="loader"></span>'
		} else {
			btnNode.innerHTML = buttonsTextList[0]
		}
		return
	}

	const btn = document.querySelectorAll('.btn')
	btn.forEach((buttons, i) => {
		if (buttons.innerHTML !== '<span class="loader"></span>') {
			buttonsTextList[i] = buttons.innerHTML
			buttons.innerHTML = '<span class="loader"></span>'
		} else {
			buttons.innerHTML = buttonsTextList[i]
		}
	})
}
