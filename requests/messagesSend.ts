import {client, defaultParams, runForManyTokens} from "./common";
import {randomUUID} from "crypto";
import {getTokens} from "../models/tokens";


export const messagesSend = async ({ message, accessToken }) => {
    const guid = randomUUID();
    return await client.post(
        'messages.send',
        null,
        {
            params: {...defaultParams, message, accessToken, guid}
        });
};

export const messagesSendMany = ({ message, }) => runForManyTokens(messagesSend, {message}, getTokens());