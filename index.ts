import Hapi from "@hapi/hapi";
import routes from "./routes";


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            },
        }
    });

    // rest
    for (const route of routes) {
        server.route(route);
    }

    await server.start();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init().then(server => console.log('Server running on %s', server.info.uri)).catch(reason => console.error(reason));