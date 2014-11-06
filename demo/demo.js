// How it is used on the page.
document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  
  function focusBox() {
    if (this.targetEl.classList.contains('focus') ) {
      this.targetEl.classList.remove('focus');
    }

    this.targetEl.classList.add('focus');
  }

  var jumper = new Elevatr({
    speed: 1000,
    callback: focusBox
  });

  jumper.setTrigger('.jumper');
}, false);
