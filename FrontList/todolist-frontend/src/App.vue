<template>
  <div
    id="app"
    class="flex items-center justify-center min-h-screen bg-gray-100"
  >
    <TaskList />
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";

export default {
  components: {
    TaskList,
  },
};
</script>
