//DB Structure

// apps[]
//
//   info
//     name
//       full s = Coso Cosam
//       file s = coso.exe
//       id s = coso
//     description s = 'A wonderful orchestra of millions of colours'
//     genre = game
//     releaseDate d = 08-03-2023F
//
//   location = desktop
//   appearance
//     color s = illegalTeal
//     size
//       width n = 720
//       height n = 468
//       min
//         width n = 300
//         height n = 200
//     icon = coso_icon.svg
//     splashScreen = coso_splash.mp4
//
//
//   dependencies
//     scripts[] s = scriptA, scriptB, scriptC
//     images[] s = image.jpg, icon.png, logo.svg
//     fonts[] s = Impact, ImpactBold

var systemSharedDependencies = [];

var systemDropdown = [['About Nūr','openAbout'], ['Resume','openResume'], '-',['Linkedin','linkTo'],['Em@il','sendEmail'],'-',['Shut Down...','shutDown']];

var OSDefaultMenu = {
  'The Web Portal of Nūr E.A Glenza' : [],
  'View': [['Enter Full Screen','enterFullScreen']],
};




/// OS MENU actions


var appMenuExe = {};

appMenuExe.menuActions = {};

appMenuExe.menuActions.openAbout = function(){
  //open headless app from center of screen
  installedApps['about'].Status.focus();
  installedApps['about'].Status.open();

}

appMenuExe.menuActions.openResume = function(){
  //open headless app from center of screen
  installedApps['resume'].Status.focus();
  installedApps['resume'].Status.open();
}


appMenuExe.menuActions.openPress = function(){
  window.open('press.html','_blank');
}

appMenuExe.menuActions.linkTo = function(n){
  //DO
  console.log(n);
  var extension;
  switch (n) {
    case 'Behance':
      extension = '.net'
      break;
    case 'Linkedin':
      extension = '.com/in'
      break;
    default:
      extension = '.com'
  }
  //Track Link
  ga('send', 'event', 'Clicks', 'link', n);
  window.open('https://'+n + extension +'/nurelamelglenza','_blank');
}



appMenuExe.menuActions.sendEmail = function(){
  window.location.href = "mailto:noorelamelglenza@gmail.com?subject=Hey nur&body=This%20is%20magnificent";
}


appMenuExe.menuActions.shutDown = function(){
  ga('send', 'event', 'Clicks', 'EasterEggs', 'ShutDown');
  //Play shut down animation
  shutDownSystem();
}




  /////  /////  /////  /////  /////  /////  /////  /////  /////  /////
  /////REUSABLE MENU ACTIONS
  appMenuExe.menuActions.quitApp = function(menuName, appName){
    console.log("PASSING "+appName);
    installedApps[appName].Status.close();
  }

  appMenuExe.menuActions.openApp = function(appName){
    //Tries to focus the app
    installedApps[appName].Status.focus();
    //If it didn't work, then
    //Tries to Open the app
    installedApps[appName].Status.open();
  }



  appMenuExe.menuActions.minimizeApp = function(menuName, appName){
    //minimize app
    installedApps[appName].Status.minimise();
  }

  appMenuExe.menuActions.zoomApp = function(menuName, appName){
  //zoom app
  }


  appMenuExe.menuActions.reportBug = function(menuName, appName){
  //Report bug
  window.location.href = "mailto:noorelamelglenza.com?subject=Bugs! Bugs Everywehre in "+ appName +"!&body=Hey%20nur,"+ "%0D%0A%0D%0A" +"I%20was%20playing%20around%20with%20"+appName+"%0D%0Aand%20stuff%20got%20out%20of%20control!";
  }

  appMenuExe.menuActions.enterFullScreen = function(app){
    ///
    ga('send', 'event', 'Clicks', 'EasterEggs', 'FullScreen');

      var elem = document.getElementsByTagName("HTML")[0];
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
  }









/// FINDER MENU actions


var finderExe = {};
finderExe.background = {
  colors:['yellow', 'aqua', 'magenta'],
  state:0
};

finderExe.menuActions = {};


finderExe.menuActions.shareFB = appMenuExe.menuActions.shareFB;

