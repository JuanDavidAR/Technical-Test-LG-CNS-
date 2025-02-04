import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((t) => t.id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get("http://localhost:8080/api/tasks");
      commit("SET_TASKS", response.data);
    },
    async addTask({ commit }, task) {
      const response = await axios.post(
        "http://localhost:8080/api/tasks",
        task
      );
      commit("ADD_TASK", response.data);
    },
    async updateTask({ commit }, task) {
      const response = await axios.put(
        `http://localhost:8080/api/tasks/${task.id}`,
        task
      );
      commit("UPDATE_TASK", response.data);
    },
    async deleteTask({ commit }, taskId) {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      commit("DELETE_TASK", taskId);
    },
  },
});
