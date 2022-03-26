<template>
  <div>
    <task-input @add="addTask"></task-input>
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { nanoid } from "nanoid";
import { useRoute, useRouter } from "vue-router";
import TaskInput from "../components/TaskInput.vue";
import {
  addTaskToCollection,
  getAllTaskInCollection,
  getTaskById,
  deleteTaskFromCollection,
} from "../firebase/db-service";

export default {
  components: { TaskInput },
  setup() {
    const notFulfilled = "not-fulfilled";
    const router = useRouter();
    const route = useRoute();
    const { id, title, description, todo } = route.params;

    //!!!! Спросить про location.state (React)(useLocation()) !!!!
    const removeParams = (key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    };

    const addTask = async (task) => {
      if (todo === "edit") {
        const data = await getAllTaskInCollection(notFulfilled, "date", "desc");
        const doc = getTaskById(data, id);
        await deleteTaskFromCollection(notFulfilled, doc.id);
      }
      const taskId = todo === "edit" ? id : nanoid();
      await addTaskToCollection(notFulfilled, {
        ...task,
        id: taskId,
      });
      router.push("/todos");
      removeParams("id");
      removeParams("title");
      removeParams("description");
      removeParams("todo");
    };

    const saveParams = (key, param) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, param);
      }
    };

    onBeforeMount(() => {
      saveParams("id", id);
      saveParams("title", title);
      saveParams("description", description);
      saveParams("todo", todo);
    });

    return { addTask };
  },
};
</script>
<style scoped></style>
