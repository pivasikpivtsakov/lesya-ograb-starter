import {messagesSendMany} from "../requests/messagesSend";
import {pgClient} from "../models/dbclient";
import {getTokensByOwners} from "../models/tokens";
import {delay} from "../requests/common";


export default async () => {
    await pgClient.connect();
    const pivasikToken = await getTokensByOwners(['pivasik']);

    for (let i = 1; i <= 15; i++){
        await messagesSendMany({message: `предмет ${i}`, tokens: pivasikToken});
        await delay(500);
    }
};