var portfolioExe = {}
portfolioExe.uniqueAppID = 'portfolio';


installedApps[portfolioExe.uniqueAppID].OsMenu = {
  [installedApps[portfolioExe.uniqueAppID].name] : [['Quit','quitApp']],
  'File': [['Close All','closeProjects']],
  'Go': [], //fill in later
  'View': [['Minimize','minimizeApp'], ['Zoom','zoomApp'], '-', ['Enter Full Screen','enterFullScreen']],
  'Help': [['Report a bug...','reportBug']]
};


//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////
portfolioExe.menuActions = {};

portfolioExe.menuActions.quitApp = appMenuExe.menuActions.quitApp;

portfolioExe.menuActions.closeProjects = function(){

//Try to close all projects
  for (var i = 0; i < portfolioExe.db.length; i++) {
    installedApps[portfolioExe.db[i].info.name.id].Status.close();
  }
}


//Called by GO
portfolioExe.menuActions.openApp = appMenuExe.menuActions.openApp;

portfolioExe.menuActions.minimizeApp = appMenuExe.menuActions.minimizeApp;

portfolioExe.menuActions.zoomApp = appMenuExe.menuActions.zoomApp;

portfolioExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;

portfolioExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;

portfolioExe.menuActions.closingApp = function(){
  console.log("Closing App");
}

//////////////////////////////
//////////////////////////////






portfolioExe.css = new CssComponent(portfolioExe.uniqueAppID);


portfolioExe.css.set('id', portfolioExe.uniqueAppID+'-canvas',{
  'display' : 'flex',
  'flex-wrap':'wrap',
  'align-items':'flex-start',
  'overflow-y': 'scroll',
  'padding-top': '50px',
  'padding-bottom': '20px',
  'box-sizing': 'border-box',
  'justify-content': 'center'
});

portfolioExe.css.set('class', 'folderInfo',{
  'width' : '144px',
  'background':'var(--black)',
  'posiion':'absolute',
  'color':'var(--white)',
  'margin': '0 40px',
  'text-align': 'center',
  'font-size': '10px',
  'padding': '7px 6px 5px 6px',
  'box-sizing': 'border-box'
});


portfolioExe.css.set('id', portfolioExe.uniqueAppID+'-container',{
  'display': 'flex',
      'flex-wrap': 'wrap',
      'padding': '0px 20px',
      'box-sizing': 'border-box',
      'justify-content': 'space-between'
});








portfolioExe.start = function(applicant) {



  var folderContainer = document.getElementById(portfolioExe.uniqueAppID+'-canvas');




  /////////////////////////////////////////////////////////////////
  //Make App header
  var appHeader = createElement('div','appHeader folderHeader', undefined, undefined);
  folderContainer.appendChild(appHeader);

    var itemsNumber = createElement('a','folderInfo', undefined, portfolioExe.db.length+' files');
    appHeader.appendChild(itemsNumber);


    var spaceLeft = createElement('a','folderInfo folderInfoRight', undefined, '2024 ');
    appHeader.appendChild(spaceLeft);



  /////////////////////////////////////////////////////////////////
  //Make files Container
  var folderFilesContainer = createElement('div','folderFilesContainer', portfolioExe.uniqueAppID+'-container', undefined);
  folderContainer.appendChild(folderFilesContainer);

  //Populate Folder with icons and windows
  for (var i = 0; i < portfolioExe.db.length; i++) {
    var p = portfolioExe.db[i];
    installedApps[p.info.name.id] = new App(i, p, 'Large');
  }

  //Listen for clicks on the canvas
  //folderContainer.addEventListener("dblclick", openWindowOnDblClick, false);
  folderFilesContainer.addEventListener("mousedown", deselectAll, false);

}





portfolioExe.db = [
  {
    "info": {
      "name": {
        "full": "Inssen - Film, Lurk & Ask",
        "file": "Inssen Collective.pdf",
        "id": "flask"
      },
      "description": "",
      "genre": "image",
      "releaseDate": ""
    },
    "location":"portfolio",
    "root":"apps/Portfolio/projects/flask/",
    "appearance": {
      "color": "illegalYellow",
      "size": {
        "width": 1120,
        "height": 600,
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
        "img/flask1.jpg",
        "img/flask2.jpg",
        "img/flask3.jpg"
      ],
      "fonts": []
    }
  },
/*  {
    "info": {
      "name": {
        "full": "Wireless U - Wireless Open Source",
        "file": "WU_Science-Open-Source.pdf",
        "id": "wu"
      },
      "description": "",
      "genre": "image",
      "releaseDate": ""
    },
    "location":"portfolio",
    "root":"apps/Portfolio/projects/wu/",
    "appearance": {
      "color": "illegalBlue",
      "size": {
        "width": 1000,
        "height": 600,
        "min": {
          "width": 300,
          "height": 200
        }
      },
      "icon": "",
      "splashScreen": ""
    },
    "dependencies": {
      "scripts": ['app.js'],
      "images": [
        "img/wu1.jpg",
        "img/wu2.jpg",
        "img/wu3.jpg"
      ],
      "fonts": []
    }
  },*/
 /* {
    "info": {
      "name": {
        "full": "QIC - Jacob & Emily",
        "file": "QIC_Jacob&Emily_10x5m.pdf",
        "id": "canberra"
      },
      "description": "",
      "genre": "image",
      "releaseDate": ""
    },
    "location":"portfolio",
    "root":"apps/Portfolio/projects/canberra/",
    "appearance": {
      "color": "illegalMagenta",
      "size": {
        "width": 900,
        "height": 600,
        "min": {
          "width": 300,
          "height": 200
        }
      },
      "icon": "",
      "splashScreen": ""
    },
    "dependencies": {
      "scripts": ['app.js'],
      "images": [
        "img/canberra1.png",
        "img/canberra2.png",
        "img/canberra3.jpg",
        "img/canberra4.png",
        "img/canberra5.gif"
      ],
      "fonts": []
    }
  },*/
  // {
  //   "info": {
  //     "name": {
  //       "full": "eBay - VR Department Store",
  //       "file": "Enssan.rft",
  //       "id": "ebay"
  //     },
  //     "description": "",
  //     "genre": "image",
  //     "releaseDate": ""
  //   },
  //   "location":"portfolio",
  //   "root":"apps/Portfolio/projects/ebay/",
  //   "appearance": {
  //     "color": "illegalBlack",
  //     "size": {
  //       "width": 1000,
  //       "height": 600,
  //       "min": {
  //         "width": 300,
  //         "height": 200
  //       }
  //     },
  //     "icon": "",
  //     "splashScreen": ""
  //   },
  //   "dependencies": {
  //     "scripts": ['app.js'],
  //     "images": [
  //       "img/flask1.jpg",
  //       "img/flask2.jpg",
  //       "img/flask3.jpg",
  //       "img/4.jpg"
  //     ],
  //     "fonts": []
  //   }
  // }
];


//Populate Go with all possible apps in database
  for (var i = 0; i < portfolioExe.db.length; i++) {
    installedApps[portfolioExe.uniqueAppID].OsMenu.Go[i] = [];
    installedApps[portfolioExe.uniqueAppID].OsMenu.Go[i][0] = portfolioExe.db[i].info.name.id;
    installedApps[portfolioExe.uniqueAppID].OsMenu.Go[i][1] = 'openApp';
  }
