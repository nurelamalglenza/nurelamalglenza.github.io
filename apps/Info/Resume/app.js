var resumeExe = {}
resumeExe.uniqueAppID = 'resume';

resumeExe.root = 'apps/Info/Resume/';

//// MENU LIST
//Use the same as the finder

//Using external menus, unaccessible from debug, so wrap this special menus into a Check
//to determine if they come from eOS or Debug
if (typeof installedApps != 'undefined') {
  installedApps[resumeExe.uniqueAppID].OsMenu = OSDefaultMenu;


///// MENU actions
//Use the same as the finder
resumeExe.menuActions = finderExe.menuActions;
//

}




resumeExe.css = new CssComponent(resumeExe.uniqueAppID);


resumeExe.css.set('id', resumeExe.uniqueAppID+'-canvas',{
  'display' : 'flex',
  'flex-wrap':'wrap',
  'align-items':'flex-start',
  'overflow-y': 'scroll',
  'padding-bottom': '20px',
  'box-sizing': 'border-box',
  'justify-content': 'center',
  'color':'var(--white)'
});

resumeExe.css.set('class', 'folderInfo',{
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


resumeExe.css.set('id', resumeExe.uniqueAppID+'-container',{
  'display': 'flex',
  'flex-wrap': 'wrap',
  'padding': '0px 29px',
  'box-sizing': 'border-box',
  'justify-content': 'space-between'
});


resumeExe.css.set('class', 'resumeAscii',{
  //'font-family': 'monospace',
  'white-space': 'pre',
  'word-wrap': 'break-word',
  'white-space': 'pre-wrap',
  'font-size': '12px',
  'letter-spacing': '0.3px',
  'padding-right':'20px',
  'padding-top':'40px'

});

resumeExe.css.set('id', 'resumeDownload',{
  'background': 'var(--white)',
  'color': 'var(--black)'
});







resumeExe.start = function(applicant) {
  if (applicant !== 'OS') {
    aboutExe.root = '';
  }



  var folderContainer = document.getElementById(resumeExe.uniqueAppID+'-canvas');





  /////////////////////////////////////////////////////////////////
  //Make App header
  var appHeader = createElement('div','appHeader docHeader', undefined, undefined);
  folderContainer.appendChild(appHeader);

    var itemsNumber = createElement('a','folderInfo', undefined, 'v18 - 256 words');
    appHeader.appendChild(itemsNumber);




      var dowloadButton = createElement('a','appHeaderButton', 'resumeDownload', 'download resume');
    appHeader.appendChild(dowloadButton);
    dowloadButton.href = resumeExe.root+"doc/alpacaBi.txt";
    dowloadButton.target = "_blank";


var resumeASCIIcode =


    "      ___           ___     \n" +
    "     /__/\\         /  /\\    \n" +
    "     \\  \\:\\       /  /:/_                              Nūr El Amal Glenza \n" +
  "      \\  \\:\\     /  /:/ /\\                             Software Egineer UX Dsigner\n" +
    "  _____\\__\\:\\   /  /:/_/::\\                                    \n" +
    " /__/::::::::\\ /__/:/__\\/\\:\\\n" +
    " \\  \\:\\~~\\~~\\/ \\  \\:\\ /~~/:/                           noorelamelglenza@gamil.com\n" +
    "  \\  \\:\\  ~~~   \\  \\:\\  /:/                            +4917643382624 \n" +
    "   \\  \\:\\        \\  \\:\\/:/                           \u{261F} Germany \n" +
    "    \\  \\:\\        \\  \\::/   \n" +
    "     \\__\\/         \\__\\/    \n                                                      \n"+

"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"     +------------------------------------------------------------------+           \n"+
"     | o o o ===================== Profile.txt =========================|           \n"+
"     +------------------------------------------------------------------+/          \n"+
"     |    _      ____   ____    _ ____                                  |/          \n"+
"     |   | | /| / / /  / __ \\  (_) __/                                 |/          \n"+
"     |   | |/ |/ / _ \\/ /_/ / / /\\ \\                           +---------------+ \n"+
"     |   |__/|__/_//_/\\____/ /_/___/                           | o o o ========| \n"+
"     |                                                            |---------------+/\n"+
"     +------------------------------------------------------------|  more at      |/\n"+
"     |                                                            | .-----------. |/\n"+
"     |   Nūr is a polymath mind whose areas of wizardry           |(             )|/\n"+
"     |   range from UX, Design, Mobile and Website                | `-----------' |/\n"+
"     |    Programming.                                            +---------------+/\n"+
"     |                                                             /////////////////\n"+
"     |   Wildly obsessed with good ideas, art and softwares,       /////////////////\n"+
"     |   Nūr has an innate attitude to stretch the boundaries           |/          \n"+
"     |   and challenge the benchmarks.                                  |/          \n"+
"     |                                                                  |/          \n"+
"     |   Originally born in Tunisia, she now lives and works in Germany |/          \n"+
"     |   as Software Engineer and UX Designer.                          |/          \n"+
"     |                                                                  |/          \n"+
"     +------------------------------------------------------------------+/          \n"+
"      ////////////////////////////////////////////////////////////////////          \n"+
"      ////////////////////////////////////////////////////////////////////          \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"               _  _____  _______  _ _____  ___________                              \n"+
"          ___ | |/_/ _ \\/ __/ _ \\(_) __/ |/ / ___/ __/                              \n"+
"         / -_)>  &#60"+"/ ___/ _// , _/ / _//    / /__/ _/                                \n"+
"         \\__/_/|_/_/  /___/_/|_/_/___/_/|_/\\___/___/                                \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+"                                                                                    \n"+
    "    \u{270F}\u{FE0E}    Software Engineer  , UX/DESIGN  - TOP7, Munich , Germany              \n"+
    "    |    Feb, 2022 \u{2014}> Present                                                       \n"+
    "    |                                                                               \n"+
    "    |    Developing and designing drone's remote controller             \n"+
    "    |    for windturbines, infrastructure and landmines.                         \n"+
    "    |                                                                               \n"+
    "    |     \n"+
    "    |                                                                               \n"+
    "    |                                                                               \n"+
    "    |    .......................................................................    \n"+
    "                                                                                    \n"+
    "                                                                                    \n"+
"    \u{270F}\u{FE0E}    FULLSTACK ENGINEER , UX/DESIGN  - All4U, Munich , Germany              \n"+
"    |    Feb, 2021 \u{2014}> Oct 2021                                                       \n"+
"    |                                                                               \n"+
"    |    Developing and designing a web application with Vue JS             \n"+
"    |    and mobile application with kotlin for physiotherapists.                          \n"+
"    |                                                                               \n"+
"    |     \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    |    .......................................................................    \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    \u{270F}\u{FE0E}    NATIVE MOBILE ENGINEER - Hmmh AG Bremen, Germany                    \n"+
"    |    Feb, 2019 \u{2014}> Jan, 2021                                             \n"+
"    |                                                                               \n"+
"    |    Developing an e-commerce mobile application for       \n"+
"    |    a one of the largest fashion company in Metzingen.                       \n"+
"    |                                                                               \n"+
"    |    \u{AE} Clients: HUGO BOSS      \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    |    .......................................................................    \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    \u{270F}\u{FE0E}    NATIVE MOBILE ENGINEER UX DESIGNER - Points Gmbh, Stuttgart                  \n"+
"    |    Feb, 2018 \u{2014}> Jan, 2019                                                    \n"+
"    |                                                                               \n"+
"    |    Developed an Android mobile app or the historical landmarks                    \n"+
"    |    in BADEN-WÜRTTEMBERG.                                                            \n"+
"    |                                                                                  \n"+
"    |    Part of the UX UI team for a public transportation in Stuttgart                                                                        \n"+
"    |    helping create the user experience for their next product.                                                                             \n"+
"    |                                                                             \n"+
"    |   \u{AE} Clients: Landesmuseum, SCHLÖSSER UND GÄRTEN, VVS                                                                             \n"+
"    |                                                                               \n"+
"    |    .......................................................................    \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    \u{270F}\u{FE0E}    FULLSTACK ENGINEER - Inssen, Tunis                          \n"+
"    |    Dec, 2012 \u{2014}> May, 2015                                                     \n"+
"    |                                                                               \n"+
"    |    Developing my own social Enterprise Inssen : Empowering                                \n"+
"    |    and providing an equal access to all women in Tunisia through e-commerce  \n"+
"    |    channels                                                                        \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    |    .......................................................................    \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    \u{25A0}                                                                               \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"            ____   ____  __    ___  __  _ ____  _  __                               \n"+
"           / __/__/ / / / /___/ _ |/ /_(_) __ \\/ |/ /                               \n"+
"          / _// _  / /_/ / __/ __ / __/ / /_/ /    /                                \n"+
"         /___/\\_,_/\\____/\\__/_/ |_\\__/_/\\____/_/|_/                                 \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"    \u{26AF}    BACHELOR DEGREE OF COMPUTER SCIENCE  - Gafsa, Tunisia            \n"+
"    |    2011 -> 2015                                                           \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    |    .......................................................................    \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    \u{26AF}    MASTER DEGREE IN COMPUTER SCIENCE ENGINEEERING - Tunis , TUNISA                             \n"+
"    |    2015 -> 2019                                                            \n"+
"    |                                                                               \n"+
"    |                                                                               \n"+
"    \u{25A0}                                                                               \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"    *--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*    \n"+
"    |                                                                          |/   \n"+
"    *       ___ _      __     ___  ___                                         */   \n"+
"    |      / _ | | /| / /__ _/ _ \\/ _ \\___                                     |/   \n"+
"    *     / __ | |/ |/ / _ `/ , _/ // (_-&#60                                     */   \n"+
"    |    /_/ |_|__/|__/\\_,_/_/|_/____/___/                                     |/   \n"+
"    *                                                                          */   \n"+
"    |                                                                          |/   \n"+

"    |                                                                          |/   \n"+
"    *                                                                          */   \n"+
"    |                                                                          |/   \n"+
"    *  \u{25EA} INTEL IDEATION PRIZE                                                   */   \n"+
"    |   Inssen ”>NATIONAL PRIZE FOR BEST IDEA AND IMPLEMNTATION                                    |/   \n"+
"    *                                                                          */   \n"+ "    |                                                                          |/   \n"+
"    *                                                                          */   \n"+
"    |  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  |/   \n"+
"    *--------------------------------------------------------------------------*/   \n"+
"      ///////////////////////////////////////////////////////////////////////////   \n"+
"      ///////////////////////////////////////////////////////////////////////////   \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"            __ ___  ______ _      ____   ____  _______  _________                   \n"+
"           / //_/ |/ / __ \\ | /| / / /  / __ \\/ __/ _ \\/ ___/ __/                   \n"+
"          / ,&#60 /    / /_/ / |/ |/ / /__/ /_/ / _// // / (_ / _/                     \n"+
"         /_/|_/_/|_/\\____/|__/|__/____/\\____/___/____/\\___/___/                     \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                          +----------------------+                  \n"+
"                                          | o o o ==  Sketch   ==|                  \n"+
"                                          +---+------------------+---+              \n"+
"                                          |   | o o o ==  Adobe XD  ==|              \n"+
"        +----------------------+          |   +---+------------------+---+          \n"+
"        | o o o = UX UI =|          |   |   | o o o ==      Ai         ==|          \n"+
"        +---+------------------+---+      |   |   +----------------------+          \n"+
"        |   | o o o ==  Web Dev  ==|      +---+   |  +-------+  +------+ |          \n"+
"        |   +---+------------------+---+      |   |  |@@@@@@@|  +------+ |          \n"+
"        |   |   | o o o == Mobile Dev==|      +---+  |@@@@@@@|  +------+ |          \n"+
"        |   |   +---+--------------+---+          |  +-------+  +------+ |          \n"+
"        +---+   |   |              |   |          +----------------------+          \n"+
"            |   |   |   +----------+---+-------+                                    \n"+
"            +---+   |   | o o o ==   Git     ==|                                    \n"+
"                |   |   +---+------------------+---+                                \n"+
"                +---+---+   | o o o ==  VueJS    ==|                                \n"+
"                        |   +---+------------------+---+                            \n"+
"                        |   |   | o o o ==  Jira   ==|                            \n"+
"                        |   |   +----------------------+                            \n"+
"                        +---+   |  +----------------+  |                            \n"+
"                            |   |  |@@@+------------+--+------+                     \n"+
"                            +---+  |@@@| o o o == Agile Dev ==|                     \n"+
"                                |  +---+---+------------------+---+                 \n"+
"                                +------+   | o o o ==  Scrum    ==|                 \n"+
"                                       |   +---+------------------+---+             \n"+
"                                       |   |   | o o o ==  API & DB   ==|             \n"+
"        +----------------------+       |   |   +----------------------+             \n"+
"        | o o o ==   JAVA     ==|       +---+   |  --------- +-------+ |             \n"+
"        +---+------------------+---+       |   |   .-.  .-. |@@@@@@@| |             \n"+
"        |   | o o o ==AE ==|       +---+  (   )(   )        |@@@@@@@| |             \n"+
"        |   +---+------------------+           |   `-'  `-' +-------+ |             \n"+
"        |   |@@@|        +-------+ |           +----------------------+             \n"+
"        |   |@@@|        +-------+ |                                                \n"+
"        +---+@@@|    +-------+     |    +----------------------+                    \n"+
"            |@@@|    +-------+     |    |                      |                    \n"+
"            +---+------------------+    |      {Kotlin}        |--+                 \n"+
"                                        |                      |  |                 \n"+
"                                        +----------------------+  |                 \n"+
"                                        +-------------------------+                 \n"+
"        +-------------------------+     |         +-------------------+             \n"+
"        |        Languages        |     +------>  |   &#60Android>       |             \n"+
"        +-------------------------+               +-------------------+             \n"+
"                                                                                    \n"+
"        +---------+     +---------+       +---------+                         \n"+
"        | #  #  # |     |///   ###|       | #  #  # |                     \n"+
"        |  # # #  |     |///   ###|       |  # # #  |                          \n"+
"        |#########|     |///   ###|       |#########|                   \n"+
"        |  # # #  |     |///   ###|       |  # # #  |                     \n"+
"        | #  #  # |     |///   ###|       | #  #  # |                        \n"+
"        +---------+     +---------+       +---------+                    \n"+
"        |               |                 |                                        \n"+
"        -               -                  -                                       \n"+
"                                                                                    \n"+
"        English           French        Arabic                              \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"       x - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - x    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"            __ ____  ___  ________  __  _______                                     \n"+
"           / // / / / / |/ /_  __/ /  |/  / __/                                     \n"+
"          / _  / /_/ /    / / /   / /|_/ / _/                                       \n"+
"         /_//_/\\____/_/|_/ /_/   /_/  /_/___/                                       \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"         .-.                                                                        \n"+
"        (   )  .---------------------------.                                        \n"+
"         `-'  ( Search nurelamelglenza  )                                       \n"+
"            \\  `---------------------------'                                        \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"       .-----------------.-----------------.-----------------.-----------------.    \n"+
"       |\\               /|\\               /|\\               /|\\               /|    \n"+
"       | .-------------. | .-------------. | .-------------. | .-------------. |    \n"+
"       | |             | | |             | | |             | | |             | |    \n"+
"       | |  .github.io | | |   Behance   | | |   facebook  | | |   Linkedin  | |    \n"+
"       | |             | | |             | | |             | | |             | |    \n"+
"       | '-------------' | '-------------' | '-------------' | '-------------' |    \n"+
"       |/               \\|/               \\|/               \\|/               \\|    \n"+
"       '-----------------'-----------------'-----------------'-----------------'    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    \n"+
"                                                                                    ";









var  container = createElement('div', 'resumeAscii', undefined, resumeASCIIcode);
folderContainer.appendChild(container);






}
