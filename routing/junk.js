/**
 * Created by davegray on 8/13/17.
 */


//Add the new submission to our inventory for later comparisons
friends.push(req.body);

//In retrospect, we don't need this since we are only comparing the values to the existing
//inventory of people.  We don't want the person matching with himself or herlsef, do we?

//Put all the survey scores into a single array
var allSurveys = [];

for (var k = 0; k < friends.length; k++) {
    allSurveys.push(friends[k].scores);
}

//Putting everything into a single array will necessitate pulling it out of the array later on.
//This seems counter-productive.

//For new surveys that come in, convert the values of the various selections from numbers to strings
var newSurveyArray = req.body.scores.map(function(num){return parseInt(num);});

//Loop through the 2D all Surveys array and subtract from each array, push all the results into a single array
var surveyComparison = [];
for(var i = 0; i < allSurveys.length; i++){
    for(var j = 0; j < allSurveys[i].length; j++){
        surveyComparison.push(Math.abs(allSurveys[i][j] - newSurveyArray[i]));
    }
}

//Split up our surveyComparison array into chunks of 10 components
var createGroupedArray = function(arr, chunkSize){
    var groups = [], i;
    for(i = 0; i < arr.length; i += chunkSize){
        groups.push(arr.slice(i, i+chunkSize));
    }
    return groups;

};

console.log(createGroupedArray(surveyComparison,10));

//Add up each index of the array using the reduce method
var arrayValue = groups.reduce(function(sum, value) {
    return sum + value;
}, 0);
console.log(arrayValue);
