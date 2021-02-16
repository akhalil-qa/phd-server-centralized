/**
 ** Space List Object
 ** Each Space Authority holds a separate copy of the Space List
 ** It holds spaces under his control (owned or delegated), applied restrictions, and delegation information.
 **/
function SpaceList() {
    return {
        // list of records
        records: [],

        // add space
        addSpace: function(id, polygon) {
            this.records.push({space: {id, polygon}, delegatorId: null, restrictions: []});
        },
        
        // add restriction
        addRestriction: function(spaceId, permissionType, appId) {
            var recordId = this.getRecordId(spaceId);
            if (recordId < 0) {
                console.log("Error", "[SpaceList.addRestriction] space not found in the list!");
                return false;
            }
            this.records[recordId].restrictions.push({permissionType: permissionType, appId: appId});
            return true;
        },

        // remove restriction
        removeRestriction: function(spaceId, permissionType, appId) {
            var recordId = this.getRecordId(spaceId);
            if (recordId < 0) {
                console.log("Error", "[SpaceList.removeRestriction] space not found in the list!");
                return false;
            }

            for (i = 0; i < this.records[recordId].restrictions.length; i++) {
                if (this.records[recordId].restrictions[i].permissionType.localeCompare(permissionType) == 0 &&
                    this.records[recordId].restrictions[i].appId.localeCompare(appId) == 0) {
                        this.records[recordId].restrictions.splice(i, 1);
                        return true;
                 }
            }

            console.log("Error", "[SpaceList.removeRestriction] restriction is not found!");
            return false;
        },

        // add delegation
        addDelegation: function(spaceId, delegatorId) {
            var recordId = this.getRecordId(spaceId);
            if (recordId < 0) {
                console.log("Error", "[SpaceList.addDelegation] space not found in the list!");
                return false;
            }

            this.records[recordId].delegatorId = delegatorId;
            return true;
        },

        // remove delegation
        removeDelegation: function(spaceId) {
            var recordId = this.getRecordId(spaceId);
            if (recordId < 0) {
                console.log("Error", "[SpaceList.removeDelegation] space not found in the list!");
                return false;
            }

            this.records[recordId].delegatorId = null;
            return true;
        },

        // get all records
        getList: function() {
            return this.records;
        },

        // get record id using the space id
        getRecordId: function(spaceId) {
            for (i = 0; i < this.records.length; i++) {
                if (this.records[i].space.id.localeCompare(spaceId) == 0)
                    return i;
            }

            return -1;
        },

        // get all spaces
        getSpaces: function() {
            var spaces = [];
            for (i = 0; i < this.records.length; i++) {
                spaces.push(this.records[i].space);
            }
            return spaces;
        }
    };
}

module.exports = SpaceList;
