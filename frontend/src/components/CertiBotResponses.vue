<script setup lang="ts">
import { useChatiBot } from '@/composables/useChatiBot'
const {  requestsAndResponses, loadingChatResponses } = useChatiBot()
</script>

<template>
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

    <template v-if="loadingChatResponses">
        <div class="flex items-center justify-center w-full">
            <div
                class="px-3 py-1  font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                loading...</div>
        </div>
    </template>

</template>