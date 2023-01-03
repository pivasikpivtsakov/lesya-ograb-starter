import {client, defaultParams, getRandomIntFull, runForManyTokens} from "./common";


export const messagesSend = async ({ message, accessToken }) => {
    const guid = getRandomIntFull();
    return await client.post(
        'messages.send',
        null,
        {
            params: {...defaultParams, message, access_token: accessToken, random_id: guid}
        });
};

interface MessagesSendManyParams {
    message: string,
    tokens: string[],
}

export const messagesSendMany = async ({message, tokens}: MessagesSendManyParams) => runForManyTokens(messagesSend, {message}, tokens);