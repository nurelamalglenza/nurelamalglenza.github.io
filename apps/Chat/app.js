var chatExe = {};
chatExe.uniqueAppID = 'chat';

chatExe.css = new CssComponent(chatExe.uniqueAppID);

chatExe.root = 'apps/Chat/';


chatExe.settings = {
  messageSize:50,
  messagePadding:15,
  messageMargin:20
}

chatExe.css.set('id', 'chat-canvas',{
  'background-color' : 'var(--black)',
  'color':'var(--white)',
  'position':'absolute',
  'right':'100px',
  'bottom':'-50px',
  'width':'250px',
  'height':'350px'
});


chatExe.css.set('id', 'chat-messagesContainer',{
  'background-color' : 'var(--black)',
  'color':'white',
  'right':'100px',
  'bottom':'0',
  'width':'100%',
  'height':'225px',
  'overflow-y': 'scroll',
  'padding-top': '20px',
  'box-sizing': 'border-box'
});



chatExe.css.set('class', 'chat-messageInput',{
  'background': 'none',
  'border': 'none',
  'color': 'var(--white)',
  'font-size': '12px',
  'padding': '10px',
  'font-family': "'NurOS', monospace",
  'width': '100%',
  'box-sizing': 'border-box'
});


chatExe.css.set('class', 'chat-messageInput::placeholder',{
  // 'background-color' : 'var(--white)',
  // 'color': 'var(--magenta)',


});


chatExe.css.set('class', 'chat-messageCard',{
  //'background': 'red',
  'color': 'var(--white)',
  'font-size': '11px',
  'float':'left',
  //add margins
  'margin-top': '10px',
    'margin-bottom': '10px',
    'width':'100%'
});



chatExe.css.set('class', 'chat-messageProfilePic',{
  'background': 'url('+chatExe.root+'img/CatProfilePic.svg)',
  'height': '22px',
  'width': '22px',
  'float':'left',
  'margin': '0 7px',
  'border-radius': '22px'
});


chatExe.css.set('class', 'chat-messageText',{
  'padding': chatExe.settings.messagePadding+'px',
  'float':'left',
      'max-width': '130px',
      'background': 'var(--white)',
      'box-sizing': 'border-box',
      'color':'var(--black)',
      'min-height': chatExe.settings.messageSize+'px',
      'line-height':'15px'

});


chatExe.css.set('id', 'chat-remoteMessageStyle',{
  'float':'left',
});


chatExe.css.set('id', 'chat-localMessageStyle',{
  'float':'right',
});

chatExe.css.set('id', 'chat-localMessageStyle .chat-messageProfilePic',{
  'float':'right',
});

chatExe.css.set('id', 'chat-localMessageStyle .chat-messageText',{
  'float':'right',
  'background':'var(--sunset3)',
  'color':'var(--black)'
});





chatExe.css.set('class', 'chat-typingFeedbackContainer',{
  'float':'left',
  //add margins
  'margin-top': '10px',
  'margin-bottom': '10px',
});


chatExe.css.set('class', 'chat-typingFeedback',{
  'background': 'var(--white)',
  'color': 'var(--black)',
  'font-size': '11px',
  'float':'left',
  //add margins
  'width':'25px',
  'padding': '12px'
});



chatExe.css.set('class', 'chat-userName',{
  'background': 'var(--sunset5)',
  'color': 'var(--white)',
  'font-size': '10px',
  'letter-spacing':'3.6px',
  'text-transform':'uppercase',
  'float':'right',
  //add margins
  'margin-top': '10px',
  'position':'absolute',
  'padding':'14px',
  'right':'0',

});






