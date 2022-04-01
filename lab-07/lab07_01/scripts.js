"use strict";

let pageSize = 12;
let currentPage;
let objectIDs;

async function insertArticles(objIds) {
  const objects = await Promise.all(objIds.map(loadObject))
  const articles = objects.map(buildArticleFromData);
  articles.forEach(a => results.appendChild(a));
}

async function loadObject(id) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  const response = await fetch(url);
  return response.json();
}

async function loadSearch(query) {
  let baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/search`;
  const response = await fetch(`${baseURL}?hasImages=true&q=${query}`);
  return response.json();
}

// async function doSearch() {
//   clearResults();
//   const result = await loadSearch(query.value);
//   result.objectIDs.forEach(insertArticle);
// }

// async function doSearch() {
//   const result = await loadSearch(query.value);
//   count.textContent = `found ${result.objectIDs.length} results for "${query.value}"`;
//   clearResults();
//   result.objectIDs.forEach(insertArticle);
// }

async function doSearch() {
  clearResults();
  loader.classList.add("waiting");
  const result = await loadSearch(query.value);
  objectIDs = result.objectIDs || [];   // store the search result (or an empty list) in our variable
  count.textContent = `found ${objectIDs.length} results for "${query.value}"`;
  nPages.textContent = Math.ceil(objectIDs.length / pageSize);
  currentPage = 1;     // set the currentPage
  loadPage(currentPage);          // load the appropriate page
}

async function loadPage() {
  clearResults();
  const myObjects = objectIDs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  // myObjects.forEach(insertArticle);
  loader.classList.add("waiting");
  await insertArticles(myObjects);              // new line replaces the above
  loader.classList.remove("waiting");
  pageIndicator.textContent = currentPage;
}


function clearResults() {
  while(results.firstChild) {
    results.firstChild.remove();
  }
}


function nextPage() {
  currentPage += 1;
  const nPages = Math.ceil(objectIDs.length / pageSize);
  if(currentPage > nPages) { currentPage = 1;}
  loadPage();
}
function prevPage() {
  currentPage -= 1;
  const nPages = Math.ceil(objectIDs.length / pageSize);
  if(currentPage < 1) { currentPage = nPages;}
  loadPage();
}

prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);
query.addEventListener('change', doSearch);

// function buildArticleFromData(obj) {
//   const article = document.createElement("article");
//   const img = document.createElement("img");
//   img.src = obj.primaryImageSmall;
//   img.alt = obj.title;
//   article.appendChild(img);
//   return article;
// }
function buildArticleFromData(obj) {
  const article = document.createElement("article");
  const title = document.createElement("h3");
  const primaryImageSmall = document.createElement("img");
  const modal = document.createElement('div');
  const primaryImage = document.createElement("img");
  const objectInfo = document.createElement("p");
  const objectName = document.createElement("span");
  const objectDate = document.createElement("span");
  const medium = document.createElement("p");

  title.textContent = obj.title;
  primaryImageSmall.src = obj.primaryImageSmall;
  primaryImageSmall.alt = `${obj.title} (small image)`;
  primaryImage.src = obj.primaryImage;
  primaryImage.alt = obj.title;
  modal.className = "modal";
  objectName.textContent = obj.objectName;
  objectDate.textContent = `, ${obj.objectDate}`;
  medium.textContent = obj.medium;

  article.addEventListener('click', ev => {
    modal.classList.toggle('on');
  });

  article.appendChild(title);
  article.appendChild(modal);
  modal.appendChild(primaryImage);
  article.appendChild(primaryImageSmall);
  article.appendChild(objectInfo);
  article.appendChild(medium);

  objectInfo.appendChild(objectName);
  if(obj.objectDate) {
    objectInfo.appendChild(objectDate);
  }

  return article;
}

// function buildArticleFromData(obj) {
//   const article = document.createElement("article");
//   const title = document.createElement("h2");
//   const primaryImageSmall = document.createElement("img");
//   const objectInfo = document.createElement("p");
//   const objectName = document.createElement("span");
//   const objectDate = document.createElement("span");
//   const medium = document.createElement("p");
//
//   title.textContent = obj.title;
//   primaryImageSmall.src = obj.primaryImageSmall;
//   primaryImageSmall.alt = obj.title;
//   objectName.textContent = obj.objectName;
//   objectDate.textContent = `, ${obj.objectDate}`;
//   medium.textContent = obj.medium;
//
//   article.appendChild(title);
//   article.appendChild(primaryImageSmall);
//   article.appendChild(objectInfo);
//   article.appendChild(medium);
//
//   objectInfo.appendChild(objectName);
//   if(obj.objectDate) {
//     objectInfo.appendChild(objectDate);
//   }
//
//   return article;
// }

// async function insertArticle(id) {
//   const obj = await loadObject(id);
//   const article = buildArticleFromData(obj);
//   results.appendChild(article);
// }
