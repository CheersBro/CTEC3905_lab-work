"use strict"

const searchParams = new URLSearchParams(document.location.search);

const id = searchParams.get("id");

console.log(id);
