<template>
  <div>
    <task-input
      :id="id"
      :title="title"
      :description="description"
      :todo="todo"
      @add="addTask"
    ></task-input>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { nanoid } from "nanoid";
import { useRoute, useRouter } from "vue-router";
import TaskInput from "../components/TaskInput.vue";
import {
  addTaskToCollection,
  getAllTaskInCollection,
  getTaskById,
  deleteTaskFromCollection,
} from "../firebase/db-service";

import { removeParams, loadParams } from "../utils/Utils";

export default {
  components: { TaskInput },
  setup() {
    const notFulfilled = "not-fulfilled";
    const router = useRouter();
    const route = useRoute();
    const refId = ref("");
    const refTitle = ref("");
    const refDescription = ref("");
    const refTodo = ref("");
    const { id, title, description, todo } = route.params;

    //!!!! Спросить про location.state (React)(useLocation()) !!!!

    const addTask = async (task) => {
      if (refTodo.value === "edit") {
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

    onMounted(() => {
      loadParams("id", refId);
      loadParams("title", refTitle);
      loadParams("description", refDescription);
      loadParams("todo", refTodo);
    });

    return { id, title, description, todo, addTask };
  },
};
</script>
<style scoped></style>