chatExe.start = function (applicant) {
  if (applicant !== 'OS') {
    chatExe.root = '';
  }





  //startAPP
  chatExe.makeView();
  chatExe.addListeners();
  chatExe.focusInput();

  setTimeout(function(){
    chatExe.computerTakesInitiative();
  }, 10000);



    //Pops the chat in front of everything
    //zBoost(chatExe.dom.container);


    chatExe.open = true;
    chatExe.status = 'idle';
    //speed expressed in words per milliseconds
    chatExe.readingSpeed = 300;
    chatExe.reaction = 1300;

    chatExe.db = {
      swear:['fuck','shit','suck','moron','bastard', 'fucking', 'wtf'],
      requestAnswer:["What", "Do", "Who", "Tell me", "Which", "Are you", "Why","Listen"],
      requestLocation:["Where", "location", "address"],
      requestAction:['Can','Could'],
      question:['\\?'],
      agrees:['ok', 'agreed','yes','true','good'],
      disagrees:["no", "don't","false"],
      hasFun:['haha','lol','lmao','ahah','aaha', 'haah'],
      personal:['you'],
      greets:['hi','hello','hey','aloha','ciao']
    }


}


chatExe.makeView = function(){

  var desktop = document.getElementById('windows');

  chatExe.dom = {};
  chatExe.dom.container = createElement('div', undefined, 'chat-canvas', undefined);
  desktop.appendChild(chatExe.dom.container);

  //Make App header
  chatExe.dom.chatHeader = createElement('div','appHeader gradientBackground-Pattern', undefined, undefined);
  chatExe.dom.container.appendChild(chatExe.dom.chatHeader);

  chatExe.dom.userName = createElement('div','chat-userName', undefined, "Nūr's pretentious Fennec");
  chatExe.dom.chatHeader.appendChild(chatExe.dom.userName);



  chatExe.dom.container.style.bottom = '-400px';

  chatExe.dom.appControls = createElement('ul','app-controls', "cntrls-chat");
      //Add window control buttons
      //chatExe.dom.appControls.insertAdjacentHTML( 'beforeend', components.controlButtons );
      chatExe.dom.cntrls = {
        close:createElement('li','close', "red"),
        minimise:createElement('li','minimise', "yellow")
      }
  chatExe.dom.appControls.appendChild(chatExe.dom.cntrls.close);
  chatExe.dom.appControls.appendChild(chatExe.dom.cntrls.minimise);

  chatExe.dom.cntrls.minimise.onclick = chatExe.minimise;
  chatExe.dom.cntrls.close.onclick = chatExe.minimise;

  chatExe.dom.chatHeader.appendChild(chatExe.dom.appControls);

  //Make messagesContainer
  chatExe.dom.messagesContainer = createElement('div', undefined, 'chat-messagesContainer', undefined);
  chatExe.dom.container.appendChild(chatExe.dom.messagesContainer);


  //Input top
  chatExe.dom.inputMessage = createElement('input','chat-messageInput', undefined, undefined);
  chatExe.dom.inputMessage.setAttribute('autocomplete', 'off');
  chatExe.dom.inputMessage.setAttribute('type', 'text');
  chatExe.dom.inputMessage.setAttribute('value', "");
  chatExe.dom.inputMessage.setAttribute('placeholder', "Type a message");
  chatExe.dom.inputMessage.onkeydown = chatExe.submitMessage;

  chatExe.dom.container.appendChild(chatExe.dom.inputMessage);

  chatExe.audio = new Audio('apps/Chat/sounds/msn.m4a');



}


chatExe.typingFeedback = function(){
  chatExe.dom.typingFeedback = createElement('div', 'chat-typingFeedbackContainer', undefined, undefined);
  var messageProfilePic = createElement('div', 'chat-messageProfilePic', 'chat-remoteProfilePicStyle', undefined);
  var typingFeedbackPlaceholder = createElement('div', 'chat-typingFeedback', undefined, '...');

  chatExe.dom.messagesContainer.appendChild(chatExe.dom.typingFeedback);
  chatExe.dom.typingFeedback.appendChild(messageProfilePic);
  chatExe.dom.typingFeedback.appendChild(typingFeedbackPlaceholder);
  chatExe.dom.messagesContainer.scrollTop = chatExe.dom.messagesContainer.scrollHeight;
}



