(function() {
var blockFormHight, blockHight, churchFotoHeight, height, heightToSet, hoverOff, hoverOffPreach, hoverOn, hoverOnPreach, motoClickOn, motoHeight, motoHoverOff, motoHoverOn, width;
    
    motoHoverOn = function() {
    $(this).css("box-shadow", "0 0px 20px #000");
    $(this).css("z-index", "10000");
    return $(this).animate({
      marginTop: '-20'
    }, 100);
  };

  motoHoverOff = function() {
    $(this).css("box-shadow", "none");
    $(this).css("z-index", "0");
    return $(this).animate({
      marginTop: '0'
    }, 100);
  };

  motoClickOn = function() {
    var heightToSet;
    heightToSet = $(this).parent().height();
    return $(this).parent().animate({
      marginTop: "-" + heightToSet
    }, 100);
  };
  
  hoverOn = function() {
    return $(this).children("span").stop(true, true).animate({
      "right": 10
    }, 500);
  };

  hoverOff = function() {
    return $(this).children("span").stop(true, true).animate({
      "right": 17
    }, 500);
  };

  hoverOnPreach = function() {
    return $(this).children(".preach-title").addClass("animated fadeInLeft");
  };

  hoverOffPreach = function() {
    return $(this).children(".preach-title").removeClass("animated fadeInLeft");
  };
  
    $(".slick").slick({
        autoplay: true,
        autoplaySpeed: 10000,
        adaptiveHeight: true,
        focusOnSelect: true,
        mobileFirst: true,
        prevArrow: "<div class='control' id='left-but'><span class='fa fa-angle-left'></span></div>",
        nextArrow: "<div class='control' id='right-but'><span class='fa fa-angle-right'></span></div>"
    });
  
    $("#hidden-content-assistants .members-slick").slick({
        infinite: true,
        autoplaySpeed: 10000,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: 'ondemand',
        mobileFirst: true,
        prevArrow: "<div class='control' id='left-but'><span class='fa fa-angle-left'></span></div>",
        nextArrow: "<div class='control' id='right-but'><span class='fa fa-angle-right'></span></div>",
        autoplay:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 320,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    })
    $('[data-toggle="tooltip"]').tooltip(); 
  width = $(window).width();
  height = $(window).height();

  if (height < width) {
    heightToSet = height - ($("header").height() + $("nav").height()) - 60;
  } else {
    heightToSet = width / 2.4102;
  }
  if(width > 1200){
        $(".moto-item").hover(motoHoverOn, motoHoverOff);
  }else{
        $(".moto-item").unbind("hover");
  }
  
  $(".grid#preaches #contain").css("width", 4320)
  blockFormHight = $("#contactForm").outerHeight();
  blockHight = $("#about").outerHeight();
  
  $("#church-foto").css("height", blockHight);
  $("#map").css("height", blockFormHight);
  $("#about ul li, .btn").hover(hoverOn, hoverOff);
  $("#about li a").unbind("click");
  churchFotoHeight = $("#about .half-size").outerHeight();
  
  $("#church-foto").css("height", churchFotoHeight);
  motoHeight = $(".moto#values .moto-item").outerHeight();
  
  $(".moto#values").next().css("height", motoHeight);
  $(".moto#values").next().children().css("height", motoHeight);
  motoHeight = $(".moto#services .moto-item").outerHeight();
  
  $(".moto#services").next().css("height", motoHeight);
  $(".moto#services").next().children().css("height", motoHeight);
    $(window).resize(function() {
        var setValue, setValueButton, width, currentMinHeight, setHeight;
        width = $(window).width();
        setValue = width / 29;
        setValueButton = width / 79;
        
        if (height > (width - ((width / 12) * 4.45))) {
          heightToSet = width / 2.4102;
        } else {
          heightToSet = height - ($("header").height() + $("nav").height()) - 60;
        }
        currentMinHeight = $(".moto#values .moto-item").css("min-height");
        setHeight = (currentMinHeight / width) * currentMinHeight * 100 + currentMinHeight;
        return $(".moto#values .moto-item").css("min-height", setHeight);
    });
  $(window).scroll(function(){
     offsetTop = $(".to-top").offset().top
     if(offsetTop > 1000){
         $(".to-top").css("visibility", "visible");
     }else{
         $(".to-top").css("visibility", "hidden")
     }
  });
  $(document).ready(function() {
      $("img").load(function(){
        setTimeout(function() {
            if (!($(".preloader-container").hasClass("done"))) {
              return $(".preloader-container").addClass("done");
            }
          }, 1000);
      });
      var colors = ["green-block", "gray-block", "red-block", "orange-block", "blue-block"];

      var numBlocks = 25;
      var currentIndex = 10;
      for (var i = 0; i < numBlocks; i++) {
        var newBlock = $("<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'></div>");
        do
          index = Math.floor(Math.random() * ((colors.length - 1) + 1));
        while(currentIndex == index);
        currentIndex = index;
        newBlock.addClass(colors[index]);
        $("#background-photo").append(newBlock);
      }
      $("#background-photo").
      setValue = width / 29;
      setValueButton = width / 79;
        
      if(width < 1024){
          $("#values .moto-item").each(function(){
              targetTitle = $(this).data("title");
              target = $(this).data("item");
              modalWindow = $("<div id='hidden-content-" + target + "'></div>");
              modalWindow.append("<h3>" + targetTitle + "</h3><hr>");
              text = $(this).children(".box-content").children("p").html();
              modalWindow.append("<p>" + text + "</p>");
              
              $(this).after(modalWindow);  
          })
          $("#values .moto-item").wrap(function(){
              target = $(this).data("item");
              // console.log($(this).data("item"));
              link = $("<a></a>");
              link.attr("data-fancybox", "data-fancybox");
              link.attr("href", "#hidden-content-" + target);
              link.attr("data-options", "{'src': '#hidden-content-" + target + "', 'modal': true}");
              return link;
          });
      }
        
      $.get("https://api.vimeo.com/users/13887624/channels?sort=date&per_page=1&access_token=eda1fcdf5d87ea1325250de9631dde8b", function(data){
          channel = data.data[0].link;
          $("#series a").attr("href", channel);
      })
  });
    $("a[href^='#']").not("[data-fancybox], .slick-fancybox").click(function() {
    var fromTop, target;
    target = $(this).attr("href");
    fromTop = $(target).offset().top;
    $("body, html").animate({
      scrollTop: fromTop
    }, 1000);
    return false;
  });

}).call(this);
