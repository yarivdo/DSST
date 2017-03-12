
// These are decimal values of special characters 
// taken from https://www.w3schools.com/charsets/ref_utf_greek.asp
// NOTE: they do not show up in the console... only on the HTML page
var cCharacters = ['&#916', '&#882', '&#952', '&#928', '&#965', '&#937', '&#990', '&#935', '&#926'];
var cDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var stimulusID = (-1);
var lastStimulus = 0; // I would like to make sure that I will not have two consecutive stimulus
var correctAnswers = 0;
var wrongAnswers = 0;
var timingOfResponse = [];



$(document).ready(startPage);

function startPage() {
    swal({
                        title: "Coding Task",
                        text: "Training only: Click on the button which corresponds to the sympbol",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#3ed63e",
                        confirmButtonText: "Click to proceed",
                        closeOnConfirm: true
                    },
                    function () {
                       initiateTraining();
                    });

    //Set up the button as a trigger to the check event
    $('.btnResponse').on('click', function () {
        var whichButton = $(this).attr('data-button');
        checkResponse(whichButton, stimulusID + 1); // stimulusID is add 1 as I need to shift a place on the array...
    });

}
function initiateTraining() {

    stimulusID +=1;
    if (stimulusID == 9) {
        endRoutine();
    }
    $("#stimulus").html(cCharacters[stimulusID]);    
    
}

function checkResponse(btnNum, stimID) {
    //store this stimulusID also as the lastStimulus
    lastStimulus = stimulusID;

    //Now check if the user's event is the correct one or not'
    if (btnNum == stimID) {
        initiateTraining();

    } else {
         swal({
                        title: "Are you sure?",
                        text: "It seems you have clicked the wrong button. Try again",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#3ed63e",
                        confirmButtonText: "Click to proceed",
                        closeOnConfirm: true
                    });
    }
   
}


function endRoutine() {
    swal({
                        title: "Done !",
                        text: "Training is complete. We will now start the actual test for the next 120 seconds",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3ed63e",
                        confirmButtonText: "Click to proceed",
                        closeOnConfirm: false
                    },
                    function () {
                        window.location.href = "index_Actual.html";
                    });
    // ****** PASS THE FOLLOWING DATA TO THE DB *****************
    
    var totalReplies = correctAnswers + wrongAnswers;   // Processing speed is a function of how many REPLIES were made during 120 sec

    console.log(totalReplies);
    console.log(correctAnswers);
    console.log(wrongAnswers);
    console.log(timingOfResponse);
}
