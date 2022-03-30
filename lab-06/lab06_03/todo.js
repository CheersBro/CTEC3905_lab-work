"use strict";

(() => {
  // all existing code goes here
  // function addItem(text) {
  //   const item = document.createElement('li');
  //   item.textContent = text;
  //   todo.appendChild(item);
  // }

  function addItem(text, done) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    label.textContent = text;
    input.type = "checkbox";
    input.checked = done;
    input.id = `todo${todo.querySelectorAll('li').length + 1}`;
    label.htmlFor = input.id;
    item.appendChild(input);
    item.appendChild(label);
    todo.appendChild(item);

    const button = document.createElement('button');
    button.textContent = "×";
    button.addEventListener('click', ev => {
      item.remove();
      saveToStorage();    // <-- this is a new line
    });

    input.addEventListener('input', ev => {
      saveToStorage();
    });
    item.appendChild(button);
  }

  function clearList() {
    while(todo.firstChild) {
      todo.removeChild(todo.firstChild);
    }
  }

  function dataFromElement(el) {
  	 return {
       text: el.querySelector('label').textContent,
  		 done: el.querySelector('input').checked
  	 }
  }

  function saveToStorage() {
    const listItems = todo.querySelectorAll('li');
  	const elements = Array.from(listItems);
  	const data = elements.map(dataFromElement);
  	localStorage.setItem(todo.id, JSON.stringify(data));
  }

  // function loadFromStorage() {
  // 	clearList();
  // 	const data = JSON.parse(localStorage.getItem(todo.id));
  // 	for (const item of data) {
  // 		addItem(item.text, item.done);
  // 	}
  // }
  function loadFromStorage() {
  	const data = JSON.parse(localStorage.getItem(todo.id));
  	if(data) {
  		clearList();
  		for (const item of data) {
  			addItem(item.text, item.done);
  		}
  	}
  }

  add.addEventListener('click', ev => {
    // addItem(text.value);
    if(text.value) {      // check we have data
      addItem(text.value);
      text.value = null;  // clear the input
      text.focus();       // give it the focus
      saveToStorage();    // <-- this is a new line
    }
  });

  text.addEventListener('keydown', ev => {
    console.log(ev);
    if(ev.key == "Enter") {
      add.click();
    }
  });

  clear.addEventListener('click', ev => {
    // clearList();
    if(confirm("Are you sure you want to delete the entire list?")) {
      clearList();
      saveToStorage(); // <-- this is a new line
    }
  });

  window.addEventListener('storage', (ev) => {
    loadFromStorage();
    // console.log(ev);
    // When local storage changes, dump the list to
    // the console.
    // console.log(JSON.parse(window.localStorage.getItem('sampleList')));
  });

  loadFromStorage();

})()
