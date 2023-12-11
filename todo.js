import { buttonLoader, endPoints, requester } from './api.js'
const user = JSON.parse(localStorage.getItem('user'))

let tasksData = []

// request to get all cards

const getAllTask = async () => {
	try {
		const tasks = await requester(endPoints.TASKS(user.id))
		tasksData = tasks.reverse()
		return tasks.reverse()
	} catch (e) {
		alert(e)
	}
}

// request to edit task

const changeTask = async (taskId, param) => {
	try {
		await requester(
			endPoints.TASK_DETAIL(user.id, taskId),
			'PUT',
			JSON.stringify(param)
		)
	} catch (e) {
		alert(e)
	}
}

// request to delete a task

const deleteTask = async taskId => {
	try {
		await requester(endPoints.TASK_DETAIL(user.id, taskId), 'DELETE')
	} catch (e) {
		alert(e)
	}
}

// to display cards

const renderCards = async tasks => {
	const container = document.querySelector('.contaner-cars')

	// draw our tasks

	container.innerHTML = tasks
		.map(
			item =>
				`
	    <div class="wrapper">
	        <span>Время: ${item.date}</span>
						<textarea
							type="text"
							name="text"
							placeholder="task"
							required
	            class=${
								item.completed
									? `"text-area-${item.id} completed"`
									: `text-area-${item.id}`
							}
						>${item.text}</textarea>
					<button class=${`"btn btn-task-change-${item.id} change-task"`}>change</button>
					<button class=${`"btn btn-task-done-${item.id} done-task"`}>done</button>
					<button class=${`"btn btn-task-delete-${item.id} done-task"`}>delete</button>
				</div>
	    `
		)
		.join('')

	// broadcast events to buttons inside cards

	tasks.forEach(task => {
		const textArea = document.querySelector(`.text-area-${task.id}`)
		const btnChange = document.querySelector(`.btn-task-change-${task.id}`)
		const btnDone = document.querySelector(`.btn-task-done-${task.id}`)
		const btnDelete = document.querySelector(`.btn-task-delete-${task.id}`)

		// function for editing text when you click on change

		btnChange.onclick = async () => {
			buttonLoader(btnChange)
			try {
				await changeTask(task.id, { text: textArea.value })
			} catch (e) {
				throw e
			} finally {
				buttonLoader(btnChange)
			}
		}

		// function to mark done

		btnDone.onclick = async () => {
			buttonLoader(btnDone)
			try {
				await changeTask(task.id, { completed: !task.completed })
				textArea.classList.toggle('completed')
			} catch (e) {
				throw e
			} finally {
				buttonLoader(btnDone)
			}
		}

		// function to delete

		btnDelete.onclick = async () => {
			buttonLoader(btnDone)
			try {
				await deleteTask(task.id)
				allCards()
			} catch (e) {
				throw e
			} finally {
				buttonLoader(btnDone)
			}
		}
	})
}

// rendering all cards with the request

const allCards = async () => {
	const container = document.querySelector('.contaner-cars')
	container.innerHTML = '<span class="loader-big"></span>'
	const tasks = await getAllTask()
	await new Promise((resolve, reject) => {
		setTimeout(resolve, 500)
	})
	return renderCards(tasks)
}

allCards()

// request to create a task

const addTask = async param => {
	try {
		buttonLoader()
		const response = await requester(
			endPoints.TASKS(user.id),
			'POST',
			JSON.stringify(param)
		)
		buttonLoader()
		await allCards()
		return response
	} catch (e) {
		alert(e)
	}
}

const formTaskCreate = document.querySelector('.form-task')

//creating task

formTaskCreate.onsubmit = e => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const date = new Date().toLocaleDateString()
	const task = { completed: false, date }

	// get data from form

	formData.forEach((value, name) => {
		task[name] = value
	})
	addTask(task)
}

const select = document.querySelector('.select')

select.onchange = e => {
	let tasks = []
	// filtering attached to select

	switch (e.target.value) {
		case 'all':
			tasks = tasksData
			break
		case 'done':
			tasks = tasksData.filter(task => task.completed)
			break
		case 'active':
			tasks = [...tasksData].filter(task => !task.completed)
			break
	}
	renderCards(tasks)
}

//an exit function to the logout button

document.querySelector('.logout').onclick = () => {
	localStorage.removeItem('user')
	window.location.href = '/pages/index.html'
}