finderExe.menuActions.shareTwitter = appMenuExe.menuActions.shareTwitter;



finderExe.menuActions.closeWindows = function(){
  console.log('CLOSING WINDOWS');

  console.log(OS.ActivityMonitor.running);
  for (var i = 0; i < OS.ActivityMonitor.running.length; i++) {
    OS.ActivityMonitor.running[i].Status.close();
  }
}


finderExe.menuActions.openApp = appMenuExe.menuActions.openApp;


finderExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;


finderExe.menuActions.changeBackground = function(app){

  ga('send', 'event', 'Clicks', 'EasterEggs', 'ChangeBackground');
  ///change background
  var elem = document.getElementsByTagName("BODY")[0];
  finderExe.background.state++;
  if (finderExe.background.state > finderExe.background.colors.length-1) {
    finderExe.background.state = 0;
  }
  elem.style.background ='var(--'+finderExe.background.colors[finderExe.background.state]+')';
}


finderExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;


finderExe.menuActions.closingApp = function(){
  console.log("Closing App");
}




/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var hiddenApps = [
  {
    "info": {
      "name": {
        "full": "About Nūr",
        "file": "AboUT_Nūr.pdf",
        "id": "about"
      },
      "description": "About pop up with description and photo",
      "genre": "info",
      "releaseDate": "2018-08-02T14:00:00.000Z",
    },
    "location":"desktop",
    "root":"apps/Info/About/",
    "appearance": {
      "color": "illegalYellow",
      "size": {
        "width": 650,
        "height": 440,
        "min": {
          "width": 300,
          "height": 200
        }
      },
      "icon": "",
      "splashScreen": ""
    },
    "dependencies": {
      "scripts": [
        "app.js"
      ],
      "images": [
        'img/foxwhite.svg'
      ],
      "fonts": []
    }
  },
  {
    "info": {
      "name": {
        "full": "Resume",
        "file": "ReSUme_2024.txt",
        "id": "resume"
      },
      "description": "",
      "genre": "instrument",
      "releaseDate": ""
    },
    "location":"desktop",
    "root":"apps/Info/Resume/",
    "appearance": {
      "color": "illegalBlue",
      "size": {
        "width": 700,
        "height": 550,
        "min": {
          "width": 300,
          "height": 200
        }
      },
      "icon": "",
      "splashScreen": ""
    },
    "dependencies": {
      "scripts": [
        "app.js"
      ],
      "images": [],
      "fonts": []
    }
  }
];





