
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _state = {
    // your state container
    //  - id : id del record corrente
    //  - key : posizione nell'array _state del record corrente
    // mapping : mappa che permette dato un id di estrarre la posizione nell'array dell'entità
    companies: [],
    mapping: {},
    id: -1,
    key: -1
};

function insertEntity(entity) {

    var id = entity.id;
    var key = null;
    if(_state.mapping[id] == null)
    {
        key = _state.companies.length; // se l'entità non è già stata inserita creo una nuova key
        _state.mapping[id] = key; //creo una mappa che dall'id ritorna la posizione nell'array
        _state.companies[key] = entity;
    }
    else
    {
        key = _state.mapping[id]; // se l'entità è già stata inserita uso la key esistente
        _state.companies.push(entity);
    }
    _state.key = key;
    _state.id = id;
}

function persistEntityData(response) {
    // la funzione di persistenza aggiorna l'oggetto _state con i riferimenti

    if (response != Constants.request.PENDING)
    {
        companies = JSON.parse(response.text);
        company = companies.companies;
        if (company.constructor == Array)
        {
            company.map(insertEntity);
        }
        else
        {
            insertEntity(company);
        }


        console.log("Stored company " +  _state.id + " position " + _state.key);
    }

}



var EntityStore = assign({}, EventEmitter.prototype, {

    getState: function(param, id) {
        var data = null;
        if (param == 'id' )
        {
            data = _state.id; //da sostituire con _state.get(param) quando sarà supportato
        }
        else
        {
            var key = _state.mapping[id] ;
            data = _state.companies[key]; //da sostituire con _state.get(param) quando sarà supportato
        }
        if (data == undefined ) {data = {};}
        return data;
    },


    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }



});


EntityStore.appDispatch = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {

        case Constants.api.GET_ENTITY_DATA:
            persistEntityData(action.response);
            break;

        default:
            return true;
    }

    EntityStore.emitChange();
    return true;
});





module.exports = EntityStore;