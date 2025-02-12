var whoruExe = {}
whoruExe.uniqueAppID = 'whoru';


if (typeof installedApps !== 'undefined') {


  installedApps[whoruExe.uniqueAppID].OsMenu = {
    [installedApps[whoruExe.uniqueAppID].name] : [['Quit','quitApp']],
    'View': [['Minimize','minimizeApp'], ['Zoom','zoomApp'], '-', ['Enter Full Screen','enterFullScreen']]

  }

}





//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////
whoruExe.menuActions = {};

whoruExe.menuActions.quitApp = appMenuExe.menuActions.quitApp;

whoruExe.menuActions.restartGame = function(){

  whoruExe.restart()

}

whoruExe.menuActions.shareFB = appMenuExe.menuActions.shareFB;

whoruExe.menuActions.shareTwitter = appMenuExe.menuActions.shareTwitter;


whoruExe.menuActions.minimizeApp = appMenuExe.menuActions.minimizeApp;

whoruExe.menuActions.zoomApp = appMenuExe.menuActions.zoomApp;

whoruExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;

whoruExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;

whoruExe.menuActions.closingApp = function(){
  console.log("Closing App");
}

//////////////////////////////
//////////////////////////////





whoruExe.css = new CssComponent(whoruExe.uniqueAppID);



whoruExe.css.set('id', whoruExe.uniqueAppID+'-canvas',{
  'background-color' : 'yellow',
  'color':'white',
  'font-size':'15px'
});

whoruExe.css.set('class', 'whoruQuestionContainer',{
  'background-color' : 'var(--black)',
  'width':'100%',
  'height':'100%',
  'display': 'flex',
  'flex-direction': 'column',
  'align-items': 'center'
});

whoruExe.css.set('class', 'whoruQuestionImage',{
  'background-color' : 'var(--magenta)',
  'width':'100%',
  // 'height':'250px',
  // 'margin':'40px',
  'margin-bottom':'0px'
});


whoruExe.css.set('class', 'whoruQuestionText',{
  'text-align':'center',
  'margin':'40px'
});

whoruExe.css.set('class', 'whoruAnswerText',{
  'text-align':'left',
  'float':'left'
});

whoruExe.css.set('class', 'whoruMultiChoice',{
  'margin':'0px 20px 0px 20px',
  'position':'relative'
});

whoruExe.css.set('class', 'whoruAnswerInput',{
  'background-color' : 'black',
  'text-align':'left',
  'position':'absolute',
  'width':'0',
  'height':'0',
  'opacity':'0'
});

// whoruExe.css.set('id', 'whoruCaret',{
//   'background-color' : 'white',
//   'width':'10px',
//   'height':'20px',
//   'float':'left'
// });



whoruExe.css.set('keyframe', 'keyframes whoruBlink',
  '{50%{opacity:0.0}}'
);

whoruExe.css.set('keyframe', '-webkit-keyframes whoruBlink',
  '{50%{opacity:0.0}}'
);

whoruExe.css.set('class', 'whoruCaret',{
  'animation':'whoruBlink 1s step-start 0s infinite',
  '-webkit-animation':'whoruBlink 1s step-start 0s infinite',
  'background-color' : 'white',
  'width':'10px',
  'height':'20px',
  'float':'left'
});


whoruExe.css.set('class', 'whoruStartButton',{
  'animation':'whoruBlink 2s step-start 0s infinite',
  '-webkit-animation':'whoruBlink 2s step-start 0s infinite',
  'bottom': '60px',
  'position': 'absolute',
  'background': 'var(--black)',
  'padding': '10px'
});


whoruExe.css.set('class', 'whoruEndButton',{
  'animation':'whoruBlink 2s step-start 0s infinite',
  '-webkit-animation':'whoruBlink 2s step-start 0s infinite',
  'position': 'absolute',
  'font-size': '296px',
  'letter-spacing': '20px',
  'line-height': '230px',
  'margin-top': '4%',
  'color': 'var(--blue)'
});


whoruExe.css.set('class', 'whoruFootnote',{
  'bottom': '20px',
  'position': 'absolute',
  //'background': 'var(--black)',
  'padding': '10px',
  'font-size':'12px'
});




