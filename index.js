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

// database schema: space list record
const spaceListRecordSchema = new mongoose.Schema({
    space: spaceSchema,
    delegator: String,
    restrcitions: [restrcitionRecordSchema]
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

//deleteAuthorities();
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

function populateDatabase() {
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
    addAuthority(sa1);
    addSpace(sa1, s1, "");
    addCoordinate(sa1, s1, 1, 1, 0, "");
    addCoordinate(sa1, s1, 6, 1, 0, "");
    addCoordinate(sa1, s1, 7, 4, 0, "");
    addCoordinate(sa1, s1, 1, 5, 0, "");
    addCoordinate(sa1, s1, 1, 1, 0, "");
    addRestriction(sa1, s1, "RECORD_AUDIO", "com.skype.raider", "");
    addRestriction(sa1, s1, ".", "com.twitter.android", "");

    // Space Authority 2
    addAuthority(sa2);
    addSpace(sa2, s2, "");
    addCoordinate(sa2, s2, 1, 9, 0, "");
    addCoordinate(sa2, s2, 9, 6, 0, "");
    addCoordinate(sa2, s2, 9, 13, 0, "");
    addCoordinate(sa2, s2, 4, 14, 0, "");
    addCoordinate(sa2, s2, 4, 16, 0, "");
    addCoordinate(sa2, s2, 1, 16, 0, "");
    addCoordinate(sa2, s2, 1, 9, 0, "");
    addSpace(sa2, s7, "");
    addCoordinate(sa2, s7, 8, 17, 0, "");
    addCoordinate(sa2, s7, 12, 17, 0, "");
    addCoordinate(sa2, s7, 12, 13, 0, "");
    addCoordinate(sa2, s7, 8, 17, 0, "");
    addSpace(sa5, s2, "");
    addCoordinate(sa2, s5, 3, 12, 0, "");
    addCoordinate(sa2, s5, 8, 12, 0, "");
    addCoordinate(sa2, s5, 8, 8, 0, "");
    addCoordinate(sa2, s5, 3, 12, 0, "");
    addDelegator(sa2, s5, s5, "");

    // Space Authority 3
    addAuthority(sa3);
    addSpace(sa3, s3, "");
    addCoordinate(sa3, s3, 8, 1, 0, "");
    addCoordinate(sa3, s3, 11, 1, 0, "");
    addCoordinate(sa3, s3, 11, 4, 0, "");
    addCoordinate(sa3, s3, 10, 3, 0, "");
    addCoordinate(sa3, s3, 8, 5, 0, "");
    addCoordinate(sa3, s3, 8, 1, 0, "");

    // Space Authority 4
    addAuthority(sa4);
    addSpace(sa4, s4, "");
    addCoordinate(sa4, s4, 2, 2, 0, "");
    addCoordinate(sa4, s4, 4, 2, 0, "");
    addCoordinate(sa4, s4, 4, 4, 0, "");
    addCoordinate(sa4, s4, 2, 4, 0, "");
    addCoordinate(sa4, s4, 2, 2, 0, "");
    addRestriction(sa4, s4, "CAMERA", "com.snapchat.android", "");
    addRestriction(sa4, s4, "RECORD_AUDIO", "com.snapchat.android", "");

    // Space Authority 5
    addAuthority(sa5);
    addSpace(sa5, s5, "");
    addCoordinate(sa5, s5, 3, 12, 0, "");
    addCoordinate(sa5, s5, 8, 12, 0, "");
    addCoordinate(sa5, s5, 8, 8, 0, "");
    addCoordinate(sa5, s5, 3, 12, 0, "");
    addRestriction(sa5, s5, "ACCESS_FINE_LOCATION", "com.twitter.android", "");
    addRestriction(sa5, s5, "ACCESS_COARSE_LOCATION", "com.twitter.android", "");

    // Space Authority 6
    addAuthority(sa6);
    addSpace(sa6, s6, "");
    addCoordinate(sa6, s6, 6, 10, 0, "");
    addCoordinate(sa6, s6, 7, 10, 0, "");
    addCoordinate(sa6, s6, 7, 11, 0, "");
    addCoordinate(sa6, s6, 6, 11, 0, "");
    addCoordinate(sa6, s6, 6, 10, 0, "");
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
        delegator: null,
        restrcitions: []
    });
    authority.signature = signature;
    authority.timestamp = new Date().getTime();

    const result = await authority.save();
    console.log(authorityId + " added " + id);
}

async function addCoordinate(authorityId, spaceId, x, y, z, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            authority.spaceList[i].space.boundary.push({x: x, y: y, z: z});
            authority.signature = signature;
            authority.timestamp = Date.now();

            await authority.save();
            console.log("Coordinate [" + x + "," + y + "," + z + "] added to " + spaceId);
            return;
        }
    }
}

