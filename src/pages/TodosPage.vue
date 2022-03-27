<template>
  <main>
    <button
      @click="addTodo"
      class="rounded-lg bg-green-500 text-white p-2 uppercase m-3 hover:bg-green-600"
    >
      Add todo
    </button>
    <hr />
    <div
      class="md:flex w-auto md:justify-between md:items-start height-90 border-2 overflow-hidden"
    >
      <div class="md:w-1/2 h-80 md:h-96">
        <h2 class="uppercase bold text-2xl ml-3">Todos:</h2>
        <todo-list
          class="overflow-y-auto h-full"
          v-if="notFulFilledTaskList.length > 0"
          :list="notFulFilledTaskList"
          @update="updateTaskLists"
        />
        <div class="ml-3" v-else>Список пуст... :(</div>
      </div>
      <div class="md:w-1/2 h-80 md:h-96 mt-10 md:mt-0">
        <h2 class="uppercase bold text-2xl ml-3">Archive:</h2>
        <todo-list
          class="overflow-y-auto h-full"
          v-if="fulFilledTaskList.length > 0"
          :list="fulFilledTaskList"
          @update="updateTaskLists"
        />
        <div class="ml-3" v-else>Архив пуст... :(</div>
      </div>
    </div>
  </main>
</template>

<script>
import TodoList from "../components/TodoList.vue";
import TaskCard from "../components/TaskCard.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllTasks } from "../firebase/db-service";
import { removeParams } from "../utils/Utils";

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
        replace: true,
        params: {
          id: "",
          todo: "",
          title: "",
          description: "",
        },
      });
      removeParams("id");
      removeParams("title");
      removeParams("description");
      removeParams("todo");
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
.height-90 {
  height: 80vh;
}
</style>
