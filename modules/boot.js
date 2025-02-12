var startUpSound = new Audio('sound/startup.mp3');


var needsLoading = true;

var device = {
  input:'mouse',
  size:{},
  supported:true
}

function getDeviceSize(){
  device.size.height = window.screen.height;
  device.size.width = window.screen.width;

  console.log("DEVICE SIZE IS "+device.size.width+" AND "+device.size.height);
}

getDeviceSize();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
 device.input = 'touch';

 if (device.size.width < 900 && device.size.height < 900) {
   //Unsupported
   device.supported = false;
   needsLoading = false;
 }

}
console.log("DEVICE SUPPORT IS "+device.supported);

console.log("INPUT IS "+device.input);



//Animate Tasks
var tasks = {};
tasks.action = [
  'Loading',
  'Generating',
  'Deleting',
  'Cutting',
  'Connecting',
  'Pushing',
  'Crashing',
  'Installing',
  'Pulling',
  'Swimming',
  'Moving',
  'Watching',
  'Following',
  'Liking',
  'Processing',
  'Winning',
  'Twitting',
  'Posting',
  'Judging',
  'Cleaning',
  'Mopping',
  'Skipping',
  'Correcting',
  'Disliking',
  'Unfollowing',
  'Gathering',
  'Frying',
  'Asking',
  'Bypassing',
  'Stealing',
  'Hacking',
  'Petting'

];


tasks.subject = [
  'Kittens',
  'Bad pictures',
  'Ugly fonts',
  'Netflix',
  'Facebook fans',
  'Instagram follower',
  'Twitter',
  'Entire Google Database',
  'Selfies',
  'Cats',
  'Chihuahuas',
  'Fake news',
  'Whale screams',
  'Sunglasses',
  'Twelve legged dogs',
  'Grandmas fennel salad',
  'Colours',
  'Brussel Sprouts',
  'Irrelevant questions',
  'Preposterous ',
  'TV Shows',
  'Britney Spears',
  'Surroundings',
  'Security restrictions',
  'User webcam without consent',
  'User Credit card'
];


tasks.result = [
  'Successful',
  'Done',
  'Completed',
  'Nailed',
  'Cracked',
  'Too lazy to do it',
  'EO340 Permission Denied',
  'Warning, Dangerous contents',
  'Failed',
  'Not Found',
  'Fatal Error'
];



var dosLoading = document.getElementById('dosLoading');
var taskList = document.getElementById('taskList');


var tasksLength = 120;
var iter = 0.3;
var taskSpeed = 1;

function getRandomIndexOfArray(arrayLenght) {
  return Math.floor(Math.random() * Math.floor(arrayLenght));
}


function runTasks(){
  var list = document.createElement('li');
  var action = tasks.action[getRandomIndexOfArray(tasks.action.length)];
  var subject = tasks.subject[getRandomIndexOfArray(tasks.subject.length)];
  var resultIndex = getRandomIndexOfArray(tasks.result.length);
  var result = tasks.result[resultIndex];

  var sentence = action+" "+subject+": "+result;

  //list.appendChild(document.createTextNode("Task "+iter));

  list.appendChild(document.createTextNode(sentence));
  taskList.appendChild(list);

  //Highligh if if a failed task
  if (resultIndex > 7) {
    list.style.color = 'var(--yellow )';
  }
  dosLoading.scrollTop = dosLoading.scrollHeight;
  iter ++;
  if (iter < tasksLength) {
      //between 0 to 400 milliseconds
      var fakeWorkloadTime = (Math.random()*100)*taskSpeed;
      //goes faster the more it loads
      if(iter % 10){
        fakeWorkloadTime = fakeWorkloadTime/(iter/10);
      }else {
        fakeWorkloadTime = fakeWorkloadTime*(iter/10);
      }
      setTimeout(runTasks, fakeWorkloadTime);
  }else {
    setTimeout(fullyLoaded, 100);
  }
}


function fullyLoaded(){
  dosLoading.parentNode.removeChild(dosLoading);
}


//Run loading if files need to be loaded, else show desktop
if (needsLoading) {
  runTasks();
}else {
  fullyLoaded();
}




//////

var installedApps = {};
var desktop = document.getElementById('desktop');

