<template>
  <ul class="task-list grid-style">
    <li v-for="task in list" :key="task.id">
      <task-card
        @done="setDoneTask(task.id)"
        @edit="editTask(task)"
        @remove="removeTask(task.id)"
        :model="task"
      ></task-card>
    </li>
  </ul>
</template>

<script>
import TaskCard from "./TaskCard.vue";
import {
  getAllTaskInCollection,
  addTaskToCollection,
  deleteTaskFromCollection,
  getTaskById,
} from "../firebase/db-service";
import { useRouter } from "vue-router";

export default {
  components: { TaskCard },
  emits: ["update"],
  props: ["list"],
  setup(_, { emit }) {
    const notFulfilled = "not-fulfilled";
    const fulfilled = "fulfilled";
    const router = useRouter();

    const updateTaskLists = () => {
      emit("update");
    };

    const editTask = (task) => {
      router.push({
        name: "update",
        params: {
          id: task.id,
          todo: "edit",
          title: task.title,
          description: task.description,
        },
      });
    };

    const setDoneTask = async (id) => {
      const data = await getAllTaskInCollection(notFulfilled, "date", "desc");
      const doc = getTaskById(data, id);
      await addTaskToCollection(fulfilled, { ...doc.data(), status: true });
      await deleteTaskFromCollection(notFulfilled, doc.id);
      updateTaskLists();
    };

    const removeTask = async (id) => {
      const data = await getAllTaskInCollection(fulfilled, "date", "desc");
      const doc = getTaskById(data, id);
      await deleteTaskFromCollection(fulfilled, doc.id);
      updateTaskLists();
    };

    return {
      editTask,
      setDoneTask,
      removeTask,
    };
  },
};
</script>
<style scoped></style>
