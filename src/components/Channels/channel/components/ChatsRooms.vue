<template>
<div class="relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden" >
  <div class="border-b-2 border-black-200 px-8 py-5 flex justify-between items-center" >
    <h1 class="text-white text-2xl leading-tight my-1 truncate">General</h1>
  </div>
  <div class="px-8 pt-2 pb-24 flex-1">
    messages room
  </div>
  <div class="absolute bottom-0 w-full px-8 pb-6">
    <div class="rounded bg-black-100 px-4 border-0 flex items-center w-full" >
      <input
        class="placeholder-hive-100 bg-black-100 pr-4 font-light text-white text-2xl rounded h-16 w-full tracking-wide outline-none"
        placeholder="send a message"
      />
      <img class="h-8 ml-2" :src="icon_send" />
    </div>
  </div>
</div>
</template>

<script>
import send from "@/assets/img/send.svg";

export default {
  name: "chats-room",
  data: () => ({
    icon_send: send
  })
};
</script>