whoruExe.css.set('class', 'whoruBackground',{
  'background-color' : 'var(--black)',
  'width':'100%',
  'height':'100%',
  'display': 'flex',
  'align-items': 'center',
  'justify-content':'center'
});



whoruExe.css.set('class', 'whoruSelectionSymbol',{
  'position': 'absolute',
  'left': '-20px',
  'top': '0'
});







whoruExe.root = 'apps/WhoRU/';


whoruExe.start = function (applicant) {
  if (applicant !== 'OS') {
    whoruExe.root = '';
  }


  //startAPP
  whoruExe.makeView();
  whoruExe.makeLogic();
  whoruExe.focusInput();
  whoruExe.loadImages();

}






/////////////////////////////////////////////////////////////////
///App View//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
whoruExe.makeView = function(){

  var a = whoruExe;

  a.currentQuestion = -1;

  a.db = [
    {
      question:'What is your name?',
      type:'open',
      choices:undefined,
      image:'1.name'
    },
    {
      question:'Where do we begin?',
      type:'close',
      choices:["A","B","C"],
      image:'2.doors'
    },
    {
      question:'Do you follow instructions? Answer No',
      type:'close',
      choices:["NO","YES"],
      image:'3.instruction-A'
    },
    {
      question:'Seriously, do you follow instructions? Answer Yes',
      type:'close',
      choices:["YES","NO"],
      image:'3.instruction-B'
    },
    {
      question:'It was a lie, you follow instructions.',
      type:'close',
      choices:["YES"],
      image:'3.instruction-C'
    },
    {
      question:'Who is that person in the mirror?',
      type:'open',
      choices:undefined,
      image:'4.who'
    },
    {
      question:'Why are they staring at us?',
      type:'open',
      choices:undefined,
      image:'5.staring'
    },
    {
      question:'Has the nightmare just begun?',
      type:'open',
      choices:undefined,
      image:'6.nightmare'
    },
    {
      question:'Choose not to listen what they are saying behind your back',
      type:'open',
      choices:undefined,
      image:'7.backTalk'
    },
    {
      question:'Where will they find you?',
      type:'close',
      choices:["B","A"],
      image:'8.where'
    },
    {
      question:'Who left the door open?',
      type:'close',
      choices:["A","B"],
      image:'9.doorOpen'
    },
    {
      question:'You are not following instructions.',
      type:'open',
      choices:undefined,
      image:'10.noInstruction'
    },
    {
      question:'Which pretends to be you?',
      type:'close',
      choices:["A","B"],
      image:'11.pretendsToBe'
    },
    {
      question:'Which wants to hurt you?',
      type:'close',
      choices:["A","B"],
      image:'12.hurt'
    },
    {
      question:'Which knows your secret?',
      type:'close',
      choices:["A","B"],
      image:'13.secret'
    },
    {
      question:'Am I you?',
      type:'close',
      choices:["...","..."],
      image:'14.you'
    }
  ];
  a.answers = [];



  a.dom = {};

  a.dom.windowContainer = document.getElementById(whoruExe.uniqueAppID+'-canvas');



  //Make Intro
  a.drawIntro();


}




/////////////////////////////////////////////////////////////////
///App Logic//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

whoruExe.makeLogic = function(){
  var a = whoruExe;
  a.addListeners();

}


whoruExe.getPlayerName = function (){
  return whoruExe.answers[0];
}



whoruExe.loadImages = function (){
  //LOAD IMAGES
  images = [
    "3.instruction-B.gif",
    "3.instruction-C.gif",
    "3.instruction-C.gif",
    "4.who.gif",
    "5.staring.gif",
    "6.nightmare.gif",
    "7.backTalk.gif",
    "8.where.gif",
    "9.doorOpen.gif",
    "10.noInstruction.gif",
    "11.pretendsToBe.gif",
    "12.hurt.gif",
    "13.secret.gif",
    "14.you.gif"
  ];
  var loadImages = new ImageLoader();
  loadImages.require(images, whoruExe.root+"img/",
      function() {
          // Callback
          console.log("IMAGES LOADED");

      });
}






/////////////////////////////////////////////////////////////////
/////App Screens///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


