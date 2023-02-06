// Sticky Menu
"use strict";
$(window).scroll(function () {
  const navigation = $(".navigation");

  const height = window.innerWidth > 768 ? 100 : 50;

  navigation.toggleClass("nav-bg", navigation.offset().top > height);
});

// to center loader
window.addEventListener("beforeunload", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
});

// loader fadeout
$(window).on("load", () => {
  const page = (
    window.location.pathname.split("/").at(-1) || "index.html"
  ).replace(".html", "");

  $(`.footer a[page-name="${page}"]`).attr("href", "#");

  $(".loader-wrapper").fadeOut(400, () => $("body").css("overflow-y", "scroll"));
});

// team slider
$(".team-slider").slick({
  dots: false,
  infinite: false,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  prevArrow:
    "<button type='button' class='prevArrow' aria-label='Previous'><i class='ti-arrow-left'></i></button>",
  nextArrow:
    "<button type='button' class='nextArrow' aria-label='Next'><i class='ti-arrow-right'></i></button>",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// animation scroll js
let html_body = $("html, body");
$(".page-scroll").on("click", function () {
  //use page-scroll class in any HTML tag for scrolling
  if (
    location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
    location.hostname === this.hostname
  ) {
    let target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      html_body.animate(
        {
          scrollTop: target.offset().top - 50,
        },
        1500,
        "easeInOutExpo"
      );
      return false;
    }
  }
});

// easeInOutExpo Declaration
jQuery.extend(jQuery.easing, {
  easeInOutExpo: function (x, t, b, c, d) {
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return (c / 2) * Math.pow(2, 10 * (t - 1));
    }
    +b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
});


// lazy laod images
const images = $("img[src]");



const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px 300px 0px",
};

const imageObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if(!entry.isIntersecting)
    {
      return;
    }

    preloadImage(entry.target);
    imgObserver.unobserve(entry.target);
  });
}, imageOptions);

function preloadImage(img) { 
  const src = img.getAttribute("src");

  if(!src)
  {
    return;
  }

  img.src = src;
};

$.each(images, (i, image) => {
  imageObserver.observe(image);
});