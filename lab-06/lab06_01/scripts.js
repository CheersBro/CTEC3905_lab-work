"use strict"

const articleData  = [
  {
    "imgId": 1032,
    "title": "crater",
    "description": "This is a placeholder!"
  },
  {
    "imgId": 103,
    "title": "feet",
    "description": "This is a placeholder!"
  },
  {
    "imgId": 1039,
    "title": "waterfall",
    "description": "This is a placeholder!"
  },
  {
    "imgId": 1069,
    "title": "jellyfish",
    "description": "This is a placeholder!"
  },
  {
    "imgId": 1074,
    "title": "lion",
    "description": "This is a placeholder!"
  },
  {
    "imgId": 1080,
    "title": "strawberries",
    "description": "This is a placeholder!"
  },
  {
    "imgId": 1084,
    "title": "walrus",
    "description": "This is a placeholder!"
  }
];

function buildArticleFromData(data) {
  const article = document.createElement("article");
  const img = document.createElement('img');
  const section = document.createElement("section");
  const h2 = document.createElement('h2');
  const p = document.createElement('p');

  h2.textContent = data["title"];
  img.alt = `picsum image ${data["imgId"]}`;
  img.src = `https://picsum.photos/id/${data["imgId"]}/150`;
  p.textContent = data["description"];

  article.appendChild(img);
  article.appendChild(section);
  section.appendChild(h2);
  section.appendChild(p);

  return article;
}

// const articles = articleData.map(buildArticleFromData).forEach(
//   el => target.appendChild(el));
const articles = articleData.map(buildArticleFromData);
articles.forEach(article => target.appendChild(article));
