// ==UserScript==
// @name         jetiq_soset_bibu
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @description  try to take over the world!
// @author       You
// @match        *://test.vntu.edu.ua/*
// @grant        none
// ==/UserScript==

// Using inline defined variables
//var totalSecs;
//var SecondPast;
//var not_dupl;

var seconds = 0;

function not_dupl_() {
    return true;
}

function SecondsPast_() {
    if (seconds <= totalSecs) {
        document.getElementById('d_t').value = totalSecs - seconds;
        seconds += 1;
    }
    else {
        seconds = 0;
        document.getElementById('d_t').value = seconds;
    }
    timerId = setTimeout('SecondPast()', 1000);
}

function init_() {
    let check = document.getElementsByClassName("b3")[0];
    if (check === undefined)
        return;

    totalSecs = totalSecs - i;
    SecondPast = SecondsPast_;
    not_dupl = not_dupl_;

}

window.addEventListener("load", init_);