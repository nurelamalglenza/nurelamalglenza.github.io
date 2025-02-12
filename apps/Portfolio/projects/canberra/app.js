var canberraExe = {}
canberraExe.uniqueAppID = 'canberra';

if (typeof installedApps !== 'undefined') {
  installedApps[canberraExe.uniqueAppID].OsMenu = installedApps['portfolio'].OsMenu;
}

//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////

canberraExe.menuActions = portfolioExe.menuActions;

//////////////////////////////
//////////////////////////////


canberraExe.css = new CssComponent(canberraExe.uniqueAppID);


canberraExe.css.set('id', canberraExe.uniqueAppID+'-canvas',{

  'background-color' : 'white',
  'width': '100%',
  'height': '100%',
  'overflow-y':'scroll'
});




canberraExe.root = 'apps/Portfolio/projects/'+canberraExe.uniqueAppID+'/';


canberraExe.start = function(applicant) {
  if (applicant !== 'OS' ? canberraExe.root = '' : canberraExe.root );

  var canvasContainer = document.getElementById(canberraExe.uniqueAppID+'-canvas');

  components.tooltipScroll('black',canvasContainer);


  components.image('centered-retina', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+1+'.png', canvasContainer);

  var video1 = createVideo({width:'100%',height:'100%'}, canberraExe.root+'videos/JacobEmilyTurntable.mp4');
  canvasContainer.appendChild(video1);

  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+2+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+3+'.jpg', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+4+'.png', canvasContainer);
  components.image('fullWidth', canberraExe.uniqueAppID+' - How It Works', canberraExe.root + 'img/'+canberraExe.uniqueAppID+5+'.gif', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+6+'.png', canvasContainer);
  components.image('fullWidth', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+7+'.png', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+8+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+9+'.png', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+10+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+11+'.png', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+12+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+13+'.gif', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+14+'.png', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+15+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+16+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+17+'.gif', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+18+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+19+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+20+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+21+'.png', canvasContainer);
  components.image('centered-retinaSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+22+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+23+'.jpg', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+24+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+25+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+26+'.png', canvasContainer);
  components.image('fullWidthSpaced', canberraExe.uniqueAppID, canberraExe.root + 'img/'+canberraExe.uniqueAppID+27+'.png', canvasContainer);

  var video2 = createVideo({width:'100%',height:'100%'}, canberraExe.root+'videos/fireworks.mp4');
  canvasContainer.appendChild(video2);

  components.image('centered-retinaSpaced', canberraExe.uniqueAppID+20, canberraExe.root + 'img/'+canberraExe.uniqueAppID+28+'.png', canvasContainer);




}
