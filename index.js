// TODO: compress the database before sending
// TODO: develop the ui for the server side
// TODO: sign the updates send by space authority to the server

const Constants = require("./Constants");
const Crypto = require("./Crypto");
const express = require("express");
const mongoose = require("mongoose");

// connect to the database
mongoose.connect(Constants.DATABASE.URL_CLOUD, {useNewUrlParser: true})
    .then(() => console.log("Connected to database."))
    .catch(err => console.error("Coluld not connect to database.", err));

// database schema: coordiante
const coordinateSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    altitude: String
});

// database schema: space
const spaceSchema = new mongoose.Schema({
    id: String,
    boundary: [coordinateSchema]
});

// database schema: restriction record
const restrcitionRecordSchema = new mongoose.Schema({
    permission: String,
    appId: String
});

// database schema: delegation record
const delegationRecordSchema = new mongoose.Schema({
    space: spaceSchema,
    delegator: String
});

// database schema: space list record
const spaceListRecordSchema = new mongoose.Schema({
    space: spaceSchema,
    restrictions: [restrcitionRecordSchema],
    delegations: [delegationRecordSchema]
});

// database schema: authority
const authoritySchema = new mongoose.Schema({
    id: String,
    spaceList: [spaceListRecordSchema],
    signature: String,
    timestamp: String
});

// database schema: certificate authority
const certificateAuthoritySchema = new mongoose.Schema({
    authorityId: String,
    publicKey: String,
    privateKey: String
});

// database models
const Authority = mongoose.model("Authority", authoritySchema);
const CertificateAuthorityRecord = mongoose.model("CertificateAuthorityRecord", certificateAuthoritySchema);

//deleteAuthorities()
//populateDatabase();

// server keys
var keyPair = {};
getCertificateAuthorityRecord(Constants.WEB_SERVER.NAME).then((record) => {
    if (!record) {
        keyPair = generateKeyPair();
        addCertificateAuthorityRecord(Constants.WEB_SERVER.NAME, keyPair.publicKey, keyPair.privateKey);
    } else {
        keyPair.publicKey = record.publicKey;
        keyPair.privateKey = record.privateKey;
    }
});

async function populateDatabase() {
    const sa1 = "Space Authority 1";
    const sa2 = "Space Authority 2";
    const sa3 = "Space Authority 3";
    const sa4 = "Space Authority 4";
    const sa5 = "Space Authority 5";
    const sa6 = "Space Authority 6";

    const s1 = "Space 1";
    const s2 = "Space 2";
    const s3 = "Space 3";
    const s4 = "Space 4";
    const s5 = "Space 5";
    const s6 = "Space 6";
    const s7 = "Space 7";

    // Space Authority 1
    await addAuthority(sa1);
    await addSpace(sa1, s1, "");
    await addCoordinate(sa1, s1, 1, 1, 0, "");
    await addCoordinate(sa1, s1, 6, 1, 0, "");
    await addCoordinate(sa1, s1, 7, 4, 0, "");
    await addCoordinate(sa1, s1, 1, 5, 0, "");
    await addCoordinate(sa1, s1, 1, 1, 0, "");
    await addRestriction(sa1, s1, "RECORD_AUDIO", "com.skype.raider", "");
    await addRestriction(sa1, s1, ".", "com.twitter.android", "");

    // Space Authority 2
    await addAuthority(sa2);
    await addSpace(sa2, s2, "");
    await addCoordinate(sa2, s2, 1, 9, 0, "");
    await addCoordinate(sa2, s2, 9, 6, 0, "");
    await addCoordinate(sa2, s2, 9, 13, 0, "");
    await addCoordinate(sa2, s2, 4, 14, 0, "");
    await addCoordinate(sa2, s2, 4, 16, 0, "");
    await addCoordinate(sa2, s2, 1, 16, 0, "");
    await addCoordinate(sa2, s2, 1, 9, 0, "");

    await addSpace(sa2, s7, "");
    await addCoordinate(sa2, s7, 8, 17, 0, "");
    await addCoordinate(sa2, s7, 12, 17, 0, "");
    await addCoordinate(sa2, s7, 12, 13, 0, "");
    await addCoordinate(sa2, s7, 8, 17, 0, "");

    await addDelegation(sa2, s2, s5, sa5, "");
    await addDelegationCoordinate(sa2, s2, s5, 3, 12, 0, "");
    await addDelegationCoordinate(sa2, s2, s5, 8, 12, 0, "");
    await addDelegationCoordinate(sa2, s2, s5, 8, 8, 0, "");
    await addDelegationCoordinate(sa2, s2, s5, 3, 12, 0, "");

    // Space Authority 3
    await addAuthority(sa3);
    await addSpace(sa3, s3, "");
    await addCoordinate(sa3, s3, 8, 1, 0, "");
    await addCoordinate(sa3, s3, 11, 1, 0, "");
    await addCoordinate(sa3, s3, 11, 4, 0, "");
    await addCoordinate(sa3, s3, 10, 3, 0, "");
    await addCoordinate(sa3, s3, 8, 5, 0, "");
    await addCoordinate(sa3, s3, 8, 1, 0, "");

    // Space Authority 4
    await addAuthority(sa4);
    await addSpace(sa4, s4, "");
    await addCoordinate(sa4, s4, 2, 2, 0, "");
    await addCoordinate(sa4, s4, 4, 2, 0, "");
    await addCoordinate(sa4, s4, 4, 4, 0, "");
    await addCoordinate(sa4, s4, 2, 4, 0, "");
    await addCoordinate(sa4, s4, 2, 2, 0, "");
    await addRestriction(sa4, s4, "CAMERA", "com.snapchat.android", "");
    await addRestriction(sa4, s4, "RECORD_AUDIO", "com.snapchat.android", "");

    // Space Authority 5
    await addAuthority(sa5);
    await addSpace(sa5, s5, "");
    await addCoordinate(sa5, s5, 3, 12, 0, "");
    await addCoordinate(sa5, s5, 8, 12, 0, "");
    await addCoordinate(sa5, s5, 8, 8, 0, "");
    await addCoordinate(sa5, s5, 3, 12, 0, "");
    await addRestriction(sa5, s5, "ACCESS_FINE_LOCATION", "com.twitter.android", "");
    await addRestriction(sa5, s5, "ACCESS_COARSE_LOCATION", "com.twitter.android", "");

    await addDelegation(sa5, s5, s6, sa6, "");
    await addDelegationCoordinate(sa5, s5, s6, 6, 10, 0, "");
    await addDelegationCoordinate(sa5, s5, s6, 7, 10, 0, "");
    await addDelegationCoordinate(sa5, s5, s6, 7, 11, 0, "");
    await addDelegationCoordinate(sa5, s5, s6, 6, 11, 0, "");
    await addDelegationCoordinate(sa5, s5, s6, 6, 10, 0, "");

    // Space Authority 6
    await addAuthority(sa6);
    await addSpace(sa6, s6, "");
    await addCoordinate(sa6, s6, 6, 10, 0, "");
    await addCoordinate(sa6, s6, 7, 10, 0, "");
    await addCoordinate(sa6, s6, 7, 11, 0, "");
    await addCoordinate(sa6, s6, 6, 11, 0, "");
    await addCoordinate(sa6, s6, 6, 10, 0, "");
    await addRestriction(sa6, s6, ".", "com.snapchat.android", "");
}

