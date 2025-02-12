<script setup lang="ts">
import { ref } from 'vue'
import { useChatiBot } from '@/composables/useChatiBot'
import { useUserStore } from '@/stores/user.store';

const user = useUserStore()
const { askCertiBot, chatResponse, chatResponses } = useChatiBot()

console.log(user.trainingData)

const prompt = ref<string>('When does my training expire?')
const prompts = ref<string[]>([])
const loading = ref<boolean>(false)
const requestsAndResponses = ref<string[{
    prompt: '',
    response: ''
}]>([])

async function handleAskCertiBot() {
    try {
        loading.value = true
        prompts.value.push(prompt.value)

        const producerTrainingData = JSON.stringify(user.trainingData)
        const request = [producerTrainingData, prompts.value.join(',')].join(',')

        await askCertiBot({ userPrompt: request })

        console.log(chatResponse.value)

        requestsAndResponses.value.push({
            prompt: prompt.value,
            response: chatResponse.value
        })

    } catch (error) {
    } finally {
        loading.value = false        
    }

}
</script>

<template>
    <div>
        <div>
            <section class="bg-white dark:bg-gray-900 py-2 lg:py-4 antialiased w-full px-5">
                <template v-for="item in requestsAndResponses">
                    <div class="inline-flex justify-end w-full mb-4">
                        <article
                            class="p-3 mb-2 text-white rounded-lg dark:bg-gray-700 border-2 border-[#1e3c7d] bg-[#095b92] w-2/3">
                            <header class="flex justify-between items-center mb-2">
                                <div class="flex items-center">
                                    <div>
                                        <img class="mr-2 w-6 h-6 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" />
                                    </div>
                                    <p class="text-sm text-white font-bold">
                                        You asked
                                        <!-- <time pubdate datetime="2022-02-08"
                                            title="February 8th, 2022">Feb. 8, 2022</time> -->
                                    </p>
                                </div>

                            </header>
                            <div class="text-white">{{ item.prompt }}</div>
                        </article>
                    </div>
                    <div class="inline-flex justify-start mb-4">
                        <article
                            class="p-3 mb-2 text-base bg-gray-50 rounded-lg dark:bg-gray-700 border-2 border-gray-200 w-2/3">
                            <header class="flex justify-between items-center mb-2">
                                <div class="flex items-center">
                                    <svg class="pr-2" width="31" height="26" viewBox="0 0 31 26" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 7">
                                            <rect id="Rectangle 7" width="26" height="26" fill="#0099FF" />
                                            <g id="Group">
                                                <path id="Vector"
                                                    d="M10.66 7.53999C10.66 6.82343 10.0771 6.23999 9.36 6.23999C8.64292 6.23999 8.06 6.82343 8.06 7.53999C8.06 8.07143 8.38188 8.52851 8.84 8.72975V10.92H9.88V8.72975C10.3381 8.52851 10.66 8.07143 10.66 7.53999Z"
                                                    fill="white" />
                                                <path id="Vector_2"
                                                    d="M16.64 11.96H15.9468L14.976 12.688C14.7035 12.8923 14.3801 13.001 14.0421 13.001C13.364 13.001 12.7915 12.5647 12.5762 11.96H6.76C5.61288 11.96 4.68 12.8928 4.68 14.04V19.24C4.68 20.3871 5.61288 21.32 6.76 21.32H16.64C17.7871 21.32 18.72 20.3871 18.72 19.24V14.04C18.72 12.8928 17.7871 11.96 16.64 11.96ZM8.84 16.64C8.26644 16.64 7.8 16.1735 7.8 15.6C7.8 15.0264 8.26644 14.56 8.84 14.56C9.41356 14.56 9.88 15.0264 9.88 15.6C9.88 16.1735 9.41356 16.64 8.84 16.64ZM14.56 16.64C13.9864 16.64 13.52 16.1735 13.52 15.6C13.52 15.0264 13.9864 14.56 14.56 14.56C15.1336 14.56 15.6 15.0264 15.6 15.6C15.6 16.1735 15.1336 16.64 14.56 16.64Z"
                                                    fill="white" />
                                                <path id="Vector_3"
                                                    d="M20.02 4.68005H14.8195C14.1014 4.68005 13.5195 5.26193 13.5195 5.98005V11.4401C13.5195 11.8685 14.0093 12.1129 14.352 11.8561L15.6 10.9201H20.02C20.7381 10.9195 21.32 10.3371 21.32 9.61953V5.98005C21.32 5.26193 20.7381 4.68005 20.02 4.68005ZM17.68 8.84005C17.68 9.12709 17.447 9.36005 17.16 9.36005H15.6C15.313 9.36005 15.08 9.12709 15.08 8.84005C15.08 8.55301 15.313 8.32005 15.6 8.32005H17.16C17.447 8.32005 17.68 8.55301 17.68 8.84005ZM19.76 6.76005C19.76 7.04709 19.527 7.28005 19.24 7.28005H15.6C15.313 7.28005 15.08 7.04709 15.08 6.76005C15.08 6.47301 15.313 6.24005 15.6 6.24005H19.24C19.527 6.24005 19.76 6.47301 19.76 6.76005Z"
                                                    fill="white" />
                                            </g>
                                            <path id="Polygon 1" d="M30.68 21.3201L25.22 24.4724V18.1677L30.68 21.3201Z"
                                                fill="#0099FF" />
                                        </g>
                                    </svg>

                                    <p class="text-sm text-gray-600 dark:text-gray-400 font-bold">
                                        CertiBot said
                                        <!-- <time pubdate datetime="2022-02-08"
                                            title="February 8th, 2022">Feb. 8, 2022</time> -->
                                    </p>
                                </div>

                            </header>
                            <div class="text-gray-500 dark:text-gray-400" v-html="item.response"></div>
                        </article>
                    </div>
                </template>
            </section>

            <template v-if="loading">
                <div class="flex items-center justify-center w-full">
                    <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                </div>
                <!-- <div class="flex items-center justify-center w-full h-56  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> -->
            </template>
            <section class="bg-white dark:bg-gray-900 py-2 lg:py-4 antialiased w-full px-5">
                <form @submit.prevent="handleAskCertiBot">
                    <div class="flex">
                        <label for="search-dropdown"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your
                            Email</label>
                        <div
                            class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">

                            <svg class="mr-1" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.1875 3.4375C7.1875 2.57625 6.48688 1.875 5.625 1.875C4.76313 1.875 4.0625 2.57625 4.0625 3.4375C4.0625 4.07625 4.44938 4.62563 5 4.8675V7.5H6.25V4.8675C6.80063 4.62563 7.1875 4.07625 7.1875 3.4375Z"
                                    fill="#252525" />
                                <path
                                    d="M14.375 8.75H13.5419L12.375 9.625C12.0475 9.87062 11.6587 10.0013 11.2525 10.0013C10.4375 10.0013 9.74938 9.47688 9.49063 8.75H2.5C1.12125 8.75 0 9.87125 0 11.25V17.5C0 18.8787 1.12125 20 2.5 20H14.375C15.7537 20 16.875 18.8787 16.875 17.5V11.25C16.875 9.87125 15.7537 8.75 14.375 8.75ZM5 14.375C4.31063 14.375 3.75 13.8144 3.75 13.125C3.75 12.4356 4.31063 11.875 5 11.875C5.68937 11.875 6.25 12.4356 6.25 13.125C6.25 13.8144 5.68937 14.375 5 14.375ZM11.875 14.375C11.1856 14.375 10.625 13.8144 10.625 13.125C10.625 12.4356 11.1856 11.875 11.875 11.875C12.5644 11.875 13.125 12.4356 13.125 13.125C13.125 13.8144 12.5644 14.375 11.875 14.375Z"
                                    fill="#252525" />
                                <path
                                    d="M18.4375 0H12.1869C11.3238 0 10.6244 0.699375 10.6244 1.5625V8.125C10.6244 8.64 11.2131 8.93375 11.625 8.625L13.125 7.5H18.4375C19.3006 7.49938 20 6.79938 20 5.93688V1.5625C20 0.699375 19.3006 0 18.4375 0ZM15.625 5C15.625 5.345 15.345 5.625 15 5.625H13.125C12.78 5.625 12.5 5.345 12.5 5C12.5 4.655 12.78 4.375 13.125 4.375H15C15.345 4.375 15.625 4.655 15.625 5ZM18.125 2.5C18.125 2.845 17.845 3.125 17.5 3.125H13.125C12.78 3.125 12.5 2.845 12.5 2.5C12.5 2.155 12.78 1.875 13.125 1.875H17.5C17.845 1.875 18.125 2.155 18.125 2.5Z"
                                    fill="#252525" />
                            </svg>Ask CertiBot
                        </div>

                        <div class="relative w-full">
                            <input type="search" id="search-dropdown"
                                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Ask me anything about your licensing and training" v-model="prompt" />
                            <button type="submit"
                                class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.90745 5.83329H15.0741M5.90745 9.99996H11M19.1482 1.66663H2.85189C2.58176 1.66663 2.3227 1.77637 2.13169 1.97172C1.94068 2.16707 1.83337 2.43203 1.83337 2.70829V13.125C1.83337 13.4012 1.94068 13.6662 2.13169 13.8615C2.3227 14.0569 2.58176 14.1666 2.85189 14.1666H6.92597L10.4908 18.3333L14.0556 14.1666H19.1482C19.4183 14.1666 19.6774 14.0569 19.8684 13.8615C20.0594 13.6662 20.1667 13.4012 20.1667 13.125V2.70829C20.1667 2.43203 20.0594 2.16707 19.8684 1.97172C19.6774 1.77637 19.4183 1.66663 19.1482 1.66663Z"
                                        stroke="white" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </section>

        </div>
        
    </div>
</template>