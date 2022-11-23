import {Axios} from "axios";


export const client = new Axios({url: "https://api.vk.com/method/"});
export const defaultParams = {v: '', accessToken: ''};