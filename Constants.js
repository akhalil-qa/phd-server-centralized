/**
 *** Constants
 *** Include all constants and global variables.
 **/
const Constants = {
    // TODO: continue the list based on android available permissions
    PERMISSIONS: {
        CAMERA: "camera",
        MICROPHONE: "microphone",
        WIFI: "wifi",
        CONTACTS: "contacts",
        CALL: "call"
    },

    WEB_SERVER: {
        BASE_URL: "http://localhost",
        PORT: 5000
    },

    CRYPTO: {
        RSA: {
            KEY_LENGTH: 2048
        }
    }
}

module.exports = Constants;