function generateKeyPair() {
    return Crypto.Rsa.generateKeyPair();
}

async function addCertificateAuthorityRecord(authorityId, publicKey, privateKey) {
    const record = new CertificateAuthorityRecord({
        authorityId: authorityId,
        publicKey: publicKey,
        privateKey: privateKey
    });
    await record.save();
    console.log("Certificate authority record added for " + authorityId);
}

async function getCertificateAuthorityRecord(authorityId) {
    return await CertificateAuthorityRecord.findOne({authorityId: authorityId});
}

async function addAuthority(id) {
    const authority = new Authority({
        id: id,
        spaceList: [],
        signature: null,
        timestamp: new Date().getTime()
    });
    await authority.save();
    console.log("Authority " + id + " added");
}

async function deleteAuthorities() {
    await Authority.deleteMany({});
    console.log("Deleted all authorities");
}

async function addSpace(authorityId, id, signature) {
    const authority = await Authority.findOne({id: authorityId});
    authority.spaceList.push({
        space: {
            id: id,
            boundary: []
        },
        restrictions: [],
        delegations: []
    });
    authority.signature = signature;
    authority.timestamp = new Date().getTime();

    const result = await authority.save();
    console.log(authorityId + " added " + id);
}

async function addCoordinate(authorityId, spaceId, latitude, longitude, altitude, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            authority.spaceList[i].space.boundary.push({
                latitude: latitude,
                longitude: longitude,
                altitude: altitude
            });
            authority.signature = signature;
            authority.timestamp = new Date().getTime();

            await authority.save();
            console.log("Coordinate [" + latitude + "," + longitude + "," + altitude + "] added to " + spaceId);
            return;
        }
    }
}

async function addDelegation(authorityId, parentSapceId, delegatedSpaceId, delegatorId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == parentSapceId) {
            authority.spaceList[i].delegations.push({
                space: {
                    id: delegatedSpaceId,
                    boundary: []
                },
                delegator: delegatorId
            });
            authority.signature = signature;
            authority.timestamp = new Date().getTime();

            await authority.save();
            console.log(authorityId + " delegated " + delegatedSpaceId + " to " + delegatorId);
            return;
        }
    }
}

async function removeDelegation(authorityId, parentSpaceId, delegatedSpaceId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == parentSpaceId) {
            for (var j = 0; j < authority.spaceList[i].delegations.length; j++) {
                if (authority.spaceList[i].delegations[j].space.id == delegatedSpaceId) {
                    authority.spaceList[i].delegations.splice(j, 1);

                    authority.signature = signature;
                    authority.timestamp = new Date().getTime();

                    await authority.save();
                    console.log(authorityId + " removed delegation of " + delegatedSpaceId);
                    return;

                }
            }
        }
    }
}

