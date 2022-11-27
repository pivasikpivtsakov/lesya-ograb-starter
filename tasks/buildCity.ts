import {messagesSendMany} from "../requests/messagesSend";
import {getAllTokens} from "../models/tokens";

export default async () => {
    await messagesSendMany({message: `город электро ${1}`, tokens: await getAllTokens()});
}