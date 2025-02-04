<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 font-sans"
  >
    <div class="max-w-2xl w-full p-10 bg-white shadow-xl rounded-2xl">
      <!-- Título centrado -->
      <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-8">
        To-Do List
      </h1>

      <!-- Formulario centrado -->
      <form @submit.prevent="submitTask" class="mb-8 space-y-4">
        <div class="grid gap-4 md:grid-cols-3">
          <input
            v-model="newTask.title"
            placeholder="Title"
            required
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input
            v-model="newTask.description"
            placeholder="Description"
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            class="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Add Task
          </button>
        </div>
      </form>

      <!-- Filtros -->
      <div class="flex justify-center space-x-3 mb-6">
        <button
          @click="filterTasks('all')"
          class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all transform hover:scale-105"
        >
          All
        </button>
        <button
          @click="filterTasks('completed')"
          class="px-4 py-2 bg-green-300 rounded-lg hover:bg-green-400 transition-all transform hover:scale-105"
        >
          Completed
        </button>
        <button
          @click="filterTasks('pending')"
          class="px-4 py-2 bg-yellow-300 rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
        >
          Pending
        </button>
      </div>

      <!-- Lista de tareas -->
      <ul class="space-y-4">
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          class="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <div class="flex items-center space-x-3">
            <input
              type="checkbox"
              v-model="task.completed"
              @change="updateTask(task)"
              class="form-checkbox h-5 w-5 text-blue-500 rounded-md"
            />
            <span
              :class="{ 'line-through text-gray-500': task.completed }"
              class="text-lg"
            >
              <span v-if="!task.editing">{{ task.title }}</span>
              <input
                v-else
                v-model="task.title"
                @blur="saveTask(task)"
                class="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </span>
          </div>
          <div class="flex space-x-2">
            <button
              @click="toggleEdit(task)"
              class="text-blue-500 hover:text-blue-700 transition-all transform hover:scale-110"
            >
              {{ task.editing ? "Save" : "Edit" }}
            </button>
            <button
              @click="deleteTask(task.id)"
              class="text-red-500 hover:text-red-700 transition-all transform hover:scale-110"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        completed: false,
      },
      filter: "all",
    };
  },
  computed: {
    ...mapState(["tasks"]),
    filteredTasks() {
      if (this.filter === "completed") {
        return this.tasks.filter((task) => task.completed);
      } else if (this.filter === "pending") {
        return this.tasks.filter((task) => !task.completed);
      }
      return this.tasks;
    },
  },
  methods: {
    ...mapActions(["fetchTasks", "addTask", "updateTask", "deleteTask"]),
    async submitTask() {
      await this.addTask(this.newTask);
      this.newTask = { title: "", description: "", completed: false };
    },
    toggleEdit(task) {
      task.editing = !task.editing;
    },
    saveTask(task) {
      this.updateTask(task);
      task.editing = false;
    },
    filterTasks(filter) {
      this.filter = filter;
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
