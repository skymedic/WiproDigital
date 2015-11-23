var DashView = Backbone.View.extend({

    isLoaded : false,
    id:[],
    date:[],
    events : {
        "click .daily__day-tab": "loadyDayWeatger",
    },

    initialize : function() {
        console.log('DashView.initialize');
        this.headertemplate = Handlebars.compile($('#dashHeaderTemplate').html());
        this.listDatetemplate = Handlebars.compile($('#dashListTemplate').html());
        this.template = Handlebars.compile($('#dashViewTemplate').html());
        if (Watch.LOG)console.log('DashView.InitDashLoad', this.dashload);


    },


    render : function(eventName) {
        var data = this.model.toJSON();
        if (Watch.LOG)console.log('DashView.render',data);
        var _list = this.model.get('list');
        this.$el.find('#dashHeader').html(this.headertemplate(data));
        var fivedayslist=[];
        _list = this.viewToday(_list,fivedayslist);  
        var _todayList = {"_dayList":fivedayslist};  
        this.$el.find('#dashList').html(this.listDatetemplate(_todayList));

        if (Watch.LOG)console.log(_todayList);
        if (Watch.LOG)console.log(fivedayslist);
         _todayList = {"_dayList":_list};
        this.$el.find('#dashView').html(this.template(_todayList));

        return this;
    },
    viewToday: function  (list,fivedays) {
        var that = this;
        var length = list.length;
        var todayList=[];
        var today = new Date();
        if (Watch.LOG)console.log(today);
        var thisDay = today.getDate();
        var today = thisDay;
        var id=0;
        var tomorrow;

        for(var i = 0 ; i < length; i++ ) {
            var data_date = new Date(list[i].dt_txt);
            var list_date =  data_date.getDate();
            if(thisDay == list_date){                              
                list[i].id = list[i].dt_txt.slice(0,10);
                var temp_max = 0;
                var temp_min = 100;  
                var count = 0;                           
                for(var j = 0 ; j<length ; j++){  
                    var t_date =  new Date(list[j].dt_txt);                
                    if(thisDay == t_date.getDate()) {
                        if(temp_max<(list[j].main.temp-273.15))
                            temp_max=(list[j].main.temp-273.15);
                        if(temp_min>(list[j].main.temp-273.15))
                            temp_min=(list[j].main.temp-273.15);

                        //console.log(list[j].main.temp_max,temp_min);
                    }
                    else if(thisDay<t_date.getDate()){
                        break;
                    }
                    
                }
                //console.log(count);
                list[i].max_temp = Math.round(temp_max);
                list[i].min_temp = Math.round(temp_min);
                console.log(list[i].max_temp,list[i].min_temp);
                fivedays.push(list[i]);
                that.id[id++] = list[i].id;
                list[i].date = (data_date.getMonth()+1)+"/"+list_date;
                thisDay++;
            }
            if(today == list_date){
                list[i].hour= list[i].dt_txt.slice(10);
                list[i].main.temp = Math.round(list[i].main.temp-273.15);
                todayList.push(list[i]);
            }

        }
        if (Watch.LOG)console.log(that.id);
        return todayList;
       
    },
    viewThatDay:function(date){
        var that = this;
        var list = that.model.get('list');
        var length = list.length;
        var selectDay = date.slice(4);
        var dayList=[];
        for(var i = 0 ; i < length; i++ ) {
            if(selectDay == list[i].dt_txt.slice(0,10)){
                list[i].hour = list[i].dt_txt.slice(10);
                list[i].main.temp = Math.round(list[i].main.temp-273.15);
                dayList.push(list[i]);
            }

        }
        if (Watch.LOG)console.log(dayList);
        return dayList;


    },

    loadyDayWeatger: function(e){
        if (Watch.LOG) console.log("Movie selected:", e.currentTarget.id);
        //var new_data = this.viewThatDay(e.currentTarget.id);
        var new_data = {"_dayList":this.viewThatDay(e.currentTarget.id)};
        this.$el.find('#dashView').html(this.template(new_data));

    },


    

    
});
