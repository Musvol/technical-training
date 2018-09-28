odoo.define('awesome_map.MapView', function (require) {
"use strict";

var core = require('web.core');
var BasicView = require('web.BasicView');
var MapRenderer = require('web.BasicRenderer')
//var MapController = require('web.BasicController')
var MapRenderer = require('awesome_map.MapRenderer')
var MapController = require('awesome_map.MapController')
var MapModel = require('awesome_map.MapModel')
var viewRegistry = require('web.view_registry');


var MapView = BasicView.extend({
    display_name: 'Map',
    icon: 'fa-globe',
    viewType: 'map',
    //cssLibs: ['/awesome_map/static/lib/leaflet/leaflet.css'],
    jsLibs: ['/awesome_map/static/lib/leaflet/leaflet.js'],
    config: _.extend({}, BasicView.prototype.config, {
        Renderer: MapRenderer,
        Controller: MapController,
        Model: MapModel
    }),

    init: function (viewInfo) {
        this._super.apply(this, arguments)
        // Record model fields in the params
        this.loadParams.latitudeField = viewInfo.arch.attrs.latitude 
        this.loadParams.longitudeField =  viewInfo.arch.attrs.longitude
    },


});
viewRegistry.add('map', MapView);

return MapView

});