chatExe.computerTakesInitiative = function(reason){
  //message algorithm
  greetingIntroMessages = [
    "Well well well... look who decided to show up...",
    "(Alright, now I must go in and greet this human) ...ohh hiii!! how are you??",
    "Seriously?? Where have you been man",
    "Hey human.. i'm hungry gimme food.",
    "Ohh.. finally someone shows up, i've been in this box for ages!"
  ];
  firstMessage = chatExe.getRandomReply(greetingIntroMessages);

  chatExe.addMessage(firstMessage,'remote');
  TweenLite.to(chatExe.dom.container, 0.5, { ease: Elastic.easeOut.config(1, 0.75), bottom: -50 });

}



chatExe.computerRepliesTo = function(message){
  //reply algorithm
  chatExe.typingFeedback();
  var typingTime = 2000;

  var reply = chatExe.elaborateReply(message);

  setTimeout(function(){
    chatExe.dom.messagesContainer.removeChild(chatExe.dom.typingFeedback);
    chatExe.addMessage(reply, 'remote');
  },typingTime);



}

chatExe.getRandomReply = function(repliesArray){
  var randomReply = Math.round(Math.random()*(repliesArray.length-1));
  console.log(randomReply);
  return repliesArray[randomReply];
}


chatExe.elaborateReply = function(message){

  checkIntention(message);
  var intentions;
  function checkIntention(message) {
    //////WRITING INTENTIONSSSSSS!!!!!!!!!!
    intentions = {
      swear:false,
      requestAnswer:false,
      requestLocation:false,
      requestAction:false,
      question:false,
      agrees:false,
      hasFun:false,
      personal:false,
      greets:false
    }
    var string = message;
    for (key in chatExe.db) {
      chatExe.db[key]
      for (var i = 0; i < chatExe.db[key].length; i++) {
        var word = chatExe.db[key][i];
        var result = string.search(new RegExp(word, "i"));
        if (result !== -1) {
          console.log(word+ " so "+ key +" is true");
          intentions[key] = true;
          //////////
          //WRITING WHAT TO DO WHEN SEARCHING INTO ARRAY
        }
      }
    }
    console.log(intentions);
  }





  var reply = 'no reply';
  if(intentions.requestAnswer){
    replies = [
      "You ask me? I'm a fennec",
      "What the cat should I know??",
      "Everyone knows cmon..."
    ];
    reply = chatExe.getRandomReply(replies);

    if (intentions.swear) {
      reply = message + "That's rude brah :(";
    }
    if (intentions.personal) {
      replies = [
        "I am what I am...you?",
        "Nūr told me I don't exist.. is it true?",
        "Mmmmmh..I think I'm just a regular cat, are you human?",
        "I'm simultaneously in the box and outside the box, you know why?",
        "I don't know, but I hate Schrodinger, that guy is crazy"
      ];
      reply = chatExe.getRandomReply(replies);
    }

  }else if(intentions.requestAction) {
    replies = [
      "Sure, one sec",
      "Of course, just for you man",
      "Consider it done."
    ];
    reply = chatExe.getRandomReply(replies);

    if (intentions.swear) {
      replies = [
        "I would do that if you ask nicely human...",
        "I don't do s**t",
        "Mmmmmh..maybe not lol"
      ];
      reply = chatExe.getRandomReply(replies);
    }
  }else if (intentions.hasFun) {
    replies = [
      "LOL",
      "looooool",
      "hAHA!",
      ":)"
    ];
    reply = chatExe.getRandomReply(replies);
    if (intentions.swear) {
      replies = [
        "HAHA!!...no.",
        "Lol, you maybe?",
        "man you are rude, I like you haha"
      ];
      reply = chatExe.getRandomReply(replies);
    }
    if (intentions.agrees) {
      replies = [
        "ok lol",
        "good haha",
        "LOL ok",
        "ehm.. ok :)"
      ];
      reply = chatExe.getRandomReply(replies);
    }
    if (intentions.disagrees) {
      replies = [
        "why not lol",
        "not good haha",
        "LOL oyou should haha",
        "ehm.. no? :)"
      ];
      reply = chatExe.getRandomReply(replies);
    }
  }else if (intentions.agrees) {
    replies = [
      "roger that :)",
      "nice!",
      "good.",
      message+"!!",
      message+" :)",
      "cheers"
    ];
    reply = chatExe.getRandomReply(replies);
  }else if (intentions.disagrees) {
    replies = [
      "why not?",
      "well you should",
      message+"????",
      "google it."
    ];
    reply = chatExe.getRandomReply(replies);
  }else if (intentions.greets) {
    replies = [
      'good to see ya.. did you do that "thing"',
      "hey :) so.. how did you go???",
      "where have you been?"
    ];
    reply = chatExe.getRandomReply(replies);

  }else if (intentions.swear) {
    replies = [
      "I would do that if you ask nicely human...",
      "I don't do s**t",
      "Mmmmmh..maybe not lol",
      'Oh yes, inhaaaaale...exhaaaaale...'
    ];
    reply = chatExe.getRandomReply(replies);

    if (intentions.personal) {
      replies = [
        "Why would you say that to me?",
        "Wowowo! Calm down human!",
        'no '+message,
        message+"???? Really??",
        'Say that to Mr Schrodinger',
        'You are a piece of sugary cupcake then! Mh!',


      ];
      reply = chatExe.getRandomReply(replies);
    }

  }else {
    replies = [
      "ya ya.. listen did you manage to get that file?",
      "ah.. almost forgot, I have been to that place u told me!",
      "sdjfrjfekrjhfjk, sorry power nap",
      "grooooooom!!!!!!!!"
    ];
    reply = chatExe.getRandomReply(replies);
  }
  console.log(reply);
  return reply;
}


