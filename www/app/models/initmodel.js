
var InitModel = Backbone.Model.extend({
	appId :'2de143494c0b295cca9337e1e96b00e0',

	initialize: function() {
	},

	fetch: function(options) {
		if(!options.city) {
			options.city = 'London'; 
			options.country='uk';
		}		
 
		this.url='http://api.openweathermap.org/data/2.5/forecast?q='+options.city+','+options.country+'&appid='+this.appId;

		options.dataType="json";
		Backbone.Model.prototype.fetch.call(this, options);
	},

	parse: function(response, options) {

		if (Watch.LOG) console.log("InitModel parse", response);

		return response;
	},



});
