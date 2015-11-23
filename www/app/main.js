var Watch = Watch || {}
Watch.LOG = true;

Watch.app = {
	start:function () {
		var that = this;
		this.models = {
			init: new InitModel(),

		};
		this.views = {
			dash: new DashView({el: '#appArea',
					template: '#dashTemplate',
					model:that.models.init
							}),
		};

		this.router = new AppRouter(this);

		Backbone.history.start();
		this.startupRequests();
	},
	clearCache: function() {
		if (Watch.LOG)console.log("Clearing cache...");
		Watch.platform.clearCache();
	},
	startupRequests:function() {
		var that = this;
		if (Watch.LOG)console.log("starting request ...");

		var initError = function() {
            if (Watch.LOG)console.error("Init request error.");
	    };

	    var initSuccess = function() {
	    	console.log("Init request complete.");

	    	that.router.showDash();
	    };
		Watch.app.models.init.fetch({ success: initSuccess, error: initError });
	}
}
$(document).ready(function(){

	Watch.app.start();
});