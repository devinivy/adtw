'use strict';

const Glue = require('glue');
const Manifest = require('./manifest');

exports.deployment = async (start) => {

    const manifest = Manifest.get('/', process.env);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    if (!start) {
        return server;
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    return server;
};

const withDeployment = (getDeployment) => {

    let deployment;

    return (handler) => {

        return async (event, context) => {

            deployment = deployment || getDeployment();

            context.server = await deployment;

            return await handler(event, context);
        };
    };
};

exports.serverless = withDeployment(exports.deployment)(
    async (evt, ctx) => await ctx.server.services().serverlessService.instagram(evt, ctx)
);
