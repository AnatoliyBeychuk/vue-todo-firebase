<template>
  <div class="flex flex-col justify-center items-center h-60 border-2">
    <todo-input
      class="m-2"
      v-model="refTitle"
      placeholder="Title"
      maxlength="40"
    ></todo-input>
    <todo-input
      class="m-2"
      v-model="refDescription"
      placeholder="Description"
      maxlength="80"
    ></todo-input>
    <button
      class="w-48 rounded-lg bg-green-500 text-white p-2 uppercase m-3 hover:bg-green-600"
      @click="onAddTask"
    >
      {{ refTodo ? "Update" : "Add" }}
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TodoInput from "./UI/TodoInput.vue";
import { removeParams, loadParams, saveParams } from "../utils/Utils";

export default {
  components: { TodoInput },
  props: {
    id: String,
    title: String,
    description: String,
    todo: String,
  },
  //emits валидация не работает, пока не разобрался в чем дело
  setup(props, { emit }) {
    const refId = ref("");
    const refTitle = ref("");
    const refDescription = ref("");
    const refTodo = ref("");

    const onAddTask = () => {
      if (!refTitle.value || !refDescription.value) {
        alert("Fill some info please!");
        return false;
      }
      emit("add", {
        title: refTitle.value,
        description: refDescription.value,
        status: false,
        date: new Date(Date.now()).toUTCString(),
      });
      refTitle.value = "";
      refDescription.value = "";
      removeParams("id");
      removeParams("title");
      removeParams("description");
      removeParams("todo");
    };

    onMounted(() => {
      if (props.title) {
        saveParams("id", props.id);
        saveParams("title", props.title);
        saveParams("description", props.description);
        saveParams("todo", props.todo);
      }
      loadParams("id", refId);
      loadParams("title", refTitle);
      loadParams("description", refDescription);
      loadParams("todo", refTodo);
    });

    return { onAddTask, refTodo, refTitle, refDescription };
  },
};
</script>
<style scoped></style>
