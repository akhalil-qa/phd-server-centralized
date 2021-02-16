/**
 ** Space Authority Object
 ** This object represents a space authority and include functions that perform all its related tasks.
 **/

const SpaceList = require("./SpaceList");
const Crypto = require("./Crypto");
const Constants = require("./Constants");

function SpaceAuthority(id) {
    return {
        id: id,
        address: Constants.WEB_SERVER.BASE_URL + ":" + Constants.WEB_SERVER.PORT + "/authority/" + id,
        rsaKeyPair: {publicKey: null, privateKey: null},
        spaceList: new SpaceList(),

        // generate rsa keys (public key and private key) using a password
        generateRsaKeyPair: function(password) {
            this.rsaKeyPair = Crypto.Rsa.generateKeyPair(password);
        },

        // register space in the Space List
        registerSpace: function (id, polygon) {
            this.spaceList.addSpace(id, polygon);
        },

        // enforce restriction to a space
        enforceRestriction: function(spaceId, permissionType, appId) {
            return this.spaceList.addRestriction(spaceId, permissionType, appId);
        },

        // exempt restriction from a space
        exemptRestrcition: function(spaceId, permissionType, appId) {
            return this.spaceList.removeRestriction(spaceId, permissionType, appId);
        },

        // delegate a space to another space authority
        assignDelegation: function(spaceId, delegatorId) {
            return this.spaceList.addDelegation(spaceId, delegatorId);
        },

        // revoke previously assigned delegation
        revokeDelegation: function(spaceId) {
            return this.spaceList.removeDelegation(spaceId);
        },

        // get all spaces in the space list
        getSpaces: function() {
            return this.spaceList.getSpaces();
        },

        // get non-delegated spaces from the space list
        getNonDelegatedSpaces: function() {
            var spaceListRecords = this.spaceList.records;
            var nonDelegatedSpaces = [];

            for (var i = 0; i < spaceListRecords.length; i++)
                if (spaceListRecords[i].delegation == null)
                    nonDelegatedSpaces.push(spaceListRecords[i].space);

            return nonDelegatedSpaces;
        },

        // receive anoymous request and respond with signed response
        getSignedDetails: function(challenge) {
            var details = {
                id: this.id,
                address: this.address,
                publicKey: this.rsaKeyPair.publicKey,
                spaceListRecords: this.spaceList.getList(),
                challenge: challenge,
                // TODO
                signature: Crypto.Rsa.sign(JSON.stringify({spaceList: this.spaceList.getList(), challenge}), this.rsaKeyPair.privateKey)
            };
            
            return details;
        }
    };
}

module.exports = SpaceAuthority;