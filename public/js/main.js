// Select DOM Items for menu button animation and function
const menuBtn = document.querySelector(".menu-btn");
const btnClose = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu-1");
const menuNav = document.querySelector(".menu-nav-1");
const navItems = document.querySelectorAll(".nav-terms-1");
const mainBody = document.querySelector(".body");

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menuBtn.classList.add("close");
        btnClose.classList.add("close");
        menu.classList.add("show");
        menuNav.classList.add("show");
        mainBody.classList.add("show")
        navItems.forEach((item) => item.classList.add("show"));

        // Set Menu State
        showMenu = true;
    } else {
        menuBtn.classList.remove("close");
        btnClose.classList.remove("close");
        menu.classList.remove("show");
        menuNav.classList.remove("show");
        mainBody.classList.remove("show");
        navItems.forEach((item) => item.classList.remove("show"));

        // Set Menu State
        showMenu = false;
    }
}

// ES6 Class for typewriter
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 8);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current Index of word
        const current = this.wordIndex % this.words.length;
        // Get Full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            //   Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt in the span element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //  Initial Type speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 5;
        }

        // If Word Is Complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to the next Word
            this.wordIndex++;
            // pause a little before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize On Dom Load
document.addEventListener('DOMContentLoaded', init);

// initialize App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // initialize TypeWriter
    new TypeWriter(txtElement, words, wait);
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        document.getElementById("myBtn").style.display = "block";
        // document.getElementsByClassName("dynamicheader").style.backgroundColor = "rgba(0, 0, 0, .2)";
    } else {
        document.getElementById("myBtn").style.display = "none";
        // document.getElementsByClassName("dynamicheader").style.backgroundColor = "transparent";
    }
}

