//Add icon
//Refactor using tone.PART
//fix zoom


var drummerExe = {}
drummerExe.uniqueAppID = 'drummer';

drummerExe.root = 'apps/Drummer/';



if (typeof installedApps !== 'undefined') {


  installedApps[drummerExe.uniqueAppID].OsMenu = {
    [installedApps[drummerExe.uniqueAppID].name] : [['Quit','quitApp']],
    'File': [['Open Synth','openSynth']],
    'Playback': [['Play','playDrum'],['Stop','stopDrum'], ['Record','recordDrum'], '-',['Clear Recording','clearDrum']], //fill in later
    'View': [['Minimize','minimizeApp'], ['Zoom','zoomApp'], '-', ['Enter Full Screen','enterFullScreen']],
    'Help': [['Report a bug...','reportBug']]
  }

}





//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////
drummerExe.menuActions = {};

drummerExe.menuActions.quitApp = appMenuExe.menuActions.quitApp;

drummerExe.menuActions.openSynth = function(){

  installedApps['anaesterizer'].Status.open();

}


drummerExe.menuActions.playDrum = function(){
  drummerExe.play();
}


drummerExe.menuActions.stopDrum = function(){
  drummerExe.stop();
}


drummerExe.menuActions.recordDrum = function(){
  drummerExe.record();
}

drummerExe.menuActions.clearDrum = function(){
  drummerExe.clear();
}




drummerExe.menuActions.minimizeApp = appMenuExe.menuActions.minimizeApp;

drummerExe.menuActions.zoomApp = appMenuExe.menuActions.zoomApp;

drummerExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;

drummerExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;

drummerExe.menuActions.closingApp = function(){
  drummerExe.hardStop();
}

//////////////////////////////
//////////////////////////////






drummerExe.css = new CssComponent(drummerExe.uniqueAppID);

// drummerExe.css.set('', 'body',{
//   'background-color' : 'var(--white)',
//   'color':'black',
//   'display': 'flex',
//   'flex-wrap':'wrap',
//   'align-content': 'start'
// });


drummerExe.css.set('id', drummerExe.uniqueAppID+'-canvas',{
  'background-color' : 'var(--blue)',
  'color':'black',
  'display': 'flex',
  'flex-wrap':'wrap',
  'align-content': 'start'
});


drummerExe.css.set('class', 'drummer-headerContainer',{
  'background-color' : 'var(--blue)',
  'color':'black',
  'width':'100%',
  'height':'36px',
  'box-shadow': 'black 0px 0px 0px 1px'
});




drummerExe.css.set('class', 'drummer-whiteKeysContainer',{
  'background-color' : 'var(--blue)',
  'width':'100%',
  'display':'flex'
});


