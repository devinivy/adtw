'use strict';

const Fs = require('fs');
const Schmervice = require('schmervice');

module.exports = class ServerlessService extends Schmervice.Service {

    async instagram(event, context) {

        const { instagramService } = this.server.services();
        const { username, password } = this.options.instagram;

        const session = await instagramService.getSession(username, password);
        const contents = Fs.createReadStream(`${__dirname}/../../img.jpg`);

        await instagramService.uploadPhoto({ contents, caption: 'Why, hello there' }, session);
    }
};
