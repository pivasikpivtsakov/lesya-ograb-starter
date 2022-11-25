import {messagesSendMany} from "../requests/messagesSend";
import {pgClient} from "../models/dbclient";
import {getTokens} from "../models/tokens";


await pgClient.connect();
await messagesSendMany({message: 'бой', tokens: await getTokens()});