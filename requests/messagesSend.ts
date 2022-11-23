import {client, defaultParams} from "./common";


export const messagesSend = async ({ message, accessToken }) => {
    return await client.post('messages.send', null, {params: {...defaultParams, message, accessToken}});
};
