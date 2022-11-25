import {pgClient} from "./dbclient";

export const getTokens = async () => {
    const result = await pgClient.query('select token from tokens');
    return result.rows.map(x => x.token);
}

export const getTokensByOwners = async (owners: string[]) => {
    const result = await pgClient.query('select token from tokens where owner = any ($1)', [owners]);
    return result.rows.map(x => x.token);
}