chatExe.countWords = function(str){
  return str.trim().split(/\s+/).length;
}


chatExe.submitMessage = function(e){

if(e.key === 'Enter') {
        //alert(chatExe.dom.inputMessage.value);
        console.log("SUBMIT!");
        chatExe.addMessage(chatExe.dom.inputMessage.value,'local');
        var message = chatExe.dom.inputMessage.value;
        console.log(message);


        chatExe.dom.inputMessage.value = '';
        var reaction
        var readingTime = chatExe.readingSpeed * chatExe.countWords(message)+ chatExe.reaction;
        //scroll to end of div
        setTimeout(function(){
          chatExe.computerRepliesTo(message);
        },readingTime);
    }
};


chatExe.addListeners = function(){
  chatExe.dom.container.addEventListener('click', chatExe.focusInput);
}



chatExe.focusInput = function(){
  zBoost(chatExe.dom.container);
}


chatExe.minimise = function(){
  console.log("minimise");
  var destination = -290;
  if (!chatExe.open) {
    destination = -50;
  }

  TweenLite.to(chatExe.dom.container, 0.5, { ease: Elastic.easeOut.config(1, 0.75), bottom: destination });
  chatExe.open = !chatExe.open;
}




chatExe.addMessage = function(message, sender){
  ////
  var messageCard = createElement('div', 'chat-messageCard', 'chat-'+sender+'MessageStyle', undefined);


  if (sender === 'remote') {
    var messageProfilePic = createElement('div', 'chat-messageProfilePic', 'chat-'+sender+'ProfilePicStyle', undefined);
    messageCard.appendChild(messageProfilePic);
    //Play sound when receiving message
    //chatExe.audio.play();
  }

  // var messageProfilePic = createElement('div', 'chat-messageProfilePic', 'chat-'+sender+'ProfilePicStyle', undefined);
  // messageCard.appendChild(messageProfilePic);


  var messageMessage = createElement('div', 'chat-messageText', undefined, message);
  messageCard.appendChild(messageMessage);


  chatExe.dom.messagesContainer.appendChild(messageCard);

  chatExe.dom.messagesContainer.scrollTop = chatExe.dom.messagesContainer.scrollHeight;

  TweenLite.from(messageCard, 0.5, { ease: Elastic.easeOut.config(1, 0.75), marginTop: 250 });


}
