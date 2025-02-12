var ebayExe = {}
ebayExe.uniqueAppID = 'ebay';

if (typeof installedApps !== 'undefined') {
  installedApps[ebayExe.uniqueAppID].OsMenu = installedApps['portfolio'].OsMenu;
}

//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////

ebayExe.menuActions = portfolioExe.menuActions;

//////////////////////////////
//////////////////////////////




ebayExe.css = new CssComponent(ebayExe.uniqueAppID);


ebayExe.css.set('id', ebayExe.uniqueAppID+'-canvas',{

  'background-color' : 'var(--black)',
  'width': '100%',
  'height': '100%',
  'overflow-y':'scroll'
});




ebayExe.root = 'apps/Portfolio/projects/'+ebayExe.uniqueAppID+'/';


ebayExe.start = function(applicant) {
  if (applicant !== 'OS' ? ebayExe.root = '' : ebayExe.root );

  var canvasContainer = document.getElementById(ebayExe.uniqueAppID+'-canvas');

components.tooltipScroll('white',canvasContainer);


  components.image('fullWidth', ebayExe.uniqueAppID, ebayExe.root + 'img/flask2.jpg', canvasContainer);







}
