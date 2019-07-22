// - - - - - - - - - - - - - // T A B S   M E C H A N I Q


let tabs = [];

window.addEventListener('DOMContentLoaded', (event) => {
  tabs = document.getElementsByClassName('__se-tab');
  [...tabs].forEach((tab, index) => {
    tab.addEventListener('click', () => { changeTab(index); });
  });

  displayBadSites();
});

const changeTab = (index) => {
  const current = document.querySelector('.__se-tab.__se-tab-open');

  if (current) {
    current.classList.remove("__se-tab-open");
  }
  tabs[index].classList.add('__se-tab-open');
}



// - - - - - - - - - - - - - - - - - - - - - - - // S E T T I N G S 

// - - - - - - - - - - - - - // bad sites

let badSites = ['https://facebook.com', 'makemeunsee.it', 'google.com'];
let badSitesInput = document.getElementById('bad-sites-pseudoTextArea-input');
let badSitesList = document.getElementById('bad-sites-pseudoTextArea-stoplist');

badSitesInput.oninput = function() {
    if (badSitesInput.value[badSitesInput.value.length - 1] == ',') {
        badSites.push(badSitesInput.value.substring(0, badSitesInput.value.length - 1));
        badSitesInput.value = '';
        displayBadSites();
    }
};



function displayBadSites() {
    badSitesList.innerHTML = '';
    for (let i = 0; i < badSites.length; i++) {
        fetch('https://i.olsh.me/allicons.json?url=' + badSites[i]).then(res => res.json()).then((out) => {
                badSitesList.innerHTML += `<img src="${out.icons[0].url}" alt="${badSites[i]}" title="${badSites[i]}">`;
            }).then(()=> {
              setFunctionsForBadSites();
            })
            .catch(err => { throw err });
    }
   
}

function setFunctionsForBadSites() {

      for (let i = 0; i < badSitesList.children.length; i++) {
        badSitesList.children[i].onclick = function() {
             removeBadSite(i)
         };  
      }

}

function removeBadSite(id) {
    badSites.splice(id, 1); 
    displayBadSites();
}
