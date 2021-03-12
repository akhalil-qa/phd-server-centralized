/**
 *** Factory
 *** A factory to create various objects.
 **/
const SpaceAuthority = require("./SpaceAuthority");
const Constants = require("./Constants");

function Factory() {
    return {
        createSpaceAuthorities: function() {

            // spaceAuthority4
            var spaceAuthority4 = new SpaceAuthority("SpaceAuthority4");
            spaceAuthority4.generateRsaKeyPair("sa4_password");
            spaceAuthority4.registerSpace("Space4", [[2,2,0], [4,2,0], [4,4,0], [2,4,0], [2,2,0]]);
            spaceAuthority4.enforceRestriction("Space4", Constants.PERMISSIONS.CAMERA, "snapchat");
            spaceAuthority4.enforceRestriction("Space4", Constants.PERMISSIONS.MICROPHONE, "snapchat");

            // SpaceAuthority1
            var spaceAuthority1 = new SpaceAuthority("SpaceAuthority1");
            spaceAuthority1.generateRsaKeyPair("sa1_password");
            spaceAuthority1.registerSpace("Space1", [[1,1,0], [6,1,0], [7,4,0], [1,5,0], [1,1,0]]);
            spaceAuthority1.registerSpace("Space4", [[2,2,0], [4,2,0], [4,4,0], [2,4,0], [2,2,0]]);
            spaceAuthority1.assignDelegation("Space4", "SpaceAuthority4", spaceAuthority4.address);
            spaceAuthority1.enforceRestriction("Space1", Constants.PERMISSIONS.CAMERA, "twitter");
            spaceAuthority1.enforceRestriction("Space1", Constants.PERMISSIONS.MICROPHONE, "snapchat");

            // spaceAuthority6
            var spaceAuthority6 = new SpaceAuthority("SpaceAuthority6");
            spaceAuthority6.generateRsaKeyPair("sa6_password");
            spaceAuthority6.registerSpace("Space6", [[6,10,0], [7,10,0], [7,11,0], [6,11,0], [6,10,0]]);
            spaceAuthority6.enforceRestriction("Space6", Constants.PERMISSIONS.CALL, "snapchat");

            // spaceAuthority5
            var spaceAuthority5 = new SpaceAuthority("SpaceAuthority5");
            spaceAuthority5.generateRsaKeyPair("sa5_password");
            spaceAuthority5.registerSpace("Space5", [[3,12,0], [8,12,0], [8,8,0], [3,12,0]]);
            spaceAuthority5.registerSpace("Space6", [[6,10,0], [7,10,0], [7,11,0], [6,11,0], [6,10,0]]);
            spaceAuthority5.assignDelegation("Space6", "SpaceAuthority6", spaceAuthority6.address);
            spaceAuthority5.enforceRestriction("Space5", Constants.PERMISSIONS.WIFI, "snapchat");
            spaceAuthority5.enforceRestriction("Space5", Constants.PERMISSIONS.WIFI, "twitter");
            spaceAuthority5.enforceRestriction("Space5", Constants.PERMISSIONS.CALL, "whatsapp");

            // SpaceAuthority2
            var spaceAuthority2 = new SpaceAuthority("SpaceAuthority2");
            spaceAuthority2.generateRsaKeyPair("sa2_password");
            spaceAuthority2.registerSpace("Space2", [[1,9,0], [9,6,0], [9,13,0], [4,14,0], [4,16,0], [1,16,0], [1,9,0]]);
            spaceAuthority2.registerSpace("Space7", [[8,17,0], [12,17,0], [12,13,0], [8,17,0]]);
            spaceAuthority2.registerSpace("Space5", [[3,12,0], [8,12,0], [8,8,0], [3,12,0]]);
            spaceAuthority2.assignDelegation("Space5", "SpaceAuthority5", spaceAuthority5.address);
            spaceAuthority2.enforceRestriction("Space2", Constants.PERMISSIONS.MICROPHONE, "snapchat");
            spaceAuthority2.enforceRestriction("Space7", Constants.PERMISSIONS.WIFI, "chrome");
            
            // spaceAuthority3
            var spaceAuthority3 = new SpaceAuthority("SpaceAuthority3");
            spaceAuthority3.generateRsaKeyPair("sa3_password");
            spaceAuthority3.registerSpace("Space3", [[8,1,0], [11,1,0], [11,4,0], [10,3,0], [8,5,0], [8,1,0]]);

            // list of space authorities
            var spaceAuthorities = [];

            spaceAuthorities.push(spaceAuthority1);
            spaceAuthorities.push(spaceAuthority2);
            spaceAuthorities.push(spaceAuthority3);
            spaceAuthorities.push(spaceAuthority4);
            spaceAuthorities.push(spaceAuthority5);
            spaceAuthorities.push(spaceAuthority6);

            return spaceAuthorities;
        }
    }
}

module.exports = Factory;