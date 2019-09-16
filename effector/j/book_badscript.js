// D.Demashov - Effector - book
const {createStore, createEvent} = effector;
const LAST_PAGE = 141;
const s = document.querySelector('#s');  

const $page = createStore(1);

const changePage =  createEvent('changePage');
const nextPage =  createEvent('nextPage');
const prevPage =  createEvent('prevPage');

$page.on(changePage, (state, value) => Number(value));
$page.on(nextPage, state => (state < LAST_PAGE) ? ++state : state);
$page.on(prevPage, state => (state > 1) ? --state : state);
$page.watch(state => {
  s.value = state;
  if (state < 10) state = '0' + String(state);
  document.querySelector('#f').src = `https://kodaktor.ru/gossbook_slides/gossbook-${state}.png`;    
  setTimeout(() => self.scrollTo(0,0), 100); 
});
    
for(let i = 1; i <= LAST_PAGE; ++i) {
  s
  .appendChild(document.createElement('option'))
  .appendChild(document.createTextNode(i));
}

s.addEventListener('input', e => changePage(e.target.value));
document.querySelector('#prv')
  .addEventListener('click', () => prevPage()); 
document.querySelector('#nxt')
  .addEventListener('click', () => nextPage());  