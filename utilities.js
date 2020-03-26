module.exports = {

  getRndm: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  getRndmVal: function () {
    return String(Math.random() * 100);
  },

  getTs: function () {
    return String(Date.now());
  },

  getDataForSending: function (dataId) {
    var events = [];
    var sensors = ['B0','C0','D0','F0','C3','AB','T5','R9','J6','T4','E1','E6',
                  'R2','D2','Q2','D5','F4','FF','4D','WQ','Q1','B1','S2','F9'];
    var idCnt = dataId;
    for (var i = 0; i < 3; i++) {
      idCnt++;
      var index = this.getRndm(sensors.length)
      var event = ["i",idCnt,1,
                      sensors[index],
                      this.getRndmVal(),
                      String(Date.now())];
      events.push(event);
    }
    return events;
  }

};