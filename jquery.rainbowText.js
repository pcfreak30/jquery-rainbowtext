;
(function ($) {
    $.fn.rainbowText = function (options) {
        this.moveRainbow = function () {
            if (this.options.hue > 359) this.options.hue -= 360;
            var color;
            var b = this.options.brt;
            var a = this.data.length;
            var h = this.options.hue;
            for (var i = 0; i < a; i++) {

                if (h > 359) h -= 360;

                if (h < 60) {
                    color = Math.floor(((h) / 60) * b);
                    red = b;
                    grn = color;
                    blu = 0;
                } else if (h < 120) {
                    color = Math.floor(((h - 60) / 60) * b);
                    red = b - color;
                    grn = b;
                    blu = 0;
                } else if (h < 180) {
                    color = Math.floor(((h - 120) / 60) * b);
                    red = 0;
                    grn = b;
                    blu = color;
                } else if (h < 240) {
                    color = Math.floor(((h - 180) / 60) * b);
                    red = 0;
                    grn = b - color;
                    blu = b;
                } else if (h < 300) {
                    color = Math.floor(((h - 240) / 60) * b);
                    red = color;
                    grn = 0;
                    blu = b;
                } else {
                    color = Math.floor(((h - 300) / 60) * b);
                    red = b;
                    grn = 0;
                    blu = b - color;
                }

                h += this.options.hInc;
                $(this.options.el).children().eq(i).css("color", "rgb(" + red + ", " + grn + ", " + blu + ")");
            }

            this.options.hue += this.options.hspd;
        }
        this.options = $.extend({
            'deg': 360,
            'hue': 0,
            'hspd': 3,
            'speed': 0,
            'brt': 255,
        }, options);
        this.options.deg = Math.abs(this.options.deg);
        this.options.hue = Math.abs(this.options.hue) % 360;
        this.options.hspd = Math.abs(this.options.hspd) % 360;
        this.options.el = $(this);
        this.data = $(this).text();
        this.options.speed = Math.abs(this.options.speed);
        this.options.hInc = this.options.deg / this.data.length;
        this.options.brt = Math.abs(this.options.brt) % 256;
        this.options.el.html("");
        for (var i = 0; i < this.data.length; i++) {
            this.options.el.append("<span>" + this.data.charAt(i) + "</span>");
        }
        var p = this;
        setInterval(function () {
            p.moveRainbow();
        }, this.options.speed);
    }
})(jQuery);


$(function () {
    $("p").rainbowText();
});
