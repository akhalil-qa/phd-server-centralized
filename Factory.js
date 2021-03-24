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
            spaceAuthority4.generateRsaKeyPair();
            spaceAuthority4.registerSpace("Space4", [[2,2,0], [4,2,0], [4,4,0], [2,4,0], [2,2,0]]);
            spaceAuthority4.enforceRestriction("Space4", "CAMERA", "com.snapchat.android");
            spaceAuthority4.enforceRestriction("Space4", "RECORD_AUDIO", "com.snapchat.android");

            // SpaceAuthority1
            var spaceAuthority1 = new SpaceAuthority("SpaceAuthority1");
            spaceAuthority1.generateRsaKeyPair();
            spaceAuthority1.registerSpace("Space1", [[1,1,0], [6,1,0], [7,4,0], [1,5,0], [1,1,0]]);
            spaceAuthority1.registerSpace("Space4", [[2,2,0], [4,2,0], [4,4,0], [2,4,0], [2,2,0]]);
            spaceAuthority1.assignDelegation("Space4", "SpaceAuthority4", spaceAuthority4.address);
            spaceAuthority1.enforceRestriction("Space1", "CAMERA", "com.twitter.android");
            spaceAuthority1.enforceRestriction("Space1", "RECORD_AUDIO", "com.snapchat.android");

            // spaceAuthority6
            var spaceAuthority6 = new SpaceAuthority("SpaceAuthority6");
            spaceAuthority6.generateRsaKeyPair();
            spaceAuthority6.registerSpace("Space6", [[6,10,0], [7,10,0], [7,11,0], [6,11,0], [6,10,0]]);
            //spaceAuthority6.enforceRestriction("Space6", "CALL_PHONE", "com.android.dialer");
            //spaceAuthority6.enforceRestriction("Space6", "PROCESS_OUTGOING_CALLS", "com.android.dialer");
            spaceAuthority6.enforceRestriction("Space6", ".", "com.android.dialer");

            // spaceAuthority5
            var spaceAuthority5 = new SpaceAuthority("SpaceAuthority5");
            spaceAuthority5.generateRsaKeyPair();
            spaceAuthority5.registerSpace("Space5", [[3,12,0], [8,12,0], [8,8,0], [3,12,0]]);
            spaceAuthority5.registerSpace("Space6", [[6,10,0], [7,10,0], [7,11,0], [6,11,0], [6,10,0]]);
            spaceAuthority5.assignDelegation("Space6", "SpaceAuthority6", spaceAuthority6.address);
            spaceAuthority5.enforceRestriction("Space5", "ACCESS_FINE_LOCATION", "com.twitter.android");
            spaceAuthority5.enforceRestriction("Space5", "ACCESS_COARSE_LOCATION", "com.twitter.android");

            // SpaceAuthority2
            var spaceAuthority2 = new SpaceAuthority("SpaceAuthority2");
            spaceAuthority2.generateRsaKeyPair();
            spaceAuthority2.registerSpace("Space2", [[1,9,0], [9,6,0], [9,13,0], [4,14,0], [4,16,0], [1,16,0], [1,9,0]]);
            spaceAuthority2.registerSpace("Space7", [[8,17,0], [12,17,0], [12,13,0], [8,17,0]]);
            spaceAuthority2.registerSpace("Space5", [[3,12,0], [8,12,0], [8,8,0], [3,12,0]]);
            spaceAuthority2.assignDelegation("Space5", "SpaceAuthority5", spaceAuthority5.address);
            //spaceAuthority2.enforceRestriction("Space2", "READ_CALENDAR", "com.microsoft.office.outlook");
            //spaceAuthority2.enforceRestriction("Space2", "WRITE_CALENDAR", "com.microsoft.office.outlook");
            //spaceAuthority2.enforceRestriction("Space2", "WRITE_CONTACTS", "com.microsoft.office.outlook");
            //spaceAuthority2.enforceRestriction("Space2", "READ_CONTACTS", "com.microsoft.office.outlook");
            //spaceAuthority2.enforceRestriction("Space2", "GET_ACCOUNTS", "com.microsoft.office.outlook");
            //spaceAuthority2.enforceRestriction("Space2", "CAMERA", "com.snapchat.android");
            //spaceAuthority2.enforceRestriction("Space2", "READ_EXTERNAL_STORAGE", "com.twitter.android");
            //spaceAuthority2.enforceRestriction("Space2", "WRITE_EXTERNAL_STORAGE", "com.twitter.android");
            //spaceAuthority2.enforceRestriction("Space2", "CAMERA", "tools.photo.hd.camera");
            spaceAuthority2.enforceRestriction("Space2", "CAMERA", "com.snapchat.android");
            spaceAuthority2.enforceRestriction("Space2", "RECORD_AUDIO", "com.skype.raider");
            //spaceAuthority2.enforceRestriction("Space2", ".", "com.twitter.android");
            //spaceAuthority2.enforceRestriction("Space2", ".", "com.android.dialer");
        
            // spaceAuthority3
            var spaceAuthority3 = new SpaceAuthority("SpaceAuthority3");
            spaceAuthority3.generateRsaKeyPair();
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