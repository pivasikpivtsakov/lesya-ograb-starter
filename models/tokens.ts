import {pgClient} from "./dbclient";

export const getTokens = async () => {
    const result = await pgClient.query('select token from tokens');
    return result.rows.map(x => x.token);
}