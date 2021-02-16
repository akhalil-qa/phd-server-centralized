/**
 *** Crypto
 *** Include all cryptographic operations.
 **/
const Constants = require("./Constants");
const crypto = require("crypto");

const Crypto  = {
    // generate random hex value with 'length' hex character
    random: function(length) {
        return crypto.randomBytes(length/2).toString("hex"); 
    },

    Hash: {
        // generate sha512 hash
        sha512: function(input) {
            return crypto.createHash("sha512").update(input).digest("hex");
        }
    },

    Rsa: {
        // TODO
        generateKeyPair: function(passphrase) {
            var rsaKeyPair = {};
            rsaKeyPair.publicKey = "generated public Key";
            rsaKeyPair.privateKey = "generated private Key";
            return rsaKeyPair;
        },
        // TODO
        encrypt: function(plaintext, publicKey) {
            return "";
        },
        // TODO
        decrypt: function(ciphertext, privateKey) {
            return "";
        },
        // TODO
        sign: function(message, privateKey) {
            return privateKey + "(" + message + ")";
        },
        // TODO
        verify: function(message, publicKey) {
            return "";
        }
    }
};

module.exports = Crypto;