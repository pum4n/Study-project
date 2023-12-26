"use strict";
(function () {

const link = document.querySelector(".contacts-btn");
const popup = document.querySelector(".modal-write-us");
const close = document.querySelector(".modal-close");
const linkmap = document.querySelector(".map-link");
const popupmap = document.querySelector(".map-popup");
const closemap = document.querySelector(".map-close");
const modalpc = document.querySelector(".modal-pc");


link.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.add("modal-show");
});

close.addEventListener("click", function (evt) {
	popup.classList.remove("modal-show");
});

linkmap.addEventListener("click", function (evt) {
	evt.preventDefault();
	popupmap.classList.add("map-show");
});

closemap.addEventListener("click", function (evt) {
	popupmap.classList.remove("map-show");
});

// modalpc.addEventListener("click", function(evt){
// 	modalpc.classlist.add("modal-pc");
// })

}) ();
