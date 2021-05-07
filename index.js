const Constants = require("./Constants");
const Crypto = require("./Crypto");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { response } = require("express");

/******************** DATABASE ********************/

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
    publicKey: String
});

// database models
const Authority = mongoose.model("Authority", authoritySchema);
const CertificateAuthorityRecord = mongoose.model("CertificateAuthorityRecord", certificateAuthoritySchema);

/**************************************************/

/******************* FUNCTIONS ********************/

// clear Authorities collection
async function clearAuthoritiesCollection() {
    await Authority.deleteMany({});
}

// clear CertificateAuthorityRecords collection
async function clearCertificateAuthorityRecordsCollection() {
    await CertificateAuthorityRecord.deleteMany({});
}

// populate authorities collection with dummy intial documents
async function populateAuthoritiesCollection() {
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
    await addAuthority(sa1, "");
    await addSpace(sa1, s1, "");
    await addCoordinate(sa1, s1, 1, 1, 0, "");
    await addCoordinate(sa1, s1, 6, 1, 0, "");
    await addCoordinate(sa1, s1, 7, 4, 0, "");
    await addCoordinate(sa1, s1, 1, 5, 0, "");
    await addCoordinate(sa1, s1, 1, 1, 0, "");
    await addRestriction(sa1, s1, "RECORD_AUDIO", "com.skype.raider", "");
    await addRestriction(sa1, s1, "*", "com.twitter.android", "");

    // Space Authority 2
    await addAuthority(sa2, "");
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
    await addAuthority(sa3, "");
    await addSpace(sa3, s3, "");
    await addCoordinate(sa3, s3, 8, 1, 0, "");
    await addCoordinate(sa3, s3, 11, 1, 0, "");
    await addCoordinate(sa3, s3, 11, 4, 0, "");
    await addCoordinate(sa3, s3, 10, 3, 0, "");
    await addCoordinate(sa3, s3, 8, 5, 0, "");
    await addCoordinate(sa3, s3, 8, 1, 0, "");

    // Space Authority 4
    await addAuthority(sa4, "");
    await addSpace(sa4, s4, "");
    await addCoordinate(sa4, s4, 2, 2, 0, "");
    await addCoordinate(sa4, s4, 4, 2, 0, "");
    await addCoordinate(sa4, s4, 4, 4, 0, "");
    await addCoordinate(sa4, s4, 2, 4, 0, "");
    await addCoordinate(sa4, s4, 2, 2, 0, "");
    await addRestriction(sa4, s4, "CAMERA", "com.snapchat.android", "");
    await addRestriction(sa4, s4, "RECORD_AUDIO", "com.snapchat.android", "");

    // Space Authority 5
    await addAuthority(sa5, "");
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
    await addAuthority(sa6, "");
    await addSpace(sa6, s6, "");
    await addCoordinate(sa6, s6, 6, 10, 0, "");
    await addCoordinate(sa6, s6, 7, 10, 0, "");
    await addCoordinate(sa6, s6, 7, 11, 0, "");
    await addCoordinate(sa6, s6, 6, 11, 0, "");
    await addCoordinate(sa6, s6, 6, 10, 0, "");
    await addRestriction(sa6, s6, "*", "com.snapchat.android", "");
}

// add CertificateAuthorityRecord document
async function addCertificateAuthorityRecord(authorityId, publicKey) {
    const record = new CertificateAuthorityRecord({
        authorityId: authorityId,
        publicKey: publicKey
    });
    await record.save();
    console.log("Certificate authority record added for " + authorityId);
}

// get all CertificateAuthorityRecord documents
async function getCertificateAuthorityRecords() {
    return await CertificateAuthorityRecord.find({});
}

// get authorities documents updates (documents updated after the supplied timestamp)
async function getAuthoritiesDocumentsUpdates(timestamp) {
    const authorities = await Authority.find({timestamp: {$gt: timestamp}});
    const signature = Crypto.Rsa.sign(authorities.toString(), serveyKeyPair.privateKey);
    return {authorities: authorities, signature: signature};
}

// get certificateAuthorityRecord document associated with the supplied authority id
async function getCertificateAuthorityRecord(authorityId) {
    return await CertificateAuthorityRecord.findOne({authorityId: authorityId});
}

// get Authority document associated with the supplied authority id
async function getAuthorityRecord(authorityId) {
    return await Authority.findOne({id: authorityId});
}

// add authority document
async function addAuthority(id, signature) {
    const authority = new Authority({
        id: id,
        spaceList: [],
        signature: signature,
        timestamp: new Date().getTime()
    });
    await authority.save();
    console.log("Authority " + id + " added.");
}

