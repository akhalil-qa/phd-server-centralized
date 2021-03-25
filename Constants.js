/**
 *** Constants
 *** Include all constants and global variables.
 **/
const Constants = {

    WEB_SERVER: {
        NAME: "server",
        BASE_URL: "https://hidden-garden-57594.herokuapp.com",
        PORT: 4444
    },

    DATABASE: {
        URL: "mongodb://localhost/spacemanager"
    },

    CRYPTO: {
        HASH: {
            ALGORITHM: "sha512"
        },

        RSA: {
            KEY_LENGTH: 4096,
            SIGNATURE_ALGORITHM: "RSA-SHA512"
        }
    }
}

module.exports = Constants;