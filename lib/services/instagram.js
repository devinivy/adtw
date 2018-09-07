'use strict';

const Instagram = require('instagram-private-api').V1;

module.exports = class InstagramService {

    async uploadPhoto({ contents, caption }, session) {

        const upload = await Instagram.Upload.photo(session, contents);
        await Instagram.Media.configurePhoto(session, upload.params.uploadId, caption || '');
    }

    async getSession(username, password) {

        const device = new Instagram.Device(username);
        const storage = new Instagram.CookieMemoryStorage();

        return await Instagram.Session.create(device, storage, username, password);
    }
};
