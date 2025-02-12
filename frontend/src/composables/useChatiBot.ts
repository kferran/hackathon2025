import axios from "axios";
import { ref } from "vue";

type ChatResponse = {
    response: string
}
export function useChatiBot() {

    const chatResponse = ref<ChatResponse>({response: ''})
    const chatResponseList = ref<ChatResponse[]>([])

    const askCertiBot = async (prompt:{ userPrompt: string }) => {
        try {
            const response = await axios({
                method: 'post',
                data: prompt,
                url: `https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/assistant`
            });

            chatResponse.value = response.data.response.replace(/\n/g, "<br />")            
            chatResponseList.value.push(chatResponse.value)
        } catch (error) {
            console.error('Error fetching product training:', error);
            throw error;
        }
    }
            

    return {
        chatResponse,
        chatResponseList,
        askCertiBot
    }
    
}