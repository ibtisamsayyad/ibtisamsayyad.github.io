var playerX_Score = 0;
var playerO_Score = 0;
var inputs = [];
inputs[0] = 'firstElem';
var count;
var multiPlayer = false;
var nextMove;
var turn;


function getNextMove() {
    return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
}

function getInput(currElem) {
    
    var butID = currElem.attr("id");
    turn = currElem[0].outerText;
    inputs[butID] = turn;

    if (multiPlayer == true) {
        isGameOver();
    }
    else
    {
        if (!isGameOver()) {

            turn = turn === 'X' ? 'O' : 'X';

            nextMove = getNextMove();
            while (typeof inputs[nextMove] !== 'undefined') {
                nextMove = getNextMove();
            }
            // inputs[nextMove] == 'undefined' >> empty element
            inputs[nextMove] = turn;
            setTimeout(function () {
                $("#" + nextMove).text(turn);
            }, 500);

            //disabling the button
            $("#" + nextMove).attr("disabled", true);

            setTimeout(function () {
                isGameOver();

            }, 600);

            //if (isGameOver()) {
            //    $(".playerXScore").text("Player X: " + playerX_Score);
            //    $(".playerOScore").text("PLayer O: " + playerO_Score);
            //}

        //if (turn == 'X') {

        //    inputs[nextMove] = 'O';
        //    setTimeout(function () {
        //        $("#" + nextMove).text('O');
        //    }, 500);        
        //}
        //else {
        //    inputs[nextMove] = 'X';
        //    setTimeout(function () {
        //        $("#" + nextMove).text('X');
        //    }, 500);
        //}

        }
         
    }

   
}



function buttonClick(elem) {
    var $thisButton = $(elem);
    $thisButton.attr("disabled", true);
    //$thisButton.addClass('occupied');

   
    turn = turn === 'X' ? 'O' : 'X';
    // if (turn === 'X') {
    // turn = 'O' 
    // } else {
    // turn = 'X' 
    // };

    $thisButton.text(turn);

    getInput($thisButton);

    count = inputs.filter(function (e) { return e !== undefined }).length;
    // DRAW condition 
    if (count == 10 && !isGameOver()) {
        $("#resultMsg").text("Uh Oh Its a DRAW!!");
        //$(".resultModal").modal('show');
        setTimeout(function () {
            $(".resultModal").modal('show');  
        }, 500);
    }
}

$(document).ready(function () { 

    

    //$('.but').click(function () {
    //    var $thisButton = $(this);
    //    $thisButton.attr("disabled", true);
        
   

    //    getInput($thisButton);

    //    var count = inputs.filter(function (e) { return e !== undefined }).length;

    //    // DRAW condition 
    //    if (count == 10 && !isGameOver()) {
    //        $("#resultMsg").text("Uh Oh Its a DRAW!!");
    //        setTimeout(function () {
    //            $(".resultModal").modal('show');

    //            //alert("Uh Oh Its a DRAW!!");
    //            //location.reload();
    //        }, 500);
    //    }
    //});

    //Restart button
    $('#restart').click(function () {

        playerO_Score = 0;
        playerX_Score = 0;
        //location.reload();
        $(".resultModal").modal('hide');
        $("#butContainer").load("index.html #butContainer");

        $(".playerXScore").text("Player X: " + playerX_Score);
        $(".playerOScore").text("PLayer O: " + playerO_Score);
        turn = 'O';

        inputs = [];
        inputs[0] = 'firstElem';


    });

    $('#continue').click(function () {

        $(".resultModal").modal('hide');
        turn = 'O';

        inputs = [];
        inputs[0] = 'firstElem';

        $("#butContainer").load("index.html #butContainer");
        //, function () {
        ////    location.reload();
        //};       
        
    });

    $('#quit').click(function () {

        $(".resultModal").modal('hide');

        //displaying final result
        if (playerX_Score > playerO_Score) {
            $("#finalResultMsg").text("Winner: X\nScore: " + playerX_Score);
        }
        if (playerX_Score < playerO_Score) {
            $("#finalResultMsg").text("Winner: O\nScore: " + playerO_Score);
        }
        if (playerX_Score == playerO_Score) {
            $("#finalResultMsg").text("DRAW!\nScore X: " + playerX_Score + "\nScore O: " + playerO_Score);
        }

        $(".finalResultModal").modal('show');

        //setTimeout(function () {
        //    //$(".finalResultModal").modal('show');
        //    location.reload();
        //}, 800);
        //location.reload();

        //, function () {
        ////    location.reload();
        //});

        //$("#row1, #row2, #row3").load("index.html #butContainer");


    });

    $('.close').click(function () {
        $(".resultModal").modal("hide");

    });

    $('.finalClose').click(function () {
        $(".finalResultModal").modal('hide');
        location.reload();

    });

    $('.fa-user').click(function () {
        inputs = [];
        inputs[0] = 'firstElem';
        playerX_Score = 0;
        playerO_Score = 0;
        $(".playerXScore").text("Player X: " + playerX_Score);
        $(".playerOScore").text("PLayer O: " + playerO_Score);
        var $thisPlayer = $(this);
        $thisPlayer.toggleClass("fa-users");
        if ($thisPlayer.hasClass('fa-users')) {
            multiPlayer = true;
        }
        else{
            multiPlayer = false;
        }

    });

    //if (multiPlayer) {
    //    $(".playerXScore").text("Player X: " + playerX_Score);
    //    $(".playerOScore").text("PLayer O: " + playerO_Score);
    //}
    $(".playerXScore").text("Player X: " + playerX_Score);
    $(".playerOScore").text("PLayer O: " + playerO_Score);

    
});