/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

  var apps = [
    {
      "info": {
        "name": {
          "full": "Portfolio",
          "file": "MY_W0RK",
          "id": "portfolio"
        },
        "description": "A wonderful orchestra of millions of colours",
        "genre": "game",
        "releaseDate": "2018-08-02T14:00:00.000Z",
      },
      "location":"desktop",
      "root":"apps/Portfolio/",
      "appearance": {
        "color": "illegalBlack",
        "size": {
          "width": 744,
          "height": 490,
          "min": {
            "width": 300,
            "height": 200
          }
        },
        "icon": "coso_icon.svg",
        "splashScreen": "coso_splash.mp4"
      },
      "dependencies": {
        "scripts": [
          "app.js"
        ],
        "images": [
          "projects/flask/flask.jpg",
          "projects/ebay/ebay.png",
          "projects/canberra/canberra.jpg",
          "projects/wu/wu.jpg"
        ],
        "fonts": []
      }
    },
   /* {
      "info": {
        "name": {
          "full": "Anaesterizer 1",
          "file": "ANAeSTETiZER_1.vst",
          "id": "anaesterizer"
        },
        "description": "",
        "genre": "instrument",
        "releaseDate": ""
      },
      "location":"desktop",
      "root":"apps/Anaesterizer/",
      "appearance": {
        "color": "illegalTeal",
        "size": {
          "width": 672,
          "height": 397,
          "min": {
            "width": 300,
            "height": 200
          }
        },
        "icon": "",
        "splashScreen": ""
      },
      "dependencies": {
        "scripts": [
          "%modules/libs/tone.js",
          "app.js"
        ],
        "images": [
          "img/display/Base.svg",
          "img/display/Punch.svg",
          "img/display/SizePointer.svg",
          "img/tooltip.gif"
        ],
        "fonts": []
      }
    },*/
/*    {
      "info": {
        "name": {
          "full": "Drummer 1",
          "file": "DrUMMEr_1.au",
          "id": "drummer"
        },
        "description": "",
        "genre": "instrument",
        "releaseDate": ""
      },
      "location":"desktop",
      "root":"apps/Drummer/",
      "appearance": {
        "color": "illegalBlue",
        "size": {
          "width": 288,
          "height": 312,
          "min": {
            "width": 288,
            "height": 312
          }
        },
        "icon": "",
        "splashScreen": ""
      },
      "dependencies": {
        "scripts": [
          "%modules/libs/tone.js",
          "app.js"
        ],
        "images": [
          "img/clear.svg",
          "img/play.svg",
          "img/record.svg",
          "img/stop.svg",
          "img/timeBar.svg",
          "img/trimBar.svg"
        ],
        "fonts": []
      }
    },*/
   /* {
      "info": {
        "name": {
          "full": "Virtual Vandal",
          "file": "ViRTUAL_V@NDaL!.exe",
          "id": "virtualVandal"
        },
        "description": "",
        "genre": "game",
        "releaseDate": ""
      },
      "location":"desktop",
      "root":"apps/VirtualVandal/",
      "appearance": {
        "color": "illegalBlue",
        "size": {
          "width": 744,
          "height": 468,
          "min": {
            "width": 300,
            "height": 200
          }
        },
        "icon": "",
        "splashScreen": ""
      },
      "dependencies": {
        "scripts": [
          'js/three.js',
          'js/fs.js',
          'app.js'
        ],
        "images": [
          "img/nur_lightMap.jpg",
          "img/nur_normal.jpg",
          "img/canIcon-aqua.svg",
          "img/canIcon-magenta.svg",
          "img/canIcon-blue.svg",
          "img/canIcon-yellow.svg",
          "img/tooltip.gif"

        ],
        "fonts": []
      }
    },*/
/*    {
      "info": {
        "name": {
          "full": "Who Are You?",
          "file": "W_R_U??.bin",
          "id": "whoru"
        },
        "description": "",
        "genre": "game",
        "releaseDate": ""
      },
      "location":"desktop",
      "root":"apps/WhoRU/",
      "appearance": {
        "color": "illegalMagenta",
        "size": {
          "width": 744,
          "height": 468,
          "min": {
            "width": 300,
            "height": 200
          }
        },
        "icon": "",
        "splashScreen": ""
      },
      "dependencies": {
        "scripts": [
          'app.js'
        ],
        "images": [
          //Intro video here
          "img/1.name.gif",
          "img/2.doors.gif",
          "img/3.instruction-A.gif",
        ],
        "fonts": []
      }
    },*/
/*    {
      "info": {
        "name": {
          "full": "Meme Generator",
          "file": "MeMe_GeNERATOR.exe",
          "id": "meme"
        },
        "description": "",
        "genre": "tool",
        "releaseDate": ""
      },
      "location":"desktop",
      "root":"apps/MemeGenerator/",
      "appearance": {
        "color": "illegalTeal",
        "size": {
          "width": 744,
          "height": 580,
          "min": {
            "width": 300,
            "height": 200
          }
        },
        "icon": "",
        "splashScreen": ""
      },
      "dependencies": {
        "scripts": [
          'js/fs.js',
          'app.js'
        ],
        "images": [
          'img/memes/dicaprio.jpg',
          'img/memes/aliens.jpg',
          'img/memes/facepalm.jpg',
          'img/memes/brian.jpg',
          'img/memes/futurama.jpg',
          'img/memes/mother.jpg',
          'img/memes/no.jpg',
          'img/memes/skepticalKid.jpg'

        ],
        "fonts": [
          'Impact'
        ]
      }
    }*/
  ];


//Populate Go with all possible apps in database
  for (var i = 0; i < apps.length; i++) {
    OSDefaultMenu.Go[i] = [];
    OSDefaultMenu.Go[i][0] = apps[i].info.name.id;
    OSDefaultMenu.Go[i][1] = 'openApp';
  }
