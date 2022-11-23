import {Axios} from "axios";


const LESYA_ID = -158861435;

export const client = new Axios({
    baseURL: "https://api.vk.com/method/",
});

export const defaultParams = {v: '', userId: LESYA_ID};