var wuExe = {}
wuExe.uniqueAppID = 'wu';

if (typeof installedApps !== 'undefined') {
  installedApps[wuExe.uniqueAppID].OsMenu = installedApps['portfolio'].OsMenu;
}

//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////

wuExe.menuActions = portfolioExe.menuActions;

//////////////////////////////
//////////////////////////////




wuExe.css = new CssComponent(wuExe.uniqueAppID);


wuExe.css.set('id', wuExe.uniqueAppID+'-canvas',{

  'background-color' : '#2C253B',
    'width': '100%',
    'height': '100%',
    'overflow-y':'scroll'
});




wuExe.root = 'apps/Portfolio/projects/'+wuExe.uniqueAppID+'/';


wuExe.start = function(applicant) {
  if (applicant !== 'OS' ? wuExe.root = '' : wuExe.root );

  var canvasContainer = document.getElementById(wuExe.uniqueAppID+'-canvas');

  components.tooltipScroll('white',canvasContainer);


  var imageStyle = 'fullWidth';

  for (var i = 1; i < 3; i++) {
    components.image(imageStyle, wuExe.uniqueAppID+i, wuExe.root + 'img/'+wuExe.uniqueAppID+i+'.jpg', canvasContainer);
  }

  var video1 = createVideo({width:'100%',height:'100%'}, wuExe.root+'videos/FarView_BackForth.mp4');
  canvasContainer.appendChild(video1);

  for (var i = 3; i < 6; i++) {
    components.image(imageStyle, wuExe.uniqueAppID+i, wuExe.root + 'img/'+wuExe.uniqueAppID+i+'.jpg', canvasContainer);
  }

  var video2 = createVideo({width:'100%',height:'100%'}, wuExe.root+'videos/wu6.mp4');
  canvasContainer.appendChild(video2);

  for (var i = 7; i < 9; i++) {
    components.image(imageStyle, wuExe.uniqueAppID+i, wuExe.root + 'img/'+wuExe.uniqueAppID+i+'.jpg', canvasContainer);
  }


}
