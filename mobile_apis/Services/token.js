const jose = require('jose');
// const request = require('request');
const axios = require('axios')
// Apple's public keys
const url = 'https://appleid.apple.com/auth/keys';
// we pass the user and a callback
const verify = (user, callback) => {
    // we extract the JWT
    const { token } = user;
    // we configure jose
    const {
        JWKS,  // JSON Web Key Set (JWKS)
        JWT,   // JSON Web Token (JWT)
        errors // errors utilized by jose
    } = jose;
    // we request the public keys from apple
    axios.get(url).then(res => {
        const key = jose.JWKS.asKeyStore(res.data);

        try {
            // jose works it's magic and verifies the token
            // side-note: at this point, you can check the user's email here if it's the same one from verified, for an extra layer of security
            const verified = jose.JWT.verify(token, key);
            if (verified) {
                callback();
            }

        } catch (e) {
            callback(e);
        }
    })
        .catch(err => {
            err && callback(err)
        })
    // request({ url, json: true }, (err, { body }) => {
    //     if (err) {
    //         callback(err);
    //     } else {
    //         // we set the keys on jose
    //         const key = jose.JWKS.asKeyStore(body);
    //
    //         try {
    //             // jose works it's magic and verifies the token
    //             // side-note: at this point, you can check the user's email here if it's the same one from verified, for an extra layer of security
    //             const verified = jose.JWT.verify(token, key);
    //             if (verified) {
    //                 callback();
    //             }
    //
    //         } catch (e) {
    //             callback(e);
    //         }
    //     }
    // });
};

module.exports = {
    verify
};