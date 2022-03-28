$(document).ready(function () {

  const container = $('.sliders');
  const sliderMain = $(".slider");
  // const sliderWrap = $(".sliders__body")
  let slides = $(".item");
  let index = 1;

  const firstCloneId = 'first-clone';
  const lastCloneId = 'last-clone';

  const firstClone = $(slides[0]).clone();
  const lastClone = $(slides[slides.length - 1]).clone();

  firstClone.attr('id', firstCloneId);
  lastClone.attr('id', lastCloneId);

  sliderMain.append(firstClone)
  sliderMain.prepend(lastClone)

  const sliderItemWidth = slides[index].offsetWidth;
  const sliderLength = slides.length;
  sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
  let isInit = true;
  let reInit = false;
  let myInterval = null;
  options = {
    time: 3000,
    isNavigation: true,
    isAutoplay: true,
  }

  const getSlides = () => $(".item");
  const getIndex = (index) => {
    slides = getSlides();

    if ($(slides[index]).attr('id') === firstCloneId) {
      index = 1;
    }
    if ($(slides[index]).attr('id') === lastCloneId) {
      index = slides.length - 2;
    }
    return index
  }

  function initSlider(options) {
    createArrowButton();
    options.isNavigation && createDots();
    handleArrowButton();
    options.isNavigation && handleDotClick();
    options.isAutoplay && autoplay(options.time);
    transitionend();
  }
  // initSlider(options);

  windowWidth = window.innerWidth;
  onSetWidthSlider(windowWidth)
  function onSetWidthSlider(width) {
    if (width > 768) {
      if (isInit) {
        initSlider(options);
        console.log("init");
        isInit = false;
      } else {
        if (reInit) {
          $(".sliders").addClass("sliders--desktop").removeClass("sliders--mobile");
          index = 1;
          initSlider(options);
          console.log("re-init");
          reInit = false
        }
      }
    } else {
      reInit = true;
      container.addClass("sliders--mobile").removeClass("sliders--desktop")
      sliderMain.find(".item").remove("#last-clone");
      sliderMain.find(".item").remove("#first-clone");
      $(".sliders__body > img").remove();
      $(".sliders__body > ul").remove();
      sliderMain.css('transform', `translateX(${0}px)`);
    }
  }

  $(window).resize(function () {
    const width = $(window).width()
    onSetWidthSlider(width)
  });

  function createArrowButton() {
    sliderMain.before(`<img class="slider__prev" src="./image/icon/left.svg" alt="Prev slide">`);
    sliderMain.after(`<img class="slider__next" src="./image/icon/right.svg" alt="Prev slide">`);
  }

  function createDots() {
    let dots = `<ul class="slider__dots">`
    for (let i = 1; i <= sliderLength; i++) {
      const isActive = i === 1 ? 'dot--active' : ''
      dots += `<li class="dot ${isActive}" data-index="${i}"></li>`;
    }
    dots += `</ul>`;
    $(".slider__next").after(dots)
  }

  function handleArrowButton() {
    $(".slider__next").on("click", function () {
      handleChangeSlide('next');
      // console.log(this);
    });
    $(".slider__prev").on("click", function () {
      handleChangeSlide('prev');
    });
  }

  function handleDotClick() {
    const dotItems = $(".slider__dots li");
    dotItems.on("click", function (e) {

      dotItems.removeClass('dot--active');
      e.target.classList.add('dot--active');

      const sliderIndex = parseInt(e.target.dataset.index);
      index = getIndex(sliderIndex)

      sliderMain.css({ "transition": '.4s linear' })
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
    })
  }

  function handleChangeSlide(direction, option) {
    if (option !== 'autoplay') {
      clearInterval(myInterval)
    }
    if (direction === 'next') {
      slides = getSlides();
      if (index >= slides.length - 1) return;
      index++;
      sliderMain.css({ "transition": '.4s linear' })
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
    } else {
      if (index <= 0) return;
      index--;
      sliderMain.css({ "transition": '.4s linear' })
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
    }
    $(".slider__dots li").removeClass('dot--active');
    console.log(options.isAutoplay);
    if (options.isAutoplay && option !== 'autoplay') {
      autoplay(options.time);
    }
  }
  function transitionend() {
    console.log("end");
    sliderMain.on('transitionend', () => {
      slides = getSlides();
      index = getIndex(index)

      sliderMain.css({ "transition": 'none' })
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
      $($(".slider__dots li")[index - 1]).addClass("dot--active");
    })
  }


  function autoplay(time) {
    myInterval = setInterval(() => {
      handleChangeSlide('next', 'autoplay')
    }, time);
  }
});


