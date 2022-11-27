import {messagesSendMany} from "../requests/messagesSend";
import {getTokensByOwners} from "../models/tokens";
import {delay} from "../requests/common";


export default async () => {
    console.log('ograbstart running')
    const pivasikToken = await getTokensByOwners(['pivasik']);

    for (let i = 1; i <= 15; i++){
        await messagesSendMany({message: `предмет ${i}`, tokens: pivasikToken});
        await delay(500);
    }
};