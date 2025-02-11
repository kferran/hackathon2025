<script setup lang="ts">
import NavLayout from '@/layouts/NavLayout.vue';
import TrainingActionCard from '@/components/TrainingActionCard.vue'
import ProductTable from '@/components/ProductTable.vue';
import { useTraining } from '@/composables/useTraining';
import { getProductTrainingCompletionPercentage } from '@/core/model';

const { getProductTraining, producerTraining } = useTraining()

await getProductTraining('123123123')
console.log(producerTraining.value)
const anyProductsRequireTraining = producerTraining.value?.products?.some(p => getProductTrainingCompletionPercentage(p) != 1)
</script>
<template>
    <NavLayout>
        <div>
            <div class="w-full py-24 bg-[#111928] flex-col justify-start items-center inline-flex">
                <div v-if="anyProductsRequireTraining">
                    <div class="text-center text-white text-4xl font-extrabold leading-[45px]">Training Action Required
                    </div>

                    <div class="text-center text-gray-400 text-xl font-normal leading-[30px] mb-5">The most pressing
                        training modules that are applicable to your business and clients.</div>

                    <div class="grid grid-cols-2 gap-4">
                        <TrainingActionCard v-for="product in producerTraining?.products" :product="product" />
                    </div>

                </div>
            </div>

            <div class="flex">
                <div>
                    <aside id="sidebar-user" class="shadow-md w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                        <div class="overflow-y-auto py-4 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div class="text-center text-gray-500 dark:text-gray-400">
                                <img class="mx-auto mb-4 w-20 h-20 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                                    alt="Micheal Avatar">
                                <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">Michael Gough</a>
                                </h3>
                                <p class="font-light text-gray-500 dark:text-gray-400">name@company.com</p>
                                <ul class="flex justify-center mb-4 space-x-1">
                                    <li>
                                        <a href="#"
                                            class="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z">
                                                </path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                                <li>
                                    <a href="#"
                                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg aria-hidden="true"
                                            class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="ml-3">My Training Scorecard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg aria-hidden="true"
                                            class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z">
                                            </path>
                                        </svg>
                                        <span class="ml-3">By Product</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg aria-hidden="true"
                                            class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z">
                                            </path>
                                        </svg>
                                        <span class="ml-3">Licensing</span>
                                    </a>
                                </li>
                                <li>
                                    <button type="button"
                                        class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        aria-controls="dropdown-tasks" data-collapse-toggle="dropdown-tasks">
                                        <svg aria-hidden="true"
                                            class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                            <path fill-rule="evenodd"
                                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Carrier Training</span>
                                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <ul id="dropdown-tasks" class="hidden py-2 space-y-2">
                                        <li>
                                            <a href="#"
                                                class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">To
                                                do</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">In
                                                progress</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Completed</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#"
                                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg aria-hidden="true"
                                            class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z">
                                            </path>
                                        </svg>
                                        <span class="ml-3">Distributor Contact</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
                <ProductTable :producerTraining="producerTraining" />
            </div>
        </div>
    </NavLayout>

</template>