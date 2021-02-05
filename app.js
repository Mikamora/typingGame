let $upperKeyboard = $("#keyboard-upper-container");
let $lowerKeyboard = $("#keyboard-lower-container");
let $sentence = $("#sentence");
let $yellow = $("#yellow-block");
let $feedback = $("#feedback");
let sentenceNum = 0;
let letterNum = 0;
let fail = 0;
let succeed = 0;
let i = 0;
let started = 0;
var startTime, endTime;
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate ', 'Too ato too nOt enot one totA not anot tOO aNot ', 'oat itain oat tain nate eate tea anne inant nean ', 'itant eate anot eat nato inate eat anot tain eat ', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
$sentence.text(sentences[i]);


$(document).keydown(logKey);
$(document).keypress(press);
$(document).keyup(unlogKey);

function start() {
    startTime = new Date();
};

function end() {
    endTime = new Date();
    let timeDiff = endTime - startTime; // in miliseconds
    //takes away miliseconds
    timeDiff /= 1000;
    timeDiff /= 60;
    //get minutes
    let minutes = Math.round(timeDiff);
    let formula = (54 / minutes - 2 * fail);
    $("#target-letter").text("Your words per minute: " + formula);
    setTimeout(function () {
        let $div = $("<div class='row col-lg-12 text-center' id='end'></div>");
        let $div1 = $("<div class='row col-lg-12 text-center' id='question'>Would you like to play again?</div>");
        let $div2 = $("<div class='row text-center'></div>");
        let $button1 = $("<button>Yes</button>");
        let $button2 = $("<button style='padding: 0 6px'>No</button>");
        $("#prompt-container").append($div);
        $div.append($div1);
        $div.append($div2);
        $div2.append($button1);
        $div2.append($button2);
        $button1.click(function () {
            location.reload();
        })
        $button2.click(function () {
            $div.empty();
            let $div3 = $("<div class='thanks'>Thanks for playing!</div>");
            $div.append($div3);
        })

    }, 5000);
}


function unlogKey(e) {
    if (e.keyCode == 16) {
        $upperKeyboard.css("display", "none");
        $lowerKeyboard.css("display", "block");
    }
    if (e.keyCode) {
        let $var = $("#" + e.keyCode);
        let $var1 = $("#" + (e.keyCode + 32));
        $var.css("background-color", "#f5f5f5");
        $var1.css("background-color", "#f5f5f5");
    }
}

function press(e){
    if(e.keyCode != 16){
        let str = sentences[i];
        let partOfStr = str.substr(letterNum, (letterNum + 1));
        let partOfStr1 = str.substr((letterNum + 1), (letterNum + 2));
        let code = partOfStr.charCodeAt();
        let code1 = partOfStr1.charCodeAt();
        let letter = String.fromCharCode(code1);
        $("#target-letter").text(letter);

        if (code == e.keyCode) {
            $yellow.css("margin", `10px 0 0 ${.72 * (letterNum + 1)}em`);
            $yellow.css("padding-right", "6px");
            let $span = $("<span style='font-size: 10.5px'>✅</span>");
            $feedback.append($span);
            letterNum++;
            succeed++;

        } else {
            $yellow.css("margin", `10px 0 0 ${.72 * (letterNum + 1)}em`);
            $yellow.css("padding-right", "6px");
            let $span = $("<span style='font-size: 10.5px'>❌</span>");
            $feedback.append($span);
            letterNum++;
            fail++;
        }
        if (i == 4 && letterNum == sentences[i].length) {
            end();
        }
        if (letterNum == sentences[i].length) {
            i++;
            $sentence.text(sentences[i]);
            letterNum = 0;
            $yellow.css("padding", "0 15px");
            $yellow.css("margin", "10px -15px 0");
            $feedback.empty();
        }
    }
}

function logKey(e) {
    if (started == 0) {
        start();
        started++;
    }
    if (e.keyCode == 16) {
        $lowerKeyboard.css("display", "none");
        $upperKeyboard.css("display", "block");
    }
    if (e.keyCode != 16) {
        if ($upperKeyboard.css("display") == "block") {
            let $var = $("#" + e.keyCode);
            $var.css("background-color", "yellow");
        } else {
            let $var1 = $("#" + (e.keyCode + 32));
            $var1.css("background-color", "yellow");
        }


    }
}