// update authority document
// spaceList supplied must be stringified json object
async function updateAuthority(id, spaceList, signature) {
    spaceList = JSON.parse(spaceList);
    const authority = await Authority.findOne({id: id});
    authority.spaceList = spaceList;
    authority.signature = signature;
    authority.timestamp = new Date().getTime();
    const result = await authority.save();
    console.log("Authority " + id  + " updated.");
    return result;
}

// add space
// used in populateAuthoritiesCollection() function only
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

// add coordinate
// used in populateAuthoritiesCollection() function only
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

// add delegation
// used in populateAuthoritiesCollection() function only
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

// remove delegation
// currently not used
/*
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
*/

// add delegation coordinate
// used in populateAuthoritiesCollection() function only
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

// add restriction
// used in populateAuthoritiesCollection() function only
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

// remove restriction
// currently not used
/*
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
*/

/**************************************************/

/***********I********* SERVER *********************/

// server key pair
var serveyKeyPair = {
    publicKey: "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwP4qDVAoOI+g69exIUoV\nZdK1vfY33CmiWFGWnyFIO9TPe7wqBytsyEi0H3O0H1oA4kiwmlgNQW8bBcyvwqhc\nfGkNYkscOfV9L2pe1T9kvyllzSIf7+tib6IQ7jPPYjJfWvZmS7PrVFnSMvxQMX8S\nQTCkWwRrrV1pttIZMF4RO9DwmXdvE1V4sH2/aX1vv05SSTWcKjA2QLkC5/11Fm0q\nU9aUT4mgepIMSOGYBE3QY7kFuzmExEwNyg1AaMeXbd4zhh4ia4mcGB5AHrjhMt4g\n2JkTsGaegmb3qPR16CTRKEzuz0OS8DE4ZDsb8QTadmLtMrioG6YaURPDouYLBxBl\nFBF+8KHr7fY0ABBWZA6osGieKVkgV3n6E+x3YR83k4mTm3qqUOGnvcYrJVcHxmS1\nyhEsQ5XDOSZYqBCF/GJTwz4mxTG/XBriWJR7f4myyOKOIJJdXDMg0R7x1mUD6AlN\neydMaIKwJYu7nnWdI5x+MiUz0uleDksot16WQWd6lI3O776EfyZWDLLCbxZMn4FV\nkVWh66HJDlXgJsT8rKzE3K+huZBhTYxlgUuWDkz5Vy6QlXxl2rWFJn0yShK0ZLjn\nee5W5VJqwKU52oLuk8BXm1DmfhGKlkNiv47xQWi6XvFr0K2zW98Vgndm6i03DoTr\nQhBdut/ZZSbF5Rfj0JlA23MCAwEAAQ==\n-----END PUBLIC KEY-----\n",
    privateKey: "-----BEGIN PRIVATE KEY-----\n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\nfL32MwGp9n9hBfP1wsDu2OwDrZtkdgL99w==\n-----END PRIVATE KEY-----\n"
};

// connect to the database
mongoose.connect(Constants.DATABASE.URL_CLOUD, {useNewUrlParser: true})
    .then(() => console.log("Connected to database."))
    .catch(err => console.error("Colud not connect to database.", err));

// initialize web server
const app = express();app.use(express.json());

// generate keypair
app.get("/debug/generateKeyPair", cors(), (req, res) => {
    res.send(Crypto.Rsa.generateKeyPair());
});

// sign signature
app.get("/debug/sign/:message/:privateKey", cors(), (req, res) => {
    try {
        res.send(Crypto.Rsa.sign(req.params.message, req.params.privateKey));
    } catch (e) {
        res.send({
            result: "fail",
            message: "Signature generation failed."
        });
    }
});

// verify signature
app.get("/debug/verify/:message/:publicKey/:signature", cors(), (req, res) => {
    try {
        res.send({
            result: Crypto.Rsa.verify(req.params.message, req.params.publicKey, req.params.signature)
        });
    } catch (e) {
        res.send({
            result: "fail",
            message: "Signature verification failed."
        });
    }
});

// clear database content: Authorities collection and CertificateAuthorityRecords collection
app.get("/debug/clearDatabase", cors(), (req, res) => {
    clearAuthoritiesCollection();
    clearCertificateAuthorityRecordsCollection();
    res.send("Authorities collection cleared.<br>CertificateAuthorityRecords collection cleared.");
});

