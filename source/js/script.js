// Sticky Menu
"use strict";
$(window).scroll(function () {
  const navigation = $(".navigation");

  const height = window.innerWidth > 768 ? 100 : 30;

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
  const page = window.location.pathname.split("/").at(-1) || "index.html";

  $(`.footer a[href="${page}"]`).attr("href", "#");
  $(`.navigation a[href="${page}"]`).attr("href", "#");

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

// close the navbar on click of a link
$('.navbar-nav li a').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});


// lazy laod images
const images = $("img[data-src]");

const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px 400px 0px",
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
  const src = img.getAttribute("data-src");

  if(!src)
  {
    return;
  }

  img.src = src;
};

$.each(images, (i, image) => {
  imageObserver.observe(image);
});



