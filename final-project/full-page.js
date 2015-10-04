// Background to my project
// A while ago I was looking for a plugin that would enable each section of a one-page site to span
// the height and width of the current viewport. I also wanted something that would auto-scroll so
// that each panel was always fully in view. I had a search around the internet but couldn't find
// any plugins that did just that and nothing else - they tended to do a lot of other stuff as well
// which I didn't need. I also didn't want to have to rely on jQuery. So for my project I've built
// a lightweight library that adds the functionality I need, without having any dependencies that
// come along with it. Browsers currently supported are IE10+ and most recent builds of everything
// else as requestAnimationFrame won't work, but there should be a way of creating a polyfill with
// setTimeout if I find this support is needed later.

// To use the plugin, you simply call fullScreenPanels.init and pass in the options:
//    scrollInit:        (boolean, required)   [scroll functionality]
//    mobileBreakpoint:  (number, optional)    [min viewport width, if none is supplied then functionality extends affects mobile]
//    minHeight:         (number, required)    [min height for full screen panels]

// setup

var fullScreenPanels = (function() {
  var obj = {},
      sections = document.getElementsByClassName('fullScreenPanel'),
      closestPanel,
      negativeDiff = null

  function setSectionHeight() {
    // get height of current window
    var winHeight = (window.innerHeight > obj.options.minHeight) ? window.innerHeight : obj.options.minHeight,
        mobileWidth = obj.options.mobileBreakpoint ? obj.options.mobileBreakpoint : 0

    // only if not mobile
    if (window.innerWidth > mobileWidth) {
        // set height of sections
        for (var i = 0; i < sections.length; i++) {
          // console.log('setSectionHeight')
          sections[i].style.height = winHeight + 'px';
        }
    }

  }

  // find closest panel and scroll to it
  function findClosestPanel() {

    var differences = [],
        lowestDiff = Infinity

    if (lowestDiff !== 0) {

      // work out closest element
      for (var i = 0; i < sections.length; i++) {
        var difference = window.scrollY - sections[i].offsetTop

        if (difference < 0) {
          // turn any negative number into a positive
          negativeDiff = true
          difference = Math.abs(difference)
        }
        else {
          negativeDiff = false
        }

        // if less than the last number, compare this with lowestDiff
        // if smaller, updated difference and closestPanel
        if (difference < lowestDiff) {
          lowestDiff = difference
          closestPanel = sections[i]
        }

        // briefly remove scrollInit
        window.onscroll = null

        scroll()

        setTimeout(function(){
          scrollInit()
        }, 500)

      }
    }

  }


  function scroll() {

    // if current scroll is lower than top of closest panel
    // Scroll Down
    if (window.scrollY > closestPanel.offsetTop + 20) {
      scrollTo(0, window.scrollY-5)
      window.requestAnimationFrame(scroll)
    }

    // the last few pixels
    else if (window.scrollY > closestPanel.offsetTop) {
      scrollTo(0, window.scrollY-1)
      window.requestAnimationFrame(scroll)
    }

    // if current scroll is lower than top of closest panel
    // Scroll Up
    else if (window.scrollY < closestPanel.offsetTop - 20) {
      scrollTo(0, window.scrollY+5)
      window.requestAnimationFrame(scroll)
    }

    // the last few pixels
    else if (window.scrollY < closestPanel.offsetTop) {
      scrollTo(0, window.scrollY+1)
      window.requestAnimationFrame(scroll)
    }

  }

  function scrollInit() {

    var mobileWidth = obj.options.mobileBreakpoint ? obj.options.mobileBreakpoint : 0

    if (obj.options.scrollInit && window.innerWidth > mobileWidth) {

      var timeout = null

      // run scrollInit when scrolling has finished
      window.onscroll = function() {
          if (timeout !== null) {
              clearTimeout(timeout)
          }
          timeout = setTimeout(scrollEnd, 300);
      }

      function scrollEnd() {
          findClosestPanel()
          timeout = null
      }

    }

  }

  // initiate
  obj.init = function(options) {
    this.options = options

    setSectionHeight()
    scrollInit()

    // update on resize
    window.onresize = setSectionHeight;
  }

  return obj
})()

// load libary
window.onload = function() {
  fullScreenPanels.init({
    scrollInit:       true,
    mobileBreakpoint: 640,
    minHeight:        400
  })
}

// Test - functionality should work when mobile
// window.onload = function() {
//   fullScreenPanels.init({
//     scrollInit:       true,
//     minHeight:        400
//   })
// }

// Test - should disable scroll
// window.onload = function() {
//   fullScreenPanels.init({
//     scrollInit:       false,
//     minHeight:        400
//   })
// }