// populate database with initial data
app.get("/debug/populateDatabase", cors(), (req, res) => {
    addCertificateAuthorityRecord(Constants.WEB_SERVER.NAME, serveyKeyPair.publicKey);
    populateAuthoritiesCollection();
    res.send("Database populated.");
});

// get all CertificateAuthorityRecord records
app.get("/debug/getCertificateAuthorityRecords", cors(), (req, res) => {
    getCertificateAuthorityRecords().then((records) => {
        res.send(records);
    });
});

// get database records updated after the supplied timestamp
app.get("/getDatabaseUpdates/:timestamp", cors(), (req, res) => {
    getAuthoritiesDocumentsUpdates(req.params.timestamp).then((authorities) => {
        res.send(authorities);
    });
});

// register authority's public key with CA
app.get("/registerKey/:authorityId/:publicKey", cors(), (req, res) => {
    
    // if authority is already registered, do not register it again
    getCertificateAuthorityRecord(req.params.authorityId).then((record) => {
        if (record) {
            res.send({
                result: "fail",
                message: "Authority is already registered with CA."
            });
        } else {
            addCertificateAuthorityRecord(req.params.authorityId, req.params.publicKey);
            res.send({response: "success"});
        }
    });
 
});

// register space authority
app.get("/registerAuthority/:authorityId/:signature", cors(), (req, res) => {
    // if space authority is already registered, do not register it again
    getAuthorityRecord(req.params.authorityId).then((record) => {
        if (record) {
            res.send({
                result: "fail",
                message: "Space authority is already registered in the server."
            });
        } else {
            getCertificateAuthorityRecord(req.params.authorityId).then((record) => {
                // if record is not found in certificate authority database
                if (!record) {
                    res.send({
                        result: "fail",
                        message: "Cannot obtain its public key from CA."
                    });
                }
                else {
                    // if signature is not verified
                    if (!Crypto.Rsa.verify(req.params.authorityId, record.publicKey, req.params.signature)) {
                        res.send({
                            result: "fail",
                            message: "Signature cannot be verified by the server."
                        });
                    } else {
                        // add space authority to the database
                        addAuthority(req.params.authorityId, req.params.signature);
                        res.send({result: "success"});
                    }
                }
            });
        }
    });
});

// space authority login
app.get("/loginAuthority/:authorityId/:timestamp/:signature", cors(), (req, res) => {
    // if no authority record found, do not log in
    getAuthorityRecord(req.params.authorityId).then((record) => {
        if (!record) {
            res.send({
                result: "fail",
                message: "Authority is not found in the database."
            });
            return;
        } else {
            // if signautre is not verified, do not log in
            getCertificateAuthorityRecord(req.params.authorityId).then((record) => {
                // if authority is not registered in CA, do not log in
                if (!record) {
                    res.send({
                        result: "fail",
                        message: "Cannot obtain authority's public key. Authority is not registered with CA."
                    });
                } else {
                    if (!Crypto.Rsa.verify(req.params.timestamp, record.publicKey, req.params.signature)) {
                        res.send({
                            result: "fail",
                            message: "Signature cannot be verified by the server."
                        });
                    } else {
                        getAuthorityRecord(req.params.authorityId).then((record) => {
                            res.send(record);
                        });
                    }
                }
            });
        }
    });
});

// update space authority details
app.get("/updateAuthority/:authorityId/:spaceList/:signature", cors(), (req, res) => {

        res.send({
            spaceList: req.params.spaceList,
            signature: req.params.signature
        });


        // if no authority record found, do not update
        /*
        getAuthorityRecord(req.params.authorityId).then((record) => {
            if (!record) {
                res.send({
                    result: "fail",
                    message: "Authority is not found in the database."
                });
                return;
            } else {
                // if signautre is not verified, do not update
                getCertificateAuthorityRecord(req.params.authorityId).then((record) => {
                    // if authority is not registered in CA, do not update
                    if (!record) {
                        res.send({
                            result: "fail",
                            message: "Cannot obtain authority's public key. Authority is not registered with CA."
                        });
                    } else {
                        if (!Crypto.Rsa.verify(req.params.spaceList, record.publicKey, req.params.signature)) {
                            res.send({
                                result: "fail",
                                message: "Signature cannot be verified by the server."
                            });
                        } else {
                            updateAuthority(req.params.authorityId, req.params.spaceList, req.params.signature).then((result) => {
                                res.send(result);
                            });
                        }
                    }
                });
            }
        });
        */
});

// start web server
const port = process.env.PORT || Constants.WEB_SERVER.PORT;
app.listen(port, () => {console.log(`Listening in port ${port}`)});
