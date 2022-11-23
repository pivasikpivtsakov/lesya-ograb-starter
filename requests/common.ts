import {Axios, AxiosResponse} from "axios";


const LESYA_ID = -158861435;

export const client = new Axios({
    baseURL: "https://api.vk.com/method/",
});

export const defaultParams = {v: process.env.V, peerId: LESYA_ID};

interface RequestFuncParams {
    accessToken: any,
    [p: string]: any,
}
type requestFunc = ({accessToken}: RequestFuncParams) => Promise<AxiosResponse>;

export const runForManyTokens = async (func: requestFunc, funcParams: object, tokens: string[]) => {
    return await Promise.allSettled(
        tokens.map(
            token => func({accessToken: token, ...funcParams})
        )
    );
};