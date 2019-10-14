//======================================
//[== Common API ==]
//====================================== 

function createPostPromise(url, data) {
    return $.ajax({
        'type': 'POST',
        'dataType': 'json',
        'url': url,
        'data': data
    });
};

function createGetPromise(url) {
    return $.ajax({
        'type': 'GET',
        'dataType': 'json',
        'url': url
    });
};

function getLanguages() {
    var url = '/api/languages/search';
    var data = {
        "enabled": 1
    };
    return createPostPromise(url, data);
};

function getModel(customerId, qSetId) {
    var url = '/customer/api/question/search?';
    url += 'customerId=' + customerId;
    url += '&';
    url += 'qSetId=' + qSetId;
    return createGetPromise(url);
};

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

function sendVote(data) {
    console.log(data);
    $.ajax({
        'type': 'POST',
        'dataType': 'json',
        'url': '/customer/api/question/vote/save',
        'data': data,
        'success': function (result) {
            console.log(result);
        }
    });
};

//======================================
//[== Reveal Render Class ==]
//====================================== 
/**
 * Reveal Render constructor.
 */
RevealRender = function (el) {
    var self = this;

    this.$slides = $(el);
    this.langId = ""
    this.selectedLanguage = null;
    this.languages = [];

    this.model = null;
    /*
    var client = new ClientJS(); // Create A New Client Object
    this.fingerprintId = client.getFingerprint();
    */
};

/** 
 * Init Reveal.js
*/
RevealRender.prototype.Init = function () {
    var self = this;
    //console.log('Slide Render Init.');
    Reveal.initialize({
        // The "normal" size of the presentation, aspect ratio will be preserved
        // when the presentation is scaled to fit different resolutions. Can be
        // specified using percentage units.
        width: "100%",
        height: "100%",
        controls: false,
        progress: false,
        history: false,
        center: true,
        margin: 0,
        minScale: 0.2,
        maxScale: 1.5,
        transition: 'slide' // none/fade/slide/convex/concave/zoom
    });

    Reveal.addEventListener('slidechanged', function (event) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        self.refreshUI();
        if (Reveal.isLastSlide()) {
            var $currSlide = $(Reveal.getCurrentSlide());
            var action = $currSlide.attr('data-action');
            var srcUrl = null;
            if (action === 'playSound') {
                srcUrl = $currSlide.attr('data-url-' + self.langId);
                self.playSound(srcUrl, 0);
            }
        }
    });
};
/** 
 * Load Model by customer id and qsetid.
*/
RevealRender.prototype.LoadModel = function () {
    var self = this;

    var customerId = 'EDL-C2019100003';//getParameterByName('customerId');
    var qSetId = 'QS00001';//getParameterByName('qSetId');

    $.when(getModel(customerId, qSetId)).done(function (result) {
        if (!result.errors.hasError) {
            // Setup Model
            self.model = result.data;
            // Setup Languages
            var iMax = self.model.languages.length;
            for (var i = 0; i < iMax; i++) {
                self.languages.push(self.model.languages[i]);
            }
        }
        else {
            console.log(result.errors.errMsg);
            self.model = null;
        }
        self.render();
        if (self.langId === '') {
            self.langId = 'EN'
        }
        self.ChangeLanguage(self.langId);
    });
};
/**
 * Change Language.
 * @param {string} langId 
 * @param {boolean} autoNextPage
 */
RevealRender.prototype.ChangeLanguage = function (langId, autoNextPage) {
    var self = this;
    if (!self.languages)
        return;

    var matchLang = self.languages.find(function(element) {
        return langId === element.LangId;
    });

    if (!matchLang) {
        console.log('cannot find language.');
        return;
    }

    self.langId = langId;
    self.selectedLanguage = matchLang;

    var xSlides = $('.x-slide');
    $.each(xSlides, function (index, value) {
        var $val = $(value);
        if ($val.hasClass('visible')) {
            $val.removeClass('visible');
            var $videos = $val.find('video');
            $.each($videos, function (index, value) {
                try {
                    //$(value).get(0).pause();
                    value.pause();
                    value.currentTime = 0;
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
    });

    self.refreshUI();

    if (autoNextPage === true) {
        Reveal.next();
    }
};

RevealRender.prototype.refreshUI = function() {
    var curr = Reveal.getCurrentSlide();
    var $section = $(curr);
    var $slides = $section.find('.x-slide');
    var self = this;

    $.each($slides, function (index, value) {
        var $val = $(value);
        if ($val.attr('langid') === self.langId) {
            $val.addClass('visible');
            var $videos = $val.find('video');
            //console.log($videos);
            $.each($videos, function (index, value) {
                //console.log('playing: ', value);
                //$(value).get(0).play();
                try {
                    value.pause();
                    value.currentTime = 0;
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    value.play();
                }
            });
        }
        else {
            $val.removeClass('visible');
        }
    });
};

RevealRender.prototype.SendVote = function (qSeq, voteVal) {
    var self = this;
    var data = {
        "customerId": self.model.keyIDs.CustomerId,
        "orgId": getParameterByName('orgId'),//self.model.keyIDs.OrgId,
        "branchId": self.model.keyIDs.BranchId,
        "qSetId": self.model.keyIDs.QSetId,
        "userId": getParameterByName('userId'),//self.model.keyIDs.UserId,
        "deviceId": getParameterByName('deviceId'),
        "qSeq": qSeq,
        "voteDate": moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        "voteValue": voteVal,
        "remark": null
    };

    sendVote(data);
    Reveal.next();
    //e.preventDefault();
    //return false;
};

RevealRender.prototype.playSound = function(url, nextPageNo) {
    var howler = new Howl({
        src: [url],
        autoplay: true,
        loop: false,
        onend: function () {
            Reveal.slide(0);
        }
    });

};

RevealRender.prototype.addToDOM = function ($parent, elem) {
    var self = this;
    if (elem["<>"] === 'undefined' || elem["<>"] === null ||
        typeof elem["<>"] === 'undefined') {
        //console.log('Not tag element.', $parent, elem);
        return null;
    }
    else {
        var tag = elem["<>"];
        //console.log('found tag: ', tag);
        var $el = $(document.createElement(tag));
        if (elem.class)
            $el.addClass(elem.class);
        if (elem.attr)
            $el.attr(elem.attr);
        if (elem.css)
            $el.css(elem.css);
        if (elem.text)
            $el.html(elem.text);

        $parent.append($el);

        // check has child elements.
        if (elem.elements) {
            $.each(elem.elements, function (index, item) {
                var $newEl = self.addToDOM($el, item);
            });
        }

        return $el;
    }
};

RevealRender.prototype.render = function() {
    var self = this;
    
    if (!self.model) {
        console.log('model is null.');
    }
    else {
        var tmplSlides = self.model.slides;
        if (!tmplSlides || tmplSlides.length <= 0) {
            console.log('template is undefined or empty.');            
        }
        else {
            var $root = self.$slides;
            $.each(tmplSlides, function(index, elem) {
                var $newEl = self.addToDOM($root, elem);
            });
        }
    }
    // after render init the reveal.
    self.Init();
};

;(function(){
    videojs.options.controls = true;
    videojs.options.preload = true;
    videojs.options.autoplay = true;

    var elSlides = $('.slides')[0];
    var rr = new RevealRender(elSlides);
    window.rr = rr;
    rr.LoadModel();
})();