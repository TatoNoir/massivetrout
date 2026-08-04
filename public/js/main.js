(function() {
  'use strict';
  var app = {
    settings: {
      heroVideo: $('.hero__video'),// activates video on homepage with video
      heroSlider: $('.hero__slider'),// activates slider plugin on homepage with slider
      lazyImages: $('.lazy'),// activates plugin for lazy images
      masonryGallery: $('.gallery--masonry'),// activates masonry plugin for gallery
      modalDialog: $('.js-modal-dialog'),// activates modal window for gallery
      contactForm: $('.contact-form'),// activates contact form
      videoCover: $('.video-cover'),// activates plugin for video cover
      chart: $('.js-chart'),// activates plugin for graphs
      landing: $('.js-landing-nav'),// activates scrolling on landing pages
      map: $('#googleMap'),// activates google map on contact page
      projectSlider: $('.js-project-slider'),// activates slider on project page
      waypoint: $('.wp'),// activates waypoints - plugin for images showing on scroll
      blogFilter: $('.js-blog__filter')
    },
    controllers: function() {
      /**
      * Lazy Loading Images
      * Info: http://www.appelsiini.net/projects/lazyload
      */
      if (this.settings.lazyImages.length > 0) {
        (function () {
          'use strict';
          $('.lazy').lazyload({
            effect: 'fadeIn'
          });
        })();
      }

      /**
      * Full Width Video
      * Info: https://github.com/pupunzi/jquery.mb.YTPlayer/wiki
      */
      if (this.settings.heroVideo.length > 0) {
        (function () {
          'use strict';
          $('.player').mb_YTPlayer();
        })();
      }

      /**
      * Full Screen Slider
      * Info: https://github.com/nicinabox/superslides
      */
      if (this.settings.heroSlider.length > 0) {
        (function (){
          'use strict';
          $('#slides').superslides({
            animation: 'fade',
            play: 3000,
            animation_speed: 3000
          });
        })();
      }

      /**
      * Masonry Grid
      * Info: http://masonry.desandro.com/
      */
      if (this.settings.masonryGallery.length > 0) {
        (function() {
          'use strict';
          $('.grid').masonry({
            // options
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            isFitWidth: true
          });
        })();
      }

      /** 
       * Modal Dialog for Gallery
       */
      if (this.settings.modalDialog.length > 0) {
        // Settings
        var modalOverlay = $('.js-modal-overlay'),
            modalImage = $('.js-modal-dialog__img'),
            modalCloseBtn = $('.js-modal-close'),
            nextImageAnchor = $('.js-modal-next'),
            prevImageAnchor = $('.js-modal-prev'),
            grid = $('.gallery__grid'),
            imagesArray = grid.find('.gallery-item'),
            imagesArrayLength = imagesArray.length;

        if (this.settings.masonryGallery.length > 0) {
          // Masonry-Based Gallery
          $('.gallery-item').on('click', function() {
            var currentImage = $(this),
                currentImageIndex = currentImage.index() - 1,
                imgSrc = currentImage.attr('src'),
                imgAlt = currentImage.attr('alt');

            // Attach image to modal window
            function imageAttach() {
              modalImage.attr({
                src: imgSrc,
                alt: imgAlt
              });
            }

            // Open Modal Window
            function modalOpen() {
              modalOverlay.toggleClass('is-active');
              // Show previous image on "left arrow" key press
              $(document).on('keydown', function (e) {
                if (e.keyCode == 37 || e.charCode == 37 || e.which == 37) {
                  prevImage(e);
                }
              });
              // Show next image on "right arrow" key press
              $(document).on('keydown', function (e) {
                if (e.keyCode == 39 || e.charCode == 39 || e.which == 39) {
                  nextImage(e);
                }
              });
              // Close modal on "Esc" key press
              $(document).on('keydown', function (e) {
                if (e.keyCode == 27 || e.charCode == 27 || e.which == 27) {
                  closeModal(e);
                }
              });
            }

            // Show previous image
            function prevImage(e) {
              e.preventDefault();
              var currentImage = grid.find('img[src="' + modalImage.attr('src') + '"]'),
                  currentImageIndex = currentImage.index() - 1,
                  prevImage = imagesArray.eq(currentImageIndex - 1);

              // If you are on the first image
              if (currentImageIndex < 0) {
                modalImage.attr({
                  src: $(imagesArray[imagesArrayLength - 1]).attr('src'),
                  alt: $(imagesArray[imagesArrayLength - 1]).attr('alt')
                });
              } else {
                modalImage.attr({
                  src: prevImage.attr('src'),
                  alt: prevImage.attr('alt')
                });
              }
            };

            // Show next image
            function nextImage(e) {
              e.preventDefault();
              var currentImage = grid.find('img[src="' + modalImage.attr('src') + '"]'),
                  currentImageIndex = currentImage.index(),
                  nextImage = imagesArray.eq(currentImageIndex);

              // If you are on the last image
              if (currentImageIndex == imagesArrayLength) {
                modalImage.attr({
                  src: $(imagesArray[0]).attr('src'),
                  alt: $(imagesArray[0]).attr('alt')
                });
              } else {
                modalImage.attr({
                  src: nextImage.attr('src'),
                  alt: nextImage.attr('alt')
                });
              }
            };

            // Closing Modal Window
            function closeModal(e) {
              e.preventDefault();
              if (modalOverlay.hasClass('is-active')) {
                modalOverlay.removeClass('is-active');
              }
            }

            imageAttach();
            modalOpen();
            nextImageAnchor.on('click', function(e) {
              nextImage(e);
            });
            prevImageAnchor.on('click', function(e) {
              prevImage(e);
            });
            modalCloseBtn.on('click', function(e) {
              closeModal(e);
            });
          });
        } else {
          // Grid-Based Gallery
          $('.gallery-item').on('click', function() {
            // Assigning data-index attribute with unique number
            // to every image in the gallery
            $('.gallery-item').each(function(index) {
              $(this).attr('data-index', index);
            });
            var currentImage = $(this),// Currently clicked image
                imgSrc = currentImage.attr('src'),// Src attribute of clicked image
                imgAlt = currentImage.attr('alt'),// Alt attribute of clicked image
                currentImageIndex = currentImage.data('index'),// Number from data-index attribute of clicked image
                imgArray = $('img[data-index]'),// array of all images
                numOfImages = imgArray.length - 1,// switch to 0-based index
                nextIndex,// prepare nextIndex variable
                prevIndex;// prepare prevIndex variable

            if (currentImageIndex > 0) {
              prevIndex = currentImageIndex - 1;
            } else {
              prevIndex = numOfImages;
            }
            if ((currentImageIndex + 1) < numOfImages) {
              nextIndex = currentImageIndex + 1;
            } else {
              nextIndex = 0;
            }

            // Attach image to modal window
            function imageAttach() {
              modalImage.attr({
                src: imgSrc,
                alt: imgAlt,
                "data-index": currentImageIndex
              });
            }

            // Open Modal Window
            function modalOpen() {
              modalOverlay.toggleClass('is-active');
              // Show previous image on "left arrow" key press
              $(document).on('keydown', function (e) {
                if (e.keyCode == 37 || e.charCode == 37 || e.which == 37) {
                  prevImage(e);
                }
              });
              // Show next image on "right arrow" key press
              $(document).on('keydown', function (e) {
                if (e.keyCode == 39 || e.charCode == 39 || e.which == 39) {
                  nextImage(e);
                }
              });
              // Close modal on "Esc" key press
              $(document).on('keydown', function (e) {
                if (e.keyCode == 27 || e.charCode == 27 || e.which == 27) {
                  closeModal(e);
                }
              });
            }

            // Show previous image
            function prevImage(e) {
              e.preventDefault();

              modalImage.attr({
                src: $('[data-index=' + prevIndex + ']').attr('src'),
                alt: $('[data-index=' + prevIndex + ']').attr('alt'),
                'data-index': $('[data-index=' + prevIndex + ']').attr('data-index')
              });
              currentImageIndex = prevIndex;

              if (currentImageIndex > 0) {
                prevIndex = currentImageIndex - 1;
              } else {
                prevIndex = numOfImages;
              }
              if ((currentImageIndex + 1) < numOfImages) {
                nextIndex = currentImageIndex + 1;
              } else {
                nextIndex = 0;
              }
            }

            // Show next image
            function nextImage(e) {
              e.preventDefault();

              modalImage.attr({
                src: $('[data-index=' + nextIndex + ']').attr('src'),
                alt: $('[data-index=' + nextIndex + ']').attr('alt'),
                'data-index': $('[data-index=' + nextIndex + ']').attr('data-index')
              });
              currentImageIndex = nextIndex;

              if (currentImageIndex > 0) {
                prevIndex = currentImageIndex - 1;
              } else {
                prevIndex = numOfImages;
              }
              if ((currentImageIndex + 1) <= numOfImages) {
                nextIndex = currentImageIndex + 1;
              } else {
                nextIndex = 0;
              }
            }

            // Closing Modal Window
            function closeModal(e) {
              e.preventDefault();
              if (modalOverlay.hasClass('is-active')) {
                modalOverlay.removeClass('is-active');
              }
            }

            imageAttach();
            modalOpen();
            nextImageAnchor.on('click', function(e) {
              nextImage(e);
            });
            prevImageAnchor.on('click', function(e) {
              prevImage(e);
            });
            modalCloseBtn.on('click', function(e) {
              closeModal(e);
            });
          });
        }
      }

      /**
       * Full Screen Video Cover
       */
      if (this.settings.videoCover.length > 0) {
        (function () {
          // Resize video container to full heigh
          function scaleVideoContainer() {
            var height = $(window).height() + 5;
            var unitHeight = parseInt(height) + 'px';
            $('.homepage-hero-module').css('height',unitHeight);
          }

          // Initialize video to full heigh and width function
          function initBannerVideoSize(element) {
            $(element).each(function() {
              $(this).data('height', $(this).height());
              $(this).data('width', $(this).width());
            });
            scaleBannerVideoSize(element);
          }

          // Resize video to full heigh and width
          function scaleBannerVideoSize(element){
            var windowWidth = $(window).width(),
            windowHeight = $(window).height() + 5,
            videoWidth,
            videoHeight;
            $(element).each(function(){
              var videoAspectRatio = $(this).data('height')/$(this).data('width');
              $(this).width(windowWidth);
              if(windowWidth < 1000){
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                $(this).css({
                  'margin-top' : 0,
                  'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'
                });
                $(this).width(videoWidth).height(videoHeight);
              }
              $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
              $('body').css({
                'width': '100%',
                'overflow': 'hidden'
              })
            });
          }

          scaleVideoContainer();
          initBannerVideoSize('.video-container .poster img');
          initBannerVideoSize('.video-container .filter');
          initBannerVideoSize('.video-container video');

          // Check for resizing of the screen
          $(window).on('resize', function() {
            scaleVideoContainer();
            scaleBannerVideoSize('.video-container .poster img');
            scaleBannerVideoSize('.video-container .filter');
            scaleBannerVideoSize('.video-container video');
          });
        })();
      }

    // CONTACT FORM
    $("#contact-form").submit(function (e) {
      e.preventDefault();
      var name = $("#contactNameInput").val();
      var email = $("#contactEmailInput").val();
      var telephone = $("#contactPhoneInput").val();
      var recipient = $("#contactRecipientInput").val();
      var suscription = $("#newsletter-susc").prop('checked');
      var message = $("#contactMessage").val();
      var dataString = '&name=' + name + '&email=' + email + '&telephone=' + telephone + '&recipient=' + recipient + '&suscription=' + suscription + '&message=' + message;

      function isValidEmail(emailAddress) {
          var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
          return pattern.test(emailAddress);
      };
      function isValidCaptcha (){
        if (grecaptcha.getResponse(widgetId1) == '')
          return false;
        else 
          return true;
      }
      $('.contact-alert').hide();
        if (isValidEmail(email) && (message.length > 1) && (name.length > 1) ) {
          if (isValidCaptcha()) {
            $.ajax({
                type: "POST",
                url: "./contact.php",
                data: dataString,
                success: function () {
                  $('.contact-alert').css("color","green");
                  $('.contact-alert').html('Your message has been sent successfully.').fadeIn(2000);
                    
                }
            });
          }
          else {
            $('.contact-alert').html('Missed Captcha').fadeIn(2000);            
          }
        }
      else {
        $('.contact-alert').html('E-mail, name and message must be valid.').fadeIn(2000);        
      }
      $('.contact-alert').fadeOut(2000);
      return false;
    });


    // NEWSLETTER FORM



    $("#contact-news").submit(function (e) {
      e.preventDefault();
      var email = $("#contactEmailNews").val();
      var dataString = '&email=' + email;

      function isValidEmail(email) {
          var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
          return pattern.test(email);
      };
      function isValidCaptcha (){
        if (grecaptcha.getResponse(widgetId2) == '')
          return false;
        else 
          return true;
      }
      $('.contact-alert-news').hide();
        if (isValidEmail(email)){
          if (isValidCaptcha()) {
            $.ajax({
                type: "POST",
                url: "./newsletter.php",
                data: dataString,
                success: function () {
                  $('.contact-alert-news').css("color","grey");
                  $('.contact-alert-news').html('Your message has been sent successfully.').fadeIn(2000);
                    
                }
            });
          }
          else {
            $('.contact-alert-news').html('Missed Captcha').fadeIn(2000);            
          }
        }
      else {
        $('.contact-alert-news').html('E-mail, name and message must be valid.').fadeIn(2000);        
      }
      $('.contact-alert-news').fadeOut(2000);
      return false;
    });


      /**
       * Chart Graphs
       * Info: http://www.chartjs.org/
       */
      if (this.settings.chart.length > 0 ) {
        // Radar Chart
        (function () {
          var windowWidth = $(window).width(),
              chartRadar = document.getElementById("chartRadar");
  
          // Resize the graph according to screen resolution
          if (windowWidth > 440) {
            $(chartRadar).attr({
              'width': 420,
              'height': 420
            });
          } else {
            $(chartRadar).attr({
              'width': 300,
              'height': 300
            });
          }
  
          // Get context of the canvas
          var contextRadar = chartRadar.getContext("2d"),
              dataRadar = {
                labels: ['Camping', 'Culture', 'Entertainment', 'Forest', 'Mountains', 'Nature', 'Tourism', 'Water', 'Winter'],
                datasets: [{
                  label: 'Year 2015',
                  fillColor: 'rgba(220,220,220,0.2)',
                  strokeColor: 'rgba(220,220,220,1)',
                  pointColor: 'rgba(220,220,220,1)',
                  pointStrokeColor: '#fff',
                  pointHighlightFill: '#fff',
                  pointHighlightStroke: 'rgba(220,220,220,1)',
                  data: [65, 59, 90, 81, 56, 55, 40]
                }, {
                  label: 'Year 2016',
                  fillColor: 'rgba(151,187,205,0.2)',
                  strokeColor: 'rgba(151,187,205,1)',
                  pointColor: 'rgba(151,187,205,1)',
                  pointStrokeColor: '#fff',
                  pointHighlightFill: '#fff',
                  pointHighlightStroke: 'rgba(151,187,205,1)',
                  data: [28, 48, 40, 19, 96, 27, 100]
                }]
              },// Data for graph
              newRadarChart = new Chart(contextRadar).Radar(dataRadar);// Create new graph
  
          // Polar Area Chart
          var windowWidth = $(window).width(),
              chartPolar = document.getElementById("polarChart");
  
          // Resize the graph according to screen resolution
          if (windowWidth > 440) {
            $(chartPolar).attr({
              'width': 420,
              'height': 420
            });
          } else {
            $(chartPolar).attr({
              'width': 300,
              'height': 300
            });
          }
          var contextPolar = chartPolar.getContext("2d"),
              dataPolar = [
                {
                  value: 133,
                  color:"#F7464A",
                  highlight: "#FF5A5E",
                  label: "Camping"
                },
                {
                  value: 172,
                  color: "#46BFBD",
                  highlight: "#5AD3D1",
                  label: "Culture"
                },
                {
                  value: 80,
                  color: "#FDB45C",
                  highlight: "#FFC870",
                  label: "Entertainment"
                },
                {
                  value: 269,
                  color: "#949FB1",
                  highlight: "#A8B3C5",
                  label: "Forest"
                },
                {
                  value: 120,
                  color: "#8e44ad",
                  highlight: "#616774",
                  label: "Mountains"
                },
                {
                  value: 299,
                  color: "#27ae60",
                  highlight: "#616774",
                  label: "Nature"
                },
                {
                  value: 60,
                  color: "#f39c12",
                  highlight: "#616774",
                  label: "Tourism"
                },
                {
                  value: 209,
                  color: "#3498db",
                  highlight: "#616774",
                  label: "Water"
                },
                {
                  value: 111,
                  color: "#ecf0f1",
                  highlight: "#616774",
                  label: "Winter"
                }
              ],// Data for graph
              newPolarChart = new Chart(contextPolar).PolarArea(dataPolar);// Create new graph
        })();
      }

      /**
       * Landing page scroll-to navigation
       */
      if (this.settings.landing.length > 0) {
        (function () {
          $('.js-landing-nav a').on('click', function(e) {
            e.preventDefault();
            var $attr = $(this).attr('href');
            $('body').animate({
              scrollTop: $('' + $attr).offset().top
            }, 750);
          });
        })();
      }

      /**
       * Google Map
       */
      if (this.settings.map.length > 0) {
        (function () {
          // Map Coordinates
          var latlng = new google.maps.LatLng(50.0753355, 14.4113856);

          // Map Options
          var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
          };

          var map = new google.maps.Map(document.getElementById('googleMap'), myOptions);

          map.set('styles', 
            [{
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [{
                "saturation": 36
              }, {
                "color": "#000000"
              }, {
                "lightness": 40
              }]
            }, {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [{
                "visibility": "on"
              }, {
                "color": "#000000"
              }, {
                "lightness": 16
              }]
            }, {
              "featureType": "all",
              "elementType": "labels.icon",
              "stylers": [{
                "visibility": "off"
              }]
            }, {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 20
              }]
            }, {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 17
              }, {
                "weight": 1.2
              }]
            }, {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 20
              }]
            }, {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 21
              }]
            }, {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 17
              }]
            }, {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 29
              }, {
                "weight": 0.2
              }]
            }, {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 18
              }]
            }, {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 16
              }]
            }, {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 19
              }]
            }, {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{
                "color": "#000000"
              }, {
                "lightness": 17
              }]
            }]
          );

          // Marker Image
          var image = 'images/marker.svg';

          //  Start Marker
          var myLatlng = new google.maps.LatLng(50.0753355, 14.4113856);

          // Marker Text
          var contentString = '<div id="map-tooltip" class="map-tooltip"><h5>Our Office Location</h5><p>Come see us!</p></div>';

          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Welcome to Czech Republic!',
            icon: image,
            optimized: false
          });

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map,marker);
          });
          // End Marker
        })();
      }

      /**
       * Simple Project Slider
       */
      if (this.settings.projectSlider.length > 0) {
        (function() {
          $('.js-project-slide:gt(0)').hide();
          $('.js-project-slide:first img').attr('data-shown', true);

          // Slider variables
          var sliderVariables  = {
            currentSlide: $('[data-shown="true"]'),
            prevSlideArrow: $('.js-slide-prev'),
            nextSlideArrow: $('.js-slide-next'),
            sliderDot: $('.js-project-slider-dot')
          };

          // Slider controllers
          var sliderControllers = {
            init: function() {
              sliderControllers.generateDots();
              sliderControllers.generateAttributes();
            },
            generateAttributes: function() {
              // Generate data-index attribute for further use
              $('.js-project-slide img').each(function(index) {
                $(this).attr({
                  'data-index': index,
                  'data-shown': false
                });
              });
            },
            generateDots: function() {
              // Controller for slider dots
              // Generate dots container
              $('.js-project-slides-navigation').after('<div class="js-project-slider-dots project-slider-dots"></div>');
              // Generate dots for every slide
              $('.js-project-slide').each(function(index) {
                $('.js-project-slider-dots').append('<span class="js-project-slider-dot project-slider-dot" data-index="' + index + '"></span>');
              });
              $('.js-project-slider-dot').first().addClass('js-project-slider-dot-active project-slider-dot-active');
            },
            changeDot: function() {
              // Controller for changing active dot
              // according to currently active slide
              var activeSlideIndex = parseInt($('.js-project-slider').find('img[data-shown=true]').attr('data-index')),
                  activeDot = $('.project-slider-container .js-project-slider-dot').eq(activeSlideIndex);
              $('.js-project-slider-dot-active').removeClass('js-project-slider-dot-active project-slider-dot-active');
              activeDot.addClass('js-project-slider-dot-active project-slider-dot-active');
            },
            sliderHelper: function() {
              // Controller for creating 'data-shown' attribute
              // with value set to 'false' on currently shown image
              sliderVariables.currentSlide.attr('data-shown', false);
            },
            goToFirstSlideController: function() {
              // If the slider is on the end,
              // go to the first slide and show it
              sliderVariables.currentSlide.parent('li').fadeOut('slow');
              sliderVariables.currentSlide = $('.js-project-slider').find('.js-project-slide:first img');
              sliderVariables.currentSlide.attr('data-shown', true);
              sliderVariables.currentSlide.parent('li').fadeIn('slow');
            },

            goToNextSlideController: function() {
              // If the slider is not on the end,
              // go to the next slide and show it
              sliderVariables.currentSlide.parent('li').fadeOut('slow');
              sliderVariables.currentSlide = sliderVariables.currentSlide.parent('li').next('li').find('img');
              sliderVariables.currentSlide.attr('data-shown', true);
              sliderVariables.currentSlide.parent('li').fadeIn('slow');
            },

            goToLastSlideController: function() {
              // If the slider is on the beginning,
              // go to the last slide and show it
              sliderVariables.currentSlide.parent('li').fadeOut('slow');
              sliderVariables.currentSlide = $('.js-project-slider').find('.js-project-slide:last img');
              sliderVariables.currentSlide.attr('data-shown', true);
              sliderVariables.currentSlide.parent('li').fadeIn('slow');
            },

            goToPrevSlideController: function() {
              // If the slider is not on the beginning,
              // go to the previous slide and show it
              sliderVariables.currentSlide.parent('li').fadeOut('slow');
              sliderVariables.currentSlide = sliderVariables.currentSlide.parent('li').prev('li').find('img');
              sliderVariables.currentSlide.attr('data-shown', true);
              sliderVariables.currentSlide.parent('li').fadeIn('slow');
            },
            goToSlideController: function(dotIndex) {
              // Go to specific slide after clicking on some dot
              var dotIndex = dotIndex,
                  clickedDot = $('.project-slider-container .js-project-slider-dot').eq(dotIndex),
                  dotImage = $('.js-project-slider .js-project-slide').eq(dotIndex).children('img');
              sliderVariables.currentSlide.parent('li').fadeOut('slow');
              sliderVariables.currentSlide = dotImage;
              sliderVariables.currentSlide.attr('data-shown', true);
              sliderVariables.currentSlide.parent('li').fadeIn('slow');

              $('.js-project-slider-dot-active').removeClass('js-project-slider-dot-active project-slider-dot-active');
              clickedDot.addClass('js-project-slider-dot-active project-slider-dot-active');
            },
            autosliderController: function() {
              sliderControllers.sliderHelper();

              if (sliderVariables.currentSlide.parent('li').next('li').length === 0) {
                sliderControllers.goToFirstSlideController();
              } else {
                sliderControllers.goToNextSlideController();
              }
              sliderControllers.changeDot();
            }
          };

          // Initiate autoslider
          sliderControllers.init();

          function prevSlide(e) {
            if (e) {
              e.preventDefault();
            }

            sliderControllers.sliderHelper();

            if (sliderVariables.currentSlide.parent('li').prev('li').length === 0) {
              sliderControllers.goToLastSlideController();
            } else {
              sliderControllers.goToPrevSlideController();
            }

            // Change active dot according to active slide
            sliderControllers.changeDot();
          }

          function nextSlide(e) {
            if (e) {
              e.preventDefault();
            }

            sliderControllers.sliderHelper();

            if (sliderVariables.currentSlide.parent('li').next('li').length === 0) {
              sliderControllers.goToFirstSlideController();
            } else {
              sliderControllers.goToNextSlideController();
            }

            // Change active dot according to active slide
            sliderControllers.changeDot();
          }

          function dotClick(dotIndex) {
            sliderControllers.sliderHelper();
            sliderControllers.goToSlideController(dotIndex);
          }

          $('.js-project-slider-dot').on('click', function() {
            var dotIndex = $(this).data('index');
            dotClick(dotIndex);
          });

          sliderVariables.prevSlideArrow.on('click', function(e) {
            prevSlide(e);
          });
          sliderVariables.nextSlideArrow.on('click', function(e) {
            nextSlide(e);
          });

          if ($('.js-project-slider').attr('data-autoplay') === 'true') {
            // Autoslider
            // Set timing for autoslider to user-defined on
            // attribute data-autoplay-timing or 2500 milliseconds - 2.5s
            var timing = parseInt($('.js-project-slider').attr('data-autoplay-timing')) || 2500;

            // Initiate auto-slider
            var autoslider = setInterval(function() {
              sliderControllers.autosliderController();
            }, timing);

            $('.js-project-slider-dot').on('click', function() {
              clearInterval(autoslider);
              var dotIndex = $(this).data('index'),
                  clickedDot = $('.project-slider-container .js-project-slider-dot').eq(dotIndex),
                  dotImage = $('.js-project-slider .js-project-slide').eq(dotIndex).children('img');
              sliderVariables.currentSlide.attr('data-shown', false);
              sliderVariables.currentSlide.attr('data-shown', true);
              sliderVariables.currentSlide.parent('li').fadeIn('slow');

              $('.js-project-slider-dot-active').removeClass('js-project-slider-dot-active project-slider-dot-active');
              clickedDot.addClass('js-project-slider-dot-active project-slider-dot-active');
              setInterval(function() {
                nextSlide();
              }, timing);
            });
          }
        })();
      }

      /**
       * Waypoints
       * info: http://imakewebthings.com/waypoints/
       */
      if (this.settings.waypoint.length > 0) {
        (function() {
          $('.wp-1').waypoint(function() {
            $('.wp-1').addClass('animated fadeInUp');
          }, {
            offset: '75%'
          });
          $('.wp-2').waypoint(function() {
            $('.wp-2').addClass('animated fadeInUp');
          }, {
            offset: '75%'
          });
          $('.wp-3').waypoint(function() {
            $('.wp-3').addClass('animated fadeInUp');
          }, {
            offset: '75%'
          });
          $('.wp-4').waypoint(function() {
            $('.wp-4').addClass('animated fadeIn');
          }, {
            offset: '75%'
          });
          $('.wp-5').waypoint(function() {
            $('.wp-5').addClass('animated fadeInRight');
          }, {
            offset: '50%'
          });
          $('.wp-6').waypoint(function() {
            $('.wp-6').addClass('animated fadeInLeft');
          }, {
            offset: '50%'
          });
          $('.wp-7').waypoint(function() {
            $('.wp-7').addClass('animated fadeInUp');
          }, {
            offset: '60%'
          });
          $('.wp-8').waypoint(function() {
            $('.wp-8').addClass('animated fadeInUp');
          }, {
            offset: '60%'
          });
        })()
      }

      /**
       * Blog filters
       */
      if (this.settings.blogFilter.length > 0) {
        (function() {
          // Variables for filters
          var filterSettings = {
            filterCategory: $('.js-filter-category'),
            filterType: $('.js-filter-type'),
            filterSort: $('.js-filter-sort')
          };
          // Controllers for filters
          var controllers = {
            filterReset: function() {
              // If some filter was applied, do a reset
              $(document).find('.blog__posts .blog__card').closest('.blog-post__column').fadeIn(250);
            },
            valueGetter: function(e) {
              var optionValue = $(e.target).val();
              return optionValue;
            },
            filterGetter: function(e) {
              var currentValue = controllers.valueGetter(e),
                  filterType = $(e.target).closest('select').data('filter');
              return [filterType, currentValue];
            },
            filterSetter: function(e) {
              var filterType = controllers.filterGetter(e)[0],
                  filterValue = controllers.filterGetter(e)[1],
                  postsArray = $(document).find('.blog__posts .blog__card');

              // If some filter was applied, do a reset
              //postsArray.closest('.blog-post__column').fadeIn(250);

              // Cycle through posts
              if (filterValue === 'initialtype' || filterValue === 'initialcategory' || filterValue === 'initialsort') {
                return false;
              } else if (filterValue !== 'all') {
                // Do a reset
                //controllers.filterReset();

                // Load images
                $('.lazy').lazyload({
                  event: 'filter'
                })
                $('.lazy').trigger('filter');

                if (filterType == 'type'){
                  // Filtering by the type of post
                  $(".blog__posts .blog__card[data-type='" + filterValue + "']").closest('.blog-post__column').fadeIn(250);
                  $('.blog__posts .blog__card').not("[data-type='" + filterValue + "']").closest('.blog-post__column').hide();
                } else if (filterType == 'category') {
                  // Filtering by the category of post
                  $(".blog__posts .blog__card[data-category='" + filterValue + "']").closest('.blog-post__column').fadeIn(250);
                  $('.blog__posts .blog__card').not("[data-category='" + filterValue + "']").closest('.blog-post__column').hide();
                }
              } else if (filterValue === 'all') {
                controllers.filterReset();
              }
            }
          }
          filterSettings.filterCategory.on('change', function(e) {
            controllers.filterSetter(e);
          });
          filterSettings.filterType.on('change', function(e) {
            controllers.filterSetter(e);
          });
          filterSettings.filterSort.on('change', function(e) {
            controllers.filterSetter(e);
          });
          return
        })()
      }
    },

    /**
     * Initialization of the scritps
     */
    init: function() {
      $('.no-js').removeClass('no-js');
      $('.no-js-img').removeClass('no-js-img');
      app.controllers();
    }
  }
  app.init();
})();
