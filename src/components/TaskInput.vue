<template>
  <div class="task-input grid-style">
    <input v-model="refTitle" placeholder="Title" type="text" maxlength="40" />
    <input
      v-model="refDescription"
      placeholder="Description"
      type="text"
      maxlength="80"
    />
    <button @click="onAddTask">{{ refTodo ? "Update" : "Add task" }}</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  //emits валидация не работает, пока не разобрался в чем дело
  setup(_, { emit }) {
    const refId = ref("");
    const refTitle = ref("");
    const refDescription = ref("");
    const refTodo = ref("");

    const loadParams = (key, ref) => {
      if (localStorage.getItem(key)) {
        ref.value = localStorage.getItem(key);
      }
    };

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
    };

    onMounted(() => {
      loadParams("id", refId);
      loadParams("title", refTitle);
      loadParams("description", refDescription);
      loadParams("todo", refTodo);
    });

    return { onAddTask, refTodo, refTitle, refDescription };
  },
};
</script>
<style scoped>
.task-input {
  margin: 10px 0;
}
</style>
