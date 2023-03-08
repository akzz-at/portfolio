//Typewriter
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};


//Email JS
(function () {
    emailjs.init("user_mXdQV47fKgmgDzcJm0fT0");
})();


window.onload = function () {
    //Typewriter
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff;color: rgb(74, 75, 87);font-size:2.0rem;text-decoration: none!important;}";
    document.body.appendChild(css);

    //Email JS
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('default_service', 'contact_form', this)
            .then(function () {
                console.log('SUCCESS!');
                document.getElementById('contact-image-toggle').src = './images/contact_reply.png';
                window.location.href = '#contact';

            }, function (error) {
                console.log('FAILED...', error);
                document.getElementById('contact-image-toggle').src = './images/contact_fail.png';
                window.location.href = '#contact';
            });
    });
};

jQuery(window).on('load', function () {
    var loader = $(".loader");
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var o = 0;

    loader.css({
        top: wHeight / 2 - 2.5,
        left: wWidth / 2 - 200
    })

    do {
        loader.animate({
            width: o
        }, 10)
        o += 3;


    } while (o <= 400)
    if (o === 402) {
        loader.animate({
            left: 0,
            width: '100%'
        })
        loader.animate({
            top: '0',
            height: '100vh'
        })
        document.getElementsByTagName("body")[0].style = "overflow: hidden"

        setTimeout(function () {
            document.getElementsByTagName("body")[0].style = "overflow: visible"
            jQuery(".loader-wrapper").fadeOut(500);
            jQuery(".loader").fadeOut(500);
        }, 3000)


    }
})