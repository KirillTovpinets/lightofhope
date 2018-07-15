(function() {
  $(document).ready(function() {
    var height, heightToSet, numAlready, numslides, timer, width;
    width = $(window).width();
    height = $(window).height();
    heightToSet = height - ($("header").height() + $("nav").height()) - 60;
    numslides = $(".slide").length;
    numAlready = 0;
    $(window).resize(function() {
      width = $(window).width();
      height = $(window).height();
      if(height > width){
          heightToSet = width / 2.4102;
      }else{
          heightToSet = height - ($("header").height() + $("nav").height()) - 60;
      }
      
      return $("#perfect-slider").css("height", heightToSet);
    });
    $("#perfect-slider").css("height", heightToSet);
    $(".control").click(function() {
      var currentSlide, currentSlideNum, direction, nextSlide, path;
      direction = $(this).data("direction");
      if (direction === "left") {
        path = -width;
      } else {
        path = width;
      }
      if (numAlready === numslides) {
        $(".slide").css("right", -path);
        numAlready = 0;
      }
      currentSlide = $("#perfect-slider .active");
      currentSlide.animate({
        right: path
      });
      currentSlide.removeClass("active");
      currentSlideNum = currentSlide.data("slide");
      if (currentSlideNum === numslides) {
        $('.slide').css("right", -path);
        nextSlide = $("#slide-1");
      } else {
        nextSlide = currentSlide.next();
      }
      nextSlide.addClass("active");
      nextSlide.animate({
        right: 0
      });
      return numAlready++;
    });
    $("#perfect-slider").children(".slide").each(function() {
      var widthFrom;
      widthFrom = -width;
      $(this).not('#slide-1').css("right", widthFrom);
    });
    timer = function() {
      var currentSlide, currentSlideNum, nextSlide;
      if (numAlready === numslides) {
        $(".slide").css("right", -width);
        numAlready = 0;
      }
      currentSlide = $("#perfect-slider .active");
      currentSlide.animate({
        right: width
      });
      currentSlide.removeClass("active");
      currentSlideNum = currentSlide.data("slide");
      if (currentSlideNum === numslides) {
        $('.slide').css("right", -width);
        nextSlide = $("#slide-1");
      } else {
        nextSlide = currentSlide.next();
      }
      nextSlide.addClass("active");
      nextSlide.animate({
        right: 0
      });
      numAlready++;
    };
    setInterval(timer, 7000);
  });

}).call(this);