whoruExe.drawIntro = function (){
  var a = whoruExe;

  a.dom.introBackground = createElement('div','whoruBackground', undefined, undefined);
  a.dom.introVideo = createVideo({width:'100%'},a.root+'img/0.intro.mp4');
  a.dom.introBackground.appendChild(a.dom.introVideo);
  a.dom.windowContainer.appendChild(a.dom.introBackground);

  a.dom.introBackground.onclick = a.drawQuestion;

  a.dom.startButton = createElement('div','whoruStartButton', undefined, 'Press Enter or Click to start');
  a.dom.introBackground.appendChild(a.dom.startButton);

  a.dom.copyrights = createElement('div','whoruFootnote', undefined, '(c) 2018 eOS Corporation');
  a.dom.introBackground.appendChild(a.dom.copyrights);

}


whoruExe.drawResult = function (){
  var a = whoruExe;

  if (a.dom.windowContainer.childNodes.length > 0) {
      a.dom.windowContainer.removeChild(a.dom.windowContainer.childNodes[0]);
  }

  a.dom.introBackground = createElement('div','whoruBackground', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.introBackground);


  a.dom.startButton = createElement('div','whoruEndButton', undefined, 'GAME OVER');
  a.dom.introBackground.appendChild(a.dom.startButton);

}

whoruExe.drawQuestion = function(){
  var a = whoruExe;
  //whoruExe.dom.windowContainer.childList


  //Save answer before clearing
  if (a.currentQuestion > -1) {
    if (a.render.type === 'OpenAnswerField') {
      a.answers.push(a.render.currentAnswer);
    }else {
      a.answers.push(a.render.currentSelection);
    }
  }

  //Clear current question
  if (a.dom.windowContainer.childNodes.length > 0) {

      a.dom.windowContainer.removeChild(a.dom.windowContainer.childNodes[0]);
  }
  //Update current question number
  a.currentQuestion++;
  var i = a.currentQuestion;
  //Render new question
  a.render = new a.components.Question(i, a.db[i].question, a.db[i].image, a.db[i].type, a.db[i].choices);
  a.focusInput();
}



whoruExe.focusInput = function(){
  var a = whoruExe;

  var input = document.getElementById('whoruAnswerInput');
  if (input) {
    input.focus();
    //console.log(input);

  }

}



whoruExe.restart = function(){
  var a = whoruExe;
  //whoruExe.dom.windowContainer.childList
  if (a.dom.windowContainer.childNodes.length > 0) {
      a.dom.windowContainer.removeChild(a.dom.windowContainer.childNodes[0]);
  }
  a.currentQuestion = -1;
  a.drawIntro();
}



whoruExe.keyCommands = function(e){
  //console.log(e.keyCode);

  if (e.type === 'keydown') {



    //
    if (e.keyCode === 39) {
      //Move choice up
      //console.log("MOVE CHOICE UP");
      //console.log(whoruExe.render.answer);
      if (whoruExe.render.answer.toggleChoice !== undefined) {
        whoruExe.render.answer.toggleChoice('up');
      }
    }else if (e.keyCode === 37) {
      //Move choice down
      //console.log("MOVE CHOICE DOWN");
      if (whoruExe.render.answer.toggleChoice !== undefined) {
        whoruExe.render.answer.toggleChoice('down');
      }


    }else if (e.keyCode === 13) {
      console.log("NEXT");
      //console.log(whoruExe.currentQuestion, whoruExe.db.length);
      //Check if final question
      if (whoruExe.currentQuestion === whoruExe.db.length-1) {
        console.log("LAST QUESTION");
        whoruExe.drawResult();
        //Otherwise draw next question
      }else {
        whoruExe.drawQuestion();
      }

    }

  }


}




/////

whoruExe.addListeners = function() {
  whoruExe.dom.windowContainer.addEventListener('click', whoruExe.focusInput);
};








/////////////////////////////////////////////////////////////////
/////App Components///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


whoruExe.components = {};

whoruExe.components.QuestionField = function(parent, question){
  //make question field
  var questionText = createElement('div','whoruQuestionText', undefined, question);
  parent.appendChild(questionText);
}


