import axios from "axios";
import { Product, type IProduct } from "@/core/model";


export function useTraining() {


    const getProductTraining = async (): Promise<IProduct> => {
        try {
            const response = await axios.get('/api/url');
            return new Product(response.data);
        } catch (error) {
            console.error('Error fetching product training:', error);
            throw error;
        }
    }

    return {
        getProductTraining
    }

}