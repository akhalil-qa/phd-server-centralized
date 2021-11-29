const Constants = {

    WEB_SERVER: {
        NAME: "server",
        BASE_URL: "SECRET",
        PORT: 5599
    },

    DATABASE: {
        URL_LOCAL: "SECRET",
        URL_CLOUD: "SECRET"
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
