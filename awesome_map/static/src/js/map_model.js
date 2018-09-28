odoo.define('awesome_map.MapModel', function (require) {
"use strict";

var AbstractModel = require('web.AbstractModel');

var MapModel = AbstractModel.extend({
    
    init: function () {
        return this._super.apply(this, arguments)
    },

    get: function() {
        console.log("Getting data")
        return this.data
    },

    load: function (params) {
        var fields = [params.latitudeField, params.longitudeField]
        var self = this
        return this._rpc({
            model: params.modelName, 
            domain: params.domain,
            method: 'search_read',
            context: params.context,
            fields: fields
        }).then(function (res) {
            console.log('data loaded', res)
            self.data = _.map(res, function (result) { // map to override fields names
                return {
                    id: result.id,
                    latitude: result[params.latitudeField],
                    longitude: result[params.longitudeField],
                }
            })

        })
    }
})
return MapModel;

})