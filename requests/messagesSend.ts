import {client, defaultParams} from "./common";


export const messagesSend = async (message: string) => {
    return await client.post('messages.send', null, {params: {...defaultParams}});
};
