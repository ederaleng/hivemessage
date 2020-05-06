<template>
  <div class="bg-black-400 flex-none w-1/6 pb-6 hidden md:block ">
    <div
      class="border-b-2 border-black-200 px-4 py-5 flex justify-between items-center"
    >
      <h1 class="text-white font-bold text-2xl leading-tight my-1 truncate">
        Hive Dev
      </h1>
    </div>
    <div class="py-4 px-2">
      <div
        v-for="(room, key) in rooms"
        :key="key"
        class="py-3 px-4 text-white flex items-center font-semibold rounded-md text-xl hover:bg-black-200"
      >
        {{ room }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-rooms",
  data: () => ({
    rooms: ["general", "post promotion", "dev"]
  })
};
</script>
