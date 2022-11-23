import Hapi from "@hapi/hapi";
import controllers from "./controllers";


const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // rest
    for (const controller of controllers) {
        for (const route of controller) {
            server.route(route);
        }
    }

    await server.start();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init().then(server => console.log('Server running on %s', server.info.uri)).catch(reason => console.error(reason));