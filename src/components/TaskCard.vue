<template>
  <div
    class="flex border-2 rounded-lg shadow-lg m-2 p-3 hover:translate-x-2 transition-transform delay-150"
  >
    <div class="w-11/12">
      <h4
        class="bold break-words"
        :class="{ 'text-gray-300 line-through': model.status }"
      >
        {{ model.title }}
      </h4>
      <p class="break-words" :class="{ 'text-gray-300': model.status }">
        {{ model.description }}
      </p>
      <p class="border-t-2 w-auto" :class="{ 'text-gray-300': model.status }">
        {{ model.date }}
      </p>
    </div>
    <div class="flex flex-col justify-between items-end w-1/6 h-auto">
      <button @click="emitOnDone" v-if="!model.status">✅</button>
      <button @click="emitOnEdit" v-if="!model.status">✏️</button>
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
<style scoped></style>