function isGameOver() {

        
    if (inputs[1] == inputs[2] && inputs[2] == inputs[3] && inputs[3] == "X" ||//1
        inputs[1] == inputs[5] && inputs[5] == inputs[9] && inputs[5] == "X" ||//2
        inputs[1] == inputs[4] && inputs[4] == inputs[7] && inputs[4] == "X" ||//3
        inputs[2] == inputs[5] && inputs[5] == inputs[8] && inputs[5] == "X" ||//4
        inputs[3] == inputs[6] && inputs[6] == inputs[9] && inputs[6] == "X" ||//5
        inputs[3] == inputs[5] && inputs[5] == inputs[7] && inputs[5] == "X" ||//6
        inputs[4] == inputs[5] && inputs[5] == inputs[6] && inputs[5] == "X" ||//7
        inputs[7] == inputs[8] && inputs[8] == inputs[9] && inputs[8] == "X") {//8

        playerX_Score++;

        switch (true) {

            case inputs[1] == inputs[2] && inputs[2] == inputs[3]: $("#1,#2,#3").addClass('winnerRow');
                break;

            case inputs[1] == inputs[5] && inputs[5] == inputs[9]: $("#1,#5,#9").addClass('winnerRow');
                break;

            case inputs[1] == inputs[4] && inputs[4] == inputs[7]: $("#1,#4,#7").addClass('winnerRow');
                break;

            case inputs[2] == inputs[5] && inputs[5] == inputs[8]: $("#2,#5,#8").addClass('winnerRow');
                break;

            case inputs[3] == inputs[6] && inputs[6] == inputs[9]: $("#3,#6,#9").addClass('winnerRow');
                break;

            case inputs[3] == inputs[5] && inputs[5] == inputs[7]: $("#3,#5,#7").addClass('winnerRow');
                break;

            case inputs[4] == inputs[5] && inputs[5] == inputs[6]: $("#4,#5,#6").addClass('winnerRow');
                break;

            case inputs[7] == inputs[8] && inputs[8] == inputs[9]: $("#7,#8,#9").addClass('winnerRow');
                break;

        }

        //if (inputs[1] == inputs[2] && inputs[2] == inputs[3]) {//1
        //    $("#1,#2,#3").addClass('winnerRow');
        //    break;
        //}

        //if (inputs[1] == inputs[5] && inputs[5] == inputs[9]) {//2
        //    $("#1,#5,#9").addClass('winnerRow');
        //}

        //if (inputs[1] == inputs[4] && inputs[4] == inputs[7]) {//3
        //    $("#1,#4,#7").addClass('winnerRow');
        //}

        //if (inputs[2] == inputs[5] && inputs[5] == inputs[8]) {//4
        //    $("#2,#5,#8").addClass('winnerRow');
        //}

        //if (inputs[3] == inputs[6] && inputs[6] == inputs[9]) {//5
        //    $("#3,#6,#9").addClass('winnerRow');
        //}

        //if (inputs[3] == inputs[5] && inputs[5] == inputs[7] ) {//6
        //    $("#3,#5,#7").addClass('winnerRow');
        //}

        //if (inputs[4] == inputs[5] && inputs[5] == inputs[6]) {//7
        //    $("#4,#5,#6").addClass('winnerRow');
        //}

        //if (inputs[7] == inputs[8] && inputs[8] == inputs[9]) {//8
        //    $("#7,#8,#9").addClass('winnerRow');
        //}

        //setInterval(function () {
        //    $('.winnerRow').style.display = ($('.winnerRow').style.display == 'none' ? '' : 'none');
        //}, 500);

        $(".playerXScore").text("Player X: " + playerX_Score);


        $("#resultMsg").text("Winner: X");
        //$("#playerScores").load("index.html #playerScores");
        //$("#butContainer").load("index.html #butContainer");


        //$(".resultModal").modal('show');
        setTimeout(function () {
            $(".resultModal").modal('show');
            //location.reload();
        }, 500);



        return true;
    }


    if (inputs[1] == inputs[2] && inputs[2] == inputs[3] && inputs[3] == "O" ||
        inputs[1] == inputs[5] && inputs[5] == inputs[9] && inputs[5] == "O" ||
        inputs[1] == inputs[4] && inputs[4] == inputs[7] && inputs[4] == "O" ||
        inputs[2] == inputs[5] && inputs[5] == inputs[8] && inputs[5] == "O" ||
        inputs[3] == inputs[6] && inputs[6] == inputs[9] && inputs[6] == "O" ||
        inputs[3] == inputs[5] && inputs[5] == inputs[7] && inputs[5] == "O" ||
        inputs[4] == inputs[5] && inputs[5] == inputs[6] && inputs[5] == "O" ||
        inputs[7] == inputs[8] && inputs[8] == inputs[9] && inputs[8] == "O") {

        playerO_Score++;


        switch (true) {

            case inputs[1] == inputs[2] && inputs[2] == inputs[3]: $("#1,#2,#3").addClass('winnerRow');
                break;

            case inputs[1] == inputs[5] && inputs[5] == inputs[9]: $("#1,#5,#9").addClass('winnerRow');
                break;

            case inputs[1] == inputs[4] && inputs[4] == inputs[7]: $("#1,#4,#7").addClass('winnerRow');
                break;

            case inputs[2] == inputs[5] && inputs[5] == inputs[8]: $("#2,#5,#8").addClass('winnerRow');
                break;

            case inputs[3] == inputs[6] && inputs[6] == inputs[9]: $("#3,#6,#9").addClass('winnerRow');
                break;

            case inputs[3] == inputs[5] && inputs[5] == inputs[7]: $("#3,#5,#7").addClass('winnerRow');
                break;

            case inputs[4] == inputs[5] && inputs[5] == inputs[6]: $("#4,#5,#6").addClass('winnerRow');
                break;

            case inputs[7] == inputs[8] && inputs[8] == inputs[9]: $("#7,#8,#9").addClass('winnerRow');
                break;

        }

        //if (inputs[1] == inputs[2] && inputs[2] == inputs[3]) {//1
        //    $("#1,#2,#3").addClass('winnerRow');
        //}

        //if (inputs[1] == inputs[5] && inputs[5] == inputs[9]) {//2
        //    $("#1,#5,#9").addClass('winnerRow');
        //}

        //if (inputs[1] == inputs[4] && inputs[4] == inputs[7]) {//3
        //    $("#1,#4,#7").addClass('winnerRow');
        //}

        //if (inputs[2] == inputs[5] && inputs[5] == inputs[8]) {//4
        //    $("#2,#5,#8").addClass('winnerRow');
        //}

        //if (inputs[3] == inputs[6] && inputs[6] == inputs[9]) {//5
        //    $("#3,#6,#9").addClass('winnerRow');
        //}

        //if (inputs[3] == inputs[5] && inputs[5] == inputs[7]) {//6
        //    $("#3,#5,#7").addClass('winnerRow');
        //}

        //if (inputs[4] == inputs[5] && inputs[5] == inputs[6]) {//7
        //    $("#4,#5,#6").addClass('winnerRow');
        //}

        //if (inputs[7] == inputs[8] && inputs[8] == inputs[9]) {//8
        //    $("#7,#8,#9").addClass('winnerRow');
        //}

        //setInterval(function () {
        //    $('.winnerRow').style.display = ($('.winnerRow').style.display == 'none' ? '' : 'none');
        //}, 800);

        $(".playerOScore").text("PLayer O: " + playerO_Score);

        $("#resultMsg").text("Winner: O");
        //$(".resultModal").modal('show');
        setTimeout(function () {
            $(".resultModal").modal('show');
            //location.reload();
        }, 500);

        //$(".playerOScore").text("O: " + playerO_Score);


        return true;
    }
       
    return false;
}