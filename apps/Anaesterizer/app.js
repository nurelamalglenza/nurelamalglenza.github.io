var anaesterizerExe = {}
anaesterizerExe.uniqueAppID = 'anaesterizer';


if (typeof installedApps !== 'undefined') {


  installedApps[anaesterizerExe.uniqueAppID].OsMenu = {
    [installedApps[anaesterizerExe.uniqueAppID].name] : [['Quit','quitApp']],
    'File': [['Open Drummer','openDrummer']],
    'Playback': [['Toggle Lead 1','playPreset'],['Toggle Bass 2','playPreset'],['Toggle Decoration 3','playPreset'],['Toggle Beat 4','playPreset']], //fill in later
    'View': [['Minimize','minimizeApp'], ['Zoom','zoomApp'], '-', ['Enter Full Screen','enterFullScreen']],
    'Help': [['Report a bug...','reportBug']]
  }

}





//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////
anaesterizerExe.menuActions = {};

anaesterizerExe.menuActions.quitApp = appMenuExe.menuActions.quitApp;

anaesterizerExe.menuActions.openDrummer = function(){

  installedApps['drummer'].Status.open();

}


anaesterizerExe.menuActions.playPreset = function(n){
  var index = n.substr(n.length-1,1);
  index = index-1;
  console.log("Pattern "+index+" will play in next cycle");

  anaesterizerExe.toggleLoop(index);
  // if (anaesterizerExe.patternsStatus[index]) {
  //   //if pattern is playing
  //   //Stop it
  //   anaesterizerExe.patternsStatus[index] = false;
  //   console.log(anaesterizerExe.dom.buttons);
  //   anaesterizerExe.dom.buttons['button'+(index+1)].firstChild.style.backgroundColor = 'var(--white)';
  //
  // }else {
  //   //if pattern is NOT playing
  //   //Play it
  //   //console.log("INDEX IS "+ index);
  //   //console.log(anaesterizerExe.dom.buttons['button'+(index+1)]);
  //   anaesterizerExe.patternsStatus[index] = true;
  //   anaesterizerExe.dom.buttons['button'+(index+1)].firstChild.style.backgroundColor = 'var(--yellow)';
  // }
}



anaesterizerExe.menuActions.minimizeApp = appMenuExe.menuActions.minimizeApp;

anaesterizerExe.menuActions.zoomApp = appMenuExe.menuActions.zoomApp;

anaesterizerExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;

anaesterizerExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;


anaesterizerExe.menuActions.closingApp = function(){
  console.log("Closing App");
  anaesterizerExe.stopSynthTransport();
}

//////////////////////////////
//////////////////////////////




anaesterizerExe.css = new CssComponent(anaesterizerExe.uniqueAppID);



anaesterizerExe.css.set('id', anaesterizerExe.uniqueAppID+'-canvas',{
  'background-color' : 'var(--aqua)',
  'color':'black',
  'display': 'flex',
  'flex-wrap':'wrap'
});


anaesterizerExe.css.set('class', 'anaesterizer-headerContainer',{
  'background-color' : 'var(--aqua)',
  'color':'black',
  'width':'100%',
  'height':'36px',
  'box-shadow': 'black 0px 0px 0px 1px'
});




anaesterizerExe.css.set('class', 'anaesterizer-whiteKeysContainer',{
  'background-color' : 'var(--aqua)',
  'width':'100%',
  'height':'120px',
  'display':'flex'
});


