// Sticky Menu
"use strict";
// sections of page
const sections =  $(`section[class^="section"] div[class^="container"]`);

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
  let pagename = window.location.pathname.split("/").at(-1) || "index.html";

  const page = pagename.endsWith(".html") ? pagename : pagename + ".html";

  const navigation_footer = $(".navigation, .footer");


  [...navigation_footer.find(`a[href^="${page}"]`)].forEach(link => {
    const href = link.getAttribute("href").replace(page, "");
    link.setAttribute("href", href);
  })

  const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
  );

  if(pageAccessedByReload && window.location.href.includes("#")) {
    const href = window.location.href;
    window.location.href = href.substring(0, href.indexOf("#"));
  }


  new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    responsiveWidth: 800,
    verticalCentered:true,

    onLeave: function({index}) {
      if(index === 0)
      {
        $(".navigation").toggleClass("nav-bg");
      }
    }
  });


  $(".loader-wrapper").fadeOut(400);
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


// section observer 

const scaling = 0.8;

sections.css({
  "transform": `scale(${scaling})`,
  "transition": "350ms ease"
});

const sectionObserverOptions = {
  threshold: 0,
  rootMargin: "0px 0px -300px 0px",
};

const sectionObserver = new IntersectionObserver((entries, sectionObserver) => {
  entries.forEach((entry) => {
    const section = $(entry.target);

    if(!entry.isIntersecting)
    {
      section.css("transform",`scale(${scaling})`);
      return;
    }

    section.css("transform", "scale(1)");
  });
}, sectionObserverOptions);



$.each(sections, (i, section) => {
  sectionObserver.observe(section);
});




// custom cursor 
const links = $("a, button, select");
const mouse_cursor = $(".custom-cursor");


links
  .on("mouseover", () => {
    mouse_cursor.addClass("custom-cursor-hover");
  })
  .on("mouseout", () => {
    mouse_cursor.removeClass("custom-cursor-hover");
  })



$(window).on("mousemove", (e) => {
  const x = e.clientX + "px";
  const y = e.clientY + "px";

  mouse_cursor.show();

  mouse_cursor.css({
    left: x,
    top: y
  })
})

