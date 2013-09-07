
/*  extends console
 ===================*/
console.put = function(message) {
    $('.console').removeClass('err');
    $('.console').attr('value', message);
}

/*  event
 ===========*/

function onEditorKeyPressed(e) {
    switch(e.keyCode) {
        case 82: // r
        case 83: // s
            if (e.metaKey) {
                render();
                return false;
            }
            break;
    }
}

/*  function
 ==============*/

// getter / setter
function source(code) {
    // if code is not undefined, set code to $('.editor').
    if (code) {
        return $('.editor').attr('value', code);
    } else {
        return $('.editor').attr('value');
    }
}

function render() {
    try {
        window.opener.render();
    } catch (e) {
        
    }
}

function highlightError(message) {
    
    // highlight line has Error
    
    var e = $('.editor');
    var source = e.attr('value');
    var m, i = 0;
    
    if (m = message.match(/error on line (\d+)/)) {
        
        source.split('\n').some(function(line, n) {
            if (m[1] == n + 1) {
                e[0].setSelectionRange( i, i + line.length );
                return true;
            } else {
                i += line.length + 1;
            }
        });
        
    } else if (m = message.match(/'(\w+)' is not defined/)) {

        i = e[0].value.search('\\b' + m[1] + '\\b');
        e[0].setSelectionRange( i, i + m[1].length );
    }
    
    e[0].focus();
    
    // switch color to red
    $('.console').addClass('err');
}

/*  initialize
 ================*/
window.onload = function () {
    
    $('textarea.editor').attr('value', window.opener.params.source).keydown(onEditorKeyPressed);
}