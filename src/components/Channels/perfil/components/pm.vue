<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="relative text-center">
      <img :src="construction" class="w-4/6 mx-auto" />
      <p class=" text-2xl text-white ">
        Private messages coming Soon
      </p>
    </div>
  </div>
</template>
<script>
import construction from "@/assets/img/construction.svg";

export default {
  name: "pm",
  data: () => ({
    construction
  })
}
</script>