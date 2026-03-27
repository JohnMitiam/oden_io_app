import axios from "axios";
import { api } from "../config/apiEndpoint"
import { getDataUrl } from "../core/utils/dataUrlsl"
import type { CategoryTableResultViewModel, CategoryViewModel } from "../models/Category";

export const CategoryServices = {
    create: async function (category: CategoryViewModel) {
        const createUrl = `${api.BASE_URL}${api.CATEGORY_ENDPOINT}`;

        return axios.post(createUrl, category)
    },
    getList: async function (page: number = 1, pageSize: number = 10) {
        let dataUrl = getDataUrl(
            api.BASE_URL,
            api.CATEGORY_ENDPOINT,
            page,
            pageSize
        );

        return axios.get(dataUrl).then((response) => {
            return response.data as Promise<CategoryTableResultViewModel>;
        });
    }
}