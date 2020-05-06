<template>
  <div class="font-sans antialiased h-screen flex">
    <!-- Sidebar / channel list -->
    <div
      class=" bg-black-200 text-purple-lighter flex-none w-24 py-4 hidden md:block"
    >
      <div class="cursor-pointer mb-4">
        <div
          class="bg-gray-600 h-16 w-16 flex items-center justify-center rounded-lg mx-auto"
        >
          A
        </div>
      </div>

      <div class="cursor-pointer mb-4">
        <div
          class="bg-gray-600 h-16 w-16 flex items-center justify-center rounded-lg mx-auto"
        >
          B
        </div>
      </div>
    </div>
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
    <div
      class="relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden"
    >
      <div
        class="border-b-2 border-black-200 px-8 py-5 flex justify-between items-center"
      >
        <h1 class="text-white text-2xl leading-tight my-1 truncate">General</h1>
      </div>
      <div class="px-8 pt-2 pb-24 flex-1">
        <router-view></router-view>
      </div>
      <div class="absolute bottom-0 w-full px-8 pb-6">
        <div
          class="rounded bg-black-100 px-4 border-0 flex items-center w-full"
        >
          <input
            class="placeholder-hive-100 bg-black-100 pr-4 font-light text-white text-2xl rounded h-16 w-full tracking-wide outline-none"
            placeholder="send a message"
          />
          <img class="h-8 ml-2" :src="icon_send" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import send from "@/assets/img/send.svg";

export default {
  name: "channels",
  data: () => ({
    icon_send: send,
    rooms: ["general", "post promotion", "dev"]
  })
};
</script>
