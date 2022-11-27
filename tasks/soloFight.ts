import {messagesSendMany} from "../requests/messagesSend";
import {getAllTokens} from "../models/tokens";


export default async () => {
    console.log('solofight running')
    await messagesSendMany({message: 'бой', tokens: await getAllTokens()});
};