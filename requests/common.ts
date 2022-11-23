import {Axios, AxiosResponse} from "axios";


const LESYA_ID = -158861435;

export const client = new Axios({
    baseURL: "https://api.vk.com/method/",
});

client.interceptors.response.use(value => {
    value.data = typeof value.data === "string" ? JSON.parse(value.data) : value.data;
    return value;
});

export const defaultParams = {v: process.env.V, peer_id: LESYA_ID};

interface RequestFuncParams {
    accessToken: any,
    [p: string]: any,
}
type requestFunc = ({accessToken}: RequestFuncParams) => Promise<AxiosResponse>;

export const runForManyTokens = async (func: requestFunc, funcParams: object, tokens: string[]) => {
    const allRunsResult = await Promise.allSettled(
        tokens.map(
            token => func({accessToken: token, ...funcParams})
        )
    );
    for (const runResult of allRunsResult) {
        if (runResult.status === "fulfilled" && runResult.value.data['error']) {
            console.error('call is rejected by vk server');
            console.error(runResult.value.data['error']);
        }
        if (runResult.status === "rejected") {
            console.error('one of calls to api failed: ');
            console.error(runResult.reason);
        }
    }
    return allRunsResult;
};