drummerExe.css.set('class', 'drummer-whiteKeyContainer',{
  'background-color' : 'var(--blue)',
  'width':'48px',
  'height':'120px',
  'display':'flex',
  'align-items':'center',
  'justify-content': 'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


drummerExe.css.set('class', 'drummer-whiteKey',{
  'background-color' : 'white',
  'width':'25px',
  'height':'95px',
  'border-radius': '50px',
  'text-align': 'center',
  'box-sizing': 'border-box',
  'padding': '40px 0px',
  'font-size':'10px'
});



drummerExe.css.set('class', 'drummer-smallKeysContainer',{
  'background-color' : 'var(--blue)',
  'width':'100%',
  'display':'flex',
  'flex-wrap':'wrap'
});


drummerExe.css.set('class', 'drummer-smallKeyContainer',{
  'background-color' : 'var(--blue)',
  'height':'48px',
  'width':'48px',
  'display':'flex',
  'align-items':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});






drummerExe.css.set('class', 'drummer-smallKey',{
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



drummerExe.css.set('class', 'drummer-smallKeyLabel',{
  'background-color' : 'black',
  'color':'white',
  'width':'15px',
  'height':'15px',
  'border-radius': '50px',
  'font-size':'10px',
  'pointer-events': 'none',
  'line-height': '17px'
});


//drummer-smallKeyLabel



drummerExe.css.set('class', 'drummer-dialsContainer',{
  'background-color' : 'var(--blue)',
  'width':'192px',
  'height':'48px',
  'display':'flex',
  'flex-wrap':'wrap'

});




drummerExe.css.set('class', 'drummer-dialContainer',{
  'background-color' : 'var(--blue)',
  'width':'96px',
  'height':'96px',
  'display':'flex',
  'align-items':'center',
  'justify-content':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


drummerExe.css.set('class', 'drummer-dial',{
  'background-color' : 'var(--blue)',
  'width':'25px',
  'height':'25px',
  'border-radius': '80px',
  'text-align':'center',
  'box-shadow': 'inset 0 0 0 4px white',
  'display':'flex',
  'justify-content':'center',
  'align-items':'center'
});


drummerExe.css.set('class', 'drummer-dialHandle',{
  'width':'3px',
  'height':'9px',
  'border-radius': '10px',
  //'box-shadow': 'black 0px 0px 0px 1px',
  'pointer-events': 'none',
  'background-color' : 'var(--black)'
});




drummerExe.css.set('class', 'drummer-sideButtonsContainer',{
  'background-color' : 'red',
  'width':'48px',
  'display':'flex',
  'flex-wrap':'wrap'

});



drummerExe.css.set('class', 'drummer-smallButtonContainer',{
  'background-color' : 'var(--blue)',
  'width':'48px',
  'height':'48px',
  'display':'flex',
  'align-items':'center',
  'justify-content':'center',
  'box-shadow': 'black 0px 0px 0px 1px'
});


drummerExe.css.set('class', 'drummer-smallButton',{
  'background-color' : 'white',
  'width':'25px',
  'height':'25px',
  'border-radius': '30px',
  'text-align':'center',
  'line-height': '27px',
  'background-repeat':'no-repeat',
  'background-position':'center'
});


drummerExe.css.set('class', 'drummer-displayContainer',{
  'background-color' : 'black',
  'width':'288px',
  'height':'132px',
  'box-shadow': 'black 0px 0px 0px 1px',
  'overflow':'hidden',
  'position':'relative'

});


drummerExe.css.set('class', 'drummer-KeyPressed',{
  'background-color' : 'var(--yellow)'
});



drummerExe.css.set('class', 'drummer-SpeakerDots',{
  'height' : '20px',
  'margin':'8px'
});

drummerExe.css.set('class', 'drummer-SpeakerDots#speaker1',{
  'width' : '28px',
  'float':'left'
});

drummerExe.css.set('class', 'drummer-SpeakerDots#speaker2',{
  'width' : '108px',
  'float':'right'
});


drummerExe.css.set('class', 'drummer-Title',{
  'font-size' : '23px',
  'letter-spacing':'8px',
  'float':'left',
  'margin':'8px'
});




drummerExe.css.set('id', 'drummer-transportContainer',{
  'height':'100%',
  'width':'100%',
  'display':'flex',
  'flex-direction':'column'
});


drummerExe.css.set('class', 'drummer-keyframe',{
  //'background-color' : 'var(--magenta)',
  'height':'3px',
  'width':'10%',
  'position':'absolute',
  'box-shadow': 'black 0px 0px 0px 3px'
});

drummerExe.css.set('id', 'drummer-layer0 .drummer-keyframe',{
  'background-color' : 'var(--white)'
});

drummerExe.css.set('id', 'drummer-layer1 .drummer-keyframe',{
  'background-color' : 'var(--magenta)'
});

drummerExe.css.set('id', 'drummer-layer2 .drummer-keyframe',{
  'background-color' : 'var(--blue)'
});

drummerExe.css.set('id', 'drummer-layer3 .drummer-keyframe',{
  'background-color' : 'var(--aqua)'
});

drummerExe.css.set('id', 'drummer-layer4 .drummer-keyframe',{
  'background-color' : 'var(--yellow)'
});

drummerExe.css.set('id', 'drummer-layer5 .drummer-keyframe',{
  'background-color' : 'var(--white)'
});

drummerExe.css.set('id', 'drummer-layer6 .drummer-keyframe',{
  'background-color' : 'var(--magenta)'
});

drummerExe.css.set('id', 'drummer-layer7 .drummer-keyframe',{
  'background-color' : 'var(--blue)'
});

drummerExe.css.set('id', 'drummer-layer8 .drummer-keyframe',{
  'background-color' : 'var(--aqua)'
});

drummerExe.css.set('id', 'drummer-layer9 .drummer-keyframe',{
  'background-color' : 'var(--yellow)'
});

drummerExe.css.set('id', 'drummer-layer10 .drummer-keyframe',{
  'background-color' : 'var(--white)'
});

drummerExe.css.set('id', 'drummer-layer11 .drummer-keyframe',{
  'background-color' : 'var(--magenta)'
});



drummerExe.css.set('class', 'drummer-layer',{
  'height':'18px',
  'width':'100%',
  'display':'flex',
  'align-items': 'center',
  'position':'relative'
});


drummerExe.css.set('id', 'drummer-timeBar',{
  'height':'100%',
  'width':'5px',
  'display':'flex',
  'align-items': 'center',
  'position':'absolute',
  //'background-color' : 'var(--blue)',
  'margin-left':'-3px',
  'background-repeat': 'no-repeat',
  'z-index':'99'
});


drummerExe.css.set('id', 'drummer-trimBar',{
  'height':'100%',
  'width':'7px',
  'display':'flex',
  'align-items': 'center',
  'position':'absolute',
  'right':'5px',
  'background-repeat': 'no-repeat',
  'z-index':'99'
});


drummerExe.css.set('id', 'drummer-recordOverlay',{
  'height':'100%',
  'width':'100%',
  'position':'absolute',
  'background-color' : 'var(--magenta)',
  'left':'0',
  'top':'0',
  'display': 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'color': 'var(--black)',
  'font-size': '11px',
  'text-transform': 'uppercase',
  'letter-spacing': '1.6px',
  'z-index':'99999'
});















drummerExe.start = function (applicant) {
  if (applicant !== 'OS') {
    drummerExe.root = '';
  }


  //startAPP
  drummerExe.makeView();
  drummerExe.makeLogic();


}






/////////////////////////////////////////////////////////////////
///App View//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
drummerExe.makeView = function(){

  var a = drummerExe;
  a.transportBpm = 120;
  a.transportContainerSize = 100;
  a.transportTime = {value:0};





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


  a.dom.windowContainer = document.getElementById(drummerExe.uniqueAppID+'-canvas');





  //make header container
  a.dom.headerContainer = createElement('div','drummer-headerContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.headerContainer);


  a.dom.speaker1 = createElement('div','drummer-SpeakerDots semiDark-illegalBlue', 'speaker1', undefined);
  a.dom.headerContainer.appendChild(a.dom.speaker1);

  a.dom.title = createElement('div','drummer-Title', undefined, 'DR-1');
  a.dom.headerContainer.appendChild(a.dom.title);

  a.dom.speaker2 = createElement('div','drummer-SpeakerDots semiDark-illegalBlue', 'speaker2', undefined);
  a.dom.headerContainer.appendChild(a.dom.speaker2);

  //drummer-SpeakerDots



  a.octave = 3;


  a.keys = {
      'Q':1,
      'W':2,
      'E':3,
      'R':4,
      'T':5,
      'Y':6,
      'A':7,
      'S':8,
      'D':9,
      'F':10,
      'G':11,
      'H':12
  };


  //Settings key maps
  a.keyMaps = ['Q','W','E','R','T','Y',  'A','S', 'D','F','G','H'];


  //Settings key notes
  a.notes = {
        black:['F#','G#','Bb', 'C#','D#',  'F#','G#','Bb', 'C#','D#'],
      white:['F','G','A','B','C','D','E','F','G','A','B','C','D','E']
  };







  //make display
  a.dom.displayContainer = createElement('div','drummer-displayContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.displayContainer);

  //Make timeBar
  a.dom.timeBar = createElement('div',undefined, 'drummer-timeBar', undefined);
  a.dom.timeBar.style.backgroundImage = 'url("'+drummerExe.root+'img/timeBar.svg")';
  a.dom.displayContainer.appendChild(a.dom.timeBar);

  //Make trimBar
  a.dom.trimBar = createElement('div',undefined, 'drummer-trimBar', undefined);
  a.dom.trimBar.style.backgroundImage = 'url("'+drummerExe.root+'img/trimBar.svg")';
  a.dom.displayContainer.appendChild(a.dom.trimBar);

  //make transportContainer
  a.dom.transportContainer = createElement('div',undefined, 'drummer-transportContainer', undefined);
  a.dom.displayContainer.appendChild(a.dom.transportContainer);

  //Make 12 layers, one for each sound
  a.dom.layers = [];
  for (var i = 0; i < 12; i++) {
    a.makeLayer(i);
  }


  // a.dom.keyframes = [];
  // a.makeKeyframe(1, 20);
  // a.makeKeyframe(2, 10);
  // a.makeKeyframe(3, 40);
  // a.makeKeyframe(4, 20);
  // a.makeKeyframe(12, 70);



  a.recordedSounds=[];
  // a.recordedSounds[0] = new drummerExe.Keyframe(1,0.2);
  // a.recordedSounds[0] = new drummerExe.Keyframe(2,0.1);
  // a.recordedSounds[0] = new drummerExe.Keyframe(3,0.4);
  // a.recordedSounds[0] = new drummerExe.Keyframe(4,0.2);
  // a.recordedSounds[0] = new drummerExe.Keyframe(12,0.7);



  //make large dials container

  a.dialsSettings = {a:'yellow', b:'aqua'};


  //make white keys
  a.dom.whiteKeysContainer = createElement('div','drummer-whiteKeysContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.whiteKeysContainer);

  //Make Buttons
  a.dom.buttons = {};
  a.components.makeButtonSmall('record',a.dom.whiteKeysContainer, a.record);
  a.components.makeButtonSmall('play',a.dom.whiteKeysContainer, a.play);
  a.components.makeButtonSmall('stop',a.dom.whiteKeysContainer, a.stop);
  a.components.makeButtonSmall('clear',a.dom.whiteKeysContainer,a.clear);
  //Make Dials
  for (key in a.dialsSettings) {
    drummerExe.components.makeDial(a.dialsSettings[key], key, a.dom.whiteKeysContainer);
  }


  //make black keys
  a.dom.smallKeysContainer = createElement('div','drummer-smallKeysContainer', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.smallKeysContainer);

  for (var i = 0; i < 12; i++) {
    drummerExe.components.makesmallKey(a.keyMaps[i], a.dom.smallKeysContainer);
  }



}

//Make note keyframe layer
drummerExe.makeLayer = function(layerNumber){
  var i = drummerExe.dom.layers.length;
  drummerExe.dom.layers[i] = createElement('div','drummer-layer', 'drummer-layer'+layerNumber, undefined);
  drummerExe.dom.transportContainer.appendChild(drummerExe.dom.layers[i]);
}

// //Make note keyframe
// drummerExe.makeKeyframe = function(layer, position){
//   var i = drummerExe.dom.keyframes.length;
//   drummerExe.dom.keyframes[i] = createElement('div','drummer-keyframe', undefined, undefined);
//   drummerExe.dom.keyframes[i].style.marginLeft = position+'%';
//   drummerExe.dom.layers[layer-1].appendChild(drummerExe.dom.keyframes[i]);
//   //Schedule note
//   drummerExe.saveNote(layer,position/100);
// }

drummerExe.Keyframe = function(sound, timeCode){
  var self = this;
  this.timeCode = timeCode;
  this.sound = sound;
}
//We can only run this after the record is done and we know the final loopEnd
drummerExe.Keyframe.prototype.lockInPosition = function(){
  //use timeCode and loop lenght to get normalisation from 0 to 100
  //to later use as percentage
  var normailsedTimeCode = (this.timeCode/drummerExe.drummerTransport.loopEnd)*100;


  console.log("SELF SOUND IS "+this.sound);

  this.domElement = createElement('div','drummer-keyframe', undefined, undefined);
  drummerExe.dom.layers[this.sound-1].appendChild(this.domElement);
  this.domElement.style.marginLeft = normailsedTimeCode+'%';


  //Schedule note
  drummerExe.saveNote(this.sound,this.timeCode);
}



drummerExe.components = {};




drummerExe.components.makesmallKey = function(sound, container){
  //make small keys
  console.log("BLACK KEY");
  var keyContainer = createElement('div','drummer-smallKeyContainer', undefined, undefined);
  var key = createElement('div','drummer-smallKey dark-illegalBlue', 'drummer-smallKey_'+sound, undefined);
  keyContainer.appendChild(key);
  var keyLabel = createElement('div','drummer-smallKeyLabel', undefined, sound);
    key.appendChild(keyLabel);

  key.onmouseover = function(){
    drummerExe.changeKey(key, sound);
  };

  container.appendChild(keyContainer);
}

drummerExe.components.makeDial = function(color, id, container){
  //make dial
  console.log("LARGE DIAL");
  var dialContainer = createElement('div','drummer-smallButtonContainer', undefined, undefined);
  var dial = createElement('div','drummer-dial', 'drummer-dial_'+id, undefined);
  dial.style.background = 'var(--'+color+')';
  dialContainer.appendChild(dial);

  var handle = createElement('div','drummer-dialHandle', undefined, undefined);
  dial.appendChild(handle);
  //key.onclick = playNote();
  container.appendChild(dialContainer);
}



drummerExe.components.makeButtonSmall = function(icon, container, action){
  //make smallButton
  drummerExe.dom.buttons[icon] = createElement('div','drummer-smallButtonContainer', undefined, undefined);
  var button = createElement('div','drummer-smallButton', undefined, undefined);
  button.style.backgroundImage = 'url("'+drummerExe.root+'img/'+icon+'.svg")';
  button.onclick = action;
  drummerExe.dom.buttons[icon].appendChild(button);

  container.appendChild(drummerExe.dom.buttons[icon]);

}






/////////////////////////////////////////////////////////////////
///App Logic//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

drummerExe.makeLogic = function(){
  var a = drummerExe;
  a.addListeners();

  //a.remoteRoot = "https://nur.com/apps/Drummer/sound/";
  a.remoteRoot = "/apps/Drummer/sound/";

  a.drumKit = new Tone.Players ({
    'sound1':a.remoteRoot+ "snare_pillow" +".mp3",
    'sound2':a.remoteRoot+ "snare_bro" +".mp3",
    'sound3':a.remoteRoot+ "tom_driver" +".mp3",
    'sound4':a.remoteRoot+ "tom_fine" +".mp3",
    'sound5':a.remoteRoot+ "kick_forest" +".mp3",
    'sound6':a.remoteRoot+ "clap_ace" +".mp3",
    'sound7':a.remoteRoot+ "perc_galles" +".mp3",
    'sound8':a.remoteRoot+ "ride_rider" +".mp3",
    'sound9':a.remoteRoot+ "hat_gattik" +".mp3",
    'sound10':a.remoteRoot+ "hat_crab" +".mp3",
    'sound11':a.remoteRoot+ "fill_80_dna" +".mp3",
    'sound12':a.remoteRoot+ "fill_90_steady" +".mp3",
  },function(){
    console.log("Sounds are ready.");
    drummerExe.drumKit._players["sound1"].start();
    drummerExe.drumKit._players["sound2"].start(0.1);
    drummerExe.drumKit._players["sound3"].start(0.2);
    drummerExe.drumKit._players["sound4"].start(0.3);

  }).toMaster();


  //a.drumKit.volume.value = -20;







  a.drumLayers = new Tone.Part(function(time, value){
    //a.polySynth.triggerAttackRelease(note, "16n", time);
    //drummerExe.drumKit._players["sound"+value.sound].start();
    drummerExe.drumKit._players["sound"+value.sound].start("@8n");
  });

  // a.drumLayers.add({"time" : 0, "sound" : "1"});
  // a.drumLayers.add({"time" : 0.5, "sound" : "3"});


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

//Play loop shortcut
a.playLayer = function(index){
  a.drumLayers.stop();
  a.drumLayers.start();
}


///Manage loops at each start
a.manageLayers = function(){
  a.playLayer(i);
}



  //Main timeline
  a.drummerTransport = new Tone.Part(function(time, loops){
    a.manageLayers();
    a.animateTimeline();
  });

  //Main timeline settings
  a.drummerTransport.loop = true;
  //One bar
  a.drummerTransport.loopEnd = 1;
  //Schedule a callback at loop rollover
  a.drummerTransport.add({"time" : 0});

  //Setup and start audio context
  Tone.Transport.bpm.value = 150;
  Tone.Transport.start();


  a.animateTimeline = function(){
    //Animate Bar here
    TweenLite.set(a.transportTime, {value:0});
    //use transport loop end as lenght of animation
    TweenLite.to(a.transportTime, 99, {value:100,ease:Power0.easeNone, onUpdate:function(){
    a.dom.timeBar.style.left = a.drummerTransport.progress*100+"%";

    }});
  }



}



//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////




drummerExe.keyboard = function(pressed, sound, keyPress){


  var pressedKeyObject = document.getElementById('drummer-smallKey_'+keyPress);


  if (pressed) {
    ////Play sound
    drummerExe.drumKit._players["sound"+sound].start("@8n");
    drummerExe.toggleKeyDownStyle('add',pressedKeyObject);

    if (drummerExe.status === 'startingRecord') {
      Tone.Transport.start();
      drummerExe.recordStartingTimeOffset = drummerExe.getTransportSeconds();
      console.log();
      drummerExe.status = 'record';
    }

    if (drummerExe.status === 'record') {
      //If we are recording, save the notes/keyframes on the timeline

      var transportTime = drummerExe.getTransportSecondsOffsetted(drummerExe.recordStartingTimeOffset);

      var i = drummerExe.recordedSounds.length;
      drummerExe.recordedSounds[i] = new drummerExe.Keyframe(sound,transportTime);


    }
  }else {
  //Release sound if needed

    drummerExe.toggleKeyDownStyle('remove',pressedKeyObject);
  }

}


///DEFAULT FUNCTION ROUTED BY OS
drummerExe.keyCommands = function(e){

  var allowPress = true;
  //Prevent hold down repeat
  if (e.repeat !== undefined) {
    allowPress = !e.repeat;
  }
  //stop the press if is a repeating (holding down) action
  if (!allowPress) return;

  //set allow press false for the next cycle
  //allowPress = false;

  //console.log(e.key + ": " + e.keyCode);

  //Check if Key is going UP or going DOWN
  var keyState = true;
  if (e.type === 'keyup') {
    keyState = false;
  }

  //Check if the key pressed corresponds to a note
  if (drummerExe.keys[e.key.toUpperCase()] !== undefined) {
    //Play note
    drummerExe.playKeyboard(e.key.toUpperCase(), keyState);
  }

}


drummerExe.playKeyboard = function(key, pressed){
  drummerExe.keyboard(pressed, drummerExe.keys[key], key);
};



drummerExe.saveNote = function(sound, soundTime){
  drummerExe.drumLayers.add({"time" : soundTime, "sound" : sound});
}


/////

drummerExe.status = 'idle';



drummerExe.mouseStatus = {
  action:'idle',
  object:'none',
  id:'none'
};

drummerExe.dialStatus = {
  a:0,
  b:0,
  c:0,
  d:0
};


drummerExe.toggleKeyDownStyle = function(action,object){
  object.classList[action]("drummer-KeyPressed");
};



drummerExe.onMouseMove = function(e) {
  var a = drummerExe;

  if (a.mouseStatus.action === 'dial') {
    //DRAG DIAL

    //update mouse position
    a.getMousePosition(e);

    //update mouse delta
    a.getMouseDelta();

    //console.log(a.mouseDelta.y);

    //console.log(a.mouseStatus.id);
    var dragAmount = a.mouseDelta.y;
    var id = a.mouseStatus.id;
    var dialRotation = a.dialStatus[id] + dragAmount;
    //console.log(dialRotation);

    //Check which dial is being rotated and apply his own functionality
    if (id === 'a') {
      //Change Tempo
      var bpm = a.transportBpm+dragAmount;
      //Clamp minimum to 10 bpm
      bpm = Math.max(bpm, 10);
      Tone.Transport.bpm.value = bpm;
      console.log(bpm);
      a.transportBpm = bpm;

    } else if (id === 'b') {
      //Zoom Display

      var dragAmountPercentage = dragAmount/(a.drummerTransport.loopEnd*100);
      //console.log("DRAGGING "+dragAmountPercentage);

      var zoom = a.transportContainerSize+(dragAmountPercentage*100); //default is 100%

      var loopEndValue = (a.drummerTransport.loopEnd*100)-dragAmount; // default is 1
      a.dom.transportContainer.style.width = zoom+"%";

      a.drummerTransport.loopEnd = loopEndValue/100;
      //console.log(Tone.Transport.loopEnd);
      //Loop end position

      //Save zoom for next cycle
      a.transportContainerSize = zoom;
    }

    a.mouseStatus.object.style.transform = 'rotate('+ dialRotation +'deg)';


    //Save rotation of dial
    a.dialStatus[id] = dialRotation;

    //Save position for next cicle
    a.storeMousePosition(e);


  }


}


drummerExe.onMouseDown = function(e) {
  //onMouse Down
  console.log(e.target.classList[0]);
  var targetClass = e.target.classList[0];

  drummerExe.getMousePosition(e);
  drummerExe.storeMousePosition(e);

  if (targetClass === 'drummer-dial') {
    //DRAG DIAL CAN START
    drummerExe.setMouseStatus('dial', e.target, e.target.id);

  }else if (targetClass === 'drummer-whiteKey' || targetClass === 'drummer-smallKey') {
    //DRAG KEY CAN START

    drummerExe.setMouseStatus('key', e.target, e.target.id);
    //Set keyDown state
    console.log(drummerExe.mouseStatus.id);
    //drummerExe.toggleKeyDownStyle('add',drummerExe.mouseStatus.object);

    //Play note
    drummerExe.keyboard(true,drummerExe.keys[drummerExe.mouseStatus.id], drummerExe.mouseStatus.id);
  }
}





drummerExe.onMouseUp = function(e) {
  //on Mouse Up

  //RELEASE DRAGS

  //RELEASE NOTES
  if (drummerExe.mouseStatus.action === 'key') {
    //Release key note
    drummerExe.keyboard(false,drummerExe.keys[drummerExe.mouseStatus.id], drummerExe.mouseStatus.id);
  }

  //Reset Statuses
  if (drummerExe.mouseStatus.object !== 'none') {
    //drummerExe.toggleKeyDownStyle('remove',drummerExe.mouseStatus.object);
    //Reset mouse status
    drummerExe.setMouseStatus('idle', 'none', 'none');
  }
}

drummerExe.onMouseLeave = function(e) {
  //RELEASE NOTES
  if (drummerExe.mouseStatus.action === 'key') {
    //Release key note
    drummerExe.keyboard(false,drummerExe.keys[drummerExe.mouseStatus.id], drummerExe.mouseStatus.id);
  }
  //Reset Statuses
  if (drummerExe.mouseStatus.object !== 'none') {
    //drummerExe.toggleKeyDownStyle('remove',drummerExe.mouseStatus.object);
    //Reset mouse status
    drummerExe.setMouseStatus('idle', 'none', 'none');
  }
}

drummerExe.setMouseStatus = function(action, object, id){
  drummerExe.mouseStatus.action = action;
  drummerExe.mouseStatus.object = object;
  drummerExe.mouseStatus.id = id.split("_")[1];
}


drummerExe.storeMousePosition = function(e){
  drummerExe.mouseCoordinates.previous.x = e.clientX;
  drummerExe.mouseCoordinates.previous.y = e.clientY;
}

drummerExe.getMousePosition = function(e){
  drummerExe.mouseCoordinates.current.x = e.clientX;
  drummerExe.mouseCoordinates.current.y = e.clientY;
}

drummerExe.getMouseDelta = function(){
  drummerExe.mouseDelta.x = drummerExe.mouseCoordinates.previous.x - drummerExe.mouseCoordinates.current.x;
  drummerExe.mouseDelta.y = drummerExe.mouseCoordinates.previous.y - drummerExe.mouseCoordinates.current.y;
}







drummerExe.changeKey = function(keyObj, newNote){
  //CHANGE KEY IF HOVERING ANOTHER KEY WHILE PRESSING ANOTHER ONE


  if (drummerExe.mouseStatus.action === 'key' && drummerExe.mouseStatus.id !== newNote) {
      //Release key note

      drummerExe.keyboard(false,drummerExe.keys[drummerExe.mouseStatus.id], drummerExe.mouseStatus.id);
      //drummerExe.toggleKeyDownStyle('remove',drummerExe.mouseStatus.object);

      //Press new hovered key
      drummerExe.keyboard(true,drummerExe.keys[newNote], newNote);
      //drummerExe.toggleKeyDownStyle('add',keyObj);

      drummerExe.setMouseStatus('key', keyObj, keyObj.id);


  }


}

drummerExe.clear = function() {
  drummerExe.stop();
  //Clear Keyframes
  for (var i = 0; i < drummerExe.dom.layers.length; i++) {
    var l = drummerExe.dom.layers[i];
    while (l.firstChild) {
      l.removeChild(l.firstChild);
    }
  }
  //Clean array of souds objects
  drummerExe.recordedSounds = [];
  //Clear Sounds
  drummerExe.drumLayers.removeAll();  //////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!CLEAR TO BE DONE!!!!!!
  drummerExe.dom.transportContainer.style.width = "100%";
  //Save zoom for next cycle
  drummerExe.transportContainerSize = 100;

  drummerExe.drummerTransport.loopEnd = 1;
  drummerExe.status = 'idle';
}


drummerExe.stop = function() {
  if (drummerExe.status === 'record' || drummerExe.status === 'startingRecord') {
    drummerExe.record();
    return
  }
  drummerExe.drumLayers.stop();
  drummerExe.drummerTransport.stop();
  drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--white)';
  drummerExe.dom.buttons.record.firstChild.style.backgroundColor = 'var(--white)';
  drummerExe.status = 'idle';
}

drummerExe.hardStop = function() {
  if (drummerExe.status === 'record' || drummerExe.status === 'startingRecord') {
    drummerExe.stopRecord(false);
    return
  }
  drummerExe.drumLayers.stop();
  drummerExe.drummerTransport.stop();
  drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--white)';
  drummerExe.dom.buttons.record.firstChild.style.backgroundColor = 'var(--white)';
  drummerExe.status = 'idle';
}

drummerExe.play = function() {
  if (drummerExe.status === 'idle' || drummerExe.status === 'paused') {
    drummerExe.drumLayers.stop();
    drummerExe.drummerTransport.stop();
    drummerExe.drummerTransport.start();

    drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--magenta)';
    drummerExe.status = 'playing';

  }else if(drummerExe.status === 'playing'){
    drummerExe.drumLayers.stop();
    drummerExe.drummerTransport.stop(); //Was PAUSE, NOW NOT SUPPORTED
    drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--white)';

    drummerExe.status = 'paused';
  }
}


drummerExe.record = function() {
  console.log(drummerExe.status);
  if (drummerExe.status !== 'record' && drummerExe.status !== 'startingRecord') {

    drummerExe.dom.recordOverlay = createElement('div',undefined,'drummer-recordOverlay', 'Recording...');
    drummerExe.dom.displayContainer.appendChild(drummerExe.dom.recordOverlay);


    //Start Recording
    drummerExe.drumLayers.stop();
    drummerExe.drummerTransport.stop();
    drummerExe.drummerTransport.loop = false;


    drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--white)';
    drummerExe.dom.buttons.record.firstChild.style.backgroundColor = 'var(--yellow)';

    //Wait for first key
    //drummerExe.drummerTransport.start(); //should start only after first note played
    drummerExe.status = 'startingRecord';
  }else {
    console.log("STOP");
    //Stop record
    drummerExe.stopRecord(true);

  }

}


drummerExe.stopRecord = function(playAfterStop) {
  drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--magenta)';
  drummerExe.dom.buttons.record.firstChild.style.backgroundColor = 'var(--white)';

  //Save time we stopped recording
  //var transportTime = drummerExe.getTransportSeconds();
  var offsettedStoppedTime = drummerExe.getTransportSecondsOffsetted(drummerExe.recordStartingTimeOffset);

  //Update time only if recording was longer than previously
  if (offsettedStoppedTime > drummerExe.drummerTransport.loopEnd) {
    drummerExe.drummerTransport.loopEnd = offsettedStoppedTime;
  }

  //Remove Recording overlay
  drummerExe.dom.displayContainer.removeChild(drummerExe.dom.recordOverlay);
  drummerExe.drumLayers.stop();
  drummerExe.drummerTransport.stop();

  //Display saved Sounds
  for (var i = 0; i < drummerExe.recordedSounds.length; i++) {
    drummerExe.recordedSounds[i].lockInPosition();
  }

  //set loop length to be the last played note

  drummerExe.drummerTransport.loop = true;

  if (playAfterStop) {
    drummerExe.drumLayers.stop();
    drummerExe.drummerTransport.stop();
    drummerExe.drummerTransport.start();
    drummerExe.status = 'playing';
  }else {
    drummerExe.drumLayers.stop();
    drummerExe.drummerTransport.stop();
    drummerExe.dom.buttons.play.firstChild.style.backgroundColor = 'var(--white)';
    drummerExe.dom.buttons.record.firstChild.style.backgroundColor = 'var(--white)';
    drummerExe.status = 'idle';
  }

}


drummerExe.getTransportSeconds = function(){
  var timeStamp = Tone.Transport.position;
  var timeInSecond = Tone.Time(timeStamp).toSeconds();
  return timeInSecond
}

drummerExe.getTransportSecondsOffsetted = function(offset){
  console.log("OFFSET WAS "+offset);

  var timeOffset = offset;

  var timeStamp = Tone.Transport.position;
  var timeInSecond = Tone.Time(timeStamp).toSeconds();

  var offsettedTime = timeInSecond-timeOffset;

  console.log(offsettedTime);
  //console.log("THIS NORMALIZED TIME IS "+timeInSecond-timeOffset);
  return offsettedTime;
}


drummerExe.addListeners = function() {
  drummerExe.dom.windowContainer.addEventListener( 'mousemove', drummerExe.onMouseMove, false );
  drummerExe.dom.windowContainer.addEventListener( 'mousedown', drummerExe.onMouseDown, false );
  drummerExe.dom.windowContainer.addEventListener( 'mouseup', drummerExe.onMouseUp, false );
  drummerExe.dom.windowContainer.addEventListener( 'mouseleave', drummerExe.onMouseLeave, false );
  //ADD MOUSE LEAVE
};
