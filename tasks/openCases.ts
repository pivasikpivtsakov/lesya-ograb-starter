import {messagesSendMany} from "../requests/messagesSend";
import {getAllTokens} from "../models/tokens";
import {delay} from "../requests/common";

export default async () => {
    console.log('opencases started')
    for (let i = 1; i <= 7; i++) {
        await messagesSendMany({message: `открыть кейс ${i}`, tokens: await getAllTokens()});
        await delay(500);
    }
};