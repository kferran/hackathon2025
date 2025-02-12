import axios from "axios";
import { ref, type Ref } from "vue";
import { useUserStore } from '@/stores/user.store';

type ChatResponse = {
    response: string
}
type RequestAndResponse = {
    prompt: Ref,
    response: Ref
}

const chatResponse = ref<ChatResponse>({response: ''})
const requestsAndResponses = ref<RequestAndResponse[]>([])
const prompts = ref<string[]>([])
const loadingChatResponses = ref<boolean>(false)

export function useChatiBot() {
    const user = useUserStore()

    const resetChat = () => {
        prompts.value = []
        requestsAndResponses.value = []
    }

    const askCertiBot = async (request: string) => {
        try {
            loadingChatResponses.value = true
            prompts.value.push(request)

            const producerTrainingData = JSON.stringify(user.trainingData)
            const payload = [producerTrainingData, request].join(',')

            const response = await axios({
                method: 'post',
                data: { userPrompt: payload },
                url: `https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/assistant`
            });

            chatResponse.value = response.data.response.replace(/\n/g, "<br />")            

            requestsAndResponses.value.push({
                prompt: request,
                response: chatResponse.value
            })
        } catch (error) {
            console.error('Error fetching product training:', error);
            throw error;
        } finally{
            loadingChatResponses.value = false
        }
    }
            

    return {
        chatResponse,
        requestsAndResponses,
        loadingChatResponses,
        resetChat,
        askCertiBot
    }
    
}