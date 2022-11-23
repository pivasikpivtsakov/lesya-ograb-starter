import {messagesSendMany} from "../requests/messagesSend";
import {pgClient} from "../models/dbclient";


await pgClient.connect();
await messagesSendMany({message: 'бой'});