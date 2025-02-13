<script setup lang="ts">
import CertiBot from '@/components/CertiBot.vue'
import AdviserSelector from '@/components/AdviserSelector.vue';
import { useUserStore } from '@/stores/user.store';

const user = useUserStore()

function onCertiBotSearch() {
  const element = document.getElementById('chat');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>

<template>


  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
      <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AnnuityTrain</span>
      </a>
      <div class="w-2/3">
        <CertiBot @certibot-searching="onCertiBotSearch">
          <div></div>
        </CertiBot>
      </div>

      <AdviserSelector
	  	v-if="user.role == 'delegate'"
		class="w-1/6"
	  />
    </div>
  </nav>
</template>