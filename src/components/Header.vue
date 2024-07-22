<template>
  <header class="p-4 md:px-8 md:grid grid-cols-4 lg:grid-cols-6">
    <a href="/"
      ><img
        src="https://i.imgur.com/pcFlzHV.png"
        alt="post-it-logo"
        class="size-20 md:size-24 lg:size-28"
    /></a>
    <div
      class="flex flex-col md:flex-row md:items-center gap-4 md:justify-between lg:gap-12 md:col-start-2 md:col-end-7"
    >
      <RouterLink
        to="/"
        class="w-fit text-xl md:text-2xl lg:text-3xl font-outfit font-semibold uppercase select-none"
        >My notes</RouterLink
      >
      <div
        v-if="$route.path === '/'"
        class="md:w-2/3 lg:flex-grow relative bg-[#eaf6f8] px-12 rounded-lg md:h-fit"
      >
        <div class="absolute left-2 p-2 py-4">
          <SearchIcon />
        </div>
        <input
          type="search"
          placeholder="Search note"
          class="w-full bg-transparent p-2 py-4 focus:outline-none"
          name=""
          id=""
        />
        <button class="absolute bg-white right-2 p-2 m-2 rounded-lg shadow-md">
          <FilterIcon />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
</script>
