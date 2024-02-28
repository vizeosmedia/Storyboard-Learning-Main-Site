import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import barba from "@barba/core";

gsap.registerPlugin(ScrollTrigger);

//Timeline creation
var tl = gsap.timeline({});
document.getElementsByTagName("body")[0].style.overflowX = "hidden";

//First header animation
tl.fromTo(
  ".char",
  {
    opacity: 0,
  },

  {
    opacity: 1,
    stagger: 0.03,
    delay: 0.4,
    duration: 0.1,
    ease: "power1",
  }
);

gsap.fromTo(
  ".nav-image",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    delay: 1.2,
    duration: 0.8,
    ease: "power1",
  }
);

gsap.fromTo(
  ".toggle",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    delay: 1.2,
    duration: 0.8,
    ease: "power1",
  }
);

tl.fromTo(
  ".subtitle-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    delay: 0.4,
    duration: 0.8,
    ease: "power1",
  }
);

//BARBA TRANSITION
function pageTransition() {
  let tl5 = gsap.timeline();

  tl5.to(".transition", {
    duration: 1,
    scaleX: 1,
    transformOrigin: "left",
    ease: "power4.inOut",
  });

  tl5.to(".transition", {
    duration: 1,
    scaleX: 0,
    transformOrigin: "right",
    ease: "power4.inOut",
    delay: 0.2,
  });
}

function delay(n) {
  n = n || 0;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },
    },
  ],
});

barba.hooks.after(() => {
  const overflowReset = document.getElementsByTagName("body")[0];
  const subtitletext = document.getElementById("subtitle2");
  const newScript = document.createElement("script");
  const oldScript = document.querySelector(".main-script");
  const lightNav = document.getElementsByClassName("light-nav")[0];
  overflowReset.style.overflow = "auto";
  subtitletext.style.zIndex = 2;
  newScript.src = "/src/main.js";
  newScript.className = "main-script";
  oldScript.remove();
  overflowReset.appendChild(newScript);

  gsap.to(".main-nav", {
    y: 0,
    delay: 0,
    duration: 0.0025,
  });

  gsap.to(".light-nav", {
    zIndex: 2,
    duration: 0.0025,
  });
});

//First image scrolltrigger animation
let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-image-1",
    start: "top bottom",
  },
});

tl3.fromTo(
  ".home-image-1",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    ease: "power1",
    duration: 0.7,
    delay: 0.3,
  }
);

//Second image scrolltrigger animation
let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-image-2",
    start: "top bottom",
  },
});

tl4.fromTo(
  ".home-image-2",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    ease: "power1",
    duration: 0.7,
    delay: 0.3,
  }
);

//Second section scrolltrigger animation
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".header2",
    start: "top bottom",
    markers: false,
  },
});

tl2.fromTo(
  ".header2",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    delay: 0.3,
  }
);

tl2.fromTo(
  ".subtitle-text-2",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    zoom: 1,
    delay: 0.3,
  }
);

//Sticky navbar start

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos >= currentScrollPos) {
    document.getElementById("main-nav").style.top = "0";
    document.getElementById("main-nav").style.opacity = "1";
  } else {
    document.getElementById("main-nav").style.top = "-20px";
    document.getElementById("main-nav").style.opacity = "0";
  }
  prevScrollpos = currentScrollPos;
};

let overlayVisible = false;

//Menu nav bar Animation - Start//

let squareContainer = document.getElementById("square-container");
let squareSize = 100;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let numCols = Math.ceil(screenWidth / squareSize);
let numRows = Math.ceil(screenHeight / squareSize);
let numSquares = numCols * (numRows +1);


window.addEventListener("resize", ()=>{
 screenWidth = window.innerWidth;
 screenHeight = window.innerHeight;
 numCols = Math.ceil(screenWidth / squareSize);
 numRows = Math.ceil(screenHeight / squareSize);
 numSquares = numCols * (numRows +1);
});

