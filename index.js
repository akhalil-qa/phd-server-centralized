const Factory = require("./Factory");
const SpaceList = require("./SpaceList");
const SpaceAuthority = require("./SpaceAuthority");
const RootSpaceAuthorityList = require("./RootSpaceAuthorityList");
const Constants = require("./Constants");
const Crypto = require("./Crypto");
const express = require("express");

// array of all space authorities
var spaceAuthortyList = Factory().createSpaceAuthorities();

// root space authority list
var rootSpaceAuthorityList = new RootSpaceAuthorityList();
rootSpaceAuthorityList.addRecord(spaceAuthortyList[0].id, spaceAuthortyList[0].address, spaceAuthortyList[0].rsaKeyPair.publicKey, spaceAuthortyList[0].getNonDelegatedSpaces());
rootSpaceAuthorityList.addRecord(spaceAuthortyList[1].id, spaceAuthortyList[1].address, spaceAuthortyList[1].rsaKeyPair.publicKey, spaceAuthortyList[1].getNonDelegatedSpaces());
rootSpaceAuthorityList.addRecord(spaceAuthortyList[2].id, spaceAuthortyList[2].address, spaceAuthortyList[2].rsaKeyPair.publicKey, spaceAuthortyList[2].getNonDelegatedSpaces());

// web server
const app = express();
app.use(express.json());

// get root authorities list
app.get("/roots", (req, res) => {
    res.send({roots: rootSpaceAuthorityList.getList()});
});

// get space authority details
app.get("/authority/:id/:challenge", (req, res) => {
    const spaceAuthority = spaceAuthortyList.find(sa => sa.id === req.params.id);
    const challenge = req.params.challenge;
    res.send(spaceAuthority.getSignedDetails(challenge));
});

// open web server port
const port = process.env.PORT || Constants.WEB_SERVER.PORT;
app.listen(port, () => {console.log(`Listening in port ${port}`)});