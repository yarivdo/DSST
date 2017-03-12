
// These are decimal values of special characters 
// taken from https://www.w3schools.com/charsets/ref_utf_greek.asp
// NOTE: they do not show up in the console... only on the HTML page
var cCharacters = ['&#916', '&#882', '&#952', '&#928', '&#965', '&#937', '&#990', '&#935', '&#926'];
var cDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var stimulusID;
var lastStimulus = 0; // I would like to make sure that I will not have two consecutive stimulus
var correctAnswers = 0;
var wrongAnswers = 0;
var timingOfResponse = [];



$(document).ready(startPage);

function startPage() {

    //Set up the button as a trigger to the check event
    $('.btnResponse').on('click', function () {
        var eventTime = Math.floor(new Date().getTime() / 1000); // Record the user's repsponse time, and round it up, as the computer's format is 000.000 which is redundant in this case
        timingOfResponse.push(eventTime); // Capture the time of the response
        
        var whichButton = $(this).attr('data-button');
        checkResponse(whichButton, stimulusID + 1); // stimulusID is add 1 as I need to shift a place on the array...
    });

    //Initialize the timer
    var startTime = new Date().getTime() / 1000; // Start time in seconds
    var endTime = startTime + 120;
    count120(endTime);

    // Initialize the test
    initiateTest();

}
function initiateTest() {

    stimulusID = Math.floor((Math.random() * 9) + 0);
    if (stimulusID == lastStimulus) { // Make sure the current stimulus is not identical to the last one. Otherwise the display would look like it has not change
        initiateTest();
    } else {
        $("#stimulus").html(cCharacters[stimulusID]);    
    }
    
}

function checkResponse(btnNum, stimID) {
    //store this stimulusID also as the lastStimulus
    lastStimulus = stimulusID;

    //Now check if the user's event is the correct one or not'
    if (btnNum == stimID) {
        console.log("Yep");
        correctAnswers += 1;

    } else {
        wrongAnswers += 1;
        console.log("Nope");
    }
    initiateTest();
}

function count120(finishTime) {

    var myTimer = setInterval(function () {
        var currentTime = new Date().getTime() / 1000;
        if (currentTime >= finishTime) {
            endRoutine();
            clearInterval(myTimer);
        }
    }, 1000);
}

function endRoutine() {
    // ****** PASS THE FOLLOWING DATA TO THE DB *****************
    
    var totalReplies = correctAnswers + wrongAnswers;   // Processing speed is a function of how many REPLIES were made during 120 sec

    console.log("total:" + totalReplies);
    console.log("Correct:" + correctAnswers);
    console.log("Wrong:" + wrongAnswers);
    console.log("Timing:" + timingOfResponse);
    
    // End note...
    
    swal({
                title: "Done !",
                text: "We have reached the 120 seconds mark and this test is done :)",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#3ed63e",
                confirmButtonText: "Click to proceed",
                closeOnConfirm: false
            },
            function () {
                window.location.href = "../MemoryGame/Memory_Instructions.html" // need to decide what will the the best place for this test to take place
            });
}
