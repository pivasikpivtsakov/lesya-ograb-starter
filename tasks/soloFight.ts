import {messagesSendMany} from "../requests/messagesSend";
import {pgClient} from "../models/dbclient";
import {getTokens} from "../models/tokens";


export default async () => {
    console.log('solofight running')
    await pgClient.connect();
    await messagesSendMany({message: 'бой', tokens: await getTokens()});
    await pgClient.end();
};