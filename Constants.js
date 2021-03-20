/**
 *** Constants
 *** Include all constants and global variables.
 **/
const Constants = {

    WEB_SERVER: {
        BASE_URL: "https://hidden-garden-57594.herokuapp.com",
        PORT: 5000
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