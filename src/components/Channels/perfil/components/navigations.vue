<template>
  <div class="relative bg-black-400 flex w-1/6 h-full max-h-screen pb-6 hidden md:block overflow-y-auto overflow-x-hidden" >
    <div class="my-2 px-4 py-2 h-100">
      <router-link :to="{ name: 'me' }" class="py-1 px-4 md:px-2 text-white flex items-center font-semibold rounded-md text-xs hover:bg-black-200 capitalize">
        Account
      </router-link>
      <router-link :to="{ name: 'pm' }" class="py-1 px-4 md:px-2 text-white flex items-center font-semibold rounded-md text-xs hover:bg-black-200 capitalize">
        Private messages
      </router-link>
    </div>
  </div>
</template>