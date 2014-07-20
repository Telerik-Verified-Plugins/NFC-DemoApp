(function (global) {
    var WeatherViewModel,
        app = global.app = global.app || {};

    WeatherViewModel = kendo.data.ObservableObject.extend({
        weatherDataSource: null,

        init: function () {
            var that = this,
                dataSource,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/weather.json");
            jsonUrlToLoad = "data/weather.json";

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: jsonUrlToLoad,
                        dataType: "json"
                    }
                }
            });

            that.set("weatherDataSource", dataSource);
        }
    });

    app.weatherService = {
        viewModel: new WeatherViewModel()
    };
})(window);