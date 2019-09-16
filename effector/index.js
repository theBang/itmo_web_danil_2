  
  // всё это нужно делать через состояние, см. effector
const {createStore, createEvent} = effector;

let curr = 1;
const n = 141;
const s = document.querySelector('#s');
const f = document.querySelector('#f');  
const scro = () => self.scrollTo(0,0);

let $page = createStore(1);

let change =  createEvent('change');
let next =  createEvent('next');
let prev =  createEvent('prev');

$page.on(change, (state, value) => 
  (Number(value) < 10) ? i = '0' + String(value) : value);
$page.on(next, (state, value) => state + 1);
$page.on(prev, (state, value) => state - 1);

$page.watch(i => {
  i = Number(i);

  if (i > 1 && i < 141) {
    const url = `/gossbook_slides/gossbook-${i}.png`; // `
    f.src = url;  
    curr = i;
    s.value = i;
  }    
});

/*
  window.onload = function() {
    const i = Number(location.hash.substring(1));
    
    if (i > 1 && i < 141) {
      const url = `/gossbook_slides/gossbook-${i}.png`; // `
      f.src = url;  
      curr = i;
      s.value = i;
    }    
  }*/



    
  for(let i = 1; i <= n; ++i) {
    
    s
    .appendChild(document.createElement('option'))
    .appendChild(document.createTextNode(i));
    
  }  /*
  s
  .addEventListener('input', e => {
    let i  = curr = e.target.value;
    if (Number(i) < 10) i = '0' + String(i);
    const url = `/gossbook_slides/gossbook-${i}.png`; // `
    f.src = url;   
  });*/
  s.addEventListener('input', e => {
    change(e.target.value);   
  });/*
  document.querySelector('#prv')
  .addEventListener('click', e => {
    curr--;
    let i = curr;
    if (curr < 1) curr = i = 1;
    s.value = i;
    if (curr < 10) i = '0' + String(i);
    const url = `/gossbook_slides/gossbook-${i}.png`; // `
    e.target.href = url;   
    setTimeout(scro, 10);                 
  }); 
  document.querySelector('#nxt')
  .addEventListener('click', e => {
    if (curr < 141) curr++;
    let i = curr;
    if (curr < 1) curr = i = 1;
    if (curr > 141) i = 141;
    s.value = i;
    if (curr < 10) i = '0' + String(i);
    
    const url = `/gossbook_slides/gossbook-${i}.png`; // `
    e.target.href = url; 
    setTimeout(scro, 10);                 
  });  */