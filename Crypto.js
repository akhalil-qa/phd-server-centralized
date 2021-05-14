
const Constants = require("./Constants");
const crypto = require("crypto");

const Crypto  = {
    // generate random hex value
    random: function(length) {
        return crypto.randomBytes(length/2).toString("hex"); 
    },

    // generate hash
    // available algorithms: all available algorithms supported by the version of OpenSSL on the platform
    hash: function(input, algorithm) {
        return crypto.createHash(algorithm).update(input).digest("hex");
    },

    Rsa: {
        // generate RSA key-pairs (public key / private key)
        generateKeyPair: function() {
            return crypto.generateKeyPairSync("rsa", {
                modulusLength: Constants.CRYPTO.RSA.KEY_LENGTH,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                }
            });
        },
    
        // generate signature in a base64 format
        sign: function(message, privateKey) {
            console.log("TODO inside sign function.");
            var signer = crypto.createSign(Constants.CRYPTO.RSA.SIGNATURE_ALGORITHM);
            signer.update(message);
            var signature = signer.sign(privateKey, "base64");
            console.log("TODO signature: " + signature);
            return signature;
        },

        // verify the supplied signature (passed in base64 format)
        verify: function(message, publicKey, signature) {
            var verifier = crypto.createVerify(Constants.CRYPTO.RSA.SIGNATURE_ALGORITHM);
            verifier.update(message);
            var signatureBuffer = new Buffer(signature, "base64");
            var result = verifier.verify(publicKey, signatureBuffer);
            return result;
        }
    }
};

module.exports = Crypto;