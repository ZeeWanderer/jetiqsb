// ==UserScript==
// @name         jetiq_soset_bibu
// @namespace    http://tampermonkey.net/
// @version      0.1.5
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

function return_true_(event)
{
    event.stopPropagation();
    return true
}

function init_()
{
    let check = document.getElementsByClassName("b3")[0];
    if (check === undefined)
        return;

    SecondPast = SecondsPast_;
    totalSecs = totalSecs - i;
    not_dupl = not_dupl_;

    window.addEventListener('cut', return_true_, true)
    window.addEventListener('paste', return_true_, true)
    window.addEventListener('copy', return_true_, true)

    window.addEventListener('visibilitychange', function (event)
    {
        event.stopPropagation();
    }, true);
}

init_()
//window.addEventListener("load", init_);
