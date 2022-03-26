<template>
  <div class="task-card border-style">
    <div class="task-content">
      <h4 :class="{ finished: model.status, blur: model.status }">
        {{ model.title }}
      </h4>
      <p class="description" :class="{ blur: model.status }">
        {{ model.description }}
      </p>
      <p :class="{ blur: model.status }">{{ model.date }}</p>
    </div>
    <div>
      <button @click="emitOnEdit" v-if="!model.status">✏️</button>
      <button @click="emitOnDone" v-if="!model.status">✅</button>
      <button @click="emitOnRemove" v-else>❌</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["done", "edit", "remove"],
  props: {
    model: {
      required: true,
      default: {
        id: 0,
        title: "Create",
        description: "And upload",
        status: false,
        date: Date,
      },
    },
  },
  setup(_, { emit }) {
    const emitOnDone = () => {
      emit("done");
    };
    const emitOnEdit = () => {
      emit("edit");
    };
    const emitOnRemove = () => {
      emit("remove");
    };

    return { emitOnDone, emitOnEdit, emitOnRemove };
  },
};
</script>
<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-content {
  max-width: 385px;
}

.description {
  word-break: break-all;
}

.finished {
  text-decoration: line-through;
  text-decoration-color: tomato;
}

.blur {
  color: lightsteelblue;
}
</style>
