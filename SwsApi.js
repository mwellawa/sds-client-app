const axios = require('axios');

module.exports = {

  getWriteToStreamToken: function (ws, proj, stream) {
    var basicAuth = 'Basic U1lTVEVNOkJKcFhmNkk0anBsMmx1cVFqWHM3MU9yNw==';
    //construct auth object.
    var authObj = new Object();
    authObj.privilege = 'write';
    authObj.resourceType = 'stream';
    authObj.resource = ws + '/' + proj + '/' + stream;
    var authArr = new Array(authObj);
    //construct SWS auth endpoint.
    var path = '/1/authorization';
    // var srv = 'http://' + host + ':' + swsPort + path;
    var endpoint = this.getSrv() + path;
    //Make request
    return axios.post(endpoint,authArr,{
      headers: {
        'Authorization': basicAuth
      }
    });
  },

  sendDataToStream: function (data, token) {
    var stm = this.getStream();
    return this.publish(stm.ws, stm.project, stm.stream ,data, token);
  },

  publish: function (ws, project, stream, data, token) {
    let path =  '/1/workspaces/' + ws +
                '/projects/' + project +
                '/streams/' + stream;
    var srv = this.getSrv() + path;
    var authToken = 'SWS-Token "sws-token"="' + token + '"';
    return axios.post(srv,data,{
      headers: {
        'Authorization': authToken
      }
    })
  },

  getSrv: function () {
    // Streaming host and SWS port.
    var host = 'hxehost';
    var port = '39045';
    var protocol = 'http';
    return protocol+'://'+host+':'+port;
  },

  getStream: function () {
    var stream = new Object();
    stream.ws = 'default';
    stream.project = 'obd_stream';
    stream.stream = 'OBD_DataStream';
    return stream;
  }

};