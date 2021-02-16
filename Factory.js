/**
 *** Factory
 *** A factory to create various objects.
 **/
const SpaceAuthority = require("./SpaceAuthority");
const Constants = require("./Constants");

function Factory() {
    return {
        createSpaceAuthorities: function() {
            // list of space authorities
            var spaceAuthorities = [];

            // SpaceAuthorty1
            var spaceAuthorty1 = new SpaceAuthority("SpaceAuthority1");
            spaceAuthorty1.generateRsaKeyPair("sa1_password");
            spaceAuthorty1.registerSpace("Space1", [[1,1,0], [6,1,0], [7,4,0], [1,5,0], [1,1,0]]);
            spaceAuthorty1.registerSpace("Space4", [[2,2,0], [4,2,0], [4,4,0], [2,4,0], [2,2,0]]);
            spaceAuthorty1.assignDelegation("Space4", "SpaceAuthority4");
            spaceAuthorty1.enforceRestriction("Space1", Constants.PERMISSIONS.CAMERA, "twitter");
            spaceAuthorty1.enforceRestriction("Space1", Constants.PERMISSIONS.MICROPHONE, "snapchat");
            spaceAuthorities.push(spaceAuthorty1);

            // SpaceAuthorty2
            var spaceAuthorty2 = new SpaceAuthority("SpaceAuthority2");
            spaceAuthorty2.generateRsaKeyPair("sa2_password");
            spaceAuthorty2.registerSpace("Space2", [[1,9,0], [9,6,0], [9,13,0], [4,14,0], [4,16,0], [1,16,0], [1,9,0]]);
            spaceAuthorty2.registerSpace("Space7", [[8,17,0], [12,17,0], [12,13,0], [8,17,0]]);
            spaceAuthorty2.registerSpace("Space5", [[3,12,0], [8,12,0], [8,8,0], [3,12,0]]);
            spaceAuthorty2.assignDelegation("Space5", "SpaceAuthority5");
            spaceAuthorty2.enforceRestriction("Space2", Constants.PERMISSIONS.CALL, "snapchat");
            spaceAuthorty2.enforceRestriction("Space7", Constants.PERMISSIONS.WIFI, "chrome");
            spaceAuthorities.push(spaceAuthorty2);

            // spaceAuthorty3
            var spaceAuthorty3 = new SpaceAuthority("SpaceAuthority3");
            spaceAuthorty3.generateRsaKeyPair("sa3_password");
            spaceAuthorty3.registerSpace("Space3", [[8,1,0], [11,1,0], [11,4,0], [10,3,0], [8,5,0], [8,1,0]]);
            spaceAuthorities.push(spaceAuthorty3);

            // spaceAuthorty4
            var spaceAuthorty4 = new SpaceAuthority("SpaceAuthority4");
            spaceAuthorty4.generateRsaKeyPair("sa4_password");
            spaceAuthorty4.registerSpace("Space4", [[2,2,0], [4,2,0], [4,4,0], [2,4,0], [2,2,0]]);
            spaceAuthorty4.enforceRestriction("Space4", Constants.PERMISSIONS.CAMERA, "snapchat");
            spaceAuthorty4.enforceRestriction("Space4", Constants.PERMISSIONS.MICROPHONE, "snapchat");
            spaceAuthorities.push(spaceAuthorty4);

            // spaceAuthorty5
            var spaceAuthorty5 = new SpaceAuthority("SpaceAuthority5");
            spaceAuthorty5.generateRsaKeyPair("sa5_password");
            spaceAuthorty5.registerSpace("Space5", [[3,12,0], [8,12,0], [8,8,0], [3,12,0]]);
            spaceAuthorty5.registerSpace("Space6", [[6,10,0], [7,10,0], [7,11,0], [6,11,0], [6,10,0]]);
            spaceAuthorty5.assignDelegation("Space6", "SpaceAuthority6");
            spaceAuthorty5.enforceRestriction("Space5", Constants.PERMISSIONS.WIFI, "snapchat");
            spaceAuthorty5.enforceRestriction("Space5", Constants.PERMISSIONS.WIFI, "twitter");
            spaceAuthorty5.enforceRestriction("Space5", Constants.PERMISSIONS.CALL, "whatsapp");
            spaceAuthorities.push(spaceAuthorty5);

            // spaceAuthorty6
            var spaceAuthorty6 = new SpaceAuthority("SpaceAuthority6");
            spaceAuthorty6.generateRsaKeyPair("sa6_password");
            spaceAuthorty6.registerSpace("Space6", [[6,10,0], [7,10,0], [7,11,0], [6,11,0], [6,10,0]]);
            spaceAuthorty6.enforceRestriction("Space6", Constants.PERMISSIONS.CALL, "snapchat");
            spaceAuthorities.push(spaceAuthorty6);

            return spaceAuthorities;
        }
    }
}

module.exports = Factory;