import Hapi from "@hapi/hapi";
import routes from "./routes";
import {pgClient} from "./models/dbclient";


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    });

    // rest
    for (const route of routes) {
        server.route(route);
    }

    // postgres
    await pgClient.connect();
    console.log('postgres connected');

    await server.start();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init().then(server => console.log('Server running on %s', server.info.uri)).catch(reason => console.error(reason));