anaesterizerExe.css.set('class', 'anaesterizer-whiteKeyContainer',{
  'background-color' : 'var(--aqua)',
  'width':'48px',
  'height':'120px',
  'display':'flex',
  'align-items':'center',
  'justify-content': 'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


anaesterizerExe.css.set('class', 'anaesterizer-whiteKey',{
  'background-color' : 'white',
  'width':'25px',
  'height':'95px',
  'border-radius': '50px',
  'text-align': 'center',
  'box-sizing': 'border-box',
  'padding': '40px 0px',
  'font-size':'10px'
});



anaesterizerExe.css.set('class', 'anaesterizer-blackKeysContainer',{
  'background-color' : 'var(--aqua)',
  'width':'100%',
  'height':'48px',
  'display':'flex',
  'bottom':'120px'
});


anaesterizerExe.css.set('class', 'anaesterizer-blackKeyContainer',{
  'background-color' : 'var(--aqua)',
  'height':'48px',
  'display':'flex',
  'align-items':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


anaesterizerExe.css.set('class', 'anaesterizer-blackKeySmall',{
  'width':'48px'
});

anaesterizerExe.css.set('class', 'anaesterizer-blackKeyLarge',{
  'width':'72px'
});


anaesterizerExe.css.set('class', 'anaesterizer-blackKeyRight',{
  'justify-content': 'flex-end'
});

anaesterizerExe.css.set('class', 'anaesterizer-blackKeyLeft',{
  'justify-content': 'flex-start'
});




anaesterizerExe.css.set('class', 'anaesterizer-blackKey',{
  //'background-color' : 'black',
  'color':'white',
  'width':'25px',
  'height':'25px',
  'border-radius': '50px',
  'text-align': 'center',
  'box-sizing': 'border-box',
  'padding': '5px 0px',
  'margin': '0px 11px',
  'font-size':'10px',
  'display':'flex',
  'justify-content':'center',
  'align-items':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});



anaesterizerExe.css.set('class', 'anaesterizer-blackKeyLabel',{
  'background-color' : 'black',
  'color':'white',
  'width':'15px',
  'height':'15px',
  'border-radius': '50px',
  'font-size':'10px',
  'pointer-events': 'none',
  'line-height': '17px'
});


//anaesterizer-blackKeyLabel



anaesterizerExe.css.set('class', 'anaesterizer-largeDialsContainer',{
  'background-color' : 'var(--aqua)',
  'width':'192px',
  'height':'48px',
  'display':'flex',
  'flex-wrap':'wrap'

});




anaesterizerExe.css.set('class', 'anaesterizer-largeDialContainer',{
  'background-color' : 'var(--aqua)',
  'width':'96px',
  'height':'96px',
  'display':'flex',
  'align-items':'center',
  'justify-content':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


anaesterizerExe.css.set('class', 'anaesterizer-largeDial',{
  'background-color' : 'blue',
  'width':'72px',
  'height':'72px',
  'border-radius': '80px',
  'text-align':'center',
  'box-shadow': 'inset 0 0 0 12px white',
  'display':'flex',
  'justify-content':'center',
  'align-items':'center'
});


anaesterizerExe.css.set('class', 'anaesterizer-largeDialHandle',{
  'width':'5px',
  'height':'28px',
  'border-radius': '80px',
  //'box-shadow': 'black 0px 0px 0px 1px',
  'pointer-events': 'none'
});




anaesterizerExe.css.set('class', 'anaesterizer-sideButtonsContainer',{
  'background-color' : 'red',
  'width':'48px',
  'display':'flex',
  'flex-wrap':'wrap'

});



anaesterizerExe.css.set('class', 'anaesterizer-smallButtonContainer',{
  'background-color' : 'var(--aqua)',
  'width':'48px',
  'height':'48px',
  'display':'flex',
  'align-items':'center',
  'justify-content':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


anaesterizerExe.css.set('class', 'anaesterizer-smallButton',{
  'background-color' : 'white',
  'width':'25px',
  'height':'25px',
  'border-radius': '30px',
  'text-align':'center',
  'line-height': '27px',
  'background-repeat': 'no-repeat',
  'background-position': 'center'
});


anaesterizerExe.css.set('class', 'anaesterizer-displayContainer',{
  'background-color' : 'black',
  'width':'432px',
  'height':'192px',
  'box-shadow': 'black 0px 0px 0px 1px',
  'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'position': 'relative',
    'pointer-events': 'none'
});


anaesterizerExe.css.set('id', 'anaesterizer-punchIllustration',{
  'left' : '115px',
  'bottom':'15px'
});


anaesterizerExe.css.set('id', 'anaesterizer-sizePointerIllustration',{
  'left' : '79px',
  'top':'128px'
});


anaesterizerExe.css.set('id', 'anaesterizer-waterTankIndicator',{
  'right' : '23px',
  'bottom':'14px',
  'width':'20px',
  'height':'1px',
  'background':'var(--white)',
  'transform':'rotate(-135deg)',
  'transform-origin':'0% 50%'
});


anaesterizerExe.css.set('id', 'anaesterizer-displayLabel-Number',{
  'position' : 'absolute',
  'font-size':'36px',
  'right' : '12px',
  'top':'30px',
  'color':'var(--aqua)',
  'text-align':'right'
});


anaesterizerExe.css.set('id', 'anaesterizer-displayLabel-SonicIndicator',{
  'position' : 'absolute',
  'width':'22.2667px',
  'height':'22.2667px',
  'right' : '43.3667px',
  'top':'98.8667px',
  'box-shadow': 'var(--white) 0px 0px 0px 1px',
  'border-radius':'9999px'

});




anaesterizerExe.css.set('class', 'anaesterizer-displayLabels',{
  'position' : 'absolute',
  'text-transform':'uppercase',
  'font-size':'10px',
  'z-index':'3'
});

anaesterizerExe.css.set('id', 'anaesterizer-displayLabel-0',{
  'left' : '12px',
  'top':'12px',
  'color':'var(--yellow)'
});

anaesterizerExe.css.set('id', 'anaesterizer-displayLabel-1',{
  'right' : '12px',
  'top':'12px',
  'color':'var(--aqua)'
});

anaesterizerExe.css.set('id', 'anaesterizer-displayLabel-2',{
  'right' : '12px',
  'top':'75px',
  'color':'var(--magenta)'
});

anaesterizerExe.css.set('id', 'anaesterizer-displayLabel-3',{
  'right' : '12px',
  'top':'140px',
  'color':'var(--blue)'
});





anaesterizerExe.css.set('class', 'anaesterizer-displayIllustration',{
  'position' : 'absolute'
});


anaesterizerExe.css.set('class', 'anaesterizer-KeyPressed',{
  'background-color' : 'var(--yellow)'
});



anaesterizerExe.css.set('class', 'anaesterizer-SpeakerDots',{
  'height' : '20px',
  'margin':'8px'
});

anaesterizerExe.css.set('class', 'anaesterizer-SpeakerDots#speaker1',{
  'width' : '28px',
  'float':'left'
});

anaesterizerExe.css.set('class', 'anaesterizer-SpeakerDots#speaker2',{
  'width' : '178px',
  'float':'right'
});


anaesterizerExe.css.set('class', 'anaesterizer-Title',{
  'font-size' : '23px',
  'letter-spacing':'8px',
  'float':'left',
  'margin':'8px'
});



anaesterizerExe.css.set('keyframe', 'keyframes bubbleAnimation5',{
  '0%' : '{fransform: translateY(0)}',
  '25%' : '{fransform: translateY(-25px)}',
  '75%' : '{fransform: translateY(25px)}',
  '100%' : '{fransform: translateY(0)}',
});

anaesterizerExe.css.set('id', 'WaterBubble5',{
  'animation' : 'bubbleAnimation5 5s linear infinite'
});

















anaesterizerExe.root = 'apps/Anaesterizer/';


anaesterizerExe.start = function (applicant) {
  if (applicant !== 'OS') {
    anaesterizerExe.root = '';
  }


  //startAPP
  anaesterizerExe.makeView();
  anaesterizerExe.makeLogic();


}






/////////////////////////////////////////////////////////////////
///App View//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
anaesterizerExe.makeView = function(){

  var a = anaesterizerExe;

  a.currentQuestion = -1;





  a.mouseCoordinates = {
    current:{
      x:0,
      y:0
    },
    previous:{
      x:0,
      y:0
    }
  };
  a.mouseDelta = {
    x:0,
    y:0
  };


  a.dom = {};


  a.dom.windowContainer = document.getElementById(anaesterizerExe.uniqueAppID+'-canvas');



  //make header container
  a.dom.headerContainer = createElement('div','anaesterizer-headerContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.headerContainer);


  a.dom.speaker1 = createElement('div','anaesterizer-SpeakerDots semiDark-illegalTeal', 'speaker1', undefined);
  a.dom.headerContainer.appendChild(a.dom.speaker1);

  a.dom.title = createElement('div','anaesterizer-Title', undefined, 'AN-1');
  a.dom.headerContainer.appendChild(a.dom.title);

  a.dom.speaker2 = createElement('div','anaesterizer-SpeakerDots semiDark-illegalTeal', 'speaker2', undefined);
  a.dom.headerContainer.appendChild(a.dom.speaker2);

  //anaesterizer-SpeakerDots



  //make small buttons container
  a.dom.smallButtonsContainer = createElement('div','anaesterizer-smallButtonsContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.smallButtonsContainer);


  components.tooltipHelper(a.root+'img/tooltip.gif', 'Drag up and down a key to modulate its pitch', 5000, 10000, ['355px','180px'], a.dom.windowContainer);



/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////LOOPS///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


  a.loops = [];
  a.loops[0] = {};
  a.loops[0].instrument = new Tone.Sequence(function(time, note){
    a.polySynth.triggerAttackRelease(note, "16n", time);
  }, ["C3", "E3", "G3", "B3", "C4", "B3", "G3", "E3"], "8n");
  a.loops[0].instrument.loop = 4;
  a.loops[0].active = false;

  a.loops[1] = {};
  a.loops[1].instrument = new Tone.Sequence(function(time, note){
    a.bassSynth.triggerAttackRelease(note, "1m", time);
  }, ["E2", "C2"], "2m");
  a.loops[1].instrument.loop = 4;
  a.loops[1].active = false;

  a.loops[2] = {};
  a.loops[2].instrument = new Tone.Sequence(function(time, note){
    a.highSynth.triggerAttackRelease(note, "64n", time);
  }, ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"], "32n");
  a.loops[2].instrument.loop = 16;
  a.loops[2].active = false;


  a.loops[3] = {};
  a.loops[3].instrument = new Tone.Part(function(time, note){
    a.polySynth.triggerAttackRelease(note, "16n", time);
    //Use the drummer if open

    if(typeof drummerExe !== 'undefined'){
      if(typeof drummerExe.drumKit !== 'undefined'){
    console.log(drummerExe.drumKit._players["sound5"].buffer._buffer.length);
        drummerExe.drumKit._players["sound5"].start();
      }

    }

  }, [[0, "C2"], [0, "C3"],["0:0:2", "C2"],["0:0:2", "C3"]]);
  a.loops[3].instrument.loopEnd = "2m";
  a.loops[3].instrument.loop = 2;
  a.loops[3].active = false;




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


a.startSynthTransport = function(){
  console.log("PLAYING MAIN TIMELINE");
  a.synthTransport.start();
}

a.stopSynthTransport = function(){
  console.log("STOPPING MAIN TIMELINE");
  for (var i = 0; i < a.loops.length; i++) {
    a.loops[i].instrument.stop();
    a.loops[i].active = false;
    a.dom.buttons['button'+(i+1)].firstChild.style.backgroundColor = 'var(--white)';
  }
  a.synthTransport.stop();
}




a.toggleLoop = function(index){
  //Stop main timeline
  a.synthTransport.stop();
  //Play or stop the loop in question
  if(a.loops[index].active){
    a.loops[index].active = false;
    a.loops[index].instrument.stop();
    a.dom.buttons['button'+(index+1)].firstChild.style.backgroundColor = 'var(--white)';

  }else{
     a.loops[index].active = true;
     a.dom.buttons['button'+(index+1)].firstChild.style.backgroundColor = 'var(--yellow)';
  }
  //Restart the main timeline
  a.synthTransport.start();
}



//Play loop shortcut
a.playLoop = function(index){
  a.loops[index].instrument.stop();
  a.loops[index].instrument.start();
}


///Manage loops at each start
a.manageLoops = function(){
   for (var i = 0; i < a.loops.length; i++) {
     if(a.loops[i].active){
       a.playLoop(i);
       console.log(i+" IS PLAYABLE");
     }
  }
}



//Main timeline
a.synthTransport = new Tone.Part(function(time, loops){
  a.manageLoops();
}).start(0);


//Main timeline settings
a.synthTransport.loop = true;
//One bar
a.synthTransport.loopEnd = '4m';
//Schedule a callback at loop rollover
a.synthTransport.add({"time" : 0});


//Setup and start audio context
Tone.Transport.bpm.value = 150;
Tone.Transport.start();


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


  a.octave = 3;

  a.keys = {
    //Black
      '2':'F#'+(a.octave-1),
      '3':'G#'+(a.octave-1),
      '4':'Bb'+(a.octave-1),
      '6':'C#'+a.octave,
      '7':'D#'+a.octave,
      'G':'F#'+a.octave,
      'H':'G#'+a.octave,
      'J':'Bb'+a.octave,
      'L':'C#'+(a.octave+1),
      ';':'D#'+(a.octave+1),

    //White
      'Q':'F'+(a.octave-1),
      'W':'G'+(a.octave-1),
      'E':'A'+(a.octave-1),
      'R':'B'+(a.octave-1),
      'T':'C'+a.octave,
      'Y':'D'+a.octave,
      'U':'E'+a.octave,
      'V':'F'+a.octave,
      'B':'G'+a.octave,
      'N':'A'+a.octave,
      'M':'B'+a.octave,
      ',':'C'+(a.octave+1),
      '.':'D'+(a.octave+1),
      '/':'E'+(a.octave+1)
  }


  //Settings key maps
  a.keyMaps = {
      black:['2','3','4',    '6','7',    'G','H','J',   'L',';'],
    white:['Q','W','E','R','T','Y','U','V','B','N','M',',','.','/']

  };

  //Settings key notes
  a.notes = {
        black:['F#','G#','Bb', 'C#','D#',  'F#','G#','Bb', 'C#','D#'],
      white:['F','G','A','B','C','D','E','F','G','A','B','C','D','E']
  };

  //Make Buttons
  a.dom.buttons = {};
  for (var i = 0; i < 4; i++) {
    a.components.makeButtonSmall(i+1,a.dom.smallButtonsContainer, a.toggleLoopAction(i));
  }


  anaesterizerExe.dialValues = {
    a:25,
    b:72,
    c:25,
    d:36.666666
  };




  //make display
  a.dom.displayContainer = createElement('div','anaesterizer-displayContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.displayContainer);


  //Make Labels
  a.dom.labels = []

  a.dom.labels[0] = createElement('div','anaesterizer-displayLabels', 'anaesterizer-displayLabel-0', 'Prey Size');
  a.dom.displayContainer.appendChild(a.dom.labels[0]);

  a.dom.labels[1] = createElement('div','anaesterizer-displayLabels', 'anaesterizer-displayLabel-1', 'Bitterness');
  a.dom.displayContainer.appendChild(a.dom.labels[1]);

  a.dom.labels[1].number = createElement('div', undefined, 'anaesterizer-displayLabel-Number', anaesterizerExe.dialValues.b);
  a.dom.displayContainer.appendChild(a.dom.labels[1].number);

  a.dom.labels[2] = createElement('div','anaesterizer-displayLabels', 'anaesterizer-displayLabel-2', 'Sonic Blast');
  a.dom.displayContainer.appendChild(a.dom.labels[2]);

  a.dom.labels[2].indicator = createElement('div',undefined, 'anaesterizer-displayLabel-SonicIndicator', undefined);
  a.dom.displayContainer.appendChild(a.dom.labels[2].indicator);

  a.dom.labels[3] = createElement('div','anaesterizer-displayLabels', 'anaesterizer-displayLabel-3', 'Water Tank');
  a.dom.displayContainer.appendChild(a.dom.labels[3]);


  a.dom.labels[3].waterTankIndicator = createElement('div','anaesterizer-displayLabels', 'anaesterizer-waterTankIndicator', undefined);
  a.dom.displayContainer.appendChild(a.dom.labels[3].waterTankIndicator);

  a.dom.illustration = {};
  a.dom.illustration.punch = createSvg('anaesterizer-displayIllustration', 'anaesterizer-punchIllustration', a.root+"img/display/Punch.svg");
  a.dom.displayContainer.appendChild(a.dom.illustration.punch);

  a.dom.illustration.base = createSvg('anaesterizer-displayIllustration', 'anaesterizer-baseIllustration', a.root+"img/display/Base.svg");
  a.dom.displayContainer.appendChild(a.dom.illustration.base);

  a.dom.illustration.sizePointer = createSvg('anaesterizer-displayIllustration', 'anaesterizer-sizePointerIllustration', a.root+"img/display/SizePointer.svg");
  a.dom.displayContainer.appendChild(a.dom.illustration.sizePointer);






  //make large dials container

  a.dialsSettings = {a:'blue', b:'aqua', c:'yellow', d:'magenta'};

  a.dom.largeDialsContainer = createElement('div','anaesterizer-largeDialsContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.largeDialsContainer);

  for (key in a.dialsSettings) {
    anaesterizerExe.components.makeDialLarge(a.dialsSettings[key], key, a.dom.largeDialsContainer);
  }





  //make black keys container
  a.dom.blackKeysContainer = createElement('div','anaesterizer-blackKeysContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.blackKeysContainer);


  var orientation = "Left";

  for (var i = 0; i < 10; i++) {
    var size = "Large";
    if (i === 1 || i % 5 === 1) {
      //make a small black key every 6 keys
      size = "Small";
    }else {
      //Switch left and right everytime a large black key is created
      if (orientation === 'Left') {
        orientation = 'Right';
      } else {
        orientation = 'Left';
      }
    }
    anaesterizerExe.components.makeBlackKey(a.keyMaps.black[i], size, orientation, a.dom.blackKeysContainer);
  }

  //make white keys container
  a.dom.whiteKeysContainer = createElement('div','anaesterizer-whiteKeysContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.whiteKeysContainer);

  for (var i = 0; i < a.notes.white.length; i++) {
    anaesterizerExe.components.makeWhiteKey(a.keyMaps.white[i], a.dom.whiteKeysContainer);
  }
}



anaesterizerExe.components = {};


anaesterizerExe.components.makeWhiteKey = function(note, container){
  //make white key
  var keyContainer = createElement('div','anaesterizer-whiteKeyContainer', undefined, undefined);
  var key = createElement('div','anaesterizer-whiteKey', 'anaesterizer-whiteKey_'+note, note);
  keyContainer.appendChild(key);

  key.onmouseover = function(){
    anaesterizerExe.changeKey(key, note);
  };

  container.appendChild(keyContainer);
}

anaesterizerExe.components.makeBlackKey = function(note, size, orientation, container){
  //make black key
  console.log("BLACK KEY");
  var keyContainer = createElement('div','anaesterizer-blackKeyContainer anaesterizer-blackKey'+size+' anaesterizer-blackKey'+orientation, undefined, undefined);
  var key = createElement('div','anaesterizer-blackKey dark-illegalTeal', 'anaesterizer-blackKey_'+note, undefined);
  keyContainer.appendChild(key);
  var keyLabel = createElement('div','anaesterizer-blackKeyLabel', undefined, note);
    key.appendChild(keyLabel);

  key.onmouseover = function(){
    anaesterizerExe.changeKey(key, note);
  };

  container.appendChild(keyContainer);
}

anaesterizerExe.components.makeDialLarge = function(color, id, container){
  //make largeDial
  console.log("LARGE DIAL");
  var dialContainer = createElement('div','anaesterizer-largeDialContainer', undefined, undefined);
  var dial = createElement('div','anaesterizer-largeDial', 'anaesterizer-largeDial_'+id, undefined);
  dial.style.background = 'var(--'+color+')';
  dialContainer.appendChild(dial);

  var handle = createElement('div','anaesterizer-largeDialHandle darkPattern', undefined, undefined);
  dial.appendChild(handle);
  //key.onclick = playNote();
  container.appendChild(dialContainer);
  //


}

anaesterizerExe.rotateKnob = function(){

}


anaesterizerExe.components.makeButtonSmall = function(icon, container, action){
  //make smallButton
  anaesterizerExe.dom.buttons['button'+icon] = createElement('div','anaesterizer-smallButtonContainer', undefined, undefined);
  var button = createElement('div','anaesterizer-smallButton', undefined, undefined);
  button.style.backgroundImage = 'url("'+anaesterizerExe.root+'img/buttons/'+icon+'.svg")';
  button.onclick = action;
  anaesterizerExe.dom.buttons['button'+icon].appendChild(button);

  container.appendChild(anaesterizerExe.dom.buttons['button'+icon]);

}


anaesterizerExe.toggleLoopAction = function(index){
  return function(){
    anaesterizerExe.toggleLoop(index);
  }

}






/////////////////////////////////////////////////////////////////
///App Logic//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

anaesterizerExe.makeLogic = function(){
  var a = anaesterizerExe;
  a.addListeners();


  ////////////////////////////////////////////////////////////////////
  ///INSTRUMENTS//////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  //a 4 voice Synth
  //Make main synth
  a.polySynth = new Tone.PolySynth(5, Tone.MonoSynth);
  a.polySynth.toMaster();

  a.polySynth.set({
	"envelope" : {
		"attack" : 0.8
	},
  "filterEnvelope":{
    "attack" : 0.8
  },
  "oscillator":{
    "type":"fatsawtooth",
    "spread"  : "20" ,
    "count"  : "2" ,
  }

});
  a.polySynth.detune.value = 0;

//////////////////////////////////////////////////////////////////////////////////

  //Make bass synth
  a.bassSynth = new Tone.PolySynth(5, Tone.MonoSynth);
  a.bassSynth.toMaster();

  a.bassSynth.set({

  "envelope" : {
    "attack" : 2
  },
  "filterEnvelope":{
    "attack" : 5
  },
  "oscillator":{
    "type":"pwm",
    "spread"  : "10" ,
    "count"  : "2" ,
  }

});

//Set instrument sound
  a.bassSynth.set({
  "filterEnvelope" : {
  //  "baseFrequency" : 300
  },
  "envelope":{
    "release":5
  },
  volume:0,

  "filter":{
    "Q" : 4
  }
});

a.bassSynth.volume.value = -20;




//////////////////////////////////////////////////////////////////////////////////

  //Make high synth
  a.highSynth = new Tone.PolySynth(5, Tone.MonoSynth);
  a.highSynth.toMaster();

  a.highSynth.set({

  "envelope" : {
    "attack" : 0.2
  },
  "filterEnvelope":{
    "attack" : 0.5
  },
  "oscillator":{
    "type":"pwm",
    "spread"  : "10" ,
    "count"  : "2" ,
  }

});

//Set instrument sound
  a.highSynth.set({
  "filterEnvelope" : {
  //  "baseFrequency" : 300
  },
  "envelope":{
    "release":0.1
  },
  volume:0,

});

a.highSynth.volume.value = -15;
}


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


anaesterizerExe.keyboard = function(pressed, note, keyPress){

  var pressedKeyObject = document.getElementById('anaesterizer-whiteKey_'+keyPress) || document.getElementById('anaesterizer-blackKey'+keyPress);
  if (pressedKeyObject === null) {
    pressedKeyObject = document.getElementById('anaesterizer-blackKey_'+keyPress);
  }
  if (pressed) {
    //Animate punch on press
    TweenLite.to(anaesterizerExe.dom.illustration.punch, 0.05, {left:90,ease:Power3.easeIn, onComplete:function(){
      //a.dom.timeBar.style.left = a.transportTime.value+"%";
      //TweenLite.set(anaesterizerExe.dom.illustration.punch, {left:110});
      TweenLite.to(anaesterizerExe.dom.illustration.punch, 0.6, {left:115,ease:Power4.easeOut});
      //console.log(Tone.Transport.progress);
    }});


    anaesterizerExe.polySynth.detune.value = 0;
    anaesterizerExe.polySynth.triggerAttack(note);
    anaesterizerExe.toggleKeyDownStyle('add',pressedKeyObject);
  }else {
    anaesterizerExe.polySynth.triggerRelease(note);
    anaesterizerExe.toggleKeyDownStyle('remove',pressedKeyObject);
  }

}


///DEFAULT FUNCTION ROUTED BY OS
anaesterizerExe.keyCommands = function(e){

  var allowPress = true;

  if (e.repeat !== undefined) {
    allowPress = !e.repeat;
  }
  //stop the press if is a repeating (holding down) action
  if (!allowPress) return;

  var keyState = true;
  if (e.type === 'keyup') {
    keyState = false;
  }

  if (anaesterizerExe.keys[e.key.toUpperCase()] !== undefined) {
    anaesterizerExe.playKeyboard(e.key.toUpperCase(), keyState);
  }

}


anaesterizerExe.playKeyboard = function(key, pressed){
  anaesterizerExe.keyboard(pressed, anaesterizerExe.keys[key], key);
};




/////

anaesterizerExe.mouseStatus = {
  action:'idle',
  object:'none',
  id:'none'
};

anaesterizerExe.dialRotationStatus = {
  a:0,
  b:0,
  c:0,
  d:0
};


anaesterizerExe.toggleKeyDownStyle = function(action,object){
  object.classList[action]("anaesterizer-KeyPressed");
};



anaesterizerExe.onMouseMove = function(e) {
  var a = anaesterizerExe;

  if (a.mouseStatus.action === 'dial') {
    //DRAG DIAL

    //update mouse position
    a.getMousePosition(e);

    //update mouse delta
    a.getMouseDelta();

    //console.log(a.mouseDelta.y);


    var dragAmount = a.mouseDelta.y;
    var id = a.mouseStatus.id;
    var dialRotation = a.dialRotationStatus[id] + dragAmount;
    //console.log(dialRotation);
    //Update dialValues


    a.mouseStatus.object.style.transform = 'rotate('+ dialRotation +'deg)';


    switch (id) {
      case 'a':
        //Blue dial behaviour
        a.dialValues[id] += (dragAmount);
        //Clamp values to custom min max
        a.dialValues[id] = clampValue(a.dialValues[id],0,100);
        //Remap progress to pixels
        var pixelPosition = progressToValue(a.dialValues[id], -180, 0);

        var soundValue = progressToValue(a.dialValues[id], 100, 1000);
        var soundValue2 = progressToValue(a.dialValues[id], 0, 10);

        //Set instrument sound
          a.polySynth.set({
        	"filterEnvelope" : {
        		"baseFrequency" : soundValue
        	},
          "filter":{
            "Q" : soundValue2
          }
        });

        a.dom.labels[3].waterTankIndicator.style.transform = 'rotate('+ pixelPosition +'deg)';
        break;

      case 'b':
        //Aqua dial behaviour
        a.dialValues[id] += Math.floor(dragAmount/2);
        //Clamp values to custom min max
        a.dialValues[id] = clampValue(a.dialValues[id],1,99);


        var soundValue = progressToValue(a.dialValues[id], 10, 30);
        var soundValue2 = progressToValue(a.dialValues[id], 1, 0);

        //Set instrument sound
          a.polySynth.set({
          "oscillator" : {
            "spread" : soundValue
          }
        });


        a.dom.labels[1].number.innerHTML = a.dialValues[id];
        break;

      case 'c':
        a.dialValues[id] += (dragAmount/4);
        //Clamp values to custom min max
        a.dialValues[id] = clampValue(a.dialValues[id],0,100);
        //Remap progress to pixels
        var pixelPosition = progressToValue(a.dialValues[id], 160, 25);

        var soundValue = progressToValue(a.dialValues[id], 0.1, 10);
        var soundValue2 = progressToValue(a.dialValues[id], 1, 0);

        //Set instrument sound
          a.polySynth.set({
          "envelope" : {
            "release" : soundValue
          },
          "filterEnvelope":{
            "release" : soundValue*2
          }
        });


        a.dom.illustration.sizePointer.style.top = pixelPosition+"px";
        break;

      case 'd':
        a.dialValues[id] += (dragAmount/1.5);
        a.dialValues[id] = clampValue(a.dialValues[id],1,100);


        var position = progressToValue(a.dialValues[id], 65, 6);
        var size = progressToValue(a.dialValues[id], 12, 40);


        var soundValue = progressToValue(a.dialValues[id], 1, 0);

        //Set instrument sound
          a.polySynth.set({
          "envelope" : {
            "attack" : soundValue
          },
          "filterEnvelope":{
            "attack" : soundValue*2
          }
        });


        a.dom.labels[2].indicator.style.right = position+"px";
        a.dom.labels[2].indicator.style.width = size+"px";
        a.dom.labels[2].indicator.style.height = size+"px";
        a.dom.labels[2].indicator.style.marginLeft = size+"px";
        var top = 85+((50-size)/2);
        a.dom.labels[2].indicator.style.top = top+"px";


        break;
      default:

    }

    //Save rotation of dial
    a.dialRotationStatus[id] = dialRotation;

    //Save position for next cicle
    a.storeMousePosition(e);


  }else if (a.mouseStatus.action === 'key') {
    //DRAG KEY //MODULATE PITCH
    console.log("DRAG KEY");



    //update mouse position
    a.getMousePosition(e);

    //update mouse delta
    a.getMouseDelta();

    // console.log(a.mouseDelta.y);
    //
    // console.log(a.mouseStatus);


    var dragAmount = a.mouseDelta.y;
    var id = a.mouseStatus.id;
    var keySlide = a.dialRotationStatus[id] + dragAmount;
    //console.log(keySlide);

    //Detune on drag
    anaesterizerExe.polySynth.detune.value = anaesterizerExe.polySynth.detune.value + (dragAmount*5);


    //Save position for next cicle
    anaesterizerExe.storeMousePosition(e);




  }


}


anaesterizerExe.onMouseDown = function(e) {
  //onMouse Down
  console.log(e.target.classList[0]);
  var targetClass = e.target.classList[0];

  anaesterizerExe.getMousePosition(e);
  anaesterizerExe.storeMousePosition(e);

  if (targetClass === 'anaesterizer-largeDial') {
    //DRAG DIAL CAN START
    anaesterizerExe.setMouseStatus('dial', e.target, e.target.id);

  }else if (targetClass === 'anaesterizer-whiteKey' || targetClass === 'anaesterizer-blackKey') {
    //DRAG KEY CAN START


    anaesterizerExe.setMouseStatus('key', e.target, e.target.id);
    //Set keyDown state
    console.log(anaesterizerExe.mouseStatus.id);
    //anaesterizerExe.toggleKeyDownStyle('add',anaesterizerExe.mouseStatus.object);

    //Play note
    anaesterizerExe.keyboard(true,anaesterizerExe.keys[anaesterizerExe.mouseStatus.id], anaesterizerExe.mouseStatus.id);
  }
}





anaesterizerExe.onMouseUp = function(e) {
  //on Mouse Up

  //RELEASE DRAGS

  //RELEASE NOTES
  if (anaesterizerExe.mouseStatus.action === 'key') {
    //Release key note
    anaesterizerExe.keyboard(false,anaesterizerExe.keys[anaesterizerExe.mouseStatus.id], anaesterizerExe.mouseStatus.id);
  }

  //Reset Statuses
  if (anaesterizerExe.mouseStatus.object !== 'none') {
    //anaesterizerExe.toggleKeyDownStyle('remove',anaesterizerExe.mouseStatus.object);
    //Reset mouse status
    anaesterizerExe.setMouseStatus('idle', 'none', 'none');
  }
}

anaesterizerExe.onMouseLeave = function(e) {
  //RELEASE NOTES
  if (anaesterizerExe.mouseStatus.action === 'key') {
    //Release key note
    anaesterizerExe.keyboard(false,anaesterizerExe.keys[anaesterizerExe.mouseStatus.id], anaesterizerExe.mouseStatus.id);
  }
  //Reset Statuses
  if (anaesterizerExe.mouseStatus.object !== 'none') {
    //anaesterizerExe.toggleKeyDownStyle('remove',anaesterizerExe.mouseStatus.object);
    //Reset mouse status
    anaesterizerExe.setMouseStatus('idle', 'none', 'none');
  }
}

anaesterizerExe.setMouseStatus = function(action, object, id){
  anaesterizerExe.mouseStatus.action = action;
  anaesterizerExe.mouseStatus.object = object;
  anaesterizerExe.mouseStatus.id = id.split("_")[1];
}


anaesterizerExe.storeMousePosition = function(e){
  anaesterizerExe.mouseCoordinates.previous.x = e.clientX;
  anaesterizerExe.mouseCoordinates.previous.y = e.clientY;
}

anaesterizerExe.getMousePosition = function(e){
  anaesterizerExe.mouseCoordinates.current.x = e.clientX;
  anaesterizerExe.mouseCoordinates.current.y = e.clientY;
}

anaesterizerExe.getMouseDelta = function(){
  anaesterizerExe.mouseDelta.x = anaesterizerExe.mouseCoordinates.previous.x - anaesterizerExe.mouseCoordinates.current.x;
  anaesterizerExe.mouseDelta.y = anaesterizerExe.mouseCoordinates.previous.y - anaesterizerExe.mouseCoordinates.current.y;
}







anaesterizerExe.changeKey = function(keyObj, newNote){
  //CHANGE KEY IF HOVERING ANOTHER KEY WHILE PRESSING ANOTHER ONE


  if (anaesterizerExe.mouseStatus.action === 'key' && anaesterizerExe.mouseStatus.id !== newNote) {
      //Release key note

      anaesterizerExe.keyboard(false,anaesterizerExe.keys[anaesterizerExe.mouseStatus.id], anaesterizerExe.mouseStatus.id);
      //anaesterizerExe.toggleKeyDownStyle('remove',anaesterizerExe.mouseStatus.object);

      //Press new hovered key
      anaesterizerExe.keyboard(true,anaesterizerExe.keys[newNote], newNote);
      //anaesterizerExe.toggleKeyDownStyle('add',keyObj);

      anaesterizerExe.setMouseStatus('key', keyObj, keyObj.id);


  }


}






anaesterizerExe.addListeners = function() {
  anaesterizerExe.dom.windowContainer.addEventListener( 'mousemove', anaesterizerExe.onMouseMove, false );
  anaesterizerExe.dom.windowContainer.addEventListener( 'mousedown', anaesterizerExe.onMouseDown, false );
  anaesterizerExe.dom.windowContainer.addEventListener( 'mouseup', anaesterizerExe.onMouseUp, false );
  anaesterizerExe.dom.windowContainer.addEventListener( 'mouseleave', anaesterizerExe.onMouseLeave, false );
  //ADD MOUSE LEAVE
};









/////////////////////////////////////////////////////////////////
/////App Components///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////





///// MENU actions

// anaesterizerExe.menuActions = {};
//
// anaesterizerExe.menuActions.EasterEgg = function(){
//   console.log('LOGGING '+anaesterizerExe.ratio);
// }
//
// anaesterizerExe.menuActions.Redo = function(){
//   anaesterizerExe.downloadImage();
// }
