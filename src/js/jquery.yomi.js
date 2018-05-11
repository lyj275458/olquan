(function ($) {
    $.fn.yomi = function (st,page) {
        var data = "";
        var _DOM = null;
        var TIMER;
        var nol;
        var _serverTime = st;
        var _cupage = page;
        var createdom = function (dom) {
            _DOM = dom;
            data = $(dom).attr("data");
            data = data.replace(/-/g, "/");
            data = Math.round((new Date(data)).getTime() / 1000);
            //$.get("http://apiproxy.yishu.ts/gateway/servertime?format=json", {}, function (json) {
            //    _serverTime = json.ServerTime;
            //    initDom();
            //});
            initDom();
        };
        var initDom = function () {
            _serverTime = _serverTime.replace(/-/g, "/");
            var range = data - Math.round((new Date(_serverTime)).getTime() / 1000),
                secday = 86400, sechour = 3600,
                days = parseInt(range / secday),
                hours = parseInt((range % secday) / sechour),
                min = parseInt(((range % secday) % sechour) / 60),
                sec = ((range % secday) % sechour) % 60;
            $(_DOM).find(".yomiday").html(nol(days));
            $(_DOM).find(".yomihour").html(nol(hours));
            $(_DOM).find(".yomimin").html(nol(min));
            $(_DOM).find(".yomisec").html(nol(sec));
            if (range > 0) {
                $(_DOM).append("<ul class='yomi'><li class='yomiday'></li><li class='split'>天</li><li class='yomihour'></li><li class='split'>时</li><li class='yomimin'></li><li class='split'>分</li><li class='yomisec'></li><li class='split'>秒</li></ul>");
            } else {
                $(_DOM).append('<b>拍卖已结束</b>');
            }
        };
        var reflesh = function () {
            var range = data - Math.round((new Date()).getTime() / 1000),
                secday = 86400, sechour = 3600,
                days = parseInt(range / secday),
                hours = parseInt((range % secday) / sechour),
                min = parseInt(((range % secday) % sechour) / 60),
                sec = ((range % secday) % sechour) % 60;
            if (range < 0) {
                if (_cupage == "index") {
                    $(_DOM).prev().css("display", "none");
                    $(_DOM).html('<div style="font-size:20px"><b style="color:#999">拍卖已结束</b></div>');
                }
                if (_cupage == "list") {
                    $(_DOM).after('<div class="xg-over">已结束</div>');
                    //$(_DOM).html('<div style="margin-top:6px;font-size:20px"><b>拍卖已结束</b></div>');
                    $(_DOM).remove();
                }
                
                if (_cupage == "detail") {
                    $(".cpxx-c-c").html('<h3 style="text-align:center;line-height:140px;font-size:24px;">拍品已结束</h3>');
                    $(".cpxx-date span").html("拍品已结束");
                    $(".cpxx-date i").html("结束时间 " + $(_DOM).attr("data"));
                    $(".cpxx-date").next().remove();//remove remind
                    $(_DOM).children().remove();
                }
                return;
            }
            $(_DOM).find(".yomiday").html(nol(days));
            $(_DOM).find(".yomihour").html(nol(hours));
            $(_DOM).find(".yomimin").html(nol(min));
            $(_DOM).find(".yomisec").html(nol(sec));
        };
        TIMER = setInterval(reflesh, 1000);
        nol = function (h) {
            return h > 9 ? h : '0' + h;
        };
        return this.each(function () {
            var $box = $(this);
            createdom($box);
        });
    };
    
})(jQuery);

(function ($) {
    $.fn.yomi2 = function() {
        var data = "";
        var _DOM = null;
        var TIMER;
        createdom = function(dom) {
            _DOM = dom;
            data = $(dom).attr("data");
            data = data.replace(/-/g, "/");
            data = Math.round((new Date(data)).getTime());

            var range = data - Math.round((new Date()).getTime()),
                secday = 86400000, sechour = 3600000,
                days = parseInt(range / secday),
                hours = parseInt((range % secday) / sechour),
                min = parseInt(((range % secday) % sechour) / 60000),
                sec = parseInt((((range % secday) % sechour) % 60000) / 1000),
                haom = parseInt(((((range % secday) % sechour) % 60000) % 1000) / 100);


            $(_DOM).find(".yomiday").html(nol(days));
            $(_DOM).find(".yomihour").html(nol(hours));
            $(_DOM).find(".yomimin").html(nol(min));
            $(_DOM).find(".yomisec").html(nol(sec));
            $(_DOM).find(".yomihaom").html(nol(haom));


            if (range > 0) {
                setTimeout(function() {
                    $(_DOM).append('拍卖已结束')
                }, range)
                $(_DOM).append("<div class='yomi'><span class='yomitype'></span><span class='yomiday'></span><span class='split'>天</span><span class='yomihour'></span><span class='split'>时</span><span class='yomimin'></span><span class='split'>分</span><span class='yomisec'></span><span class='split'>秒</span></div>")
            } else {
                $(_DOM).append('')
            }

        };
        reflash = function() {
            var range = data - Math.round((new Date()).getTime()),
                secday = 86400000, sechour = 3600000,
                days = parseInt(range / secday),
                hours = parseInt((range % secday) / sechour),
                min = parseInt(((range % secday) % sechour) / 60000),
                sec = parseInt((((range % secday) % sechour) % 60000) / 1000),
                haom = parseInt(((((range % secday) % sechour) % 60000) % 1000) / 10);


            $(_DOM).find(".yomiday").html(nol(days));
            $(_DOM).find(".yomihour").html(nol(hours));
            $(_DOM).find(".yomimin").html(nol(min));
            $(_DOM).find(".yomisec").html(nol(sec));
            $(_DOM).find(".yomihaom").html(nol(haom));


        };
        TIMER = setInterval(reflash, 10);
        nol = function(h) {
            return h > 9 ? h : '0' + h;
        }
        return this.each(function() {
            var $box = $(this);
            createdom($box);
        });
    };
    
})(jQuery);

var _CurrentServerTime;
var _PageTag;
$.ajax({
    type: "get",
    async: false,
    url: "https://api.yishu.com/gateway/servertime?callback=initServerTime",
    success: function (json) {
        initServerTime.call(this, json);
    }
});
function initServerTime(data) {
    this._CurrentServerTime = data.ServerTime;
}

$(function () {
    if (_PageTag == undefined) {
        _PageTag = "";
    }
    $(".yomibox2").each(function () {
        
        $(this).yomi(_CurrentServerTime,_PageTag);
    });
});

var init = function (_CheckDate, _CurrentDate) {
    //初始化yomibox3
    $(".yomibox3").each(function () {
        $(this).yomi2();
    });
    //根据生成的yomi增加文字
    $('.yomitype').each(function () {
        if (_CheckDate == _CurrentDate)
            $(this).html("距结束:");
        else {
            $(this).html("距开始:");
        }
    });
};