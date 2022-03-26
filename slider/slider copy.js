$(document).ready(function () {
  const container = $('.slider--desktop');
  const sliderMain = $(".slider");
  let slides = $(".item");
  let index = 1;
  const sliderItemWidth = slides[index].offsetWidth;
  const sliderLength = slides.length;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';
  sliderMain.append(firstClone);
  sliderMain.prepend(lastClone);
  sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);

  let myInterval = null;
  let time = 1000;
  let isNavigation = true;
  let isAutoplay = false;
  initSlider();
  function initSlider() {
    createArrowButton();
    isNavigation && createDots();
    handleArrowButton();
    isNavigation && handleDotClick();
    isAutoplay && autoplay(time);
  }
  function createArrowButton() {
    sliderMain.before(`<img class="slider__prev" src="./image/icon/left.svg" alt="Prev slide">`);
    sliderMain.after(`<img class="slider__next" src="./image/icon/right.svg" alt="Prev slide">`);
  }
  function createDots() {
    let dots = `<ul class="slider__dots">`
    for (let i = 1; i <= sliderLength; i++) {
      const isActive = i === 1 ? 'active' : ''
      dots += `<li class="${isActive}" data-index="${i}"></li>`;
    }
    dots += `</ul>`;
    $(".slider__next").after(dots)
  }
  function handleArrowButton() {
    $(".slider__next").on("click", function () {
      handleChangeSlide(1, '');
    });
    $(".slider__prev").on("click", function () {
      handleChangeSlide(-1, '');
    });
  }
  function handleDotClick() {
    const dotItems = $(".slider__dots li");
    dotItems.on("click", function (e) {
      dotItems.removeClass('active');
      e.target.classList.add('active');
      const sliderIndex = parseInt(e.target.dataset.index);
      index = sliderIndex;
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
    })
  }
  function handleChangeSlide(direction, options) {
    if (options !== 'autoplay') {
      clearInterval(myInterval)
    }
    if (direction === 1) {
      index++;
      if (index > sliderLength) {
        return
        // sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
        // // sliderMain.css({ "transition": 'none' })

        // // index = 1;
        // // sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);

      }
      else {
        sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);

      }
    } else if (direction === -1) {
      index--;
      if (index < 1) {
        index = sliderLength;

        sliderMain.css({
          'transform': `translateX(${-sliderItemWidth * index}px)`,
          'transition': 'transform 0.5s linear'
        });
      } else {
        sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
      }
    }
    $(".slider__dots li").removeClass('active');
    $($(".slider__dots li")[index - 1]).addClass("active");

    if (isAutoplay && options !== 'autoplay') {
      autoplay(time);
    }
  }
  sliderMain.on('transitionend', () => {
    slides = $(".item");
    if (slides[index].id === firstClone.id) {
      sliderMain.css({ "transition": 'none' })
      index = 1;
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
    }
    if (slides[index].id === lastClone.id) {
      sliderMain.css({ "transition": 'none' })
      index = slides.length - 2;
      sliderMain.css('transform', `translateX(${-sliderItemWidth * index}px)`);
    }
  })
  function autoplay(time) {
    myInterval = setInterval(() => {
      handleChangeSlide(1, 'autoplay')
    }, time);
  }
  function onSetWidthSlider(width) {
    if (width > 720) {
      container.find('.slider--mobile').addClass('slider--desktop')
      initSlider(options);
    }
    else {
      $(".container").children().removeClass(".container__slider")
      container.find('.slider--mobile').removeClass('slider--desktop')
      $('img').remove('.slider__prev');
      $('img').remove('.slider__next');
    }
  }
});