window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".content-overlay");
  gsap.set(menu, { opacity: 0 });

  

  //squareContainer.style.width = `${numCols * squareSize}px`;
  //squareContainer.style.height = `${numRows * squareSize}px`;

  let squares = [];

  function createSquares() {
    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      squareContainer.appendChild(square);
      squares.push(square);
    }
  }

  function animateSquares() {
    gsap.fromTo(
      squares,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.5,
        duration: 0.003,
        stagger: {
          each: 0.002,
          from: "random",
        },
      }
    );

    gsap.to(squares, {
      opacity: 0,
      delay: 1.6,
      duration: 0.003,
      stagger: {
        each: 0.002,
        from: "random",
      },
    });
  }

  document.getElementById("toggle").addEventListener("click", () => {
    squareContainer.innerHTML = "";
    squares = [];
    createSquares();
    animateSquares();
    squareContainer.style.zIndex = 5;
    gsap.to(menu, 0.025, {
      opacity: overlayVisible ? 0 : 1,
      zIndex: 4,
      visibility: overlayVisible ? "hidden" : "visible",
      delay: 1.35,
    });

    // gsap.to(squareContainer, {
    //   zIndex: overlayVisible ? 3 : -1,
    // });

    gsap.to(menu, {
      zIndex: overlayVisible ? -1 : 3,
      delay: overlayVisible ? 3 : 0,
    });

    gsap.to(".main-nav", {
      y: -103,
      delay: 1.1,
      duration: 0.0025,
    });

    gsap.to(".light-nav", {
      zIndex: 5,
      opacity: 1,
      delay: 1.1,
      duration: 0.0025,
    });

    const subtitletext = document.getElementById("subtitle2");
    const lightNav = document.getElementsByClassName("light-nav")[0];

    if (!overlayVisible) {
      document
        .getElementsByTagName("body")[0]
        .style.removeProperty("overflow-x");
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      subtitletext.style.zIndex = -2;
      subtitletext.style.transitionDelay = "1s";
      lightNav.style.zIndez = 4;
      lightNav.style.transitionDelay = "1s";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      document.getElementsByTagName("body")[0].style.overflowX = "hidden";
      subtitletext.style.zIndex = 2;
    }

    overlayVisible = !overlayVisible;
  });

  // Listener for the new Toggle2 Light Nav //

  document.getElementById("toggle2").addEventListener("click", () => {
    squareContainer.innerHTML = "";
    squares = [];
    createSquares();
    animateSquares();
    squareContainer.style.zIndex = 5;
    gsap.to(menu, 0.025, {
      opacity: overlayVisible ? 0 : 1,
      visibility: overlayVisible ? "hidden" : "visible",
      delay: 1.35,
    });

    // gsap.to(squareContainer, {
    //   zIndex: overlayVisible ? 3 : -1,
    // });

    gsap.to(menu, {
      zIndex: overlayVisible ? -1 : 0,
      delay: overlayVisible ? 3 : 0,
    });

    gsap.to(".main-nav", {
      y: 0,
      delay: 1.1,
      duration: 0.0025,
    });

    gsap.to(".light-nav", {
      zIndex: -1,
      duration: 0.0025,
      delay: 1.1,
    });

    const subtitletext = document.getElementById("subtitle2");

    if (!overlayVisible) {
      document
        .getElementsByTagName("body")[0]
        .style.removeProperty("overflow-x");
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      subtitletext.style.zIndex = 2;
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      document.getElementsByTagName("body")[0].style.overflowX = "hidden";
      subtitletext.style.zIndex = 2;
    }

    overlayVisible = !overlayVisible;
  });
});

// Reset 'CONTENT OVERLAY' when menu links are clicked instead of the Toggle icon //

const resetOverlays = document.getElementsByClassName("reset-overlay");

console.log(resetOverlays);
for (let i = 0; i < resetOverlays.length; i++) {
  resetOverlays[i].addEventListener("click", () => {
    overlayVisible = false;
    const menu = document.querySelector(".content-overlay");
    const mainnav = document.querySelector(".main-nav");
    console.log(menu.style.visibility);
    menu.style.visibility = "hidden";
    console.log(menu.style.visibility);
    menu.style.opacity = 0;
    menu.style.zIndex = -1;
    menu.style.transitionDelay = "0.8s";
    mainnav.style.transform = "translateY(0px)";

    let homeicon = document.getElementsByClassName('light-nav')[0]
    homeicon.style.opacity=0;
    homeicon.style.transitionDelay = "0.8s";
  });
}

document.getElementById("fullpage").style.zIndex = -1;