whoruExe.components.QuestionImage = function(parent, image){
  //make question image
  var questionImage = createElement('div','whoruQuestionImage', 'questionImage', undefined);
  //components.image('fullWidth', image, 'img/blank.png', questionImage);
  components.image('fullWidth', image, whoruExe.root+'img/'+image+'.gif', questionImage);
  parent.appendChild(questionImage);


}

whoruExe.components.OpenAnswerField = function(obj, parent, answersArray){
  //make open answer field
  var answerLine = createElement('div','whoruAnswerLine', undefined, undefined);
  parent.appendChild(answerLine);


  //Make text input
  var answerInput = createElement('input','whoruAnswerInput', 'whoruAnswerInput', undefined);
  answerInput.setAttribute('autocomplete', 'off');
  answerInput.setAttribute('type', 'text');
  answerInput.setAttribute('value', "");
  answerLine.appendChild(answerInput);


  //Make selection symbol
  var selectionSymbol = new whoruExe.components.selectionSymbol(answerLine);


  //Make text output
  var answerOutput = createElement('span','whoruAnswerText', undefined, answerInput.value);
  answerLine.appendChild(answerOutput);

  //Make caret
  var caret = new whoruExe.components.caret(answerLine);


  answerInput.oninput = function(){
    answerOutput.innerHTML = answerInput.value;
    obj.currentAnswer = answerInput.value;
  }

}





whoruExe.components.CloseAnswerField = function(obj, parent, answersArray){
  //make open answer field
  var answerLine = createElement('div','whoruAnswerLine', undefined, undefined);
  parent.appendChild(answerLine);

  var self = this;



  //Make selection symbol
  this.selectionSymbol = whoruExe.components.selectionSymbol();
  var choices = [];
  //Make text output
  for (var i = 0; i < answersArray.length; i++) {

    choices[i] = createElement('div','whoruAnswerText whoruMultiChoice', 'Option'+i, answersArray[i]);
    if (i === 0) {
      choices[i].appendChild(self.selectionSymbol);
    }

    answerLine.appendChild(choices[i]);
    choices[i].onclick = selectChoice(i, self.selectionSymbol);

  }

  this.toggleChoice = function(input){
    var direction = 1;
    if (input === 'down') {
      direction = -1;
    }
    var newSelection = obj.currentSelection+direction;


    if (newSelection > choices.length-1) {
      newSelection -= choices.length;
    } else if (newSelection < 0) {
      newSelection = choices.length+newSelection;
    }



    choices[newSelection].appendChild(self.selectionSymbol);
    obj.currentSelection = newSelection;


  }


  function selectChoice(i, ss){
    return function(){
      //console.log("SELECTING CHOICE "+i);
      choices[i].appendChild(ss);
      obj.currentSelection = i;
    }
  }



  // //Make selection symbol
  // var selectionSymbol = new whoruExe.components.selectionSymbol(choices[0]);

}



whoruExe.components.caret = function(parent){
  var caret = createElement('div','whoruCaret', undefined, undefined);
  parent.appendChild(caret);
}


whoruExe.components.selectionSymbol = function(){

  var selectionSymbol = createElement('div','whoruSelectionSymbol', undefined, '>');
  //parent.appendChild(selectionSymbol);

  return selectionSymbol;
}






whoruExe.components.Question = function(i, question, image, answerType, answerArray){
  //make question screen
  var self = this;
  var a = whoruExe;
  var type = 'OpenAnswerField';
  if (answerType !== 'open') {
    type = 'CloseAnswerField';
  }
  this.type = type;
  this.currentSelection = 0;
  this.currentAnswer = '';



  var questionContainer = createElement('div','whoruQuestionContainer', 'whoruQuestion-'+i, undefined);

  this.questionImage = new a.components.QuestionImage(questionContainer, image);
  this.question = new a.components.QuestionField(questionContainer, question);
  this.answer = new a.components[type](self, questionContainer, answerArray);

  //return questionContainer;
  a.dom.windowContainer.appendChild(questionContainer);
}


///// MENU actions

// whoruExe.menuActions = {};
//
// whoruExe.menuActions.EasterEgg = function(){
//   console.log('LOGGING '+whoruExe.ratio);
// }
//
// whoruExe.menuActions.Redo = function(){
//   whoruExe.downloadImage();
// }
