'use strict';

const AWS = require('aws-sdk');

module.exports = class AwsService {
    constructor(server, options) {

        this.s3 = new AWS.S3(options.aws);
    }
};
