// Let the JavaScripting begin!

// First things first is a requestAnimationFrame polyfill/fallback for better browser support
(function() {
  'use strict';

    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
      }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
      }
}());


//
// The architecture for this plugin is inspired by Ken Wheeler's article on Scotch.io:
// http://scotch.io/tutorials/javascript/building-your-own-javascript-modal-plugin
//
// Defining a basic constructor for the plugin so initiating will be:
// var elv = new Elevatr();

(function() {
  'use strict';

  window.Elevatr = function() {

    this.windowTop = null;
    this.windowHeight = null;
    this.docBottom = null;
    this.endPos = null;
    this.count = 0;
    this.currentVal = null;
    this.requestID = null;
    this.steps = null;
    this.targetEl = null;

    var defaults = {
      speed: 2000,
      callback: function(){
        console.log('From the top, now we here.');
      },
      ease: 'linear',
      pushState: true,
      padding: 0
    };

    // Create options by extending defaults with the passed in arguments
    if(arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    } else {
      this.options = defaults;
    }
  };

  // Public Methods

  // elv.setTrigger('#jump-link') || elv.setTrigger('.jump-links');
  Elevatr.prototype.setTrigger = function(anchor){
    var matchEl = anchor.match(/^#|\.|a/);

    // grabbing the trigger element from the DOM
    if( matchEl ) {
     var triggers = document.querySelectorAll(anchor);

     if (triggers !== undefined || triggers.length > 0) {
       var i = triggers.length,
           x = 0;
       while(i--) {
         triggers[x].addEventListener('click', this.triggerJump.bind(this), false);
         x++;
       }
     } else {
       console.warn('This element doesn\'t exist');
       return;
     }

    } else {
      console.warn('Please specify an anchor element by id, class, or tag');
      return;
    }
  };

  // Used internally but still public if the dev wants to use it without setTrigger
  Elevatr.prototype.triggerJump = function(e) {
    e.preventDefault();

    this.windowTop = window.pageYOffset;
    this.windowHeight = window.innerHeight;
    this.docBottom = document.body.offsetHeight;
    this.targetEl = document.querySelector(e.target.hash);
    this.endPos = this.targetEl.offsetTop - this.options.padding;
    this.steps = this.endPos - this.windowTop;

    scrollTo.call(this);
    window.history.pushState(null, null, e.target.hash);
  };

  // Private Methods

  function extendDefaults(source, props) {
    var prop;
    for(prop in props) {
      if(props.hasOwnProperty(prop)) {
        source[prop] = props[prop];
      }
    }
    return source;
  }

  function scrollTo() {
    //console.dir(this);
    var total = (this.options.speed / 1000) * 60;
    var stop;

    //this.currentVal = (this.steps * this.count) / (total + this.windowTop);
    var easeFn = this.options.ease;

    var stepBy = eval(easeFn)(this.count, this.windowTop, this.steps, total);

    window.scrollTo(0, stepBy);

    if(this.steps > 0) {
      stop = window.pageYOffset + this.windowHeight >= this.docBottom || window.pageYOffset >= this.endPos;
    } else {
      stop = window.pageYOffset === 0 || window.pageYOffset <= this.endPos;
    }

    console.log(stop);
    if(stop) {
      this.count = 0;
      cancelAnimationFrame(this.requestID);
      this.options.callback.call(this);
      this.requestID = null;
    } else {
      this.count++;
      this.requestID = requestAnimationFrame(scrollTo.bind(this));
    }

  }

  // Easing functions

  function linear(currentIteration, startValue, changeInValue, totalIterations) {
  	return changeInValue * currentIteration / totalIterations + startValue;
  }

  function easeInQuad(currentIteration, startValue, changeInValue, totalIterations) {
  	return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
  }

  function easeOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
  	return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
  }

  function easeInOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
  	if ((currentIteration /= totalIterations / 2) < 1) {
  		return changeInValue / 2 * currentIteration * currentIteration + startValue;
  	}
  	return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
  }

}());
