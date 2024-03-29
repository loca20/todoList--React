import { createSlice } from "@reduxjs/toolkit";
import { getTasksFromLocalStorage } from "./tasksLocalStorage";

const tasksSlice = createSlice({
	name: "tasks",
	initialState: {
		tasks: getTasksFromLocalStorage(),
		hideDone: false,
	},
	reducers: {
		addTask: ({ tasks }, { payload: task }) => {
			tasks.push(task);
		},
		toggleHideDone: (state) => {
			state.hideDone = !state.hideDone;
		},
		setAllDone: ({ tasks }) => {
			for (const task of tasks) {
				task.done = true;
			}
		},
		toggleTaskDone: ({ tasks }, { payload: taskId }) => {
			const index = tasks.findIndex(({ id }) => id === taskId);
			tasks[index].done = !tasks[index].done;
		},
		removeTask: ({ tasks }, { payload: taskId }) => {
			const index = tasks.findIndex(({ id }) => id === taskId);
			tasks.splice(index, 1);
		},
		fetchExampleTasks: state => {
			state.loading = true;
		},
		fetchExampleTasksSuccess: (state, { payload: tasks }) => {
			state.tasks = tasks;
			state.loading = false;
		},
		fetchExampleTasksError: (state) => {
			state.loading = false;
		}
	},
});

export const {
	addTask,
	toggleHideDone,
	setAllDone,
	toggleTaskDone,
	removeTask,
	fetchExampleTasks,
	setTasks,
	fetchExampleTasksSuccess,
	fetchExampleTasksError
} = tasksSlice.actions;

export const selectTasksState = (state) => state.tasks;
export const selectTasks = (state) => selectTasksState(state).tasks;
export const selectHideDone = (state) => selectTasksState(state).hideDone;

export const getTaskById = (state, taskId) =>
	selectTasks(state).find(({ id }) => id === taskId);

export const selectTasksByQuery = (state, query) => {
	const tasks = selectTasks(state);
	if (!query || query.trim() === "") {
		return tasks;
	}
	return tasks.filter(({ content }) => content.toUpperCase().includes(query.trim().toUpperCase()));
};

export const selectLoading = (state) =>
  selectTasksState(state).loading === true;

export default tasksSlice.reducer;
