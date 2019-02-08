// ==UserScript==
// @name			Skribbl auto-pic-saver
// @version			0.1.0.0
// @description	    Script auto-saves the pic of the scribbl game when is enabled
// @author			alma
// @match				http*://skribbl.io/*
// @run-at			document-end
// ==/UserScript==

// ESLINT configuration: https://eslint.org/docs/user-guide/configuring
(function () {
	'use strict';
    console.log("heyo");
    var chatBox = document.getElementById('boxMessages');
    var screenGame = document.getElementById('screenGame');

    var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.id = 'autosaveCheckBox';

    var savedImages = document.createElement('div');

    function extractWord(text)
    {
        var wordRegex = /The word was '(?<word>[ a-zA-Z-.,!]*)'/g;
        var match = wordRegex.exec(text);
        return match[1];
    }

    var x = new MutationObserver(function (e) {
        if (e[0].addedNodes) {
            var messageHtml = chatBox.lastChild.innerHTML;
            if(messageHtml.includes("The word was")){
                var currentWord = extractWord(messageHtml);
                console.log(currentWord);
                var autosavecb = document.getElementById('autosaveCheckBox');
                console.log('Check box state: ' + autosavecb.checked);
                if(autosavecb.checked){
                     var canvasGame = document.getElementById('canvasGame');
                     savedImages.innerHTML += '<br/><font color="white">' + currentWord + '  ->  </font>';
                     var img = document.createElement('img');
                     img.src = canvasGame.toDataURL();
                     img.style.width = '800px';
                     img.style.height = '600px';
                     savedImages.appendChild(img);
                }
            }
        }
    });

    var checkBoxDiv = document.createElement('div');
    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.innerHTML += '<font color="white">Autosave image</font><br/>';

    screenGame.appendChild(checkBoxDiv);
    screenGame.appendChild(savedImages);

    x.observe(chatBox, { childList: true });
})();
