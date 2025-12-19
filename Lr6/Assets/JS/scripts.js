var tab;
var tabContent;

window.onload = function() {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1); 
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick = function(event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

function generate() {
    var rtl = document.getElementById('rtl').value;
    var rtr = document.getElementById('rtr').value;
    var rbr = document.getElementById('rbr').value;
    var rbl = document.getElementById('rbl').value;

    var ttl = document.getElementById('ttl');
    var ttr = document.getElementById('ttr');
    var tbr = document.getElementById('tbr');
    var tbl = document.getElementById('tbl');

    var block = document.getElementById('block');
    var out = document.getElementById('out');

    ttl.value = rtl;
    ttr.value = rtr;
    tbr.value = rbr;
    tbl.value = rbl;

    var cssResult = rtl + "px " + rtr + "px " + rbr + "px " + rbl + "px";
    block.style.borderRadius = cssResult;
    out.value = "border-radius: " + cssResult + ";";
}

function generateFloat() {
    var fVal = document.getElementById('floatSel').value;
    var fBlock = document.getElementById('floatBlock');
    var out = document.getElementById('outFloat');
    
    fBlock.style.float = fVal;
    out.value = "float: " + fVal + ";";
}

function generateFont() {
    var fontVal = document.getElementById('fontSel').value;
    var preview = document.getElementById('fontPreview');
    var out = document.getElementById('outFont');
    
    preview.style.fontFamily = fontVal;
    out.value = "font-family: " + fontVal + ";";
}