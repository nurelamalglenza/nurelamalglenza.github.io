var flaskExe = {}
flaskExe.uniqueAppID = 'flask';

if (typeof installedApps !== 'undefined') {
  installedApps[flaskExe.uniqueAppID].OsMenu = installedApps['portfolio'].OsMenu;
}

//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////

flaskExe.menuActions = portfolioExe.menuActions;

//////////////////////////////
//////////////////////////////




flaskExe.css = new CssComponent(flaskExe.uniqueAppID);


flaskExe.css.set('id', flaskExe.uniqueAppID+'-canvas',{

  'background-color' : 'white',
  'width': '100%',
  'height': '100%',
  'overflow-y':'scroll'
});




flaskExe.root = 'apps/Portfolio/projects/'+flaskExe.uniqueAppID+'/';


flaskExe.start = function(applicant) {
  if (applicant !== 'OS' ? flaskExe.root = '' : flaskExe.root );

  var canvasContainer = document.getElementById(flaskExe.uniqueAppID+'-canvas');

  components.tooltipScroll('black',canvasContainer);


  for (var i = 1; i < 4; i++) {
    var imageStyle;
    switch (i) {
      case 3:
          imageStyle = 'centered';
        break;
      default:
        imageStyle = 'fullWidth';

    }
    components.image(imageStyle, flaskExe.uniqueAppID+i, flaskExe.root + 'img/'+flaskExe.uniqueAppID+i+'.jpg', canvasContainer);
  }





}
