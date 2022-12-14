import {Lifecycle, RouteOptions, ServerRoute, Util} from "@hapi/hapi"
import {deleteTokensByOwner, getAllTokensSafe, putTokens} from "../models/tokens";


class Route implements ServerRoute {
    handler: Lifecycle.Method;
    method: Util.HTTP_METHODS_PARTIAL | Util.HTTP_METHODS_PARTIAL[];
    path: string;
    options?: RouteOptions;

    constructor(
        method: Util.HTTP_METHODS_PARTIAL | Util.HTTP_METHODS_PARTIAL[],
        path: string,
        handler: Lifecycle.Method,
        options?: RouteOptions)
    {
        this.handler = handler;
        this.method = method;
        this.path = path;
        this.options = options;
    }
}

const success = {sucksass: true};

export default [
    new Route(
        "PUT", '/vk-tokens/', async (request, h, err) => {
            const tokenTableRow = {token: request.payload['token'], owner: request.payload['owner']};
            try {
                await putTokens([tokenTableRow]);
            } catch (e) {
                console.error(e);
            }

            return success;
        }
    ),
    new Route(
        "DELETE", '/vk-tokens/', async (request, h, err) => {
            const owner = request.payload['owner'];
            await deleteTokensByOwner(owner);
            return success;
        }
    ),
    new Route(
        "GET", '/vk-tokens/safe/', async (request, h, err) => {
            const tokensResult = await getAllTokensSafe();
            return {tokenReprs: tokensResult};
        }
    ),
]