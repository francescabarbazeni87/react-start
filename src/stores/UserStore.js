
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _state = {
    token: "5497ff45-7169-4471-a13e-5a8b656d69d1"
};



function persistEntityData(response) {
    // do whatever you need to do with the response to store
    // the state
}



var UserStore = assign({}, EventEmitter.prototype, {

    getState: function() {
        return _state;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },


    /**
     * @param {function} callback
     */
    addAuthListener: function(callback) {
        this.on(AUTH, callback);
    },

    /**
     * @param {function} callback
     */
    removeAuthListener: function(callback) {
        this.removeListener(AUTH, callback);
    }



});


UserStore.appDispatch = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {

        case Constants.api.GET_ENTITY_DATA:
            persistEntityData(action.response);
            break;

        default:
            return true;
    }

    UserStore.emitChange();
    return true;
});





module.exports = UserStore;