odoo.define('awesome_map.MapRenderer', function (require) {
    "use strict";

var AbstractRenderer = require('web.AbstractRenderer');

/**
 * Map Renderer
 *
 * This renderer is designed to render a map view of the current data using:
 * - the library Leaflet (http://www.leafletjs.com/)
 * - and OpenStreetMap as a data provider (see http://osm.org).
 */
var MapRenderer = AbstractRenderer.extend({
    className: "o_map_view",

    init: function (parent, data) {
        this._super.apply(this, arguments)
        this.data = data

    },

    start: function () {
        // render map
        setTimeout(this._renderMap.bind(this))
    },

    _renderMap: function () {
        var options = { zoomControl: false};
        var map = L.map(this.el, options).setView([51.505, -0.09], 25);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // L.marker([51.5, -0.09]).addTo(map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();
    }
    
});

return MapRenderer;

});