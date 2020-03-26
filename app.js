(function() {
    "use strict";

    var app = require('express')();
    var http = require('http').Server(app);
    const swsApi = require('./SwsApi.js');
    const utils = require('./utilities.js');

    app.get('/', function(req, res) {
        res.sendfile('index.html');
    });

    app.get('/callsws', function(req, res) {

        function asyncFunc(callback, dataId) {

            //Request Authorization...
            var stream = swsApi.getStream();
            // console.log(stream);
            swsApi.getWriteToStreamToken(stream.ws, stream.project, stream.stream)
            .then(function(response) {
                // console.log(response);
                if (response.status == 200) {
                    var token = Object.values(response.data[0])[0];
                    // console.log('token received : ' + token);
                    //Publish events to Stream...
                    // console.log('data ID : ' + dataId);
                    var data = utils.getDataForSending(dataId);
                    console.log('sending data -> ' + JSON.stringify(data));
                    swsApi.sendDataToStream(data, token)
                    .then(function(response) {
                        // console.log('data sent.. ' + Date.now());
                        callback(res);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
            })
            .catch(function(error) {
                console.log("Error." + count);
            });

            //Test async function.
            // setTimeout(function() {
            //     var res = Math.random() * 100;
            //     callback(res);
            // }, Math.random() * 2000);
        };

        var count = 1;
        var dataId = 0;
        var fnCallback = function(data) {
          // console.log(data);
          //termination condition and recursive call.
          dataId += 3;
          if (count < 1000) {
            asyncFunc(fnCallback, dataId);
          } else {
            console.log('rescursive calls finished..');
          }
          count++;
        };

        //start
        asyncFunc(fnCallback, dataId);
        res.send('done..');

    });


    http.listen(3000, function() {
        console.log('listening on *:3000');
    });

})();