function bootOS(){
  updateOsHeader(OSDefaultMenu, 'finder');
  components.infoMenu();

  //Populate Desktop with icons and windows

  for (var i = 0; i < apps.length; i++) {
    var a = apps[i];
    installedApps[a.info.name.id] = new App(i, a, 'small');
  }

  //Install headless apps
  for (var i = 0; i < hiddenApps.length; i++) {
    var a = hiddenApps[i];
    installedApps[a.info.name.id] = new App(i, a, 'headless');
  }






  desktop.addEventListener("mousedown", deselectAll, false);
  desktop.addEventListener("click", selectFinder, false);

  //startUpSound.play();


  ///LOAD FINDER APPS/////////////

  //LOAD Chat
  var loadChatScripts = new ScriptLoader();
  loadChatScripts.require(['app.js'], 'apps/Chat/',
      function() {
          // Callback
          chatExe.start('OS');


  });




  //LOAD HEAVY STUFF IN BACKGROUND

  loadImage('img/icons/System/foxblack.svg');
  loadImage('img/patterns/Dark-1.png');
  loadImage('img/patterns/Dark-2.png');
  loadImage('img/patterns/Dotted-3.png');
  loadImage('img/patterns/Dotted-6.png');


  loadImage('apps/Chat/img/CatProfilePic.svg');
 // loadVideo('apps/WhoRU/img/0.intro.mp4');
 // loadVideo('apps/Portfolio/projects/canberra/videos/JacobEmilyTurntable.mp4');
 // loadVideo('apps/Portfolio/projects/wu/videos/FarView_BackForth.mp4');
  loadImage('apps/Info/About/img/foxwhite.svg');
 // loadImage('apps/Portfolio/projects/ebay/img/5.Personalisation_01.gif');
  //loadImage('apps/Portfolio/projects/ebay/img/8.SightSearch_02.gif');
 // loadImage('apps/Portfolio/projects/ebay/img/12.Product_02.gif');


  function loadJSON(callback) {
     var xobj = new XMLHttpRequest();
         xobj.overrideMimeType("application/json");
     xobj.open('GET', 'apps/VirtualVandal/models/nur.json', true); // Replace 'my_data' with the path to your file
     xobj.onreadystatechange = function () {
           if (xobj.readyState == 4 && xobj.status == "200") {
             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
             callback(xobj.responseText);
           }
     };
     xobj.send(null);
  };

  loadJSON(function(response) {
   console.log('3D READY');
  });




}




function displayUnsupportedMessage(){


  var body = document.getElementsByTagName("BODY")[0];
  //Delete everything
  while (body.firstChild) {
    if (body.firstChild.tagName === 'SCRIPT') {
      break;
    }
    body.removeChild(body.firstChild);
  }

  //Make App header
  var header = createElement('div','unsupported_mobileHeader', undefined, undefined);
  body.appendChild(header);
  components.image('fullWidth', '', 'img/mobile/Mobile_Illustration.gif', header);



  //Make message
  var message = createElement('div','unsupported_mobileMessage', undefined, undefined);
  body.appendChild(message);
  components.image('centered-retina', '', 'img/mobile/Mobile_Message.gif', message);


  //Make links
  var tempLinks = '<a href="https://www.behance.net/noorelamelglenza">behance.net/noorelamelglenza</a><br>'+
                  '<a href="mailto:noorelamelglenza@gmail.com?subject=Hey nur&body=Listen...">noorelamelglenza@gmail.com</a>';
  var links = createElement('div','unsupported_mobileLinks', undefined, tempLinks);
  body.appendChild(links);


}




if (device.supported) {
  bootOS();
}else {
  displayUnsupportedMessage();
}



function shutDownSystem(){
  //make header container
  var body = document.getElementsByTagName("BODY")[0];
  circle = createElement('div','shutDownCircle', undefined, undefined);

  body.appendChild(circle);

  TweenLite.to(circle, 0.9,{boxShadow:'inset 0 0 0 2000px rgb(0,0,0)',ease:Power3.easeOut,onComplete:function(){
    setTimeout(function () {
      location.reload();
    }, 1500);
  }});
}










///Reload functions below, we need a gateway that evaluates if user has been here
//before or start from scratch
