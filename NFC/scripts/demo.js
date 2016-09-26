(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    var isListening = false;
    
    DemoViewModel = kendo.data.ObservableObject.extend({

        appendOutput: function (what) {
			      var outputDiv = document.querySelector('#output');
            outputDiv.innerHTML = what;
        },

        nfcHandler: function (result) {
          alert(JSON.stringify(result));
        },

        startListening: function () {
            if (!this.checkSimulator()) {
                if (isListening) {
                    alert("Already listening");
                } else {
	                isListening = true;
                    // in production you probably want to wire up this listener when Cordova's deviceready event fires
                    nfc.addTagDiscoveredListener (
                      app.demoService.viewModel.nfcHandler,
                      function () { // success callback
                          app.demoService.viewModel.appendOutput("You can now scan a tag.");
                      },
                      function (error) { // error callback
                          app.demoService.viewModel.appendOutput("Error: " + JSON.stringify(error));
                      }
                    );
                }
            }
        },

        stopListening: function () {
            if (!this.checkSimulator()) {
                if (!isListening) {
                    alert("Wasn't listening");
                } else {
	                isListening = false;
                    nfc.removeTagDiscoveredListener(
                        app.demoService.viewModel.nfcHandler,
                        function () { // success callback
                            app.demoService.viewModel.appendOutput("Stopped listening.");
                        },
                        function (error) { // error callback
                            app.demoService.viewModel.appendOutput("Error: " + + JSON.stringify(error));
                        }
                    );
                }
            }
        },

        write: function () {
            if (!this.checkSimulator()) {
                var records = [
                    ndef.textRecord("Hi there!"),
                    ndef.textRecord(new Date()),
                    ndef.uriRecord("http://plugins.telerik.com/plugin/nfc")
                ];
                nfc.write(
                    records,
                    this.onSuccess,
                    this.onError
                );
            }
        },

        startSharing: function () {
            if (!this.checkSimulator()) {
                var records = [
                    ndef.textRecord("I've been beamed via NFC :)")
                ];
                nfc.share(
                    records,
                    this.onSuccess,
                    this.onError
                );
            }
        },

        stopSharing: function () {
            if (!this.checkSimulator()) {
                nfc.unshare(
                    this.onSuccess,
                    this.onError
                );
            }
        },

        checkNfcEnabled: function () {
            if (!this.checkSimulator()) {
                nfc.enabled(
                    function() {alert('yes!')},
                    function(msg) {alert(msg)}
                );
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.nfc === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            alert('NFC function success: ' + msg);
        },

        onError: function(msg) {
            alert('NFC function error: ' + msg);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);