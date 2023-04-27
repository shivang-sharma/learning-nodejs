var template = require('../views/template-main');
var test_data = require('../model/test_data');

exports.get = function(req, res) {
    var teamList = test_data.teamList;
    var strTeam = "", i=0;
    for (i=0; i< teamList.teams.length; ){
        strTeam = strTeam + "<li>" + teamList.teams[i].country + "</li>";
        i=i+1;
    }
    strTeam = "<ul>" + strTeam + "</ul>";
    console.log(strTeam);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(template.build(
        "The test web page on node js using mvc pattern ",
        "Hello There",
        "<p>The teams in Group "+ teamList.GroupName + "<br/>" + strTeam));
    res.end();
}