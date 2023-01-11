import _ from "lodash"
import {pgPool} from "./dbclient"

export interface TokenTableRow {
    token?: string,
    owner?: string,
    id?: number,
}

export interface SafeTokenTableRow {
    owner?: string,
    id?: number,
}

export async function getAllTokens(): Promise<TokenTableRow[]> {
    const result = await pgPool.query('select token, owner, id from tokens')
    return result.rows.map(x => _.pick(x, ['token', 'owner', 'id']))
}

export async function getTokensByOwners(owners: string[]): Promise<TokenTableRow[]> {
    const result = await pgPool.query('select token, owner, id from tokens where owner = any ($1)', [owners])
    return result.rows.map(x => _.pick(x, ['token', 'owner', 'id']))
}

export async function getAllTokensSafe(): Promise<SafeTokenTableRow[]> {
    const result = await pgPool.query('select token, owner, id from tokens order by id')
    return result.rows.map(x => _.pick(x, ['owner', 'id']))
}

export async function putTokens(tokenRows: TokenTableRow[]) {
    return Promise.all(
        tokenRows.map(tokenRow =>
            pgPool.query(
                'insert into tokens (token, owner) values ($1, $2)',
                [tokenRow.token, tokenRow.owner])
        )
    )
}

export async function deleteTokensByOwner(owners: string[]) {
    return pgPool.query('delete from tokens where owner = any ($1)', [owners])
}
