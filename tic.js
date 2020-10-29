var playerX_Score = 0;
var playerO_Score = 0;
var inputs ;
var count;
var multiPlayer = false;
var nextMove;
var turn;
var isGameOver;
var isOver = false;

function resetInput(){
    inputs = [];
    inputs[0] = 'firstElem';
}

function resetScore(){
    playerO_Score = 0;
    playerX_Score = 0;
    $(".playerXScore").text("Player X: " + playerX_Score);
    $(".playerOScore").text("Player O: " + playerO_Score);
}

function getCount() {
    return inputs.filter(function (e) { return e !== undefined }).length;
}

function getNextMove() {
    return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
}

function getInput(currElem) {
    isOver = false;
    var butID = currElem.attr("id");
    turn = currElem[0].outerText;
    inputs[butID] = turn;

    if (multiPlayer == true) {
        GameOver();
    }
    else
    {
        isGameOver = GameOver();
        if (!isGameOver) {

            turn = turn === 'X' ? 'O' : 'X';

            count = getCount();

            nextMove = getNextMove();
            while (typeof inputs[nextMove] !== 'undefined' && count != 10) {
                nextMove = getNextMove();
            }
            // inputs[nextMove] == 'undefined' >> empty element
            if(count != 10){
                inputs[nextMove] = turn; 
    
            setTimeout(function () {
                $("#" + nextMove).text(turn);
            }, 100);

            //disabling the button
            $("#" + nextMove).attr("disabled", true);
            
            GameOver();
            }
        }         
    } 
}

function buttonClick(elem) {
    var $thisButton = $(elem);
    $thisButton.attr("disabled", true);
   
    turn = turn === 'X' ? 'O' : 'X';

    $thisButton.text(turn);

    getInput($thisButton);

    count = getCount();
    
    // DRAW condition 
    if (count == 10 && isOver !== true ) {

        $("#resultMsg").text("Uh Oh Its a DRAW!!");
        setTimeout(function () {
            $(".resultModal").modal('show');  
        }, 200);
    }
}

$(document).ready(function () { 

    resetInput();

    $(".playerXScore").text("Player X: " + playerX_Score);
    $(".playerOScore").text("Player O: " + playerO_Score);

    //Restart button
    $('#restart').click(function () {

        resetScore();
        
        $(".resultModal").modal('hide');
        $("#butContainer").load("index.html #butContainer");

        turn = 'O';

        resetInput();
    });

    //Continue button
    $('#continue').click(function () {
        $(".resultModal").modal('hide');
        turn = 'O';

        resetInput();

        $("#butContainer").load("index.html #butContainer");         
    });

    //Quit button
    $('#quit').click(function () {

        $(".resultModal").modal('hide');
        $(".but").attr("disabled", true);

        //displaying final result
        var finResMsg;
        if (playerX_Score > playerO_Score) {
            finResMsg = "Winner: X !!\n Score: " + playerX_Score;
        }
        if (playerX_Score < playerO_Score) {
            finResMsg = "Winner: O !!\n Score: " + playerO_Score;
        }
        if (playerX_Score == playerO_Score) {
            finResMsg = "DRAW!! \n Score X: " + playerX_Score + "\n|| Score O: " + playerO_Score;
        }

        $("#finalResultMsg").text(finResMsg);
        $(".finalResultModal").modal('show');

    });

    // $('.close').click(function () {
    //     $(".resultModal").modal("hide");

    // });

    // $('.finalClose').click(function () {
    //     $(".finalResultModal").modal('hide');
    //     location.reload();
    // });

    $('.fa-user').click(function () {
        resetInput();
        resetScore();

        $("#butContainer").load("index.html #butContainer");

        var $thisPlayer = $(this);
        $thisPlayer.toggleClass("fa-users");
        if ($thisPlayer.hasClass('fa-users')) {
            multiPlayer = true;
        }
        else{
            multiPlayer = false;
        }

    });    
});


function GameOver() {

    if (inputs[1] == inputs[2] && inputs[2] == inputs[3] && inputs[3] == "X" ||//1
        inputs[1] == inputs[5] && inputs[5] == inputs[9] && inputs[5] == "X" ||//2
        inputs[1] == inputs[4] && inputs[4] == inputs[7] && inputs[4] == "X" ||//3
        inputs[2] == inputs[5] && inputs[5] == inputs[8] && inputs[5] == "X" ||//4
        inputs[3] == inputs[6] && inputs[6] == inputs[9] && inputs[6] == "X" ||//5
        inputs[3] == inputs[5] && inputs[5] == inputs[7] && inputs[5] == "X" ||//6
        inputs[4] == inputs[5] && inputs[5] == inputs[6] && inputs[5] == "X" ||//7
        inputs[7] == inputs[8] && inputs[8] == inputs[9] && inputs[8] == "X") {//8

        isOver = true;
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

        $(".playerXScore").text("Player X: " + playerX_Score);

        $(".but").attr("disabled", true);
        
        $("#resultMsg").text("Winner: X");
        
        setTimeout(function () {
            $(".resultModal").modal('show');
        }, 200);

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

           isOver = true;
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

        $(".playerOScore").text("Player O: " + playerO_Score);

        $(".but").attr("disabled", true);

        $("#resultMsg").text("Winner: O");
        
        setTimeout(function () {
            $(".resultModal").modal('show');
        }, 500);

        return true;
    }
       
    return false;
}