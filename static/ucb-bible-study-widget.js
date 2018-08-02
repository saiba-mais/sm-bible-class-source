// Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor 
  this.Modal = function() {

    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;

    // Determine proper prefix
    this.transitionEnd = transitionSelect();

    // Define option defaults 
    var defaults = {
      autoOpen: false,
      className: 'fade-and-drop',
      closeButton: true,
      overlay: true
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    if(this.options.autoOpen === true) this.open();

  }

  // Public Methods

  Modal.prototype.close = function() {
    document.getElementById('viewport').remove();
    document.documentElement.style.removeProperty('overflow');
    document.body.style.overflow = window.oldOverflow;
    var _ = this;
    this.modal.className = this.modal.className.replace(" scotch-open", "");
    this.modal.style.removeProperty('opacity');
    this.modal.style.display = 'none';
    var modalOpenTransition = '500ms top 500ms ease';
    this.modal.style.removeProperty('top');
    this.modal.style.removeProperty('-webkit-transition');
    this.modal.style.removeProperty('-moz-transition');
    this.modal.style.removeProperty('-ms-transition');
    this.modal.style.removeProperty('-o-transition');
    this.modal.style.removeProperty('transition');

    this.overlay.className = this.overlay.className.replace(" scotch-open",
      "");
    this.overlay.style.removeProperty('top');
    this.overlay.style.removeProperty('-webkit-transition');
    this.overlay.style.removeProperty('-moz-transition');
    this.overlay.style.removeProperty('-ms-transition');
    this.overlay.style.removeProperty('-o-transition');
    this.overlay.style.removeProperty('transition');
    this.overlay.style.removeProperty('opacity');
    this.overlay.style.display = 'none';

    this.modal.addEventListener(this.transitionEnd, function() {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var deviceResize = debounce(function() {
    if ( window.matchMedia("(max-width: 991px)") ) {
      this.modal.style.top ='0';
    } else {
      this.modal.style.top ='20px';
    }
    if ( window.matchMedia("(max-width: 991px)") ) {
      var modalOpenTransform = 'translate(0%, 0%)';
    } else {
      var modalOpenTransform = 'translate(-50%, 0)';
    }
  }, 300);

  Modal.prototype.open = function(dataLesson) {
    viewportMeta = document.createElement('meta');
    viewportMeta.setAttribute('id', 'viewport');
    viewportMeta.setAttribute('name', 'viewport');
    viewportMeta.setAttribute('content', 'width=device-width initial-scale=1');
    document.head.appendChild(viewportMeta);
    window.oldOverflow = document.body.style.overflow;
    buildOut.call(this, dataLesson);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " scotch-open scotch-anchored" : " scotch-open");
      if (this.modal.offsetHeight > window.innerHeight) {
        document.documentElement.style.overflow = 'hidden';
        document.html.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        deviceResize();
        var modalOpenTransform = 'translate(0, 0)';
        this.modal.style.webkitTransform = modalOpenTransform;
        this.modal.style.mozTransform = modalOpenTransform;
        this.modal.style.msTransform = modalOpenTransform;
        this.modal.style.oTransform = modalOpenTransform;
        this.modal.style.transform = modalOpenTransform;
        this.modal.style.opacity = '1';
        this.modal.style.top = '0';
        var modalOpenTransition = '500ms top 500ms ease';
        this.modal.style.webkitTransition = modalOpenTransition;
        this.modal.style.mozTransition = modalOpenTransition;
        this.modal.style.msTransition = modalOpenTransition;
        this.modal.style.oTransition = modalOpenTransition;
        this.modal.style.transition = modalOpenTransition;
      } else {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        this.modal.style.opacity = '1';
        var modalOpenTransition = '500ms top 500ms ease';
        this.modal.style.top = '50%';
        this.modal.style.webkitTransition = modalOpenTransition;
        this.modal.style.mozTransition = modalOpenTransition;
        this.modal.style.msTransition = modalOpenTransition;
        this.modal.style.oTransition = modalOpenTransition;
        this.modal.style.transition = modalOpenTransition;
      }

    window.addEventListener('resize', deviceResize);

    this.overlay.className = this.overlay.className + " scotch-open";
    this.overlay.style.display = 'block';
    this.overlay.style.opacity = '1';
    this.overlay.style.top = '0';
    var overlayOpenTransition = '500ms opacity ease';
    this.overlay.style.webkitTransition = overlayOpenTransition;
    this.overlay.style.mozTransition = overlayOpenTransition;
    this.overlay.style.msTransition = overlayOpenTransition;
    this.overlay.style.oTransition = overlayOpenTransition;
    this.overlay.style.transition = overlayOpenTransition;
  }

  // Private Methods

  function buildOut(iframeURL) {

    var contentHolder, docFrag;

    // Create a DocumentFragment to build with
    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "scotch-modal " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";
    this.modal.style.top = '-300%';
    this.modal.style.opacity = '1';
    this.modal.style.display = 'block';
    this.modal.style.position = 'absolute';
    this.modal.style.zIndex = '9999';
    this.modal.style.right = '0%';
    this.modal.style.width = '100vw';
    this.modal.style.height = '100vh';
    var modalOpacityTransition = '1ms opacity ease';
    this.modal.style.webkitTransition = modalOpacityTransition;
    this.modal.style.mozTransition = modalOpacityTransition;
    this.modal.style.msTransition = modalOpacityTransition;
    this.modal.style.oTransition = modalOpacityTransition;
    this.modal.style.transition = modalOpacityTransition;
    var modalTransform = 'translate(0%, -50%)';
    this.modal.style.webkitTransform = modalTransform;
    this.modal.style.mozTransform = modalTransform;
    this.modal.style.msTransform = modalTransform;
    this.modal.style.oTransform = modalTransform;
    this.modal.style.transform = modalTransform;
    this.modal.style.borderRadius = '2px';
    this.modal.style.background = 'transparent';
    var modalTopTransition = '500ms top ease';
    this.modal.style.webkitTransition = modalTopTransition;
    this.modal.style.mozTransition = modalTopTransition;
    this.modal.style.msTransition = modalTopTransition;
    this.modal.style.oTransition = modalTopTransition;
    this.modal.style.transition = modalTopTransition;

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "scotch-close close-button";
      //this.closeButton.innerHTML = "&times;";
      //this.closeButton.style.fontFamily = 'Helvetica,Arial,sans-serif';
      //this.closeButton.style.fontSize = '24px';
      //this.closeButton.style.lineHeight = '12px';
      this.closeButton.style.position = 'absolute';
      this.closeButton.style.zIndex = '1';
      this.closeButton.style.top = '5px';
      this.closeButton.style.right = '5px';
      this.closeButton.style.height = '40px';
      this.closeButton.style.width = '40px';
      this.closeButton.style.cursor = 'pointer';
      //this.closeButton.style.color = '#eee';
      this.closeButton.style.border = '0';
      this.closeButton.style.borderRadius = '50%';
      this.closeButton.style.outline = 'none';
      this.closeButton.style.background = 'transparent';
      onMouseOver = this.closeButton.style.background = 'transparent';
      this.closeButtonSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.closeButtonSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      this.closeButtonSvg.setAttribute('width', '40');
      this.closeButtonSvg.setAttribute('height', '40');
      this.closeButtonSvg.setAttribute('viewBox', '0 0 40 40');
      this.closeButtonSvg.style.position = 'absolute';
      this.closeButtonSvg.style.top = '0';
      this.closeButtonSvg.style.right = '0';

      this.closeButtonSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.closeButtonSvgPath.setAttribute('fill', '#000000');
      this.closeButtonSvgPath.setAttribute('fill-opacity', '.158');
      this.closeButtonSvgPath.setAttribute('fill-rule', 'evenodd');
      this.closeButtonSvgPath.setAttribute('d' , 'M1402,17 C1390.95,17 1382,25.95 1382,37 C1382,48.05 1390.95,57 1402,57 C1413.05,57 1422,48.05 1422,37 C1422,25.95 1413.05,17 1402,17 Z M1412,44.17 L1409.17,47 L1402,39.83 L1394.83,47 L1392,44.17 L1399.17,37 L1392,29.83 L1394.83,27 L1402,34.17 L1409.17,27 L1412,29.83 L1404.83,37 L1412,44.17 Z');
      this.closeButtonSvgPath.setAttribute('style', 'mix-blend-mode:multiply');
      this.closeButtonSvgPath.setAttribute('transform', 'translate(-1382 -17)');

      this.closeButtonSvg.appendChild(this.closeButtonSvgPath);
      this.closeButton.appendChild(this.closeButtonSvg);

      this.modal.appendChild(this.closeButton);
    }

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "scotch-overlay " + this.options.className;
      this.overlay.style.display = 'block';
      this.overlay.style.opacity = '1';
      this.overlay.style.position = 'fixed';
      this.overlay.style.zIndex = '9998';
      this.overlay.style.top = '0';
      this.overlay.style.left = '0';
      this.overlay.style.width = '100%';
      this.overlay.style.height = '100%';
      this.overlay.style.background = 'rgba(0,0,0,.6)';
      var overlayOpacityTransition = '500ms opacity 500ms ease';
      this.overlay.style.webkitTransition = overlayOpacityTransition;
      this.overlay.style.mozTransition = overlayOpacityTransition;
      this.overlay.style.msTransition = overlayOpacityTransition;
      this.overlay.style.oTransition = overlayOpacityTransition;
      this.overlay.style.transition = overlayOpacityTransition;

      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "scotch-content";
    modalIframe = document.createElement('iframe');
    modalIframe.setAttribute('src', iframeURL);
    modalIframe.style.position = 'relative';
    modalIframe.style.width = '100%';
    modalIframe.style.height = '100%';
    modalIframe.style.border = '0';
    contentHolder.appendChild(modalIframe);
    contentHolder.style.height = '100%';
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }

  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());

var ucbBibleStudyLessonModal = new Modal({});

var triggerButton = document.querySelectorAll('.saiba-mais-widget');

for (var i = 0 ; i < triggerButton.length; i++) {

  triggerButton[i].addEventListener('click', function() {
    var language = this.getAttribute('data-lang');
    var currentLesson = this.getAttribute('data-lesson');
    var lessonURL = 'http://192.168.1.89:5000/?lesson=' + currentLesson + '&lang=' + language;
    ucbBibleStudyLessonModal.open(lessonURL);
  });
}