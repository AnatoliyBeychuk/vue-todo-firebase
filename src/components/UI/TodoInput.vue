<template>
  <input
    class="w-60 rounded-md border focus:outline-none hover:outline-none focus:ring-2 hover:ring-2 focus:to-blue-600 hover:to-blue-600 h-10 p-1"
    :value="modelValue"
    @input="updateInput"
    :placeholder="placeholder"
    type="text"
    :maxlength="maxlength"
  />
</template>

<script>
export default {
  name: "todo-input",
  props: {
    modelValue: [String, Number],
    placeholder: String,
    maxlength: String,
  },
  setup(_, { emit }) {
    const updateInput = (event) => {
      emit("update:modelValue", event.target.value);
    };

    return { updateInput };
  },
};
</script>
<style scoped></style>
