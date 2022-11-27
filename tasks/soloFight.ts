import {messagesSendMany} from "../requests/messagesSend";
import {getTokens} from "../models/tokens";


export default async () => {
    console.log('solofight running')
    await messagesSendMany({message: 'бой', tokens: await getTokens()});
};