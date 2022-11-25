import {client, defaultParams, runForManyTokens} from "./common";


function getRandomInt() {
    const INT32 = 2147483647;
    return Math.floor(Math.random() * INT32);
}

export const messagesSend = async ({ message, accessToken }) => {
    const guid = getRandomInt();
    return await client.post(
        'messages.send',
        null,
        {
            params: {...defaultParams, message, access_token: accessToken, random_id: guid}
        });
};

interface MessagesSendManyParams {
    message:string, tokens:string[],
}

export const messagesSendMany = async ({message, tokens}: MessagesSendManyParams) => runForManyTokens(messagesSend, {message}, tokens);