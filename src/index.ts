import http from "http";
import app from "./app";
import config from "./config/config";
import initDBConnection from "./utils/database";
import logger from "./utils/logger";

// Initiate the connection to the database
initDBConnection(config.db.url, config.db.options).then((r) => {
    // import * as fs from "node:fs";
    // const options = {
    //     key: fs.readFileSync('privateKey.key'),
    //     cert: fs.readFileSync('certificate.crt')
    // };

    const server = http.createServer(app);

    server.listen(config.port);
    server.on("listening", () => {
        logger.info(`Server running on PORT ${server.address()}:${config.port}`);
    });
    server.on("error", onError);
}).catch((err) => {
    logger.error(`Error connecting to the database: ${err}`);
});

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = "Port " + config.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
}
