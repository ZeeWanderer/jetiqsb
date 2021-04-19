// ==UserScript==
// @name         jetiq_soset_bibu
// @namespace    http://tampermonkey.net/
// @version      0.3.4
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
let seconds_ = 0;
let totalSecs_ = undefined

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

function onLogin_(arg)
{
    return true;
}

function onNick_(arg)
{
    return true;
}

function loginForm_(event, arg)
{
    return true;
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

// -CUSTOM_VAIABLES
var codepoint_map = {};

// -CUSTOM_EVENTS

// Using functions inlined in page HTML code
// function go();

function copy_event_(e)
{
    let cwords = [];
    const text = window.getSelection().toString().replace(/\s+/g, ' ');
    const words = text.split(" ");
    for (let word_idx in words)
    {
        const word = words[word_idx];
        let code_points = [];
        for (let idx in word)
        {
            let char = word[idx];
            code_points.push(char.codePointAt());
        }
        window.console.log(word,": ", code_points);
        let b_is_cyrrilic = code_points.filter(code => code >= 1000).length != 0;
        if (b_is_cyrrilic)
        {
            window.console.log("word: ", word, " contains cyrrilic");
            let c_code_points = code_points.map(code => {
                let mapped = codepoint_map[code];
                if (mapped)
                {
                    return mapped;
                }
                else
                {
                    return code;
                }
            })
            window.console.log(word," mapped to ", c_code_points);
            let c_word = String.fromCodePoint(...c_code_points)
            cwords.push(c_word);
        }
        else
        {
            cwords.push(word);
        }

    }
    let ctext = cwords.join(" ");
    e.clipboardData.setData('text/plain', ctext);
    e.preventDefault();
    return true;
}

function keyboard_events(event)
{
    if (event.isComposing || event.keyCode === 229)
    {
        return;
    }

    if (event.keyCode === 13) // Enter keyDown
    {
        go(); // submit answer
    }
}

// -INITIALIZATION

function init_codepoint_map()
{
    codepoint_map[97] = 1072; // a
    codepoint_map[99] = 1089; // c
    codepoint_map[105] = 1110; // i
    codepoint_map[101] = 1077; // e
    codepoint_map[111] = 1086; // o
    codepoint_map[112] = 1088; // p
    codepoint_map[120] = 1093; // p
}

function init_()
{
    // Check for form
    // let form_check = document.getElementsByName("regfrm")[0];
    // if (form_check !== undefined)
    // {
    //     // Substitute functions that mutate form to enable autofill
    //     onLogin = onLogin_;
    //     onNick = onNick_;
    //     loginForm = loginForm_;
    //     // Delete session cookie
    //     remove_cookie("PHPSESSID")
    // }

    // Check for question string
    let check = document.getElementsByClassName("b3")[0];
    if (check === undefined)
        return;

    // display go button immediately
    let gobtn = document.getElementById('gobtn');
    if (check !== undefined)
    {
        gobtn.style.display = 'block';
    }

    // Compute values for substitutes
    prepare_for_subst_()

    // Substitute functions
    SecondPast = SecondsPast_;
    not_dupl = not_dupl_;

    init_codepoint_map()

    // Stop propagation of events
    window.addEventListener('cut', return_true_, true)
    window.addEventListener('paste', return_true_, true)
    window.addEventListener('copy', copy_event_, true)
    window.addEventListener('visibilitychange', stop_p_, true);
    window.addEventListener("keydown", keyboard_events, true);
}

// -ENTRY_POINT
init_()
//window.addEventListener("load", init_);
