<template>
  <div class="flex justify-center items-center w-auto">
    <div class="flex flex-col justify-center items-center h-96 p-3 max-w-xs">
      <h1 class="text-5xl font-bold text-black">Welcome!</h1>
      <span class="text-3xl font-bold text-black">to</span>
      <span class="text-blue-600 bold text-7xl">TODOS</span>
      <p class="mt-4">
        This is a simple task list, convenient and easy to use!
      </p>
      <router-link
        class="border-2 rounded-md mt-10 pt-1 pb-1 text-3xl text-white bg-blue-600 pl-3 pr-3 hover:bg-blue-700"
        to="/todos"
        >Create task</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>
<style scoped></style>
