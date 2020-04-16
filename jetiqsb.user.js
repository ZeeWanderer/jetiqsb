// ==UserScript==
// @name         jetiq_soset_bibu
// @namespace    http://tampermonkey.net/
// @version      0.2.7
// @description  try to take over the world!
// @author       You
// @match        *://test.vntu.edu.ua/*
// @grant        none
// ==/UserScript==

// #EMBEDDED_LIB
// -COOKIES

function remove_cookie(cname)
{
    document.cookie = `${cname}=;path=/`
}

// #CODE
// -SUBSTITUTION_FUNCTIONS

// Using variables inlined in page HTML code
// var totalSecs;
// var i;
// var SecondPast;
// var not_dupl;

// Subst specific vars
var seconds_ = 0;
var totalSecs_ = undefined

function prepare_for_subst_()
{
    totalSecs_ = totalSecs - i;
}

function not_dupl_()
{
    return true;
}

function SecondsPast_()
{
    if (seconds_ > totalSecs_)
    {
        seconds_ = 0;
    }

    document.getElementById('d_t').value = totalSecs_ - seconds_;
    seconds_ += 1;

    timerId = setTimeout('SecondPast()', 1000);
}

// -EVENT_STUBS
function stop_p_(event)
{
    event.stopPropagation();
}

function return_true_(event)
{
    event.stopPropagation();
    return true
}

// -INITIALIZATION
function init_()
{
    // Delete session cookie
    let form_check = document.getElementsByName("regfrm")[0];
    if (form_check !== undefined)
    {
        remove_cookie("PHPSESSID")
    }

    // Check for question string
    let check = document.getElementsByClassName("b3")[0];
    if (check === undefined)
        return;

    // Compute values for substitutes
    prepare_for_subst_()

    // Substitute functions
    SecondPast = SecondsPast_;
    not_dupl = not_dupl_;

    // Stop propagation of events
    window.addEventListener('cut', return_true_, true)
    window.addEventListener('paste', return_true_, true)
    window.addEventListener('copy', return_true_, true)
    window.addEventListener('visibilitychange', stop_p_, true);
}

// -ENTRY_POINT
init_()
//window.addEventListener("load", init_);
