// Mapping urls into views and actions
var AppRouter = Backbone.Router.extend({


    initialize : function(app) {
        this.app = app;
    },

    routes : {
        "" : "startApp",
        "dash" : "showDash"
    },

    startApp : function() {
        if (Watch.LOG)
            console.log("Starting application");

    },

    showDash : function() {
        console.log("Showing dash view...");

        this.app.views.dash.render();
    },

    
    

    
});
