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
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate ', 'Too ato too nOt enot one totA not anot tOO aNot ', 'oat itain oat tain nate eate tea anne inant nean ', 'itant eate anot eat nato inate eat anot tain eat ', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
$sentence.text(sentences[i]);


$(document).keydown(logKey);
$(document).keyup(unlogKey);


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


function logKey(e) {
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


        let str = sentences[i];
        let partOfStr = str.substr(letterNum, (letterNum + 1));
        let partOfStr1 = str.substr((letterNum + 1), (letterNum + 2));
        let code = partOfStr.charCodeAt();
        let code1 = partOfStr1.charCodeAt();
        let letter = String.fromCharCode(code1);
        $("#target-letter").text(letter);

        if (code == e.keyCode || code == (e.keyCode + 32)) {
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