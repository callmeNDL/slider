
$(document).ready(function () {
  const sliderMain = $(".slider");
  const sliderItems = $(".item")
  const sliderItemWidth = sliderItems[0].offsetWidth;
  const sliderLength = sliderItems.length;
  const dotItems = $(".slider__dots li")
  let positionX = 0;
  let index = 0;
  // function mainSlider() {
  //   createSlider();
  //   dotClick();
  //   handleArrowButton();
  //   handleChangeSlide();
  // }
  // function createSlider() {
  $(".slider-container").before(`<img class="slider__prev" src="./image/icon/left.svg" alt="Prev slide">`);
  $(".slider-container").after(`<img class="slider__next" src="./image/icon/right.svg" alt="Prev slide">`);
  let dots = `<ul class="slider__dots">`
  for (let i = 0; i < sliderLength; i++) {
    const isActive = i === 0 ? 'active' : ''
    dots += `<li class="${isActive}" data-index="${i}"></li>`;
  }
  dots += `</ul>`;
  $(".slider__next").after(dots)
  // }
  // function handleArrowButton() {
  createSlider();
  $(".slider__next").on("click", function () {
    handleChangeSlide(1);
  });
  $(".slider__prev").on("click", function () {
    handleChangeSlide(-1);
  });
  // }
  // function dotClick() {
  dotItems.on("click", function (e) {
    dotItems.removeClass('active');
    e.target.classList.add("active");
    const sliderIndex = parseInt(e.target.dataset.index);
    index = sliderIndex;
    positionX = -1 * index * sliderItemWidth;
    sliderMain.css('transform', `translateX(${positionX}px)`);
  })
  // }
  // function handleChangeSlide(direction) {
  if (direction === 1) {
    index++;
    if (index >= sliderLength) {
      index = 0;
      positionX = -1 * index * sliderItemWidth;
      sliderMain.css({ 'transform': `translateX(${positionX}px)`, 'transition': 'transform 0.5s linear' });
    } else {
      positionX = positionX - sliderItemWidth;
      sliderMain.css('transform', `translateX(${positionX}px)`);
    }
  } else if (direction === -1) {
    index--;
    if (index < 0) {
      index = sliderLength - 1;
      positionX = -1 * index * sliderItemWidth;
      sliderMain.css({ 'transform': `translateX(${positionX}px)`, 'transition': 'transform 0.5s linear' });
    } else {
      positionX = positionX + sliderItemWidth;
      sliderMain.css('transform', `translateX(${positionX}px)`);
    }
  }
  dotItems.removeClass('active');
  $(dotItems[index]).addClass("active");
  // }
});