async function addDelegator(authorityId, spaceId, delegatorId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            authority.spaceList[i].delegator = delegatorId;
            authority.signature = signature;
            authority.timestamp = Date.now();

            await authority.save();
            console.log(authorityId + " delegated " + spaceId + " to " + delegatorId);
            return;
        }
    }
}

async function removeDelegator(authorityId, spaceId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            authority.spaceList[i].delegator = null;
            authority.signature = signature;
            authority.timestamp = Date.now();

            await authority.save();
            console.log(authorityId + " removed delegation of " + spaceId);
            return;
        }
    }
}

async function addRestriction(authorityId, spaceId, permission, appId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            authority.spaceList[i].restrcitions.push({
                permission: permission,
                appId: appId
            });
            authority.signature = signature;
            authority.timestamp = Date.now();

            await authority.save();
            console.log(authorityId + " added restrction [" + permission + "|" + appId + "] in " + spaceId);
            return;
        }
    }
    authority.spaceList.push({
        space: {
            id: id,
            boundary: boundary
        },
        delegator: null,
        restrcitions: []
    });
    const result = await authority.save();
    console.log(authorityId + " added " + id);
}

async function removeRestriction(authorityId, spaceId, permission, appId, signature) {
    const authority = await Authority.findOne({id: authorityId});

    for (var i = 0; i < authority.spaceList.length; i++) {
        if (authority.spaceList[i].space.id == spaceId) {
            for (var j = 0; j < authority.spaceList[i].restrcitions.length; j++) {
                if (authority.spaceList[i].restrcitions[j].permission == permission &&
                    authority.spaceList[i].restrcitions[j].appId == appId) {
                        authority.spaceList[i].restrcitions.splice(j, 1);
                        authority.signature = signature;
                        authority.timestamp = Date.now();

                        await authority.save();
                        console.log(authorityId + " removed restrction [" + permission + "|" + appId + "] in " + spaceId);
                        return;
                }
            }
        }
    }
}

async function getDatabase(timestamp) {
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
app.get("/getDatabase/:timestamp", (req, res) => {
    getDatabase(req.params.timestamp).then((authorities) => {
        res.send(authorities);
    });
});

// add authority
app.get("/addAuthority/:id/", (req, res) => {
    addAuthority(req.params.id);
    res.send("Authority " + req.params.id + " added");
});

// add space
app.get("/addSpace/:authorityId/:id/:signature", (req, res) => {
    addSpace(req.params.authorityId, req.params.id, req.params.signature);
    res.send("Space " + req.params.id + " added to authority " + req.params.authorityId);
});

// add coordiante
app.get("/addCoordinate/:authorityId/:spaceId/:x/:y/:z/:signature", (req, res) => {
    addCoordinate(req.params.authorityId, req.params.spaceId, req.params.x, req.params.y, req.params.z, req.params.signature);
    res.send("Coordinate [" + req.params.x + "," +  req.params.y + "," + req.params.z + "] added to space " + req.params.spaceId);
});

// add delegator
app.get("/addDelegator/:authorityId/:spaceId/:delegatorId/:signature", (req, res) => {
    addDelegator(req.params.authorityId, req.params.spaceId, req.params.delegatorId, req.params.signature);
    res.send(req.params.authorityId + " delegated " + req.params.spaceId + " to " + req.params.delegatorId);
});

// remove delegator
app.get("/removeDelegator/:authorityId/:spaceId/:signature", (req, res) => {
    removeDelegator(req.params.authorityId, req.params.spaceId, req.params.signature);
    res.send(req.params.authorityId + " removed delegation of " + req.params.spaceId);
});

// add restriction
app.get("/addRestriction/:authorityId/:spaceId/:permission/:appId/:signature", (req, res) => {
    addRestriction(req.params.authorityId, req.params.spaceId, req.params.permission, req.params.appId, req.params.signature);
    res.send(req.params.authorityId + " added restrction [" + req.params.permission + "|" + req.params.appId + "] in " + req.params.spaceId);
});

// remove restriction
app.get("/removeRestriction/:authorityId/:spaceId/:permission/:appId/:signature", (req, res) => {
    removeRestriction(req.params.authorityId, req.params.spaceId, req.params.permission, req.params.appId, req.params.signature);
    res.send(req.params.authorityId + " removed restrction [" + req.params.permission + "|" + req.params.appId + "] in " + req.params.spaceId);
});

// start web server
const port = process.env.PORT || Constants.WEB_SERVER.PORT;
app.listen(port, () => {console.log(`Listening in port ${port}`)});

