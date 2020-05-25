import bunyan from 'bunyan'
import config from 'config'


const errSerializer = (err) => {
    return {
        id: err.id,
        status: err.status,
        server_code: err.server_code,
        locations: err.locations,
        cause: err.cause,
        message: err.message,
        stack: err.stack,
        internal_error: err.internal_error,
        internal_error_stack_trace: err.internal_error ? err.internal_error.stack : undefined,
    };
}

export const defaultLog = bunyan.createLogger({
    name: config.get('app.id'),
    env: config.get('env'),
    streams: [
        {
            level: config.get('logger.streams.stdout.level'),
            stream: process.stdout,
        },
    ],
    serializers: {
        err: errSerializer,
    },
});
