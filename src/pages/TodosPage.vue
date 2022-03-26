<template>
  <main>
    <button @click="addTodo">Add todo</button>
    <hr />
    <h3>Todos:</h3>
    <!-- <ul class="task-list grid-style" v-if="notFulFilledTaskList.length > 0">
      <li v-for="task in notFulFilledTaskList" :key="task.id">
        <task-card
          @done="setDoneTask(task.id)"
          @edit="editTask(task)"
          @remove="removeTask(task.id)"
          :model="task"
        ></task-card>
      </li>
    </ul> -->
    <todo-list
      v-if="notFulFilledTaskList.length > 0"
      :list="notFulFilledTaskList"
      @update="updateTaskLists"
    />
    <div v-else>Список пуст... :(</div>
    <hr />
    <h3>Archive:</h3>
    <!-- <ul class="task-list grid-style" v-if="fulFilledTaskList.length > 0">
      <li v-for="task in fulFilledTaskList" :key="task.id">
        <task-card
          @done="setDoneTask(task.id)"
          @edit="editTask(task)"
          @remove="removeTask(task.id)"
          :model="task"
        ></task-card>
      </li>
    </ul> -->
    <todo-list
      v-if="fulFilledTaskList.length > 0"
      :list="fulFilledTaskList"
      @update="updateTaskLists"
    />
    <div v-else>Архив пуст... :(</div>
  </main>
</template>

<script>
import TodoList from "../components/TodoList.vue";
import TaskCard from "../components/TaskCard.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllTasks } from "../firebase/db-service";

export default {
  components: { TaskCard, TodoList },
  setup() {
    const notFulfilled = "not-fulfilled";
    const fulfilled = "fulfilled";
    const notFulFilledTaskList = ref([]);
    const fulFilledTaskList = ref([]);
    const router = useRouter();

    const addTodo = () => {
      router.push({
        name: "create",
        params: {
          id: "",
          todo: "",
          title: "",
          description: "",
        },
      });
    };

    const updateTaskLists = () => {
      getAllTasks(notFulfilled, "date", "desc", notFulFilledTaskList);
      getAllTasks(fulfilled, "date", "desc", fulFilledTaskList);
    };

    onMounted(() => {
      updateTaskLists();
    });

    return {
      notFulFilledTaskList,
      fulFilledTaskList,
      addTodo,
      updateTaskLists,
    };
  },
};
</script>

<style scoped>
.task-list {
  list-style: none;
}
</style>
