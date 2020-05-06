<template>
  <div class="flex w-full h-full">
    <MenuRooms />
    <ChatsRooms />
  </div>
</template>

<script>
import ChatsRooms from "./components/ChatsRooms";
import MenuRooms from "./components/MenuRooms";

export default {
  name: "channel",
  components: {
    ChatsRooms,
    MenuRooms
  }
};
</script>
