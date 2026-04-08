import axios from "axios";
import { api } from "../config/apiEndpoint"
import { getDataUrl } from "../core/utils/dataUrlsl"
import { failureResult, successResult } from "../models/common/ResultViewModel";
import type { ProductTableResultViewModel, ProductViewModel } from "../models/Product";

export const ProductServices = {
    create: async function (category: ProductViewModel) {
        const createUrl = `${api.BASE_URL}${api.PRODUCT_ENPOINT}`;

        return axios.post(createUrl, category)
    },
    delete: async function (id: number) {
        const deleteUrl = `${api.BASE_URL}${api.PRODUCT_ENPOINT}/${id}`;

        try {
            const res = await axios.delete(deleteUrl);
            if (res.status === 204) {
                return successResult;
            }

            return failureResult;
        } catch (error) {
            console.log("Errore Deleting Data", error)
        }
    },
    getList: async function (page: number = 1, pageSize: number = 10) {
        let dataUrl = getDataUrl(
            api.BASE_URL,
            api.PRODUCT_ENPOINT,
            page,
            pageSize
        );

        return axios.get(dataUrl).then((response) => {
            return response.data as Promise<ProductTableResultViewModel>;
        });
    },
    getById: async function (id: number) {
        const getUrl = `${api.BASE_URL}${api.PRODUCT_ENPOINT}/${id}`;

        try {
            const response = await axios.get(getUrl);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("Error fetching Product by Id", error);
            return null;
        }
    }
}