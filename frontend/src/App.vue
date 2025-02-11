<script setup lang="ts">
import ThemeSwitchButton from '@/components/ThemeSwitchButton.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition mode="out-in">
            <KeepAlive>
                <Suspense>
                <!-- main content -->
                 <div>
                    <component :is="Component"></component>
                </div>
                <!-- loading state -->
                <template #fallback>
                    Loading...
                </template>
                </Suspense>
            </KeepAlive>
            </Transition>
        </template>
    </RouterView>
</template>

<style scoped>

</style>
