import {Lifecycle, RouteOptions, ServerRoute, Util} from "@hapi/hapi"
import {putTokens} from "../models/tokens";


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


export default [
    new Route(
        "POST", '/vk-tokens/', async (request, h, err) => {
            const tokenTableRow = {token: request.payload['token'], owner: request.payload['owner']};
            await putTokens([tokenTableRow]);

            return 'ok';
        }
    ),
]