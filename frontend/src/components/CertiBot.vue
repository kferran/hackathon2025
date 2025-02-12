<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useChatiBot } from '@/composables/useChatiBot'
import { useUserStore } from '@/stores/user.store';
import BaseButton from './BaseButton.vue';
const user = useUserStore()
const { askCertiBot, chatResponse } = useChatiBot()

type RequestAndResponse = {
    prompt: Ref,
    response: Ref
}

const prompt = ref<string>('When does my training expire?')
const prompts = ref<string[]>([])
const loading = ref<boolean>(false)
const requestsAndResponses = ref<RequestAndResponse[]>([])

async function handleAskCertiBot() {
    try {
        loading.value = true
        prompts.value.push(prompt.value)

        const producerTrainingData = JSON.stringify(user.trainingData)
        const request = [producerTrainingData, prompts.value.join(',')].join(',')

        await askCertiBot({ userPrompt: request })

        requestsAndResponses.value.push({
            prompt: prompt.value,
            response: chatResponse.value
        })

    } catch (error) {
    } finally {
        loading.value = false
    }

}

function handleResetChat(){
    prompts.value = []
    requestsAndResponses.value = []
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
                    <div
                        class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                        loading...</div>
                </div>
            </template>
            <section class="bg-white dark:bg-gray-900 py-2 lg:py-4 antialiased w-full px-5">
                <div class="flex justify-between">
                    <form class="mr-2 w-full" @submit.prevent="handleAskCertiBot">
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
                    <div class="w-56" v-if="requestsAndResponses.length > 0">
                        <BaseButton color="dark" class="inline-flex items-center" @click.prevent="handleResetChat">
                            <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_73_843)">
                                    <path
                                        d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80025 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C11.9983 4.40924 11.3656 2.88413 10.2407 1.75929C9.11587 0.634449 7.59076 0.00174696 6 0ZM8.2242 7.3758C8.28151 7.43115 8.32722 7.49735 8.35866 7.57056C8.39011 7.64376 8.40666 7.72249 8.40735 7.80216C8.40804 7.88183 8.39286 7.96083 8.36269 8.03457C8.33253 8.10831 8.28797 8.1753 8.23164 8.23163C8.1753 8.28797 8.10831 8.33252 8.03457 8.36269C7.96084 8.39286 7.88183 8.40804 7.80216 8.40735C7.72249 8.40666 7.64376 8.3901 7.57056 8.35866C7.49736 8.32721 7.43115 8.2815 7.3758 8.2242L6 6.8484L4.6242 8.2242C4.51104 8.33349 4.35948 8.39397 4.20216 8.3926C4.04484 8.39124 3.89436 8.32813 3.78311 8.21689C3.67187 8.10564 3.60876 7.95516 3.6074 7.79784C3.60603 7.64052 3.66651 7.48896 3.7758 7.3758L5.1516 6L3.7758 4.6242C3.66651 4.51104 3.60603 4.35948 3.6074 4.20216C3.60876 4.04484 3.67187 3.89435 3.78311 3.78311C3.89436 3.67186 4.04484 3.60876 4.20216 3.60739C4.35948 3.60603 4.51104 3.6665 4.6242 3.7758L6 5.1516L7.3758 3.7758C7.48896 3.6665 7.64052 3.60603 7.79784 3.60739C7.95516 3.60876 8.10565 3.67186 8.21689 3.78311C8.32814 3.89435 8.39124 4.04484 8.39261 4.20216C8.39397 4.35948 8.3335 4.51104 8.2242 4.6242L6.8484 6L8.2242 7.3758Z"
                                        fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_73_843">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Clear Conversation
                        </BaseButton>


                    </div>
                </div>
            </section>
        </div>
    </div>
</template>