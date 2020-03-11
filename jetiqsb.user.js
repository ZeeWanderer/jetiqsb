// ==UserScript==
// @name         jetiq_soset_bibu
// @namespace    http://tampermonkey.net/
// @version      0.1.3
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

function not_dupl_()
{
    return true;
}

function SecondsPast_()
{
    if (seconds > totalSecs)
    {
        seconds = 0;
    }

    document.getElementById('d_t').value = totalSecs - seconds;
    seconds += 1;

    timerId = setTimeout('SecondPast()', 1000);
}

function init_()
{
    let check = document.getElementsByClassName("b3")[0];
    if (check === undefined)
        return;

    SecondPast = SecondsPast_;
    totalSecs = totalSecs - i;
    not_dupl = not_dupl_;
}

init_()
//window.addEventListener("load", init_);