async function addDelegationCoordinate(authorityId, parentSpaceId, delegatedSpaceId, latitude, longitude, altitude, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == parentSpaceId) {
            for (var j = 0; j < authority.spaceList[i].delegations.length; j++) {
                if (authority.spaceList[i].delegations[j].space.id == delegatedSpaceId) {
                    authority.spaceList[i].delegations[j].space.boundary.push({
                        latitude: latitude,
                        longitude: longitude,
                        altitude: altitude
                    });
                    authority.signature = signature;
                    authority.timestamp = new Date().getTime();

                    await authority.save();
                    console.log("Delegation Coordinate [" + latitude + "," + longitude + "," + altitude + "] added to " + delegatedSpaceId);
                    return;
                }
            }
        }
    }
}

async function addRestriction(authorityId, spaceId, permission, appId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            authority.spaceList[i].restrictions.push({
                permission: permission,
                appId: appId
            });
            authority.signature = signature;
            authority.timestamp = new Date().getTime();

            await authority.save();
            console.log(authorityId + " added restriction [" + permission + "|" + appId + "] in " + spaceId);
            return;
        }
    }
}

async function removeRestriction(authorityId, spaceId, permission, appId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            for (var j = 0; j < authority.spaceList[i].restrictions.length; j++) {
                if (authority.spaceList[i].restrictions[j].permission == permission &&
                    authority.spaceList[i].restrictions[j].appId == appId) {
                        authority.spaceList[i].restrictions.splice(j, 1);
                        authority.signature = signature;
                        authority.timestamp = new Date().getTime();

                        await authority.save();
                        console.log(authorityId + " removed restriction [" + permission + "|" + appId + "] in " + spaceId);
                        return;
                }
            }
        }
    }
}

async function getDatabaseUpdates(timestamp) {
    const authorities = await Authority.find({timestamp: {$gt: timestamp}});
    const signature = Crypto.Rsa.sign(authorities.toString(), keyPair.privateKey);
    return {authorities: authorities, signature: signature};
}

// initialize web server
const app = express();
app.use(express.json());

// generate key pair
app.get("/generateKeyPair", (req, res) => {
    res.send(generateKeyPair());
});

// get database
app.get("/getDatabaseUpdates/:timestamp", (req, res) => {
    getDatabaseUpdates(req.params.timestamp).then((authorities) => {
        res.send(authorities);
    });
});

// start web server
const port = process.env.PORT || Constants.WEB_SERVER.PORT;
app.listen(port, () => {console.log(`Listening in port ${port}`)});

/*
// add authority
app.get("/addAuthority/:id/", (req, res) => {
    addAuthority(req.params.id);
    res.send("Authority " + req.params.id + " added");
});
*/

/*
// add space
app.get("/addSpace/:authorityId/:id/:signature", (req, res) => {
    addSpace(req.params.authorityId, req.params.id, req.params.signature);
    res.send("Space " + req.params.id + " added to authority " + req.params.authorityId);
});
*/

/*
// add coordiante
app.get("/addCoordinate/:authorityId/:spaceId/:x/:y/:z/:signature", (req, res) => {
    addCoordinate(req.params.authorityId, req.params.spaceId, req.params.x, req.params.y, req.params.z, req.params.signature);
    res.send("Coordinate [" + req.params.x + "," +  req.params.y + "," + req.params.z + "] added to space " + req.params.spaceId);
});
*/

/*
// add delegator
app.get("/addDelegator/:authorityId/:spaceId/:delegatorId/:signature", (req, res) => {
    addDelegator(req.params.authorityId, req.params.spaceId, req.params.delegatorId, req.params.signature);
    res.send(req.params.authorityId + " delegated " + req.params.spaceId + " to " + req.params.delegatorId);
});
*/

/*
// remove delegator
app.get("/removeDelegator/:authorityId/:spaceId/:signature", (req, res) => {
    removeDelegator(req.params.authorityId, req.params.spaceId, req.params.signature);
    res.send(req.params.authorityId + " removed delegation of " + req.params.spaceId);
});
*/

/*
// add restriction
app.get("/addRestriction/:authorityId/:spaceId/:permission/:appId/:signature", (req, res) => {
    addRestriction(req.params.authorityId, req.params.spaceId, req.params.permission, req.params.appId, req.params.signature);
    res.send(req.params.authorityId + " added restriction [" + req.params.permission + "|" + req.params.appId + "] in " + req.params.spaceId);
});
*/

/*
// remove restriction
app.get("/removeRestriction/:authorityId/:spaceId/:permission/:appId/:signature", (req, res) => {
    removeRestriction(req.params.authorityId, req.params.spaceId, req.params.permission, req.params.appId, req.params.signature);
    res.send(req.params.authorityId + " removed restriction [" + req.params.permission + "|" + req.params.appId + "] in " + req.params.spaceId);
});
*/

