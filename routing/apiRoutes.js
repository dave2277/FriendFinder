var friends = require('../app/data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    app.post('/api/friends', function(req, res){

    var newScore = 0;
    var scores = req.body.scores;

    //Function to calculate match scores
    function calc(a) {

        var friendScores = [];
        //Loop through the friends array
        for (i = 0; i < friends.length; i++) {
            //Create a new array for each iteration of the loop
            var currentFriendScore = [];
            //Loop through the nested array
            for (j = 0; j < friends[i].scores.length; j++) {
                //Get the absolute value of the score
                newScore = (Math.abs(scores[i] - friends[i].scores[j]));
                //Push the scores into the interior array
                currentFriendScore.push(newScore);
                // console.log(newScore);

            }
            //Push the resulting array into a parent array
            friendScores.push(currentFriendScore);
        }
        // console.log(friendScores);
        return friendScores;
    }

    calc(scores);

    //Function to add the contents of each array
        function findMatch() {
            //First I need to get the results of the calc function-- log them here

            for (var i = 0; i < calc(scores).length; i++) {

            }

        }
        findMatch();


    });

    app.post('/api/clear', function(req, res){
        friends = [];
        console.log(friends);

    });
};