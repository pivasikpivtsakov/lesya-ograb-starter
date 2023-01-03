import {pgPool} from "./dbclient";

export interface TokenTableRow {
    token?: string,
    owner?: string,
}

export async function getAllTokens(): Promise<TokenTableRow[]> {
    const result = await pgPool.query('select token, owner from tokens');
    return result.rows.map(x => ({
        token: x.token,
        owner: x.owner,
    }));
}

export async function getTokensByOwners(owners: string[]): Promise<TokenTableRow[]> {
    const result = await pgPool.query('select token, owner from tokens where owner = any ($1)', [owners]);
    return result.rows.map(x => ({
        token: x.token,
        owner: x.owner,
    }));
}