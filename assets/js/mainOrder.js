/**
* Template Name: Gp
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }


// typewritter Effect
// Wrap the typewriter effect in a function for reusability
function typewriterEffect(element, words, speed) {
  let wordIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < words[wordIndex].length) {
      element.innerHTML += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    } else {
      setTimeout(erase, speed + 1000); // Pause before erasing
    }
  }

  function erase() {
    if (charIndex > 0) {
      const currentWord = words[wordIndex];
      element.innerHTML = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, speed / 2);
    } else {
      wordIndex = (wordIndex + 1) % words.length; // Move to the next word
      setTimeout(type, speed / 2);
    }
  }

  type(); // Start the typewriter effect
}


  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > -1) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  // Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return value ? value.pop() : '';
}

// Function to handle the cookie pop-up
function handleCookiePopup() {
  const cookiePopup = document.getElementById('cookie-popup');
  const agreeBtn = document.getElementById('agree-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  // Check if the cookie 'cookieConsent' is set
const cookie = getCookie('cookieConsent')== 'agreed'

  if (cookie == true || cookie == false) {
    cookiePopup.style.display = 'none';
    // console.log(cookie);
  }
  if (cookie == null || cookie == undefined) {
    cookiePopup.style.display = 'block';
    console.log(cookie);
  }
  // Handle 'Agree' button click
  agreeBtn.addEventListener('click', function () {
    setCookie('cookieConsent', 'agreed', 30); // Cookie will expire in 30 days
    cookiePopup.style.display = 'none';
  });

  // Handle 'Cancel' button click
  cancelBtn.addEventListener('click', function () {
    setCookie('cookieConsent', 'cancelled', 1); // Cookie will expire in 1 day
    cookiePopup.style.display = 'none';
  });
}
// handleCookiePopup();
// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', handleCookiePopup);

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  let whatsappIcon = select('.whatsapp-icon')
  if (whatsappIcon) {
    const toggleBacktotop = () => {
      if (window.scrollY > 200) {
        whatsappIcon.classList.add('active')
      } else {
        whatsappIcon.classList.remove('active')
        // console.log(whatsappIcon);
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  

    let backtotop2 = select('.video-on-screen')
    if (backtotop2) {
    
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          console.log("scrollY backtotop2", backtotop2);
    
          backtotop2.classList.add('active')
        } else {
          backtotop2.classList.remove('active')
          // console.log(backtotop2);
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }


    const videoUrls = [
      "https://res.cloudinary.com/duscfvoat/video/upload/v1693401220/sprintTZ/Spotlight_sprintTZ_Logo1_c1edzn_rqgmuf.mp4",
      "https://res.cloudinary.com/duscfvoat/video/upload/v1693401221/sprintTZ/VID-20230719-WA0003_uqlwyr_ddldte.mp4",
      "https://res.cloudinary.com/duscfvoat/video/upload/v1693401327/sprintTZ/SPRINT_VID_2_REWORK_ujyras_e2qucy.mp4",
      // "https://res.cloudinary.com/dgocgr4g5/video/upload/v1690901440/sprintvideos/sprint_video_3_qnk79z.mp4"
    ];
    
    const video = document.getElementById("myVideo");
    console.log('video..',video);
    let currentVideoIndex = 0;
    // if (currentVideoIndex === 0) {
    //   console.log(currentVideoIndex);
    //   // video.play();
    // }
    
    video.src = videoUrls[currentVideoIndex];
    video.addEventListener("ended", playNextVideo);
    
    function playNextVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % videoUrls.length;
      video.src = videoUrls[currentVideoIndex];
      video.play();
    }


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()