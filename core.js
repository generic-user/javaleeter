/*
The javaleeter project.
-----------------------

__Author:__ Cattoor bjorn
__StartDate:__ 08/05/2012
__Contact:__ orhiannono@gmail.com
__Version:__ 0.1

##This project uses the translation table found at:

http://nl.wikipedia.org/wiki/Leet

For best results html page should be in UTF8.

Licence:
--------

GNU GENERAL PUBLIC LICENSE (included in project package)

Version 3, 29 June 2007

Copyright © 2007 Free Software Foundation, Inc. <http://fsf.org/>
*/
//Defining the used chars in array
var replacement = new Array(new Array("a", "A", "4", "/\\", "@", "/-\\", "^", "aye", "(L", "Д"),

new Array("b", "B", "I3", "8", "13", "|3", "ß", "!3", "(3", "/3", ")3", "|-]", "j3", "6"),

new Array("c", "C", "[", "¢", "{", "<", "(", "©"),

new Array("d", "D", "|)", "(|", "[)", "I>", "|>", "?", "T)", "I7", "cl", "|}", ">", "|]"),

new Array("e", "E", "3", "&", "£", "€", "ë", "[-", "|=-"),

new Array("f", "F", "|=", "ƒ", "|#", "ph", "/=", "v"),

new Array("g", "G", "&", "6", "(_+", "9", "C-", "gee", "(?,", "[,", "{,", "<-", "(."),

new Array("h", "H", "#", "/-/", "[-]", "]-[", ")-(", "(-)", ":-:", "|~|", "|-|", "]~[", "}{", "!-!", "1-1", "\\-/", "I+I", "/-\\"),

new Array("i", "I", "1", "[]", "|", "!", "eye", "3y3", "]["),

new Array("j", "J", ",_|", "_|", "._|", "._]", "_]", ",_]", "]", ";", "1"),

new Array("k", "K", ">|", "|<", "/<", "1<", "|c", "|(", "|{"),

new Array("l", "L", "1", "£", "7", "|_", "|"),

new Array("m", "M", "/\\/\\", "/\\V\\", "JVI", "[V]", "[]V[]", "|\\/|", "^^", "<\\/>", "{V}", "(v)", "(V)", "|V|", "nn", "IVI", "|\\|\\", "]\\/[", "1^1", "ITI", "JTI"),

new Array("n", "N", "^/", "|\\|", "/\\/", "[\\]", "<\\>", "{\\}", "|V", "/V", "И", "^", "ท"),

new Array("o", "O", "0", "Q", "()", "oh", "[]", "p", "<>", "Ø"),

new Array("p", "P", "|*", "|o", "|º", "?", "|^", "|>", "|\"", "9", "[]D", "|°", "|7"),

new Array("q", "Q", "(_,)", "9", "()_", "2", "0_", "<|", "&"),

new Array("r", "R", "I2", "|`", "|~", "|?", "/2", "|^", "lz", "|9", "2", "12", "®", "[z", "Я", ".-", "|2", "|-"),

new Array("s", "S", "5", "$", "z", "§", "ehs", "es", "2"),

new Array("t", "T", "7", "+", "-|-", '][', "†", "|", "~|~"),

new Array("u", "U", "(_)", "|_|", "v", "L|", "µ", "บ"),

new Array("v", "V", "\\/", "|/", "\\|"),

new Array("w", "W", "\\/\\/", "VV", "\\N", "'//", "\\\\'", "\\^/", "(n)", "\\V/", "\\X/", "\\|/", "\\_|_/", "\\_:_/", "Ш", "Щ", "uu", "2u", "\\\\//\\\\//", "พ", "v²"),

new Array("x", "X", "><", "Ж", "}{", "ecks", "×", "?", ")(", "]["),

new Array("y", "Y", "j", "`/", "Ч", "7", "\\|/", "¥", "\\//"),

new Array("z", "Z", "2", "7_", "-/_", "%", ">_", "s", "~/_", "-\\_", "-|_"));

var alfabethaIndex = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p,', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

function javaleeter(str_text, maxlevel, weight) {
    "use strict";
    //Declare the needed variables
    var index, convertedText, alfabethNumber, counterWeight, topLimit, dice, selected;

    //Input test, level should always higher than 2
    if (maxlevel === undefined) {
        throw "javaleeter encoutered a bad argument: maxlevel is undefined.";
    }

    if (weight === undefined) {
        throw "javaleeter encoutered a bad argument: weight is undefined.";
    }

    if (str_text === undefined) {
        throw "javaleeter encoutered a bad argument: str_text is undefined.";
    }

    if (!javaleeterIsNumber(maxlevel)) {
        throw "javaleeter encoutered a bad argument: maxlevel should be an number.";
    }

    if (!javaleeterIsNumber(weight)) {
        throw "javaleeter encoutered a bad argument: weight should be an number.";
    }

    //if a bad weight value has been supplyed, throw an error
    if (weight < 0 || weight > 1) {
        throw "javaleeter encoutered a bad argument: weight should be a double between 0 and 1.";
    }

    //If the text is empty we can return here
    if (str_text === "") {
        return "";
    }

    //If number is no integer we need to make it an integer.
    maxlevel = Math.floor(maxlevel);

    //if number is lower than 2 we throw an error
    if (maxlevel < 2) {
        throw "javaleeter encoutered a bad argument: maxlevel should be at least 2";
    }

    index = 0;

    //This var will hold the newly created text
    convertedText = "";
    //do this while we have chars in the string
    while (index !== str_text.length) {

        //find out what char we are dealing with (we make no diff between lower or uppercase!)
        alfabethNumber = alfabethaIndex.indexOf(str_text[index].toLowerCase());
        //Calculate weight
        counterWeight = Math.random();

        //If is is a letter from the alfabet (alfabethNumber != -1) and the counter weight is smaller then te weight
        if (alfabethNumber !== -1 && counterWeight < weight) {
            topLimit = replacement[alfabethNumber].length - 1;

            //set limit
            if (topLimit > maxlevel) {
                topLimit = maxlevel;
            }
            //roll the dice
            dice = Math.floor(Math.random() * (topLimit + 1));
            selected = replacement[alfabethNumber][dice];
            //Now we now what to replace it with, add it to the converted text
            convertedText += selected;

            //check next letter
            index++;
        } else {
            //It is not a char that can be leeted, so add it to the converted text and add one to the index counter
            convertedText += str_text[index++];
        }

    }
    return convertedText;
}

function javaleeterIsNumber(n) {
    "use strict";
    return !isNaN(parseFloat(n)) && isFinite(n);
}
