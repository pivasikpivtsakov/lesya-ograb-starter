import {Axios, AxiosResponse} from "axios";
import {TokenTableRow} from "../models/tokens";


const LESYA_ID = -158861435;

const TOKEN_ERROR_CODE = 5;

export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomIntFull = () => {
    const INT32 = 2147483647;
    return getRandomIntInclusive(1, INT32);
};

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

export const runForManyTokens = async (func: requestFunc, funcParams: object, tokens: TokenTableRow[]) => {
    const allRunsResult = await Promise.allSettled(
        tokens.map(async tokenRow => {
            const funcResult = await func({accessToken: tokenRow.token, ...funcParams});
            return {...funcResult, tokenOwner: tokenRow.owner};
        })
    );
    for (const runResult of allRunsResult) {
        if (runResult.status === "rejected") {
            console.error('one of calls to api failed: ');
            console.error(runResult.reason);
        } else if (runResult.status === "fulfilled") {
            if (runResult.value.data['error']) {
                console.error(`call is rejected by vk server`);
                if (runResult.value.data['error']['error_code'] == TOKEN_ERROR_CODE) {
                    console.error(`failed token is by ${runResult.value.tokenOwner}`);
                }
                console.error(runResult.value.data['error']);
            } else if (runResult.value.data['response']) {
                console.log('run succeded');
                console.log(runResult.value.data['response']);
            }
        }
    }
    return allRunsResult;
};