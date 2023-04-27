var teamList = function() {
    var objJson = {
        "GroupName": "D",
        "Count": 4,
        "teams": [
            {"country": "USA"},
            {"country": "UK"},
            {"country": "SPAIN"},
            {"country": "MADRID"},
            {"country": "BRAZIL"}
        ]
    };
    return objJson;
}

exports.teamList = teamList();