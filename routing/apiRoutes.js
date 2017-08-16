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
            }
            //Push the resulting array into a parent array
            friendScores.push(currentFriendScore);
        }
        //Convert the function into an array consumable by other functions
        return friendScores;
    }


    //Function to add the contents of each array
    function findMatch() {

        var sums = [];
        var values = 0;
        var calcResult = calc(scores);

        function getSum(total, num) {
            return total + num;
            }

        for (var i = 0; i < calc(scores).length; i++) {

            values = (calcResult[i].reduce(getSum));
            sums.push(values);
            }

        return sums;
        }


    //Function to find the index of the lowest number

        function indexOfMin(arr) {

            var min = arr[0];
            var minIndex = 0;

            for (var i = 1; i < arr.length; i++) {
                if (arr[i] < min) {
                    minIndex = i;
                    min = arr[i];
                }
            }
            return minIndex;
        }


        //Function to return the modal
        var winner = indexOfMin(findMatch());
        console.log(friends[winner].name, friends[winner].photo);
    });


    app.post('/api/clear', function(req, res){
        friends = [];
        console.log(friends);

    });
};