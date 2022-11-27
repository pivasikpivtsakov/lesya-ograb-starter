import {pgPool} from "./dbclient";

export const getAllTokens = async () => {
    const result = await pgPool.query('select token from tokens');
    return result.rows.map(x => x.token);
}

export const getTokensByOwners = async (owners: string[]) => {
    const result = await pgPool.query('select token from tokens where owner = any ($1)', [owners]);
    return result.rows.map(x => x.token);
}