class Slider {
  constructor(element, options) {
    this.$element = $(element);
    this.options = options;
    this.activeSlideIndex = 0;
    this.addEvent();
    this.createImages();
    this.createDots();
    this.setActiveSlide();
    this.setPhotoStyles();
    this.activateTransition();
    this.moveSlides(this);
  }

  addEvent() {
    const self = this;

    self.$element.on("click", ".slider__dots__item", function() {
      const $element = $(this);

      self.handleDotClick.call(self, $element);
    });

    $(window).on("resize", function() {
      self.handleWindowResize.call(self);
    });
  }

  // Event Handlers
  // =========================
  handleWindowResize() {
    this.setPhotoStyles();
    this.moveContainer();
  }

  handleDotClick($element) {
    this.activeSlideIndex = $element.index();
    this.moveSlideToCurrentIndex()
  }

  // =========================

  setActiveSlide() {
    // const idx = this.options.images.findIndex((item) => {
    //   return item.active;
    // });
    //
    // this.activeSlideIndex = idx;

    const index = this.options.images.map((item) => {
      if(item.active === true) {
        this.activeSlideIndex = this.options.images.indexOf(item);
      }
    });
    this.moveSlideToCurrentIndex();
    }

  moveSlideToCurrentIndex() {
    const $dots = $(".slider__dots__item");
    const $activeDot = $dots.eq(this.activeSlideIndex);
    $activeDot.addClass("active");
    $activeDot.siblings().removeClass("active");
    this.moveContainer();
  }

  moveSlides(slider) {
    const numberOfSlides = this.options.images.length;
    setInterval(function(){
      slider.moveSlideToCurrentIndex();
      slider.activeSlideIndex = (slider.activeSlideIndex + 1) % (numberOfSlides);
      console.log(slider.activeSlideIndex);
    }, 3000);
  }

  moveContainer() {
    //const $slideToShow = $('.slider__photo__item').eq(this.activeSlideIndex);
    const $photoContainer = $('.slider__photo');
    const width = this.$element.width();

    const x = -(width * this.activeSlideIndex);

    $photoContainer.css({
      'transform': `translate(${x}px, 0px)`,
    })

  }

  activateTransition() {
    const $photoContainer = $('.slider__photo');
    $photoContainer.addClass("slider__photo--transition-enabled");
  }

  setPhotoStyles() {
    const sliderSize = this.$element.width();
    const photoContainerSize = sliderSize * this.options.images.length;
    const $photoContainer = $('.slider__photo');
    const $photos = $photoContainer.children();

    $photos.css({
      "width": `${sliderSize}px`,
    })

    $photoContainer.css({
      "width": `${photoContainerSize}px`,
    })
  }

  createImages() {
    const images = this.options.images.map((photoItem) => {
      const $item = $('<div />')
        .attr({
          'class': 'slider__photo__item',
        })
      ;

      const $image = $('<div />')
        .attr({
          'class': 'slider__photo__image',
        })
        .css({
          'background-image': `url(${photoItem.src})`,
        })
      ;

      const $description = $('<div />')
        .attr({
          'class': 'slider__photo__description',
        })
        .html(`<p>${photoItem.description}</p>`)
      ;

      $item.append([ $image, $description ]);

      return $item;
    });

    $('.slider__photo').append(images);
  }

  createDots() {
    const dots = this.options.images.map((imageItem) => {
      const $dotItem = $('<div />');

      $dotItem.attr({
        "class": "slider__dots__item",
      });

      return $dotItem;
    });

    $('.slider__dots').append(dots);
  }


}

$.fn.Slider = function(options) {
  this.each((index, element) => {
    new Slider(element, options);
  });
}

$('.slider').Slider({
  images: [
    {
      src: 'https://img.freepik.com/free-psd/abstract-background-design_1297-87.jpg?size=338c&ext=jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      active: false,
    },
    {
      src: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      active: false,
    },
    {
      src: 'https://images.pexels.com/photos/11744/pexels-photo-11744.jpeg?auto=compress&cs=tinysrgb&h=350',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      active: true,
    },
    {
      src: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      active: false,
    }
  ]
});
