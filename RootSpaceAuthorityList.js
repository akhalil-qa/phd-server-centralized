/**
 ** Root Space Authority List Object
 ** This is a public list that include rquired details of root space authorities such as:
 ** id | publicKey | spaces (id | polygon)
 ** A mobile device must retrieve this list and hard-code it into the ROM of the device.
 **/
const Constants = require("./Constants");

function RootSpaceAuthorityList() {
    return {
        // list of authorities
        authorities: [],

        // add record to the list
        addRecord: function(id, address, publicKey, spaces) {
            this.authorities.push({id, address, publicKey, spaces});
        },
        
        // get all the authorities in the list
        getList: function(){
            return this.authorities;
        }
    };
}

module.exports = RootSpaceAuthorityList;
