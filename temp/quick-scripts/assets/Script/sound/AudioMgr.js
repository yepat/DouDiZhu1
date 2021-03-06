(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/sound/AudioMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e24c9C8R0dFuqNVoyy1ZAaq', 'AudioMgr', __filename);
// Script/sound/AudioMgr.js

"use strict";

var AppConfig = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        bgmVolume: 1.0,
        sfxVolume: 1.0,
        bgmAudioID: -1
    },
    onLoad: function onLoad() {
        this.bgmUrl = "";
        var t = cc.sys.localStorage.getItem("bgmVolume");
        this.bgmVolume = t;

        var t2 = cc.sys.localStorage.getItem("sfxVolume");
        this.sfxVolume = t2;
    },

    // use this for initialization
    init: function init() {
        var t = cc.sys.localStorage.getItem("bgmVolume");

        this.bgmVolume = 1;
        this.sfxVolume = 1;

        if (t) {
            this.bgmVolume = t;
            cc.sys.localStorage.setItem("bgmVolume", this.bgmVolume);
        } else {
            if (typeof t == "string") {
                cc.sys.localStorage.setItem("bgmVolume", this.bgmVolume);
            } else {
                this.bgmVolume = 0;
            }
        }

        var t2 = cc.sys.localStorage.getItem("sfxVolume");
        if (t2) {
            this.sfxVolume = t2;
            cc.sys.localStorage.setItem("sfxVolume", this.sfxVolume);
        } else {
            if (typeof t2 == "string") {
                cc.sys.localStorage.setItem("sfxVolume", this.sfxVolume);
            } else {
                this.sfxVolume = 0;
            }
        }
    },
    getUrl: function getUrl(url) {
        if (typeof wx == "undefined") {
            return cc.url.raw("resources/sounds/" + url + ".mp3");
        } else {
            return AppConfig.soundsPath() + url + ".mp3";
        }
    },
    getBgmUrl: function getBgmUrl() {
        return this.bgmUrl;
    },
    playBGM: function playBGM(url) {
        var audioUrl = this.getUrl(url);
        console.log(audioUrl + "bgmVolume:" + this.bgmVolume);
        this.bgmUrl = url;
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
        if (this.bgmVolume == 1) this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume);
    },
    playSFX: function playSFX(url) {
        var audioUrl = this.getUrl(url);
        if (this.sfxVolume > 0) {
            var audioId = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
        }
    },
    setSFXVolume: function setSFXVolume(v) {
        if (this.sfxVolume != v) {
            cc.sys.localStorage.setItem("sfxVolume", v);
            this.sfxVolume = v;
        }
    },
    setBGMVolume: function setBGMVolume(v) {
        console.log("-------------- setBGMVolume :" + v);
        if (this.bgmVolume != v) {
            cc.sys.localStorage.setItem("bgmVolume", v);
            this.bgmVolume = v;
        }

        if (this.bgmUrl != "" && this.bgmVolume == 1) {
            this.playBGM(this.bgmUrl);
        } else {
            cc.audioEngine.stopAll();
        }
    },
    pauseAll: function pauseAll() {
        cc.audioEngine.pauseAll();
    },
    resumeAll: function resumeAll() {
        cc.audioEngine.resumeAll();
    },
    stopMusic: function stopMusic() {
        cc.audioEngine.stopAll();
    },
    stopAllEffects: function stopAllEffects() {
        cc.audioEngine.stopAll();
    },
    getCardValue: function getCardValue(value) {
        console.log(value);
        var str = "";
        if (value == "00") {
            str = "14";
        } else if (value == "01") {
            str = "15";
        } else {
            str = value.substring(1);
            if (str == "a") {
                str = "10";
            } else if (str == "b") {
                str = "11";
            } else if (str == "c") {
                str = "12";
            } else if (str == "d") {
                str = "13";
            }
        }
        return str;
    },

    //拍桌聊天声音
    playSay: function playSay(gender, say) {
        var index = -1;
        console.log("say1:" + say);
        for (var k in AppConfig.chatContent) {
            var v = AppConfig.chatContent[k];
            if (v == say) {
                index = k;
            }
        }
        if (index == -1) return;
        var say = AppConfig.chatSay[index];
        if (gender == 1) {
            say = "Man_" + say;
        } else {
            say = "Woman_" + say;
        }
        this.playSFX(say);
    },

    //打牌时报牌的声音
    playCardsEffect: function playCardsEffect(gender, cardtype, cards) {
        if (gender == 1) {
            if (cardtype == "mingpai") {
                this.playSFX("Man_Share");
                this.playSFX("Special_Multiply");
            } else if (cardtype == "jiaodizhu") {
                this.playSFX("Man_Order");
            } else if (cardtype == "bujiao") {
                this.playSFX("Man_NoOrder");
            } else if (cardtype == "qiangdizhu") {
                this.playSFX("Man_Rob1");
            } else if (cardtype == "buqiang") {
                this.playSFX("Man_NoRob");
            } else if (cardtype == "buyao") {
                this.playSFX("Man_buyao1");
            } else if (cardtype == "baojing1") {
                this.playSFX("Man_baojing1");
                this.playSFX("Special_alert");
            } else if (cardtype == "baojing2") {
                this.playSFX("Man_baojing2");
                this.playSFX("Special_alert");
            } else if (cardtype == "dani") {
                this.playSFX("Man_dani1");
            } else if (cardtype == "jiabei") {
                this.playSFX("Man_jiabei");
            } else if (cardtype == "jiabeiNo") {
                this.playSFX("Man_jiabeiNo");
            } else if (cardtype == AppConfig.CardType.Single) {
                var value = cards[0];
                var str = this.getCardValue(value);
                this.playSFX("Man_" + str);
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.Pair) {
                var value = cards[1];
                var str = this.getCardValue(value);
                this.playSFX("Man_dui" + str);
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.ThreeOfKind) {
                var value = cards[2];
                var str = this.getCardValue(value);
                this.playSFX("Man_tuple" + str);
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.ThreeOfKindPlusOne) {
                this.playSFX("Man_sandaiyi");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.ThreeOfKindPlusPair) {
                this.playSFX("Man_sandaiyidui");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.Straight) {
                this.playSFX("Man_shunzi");
                this.playSFX("Special_star");
            } else if (cardtype == AppConfig.CardType.StraightDouble) {
                this.playSFX("Man_liandui");
                this.playSFX("Special_star");
            } else if (cardtype == AppConfig.CardType.StraightThree) {
                this.playSFX("Man_feiji");
                this.playSFX("Special_plane");
            } else if (cardtype == AppConfig.CardType.StraightThreePlusSingle) {
                this.playSFX("Man_feiji");
                this.playSFX("Special_plane");
            } else if (cardtype == AppConfig.CardType.StraightThreePlusPair) {
                this.playSFX("Man_feiji");
                this.playSFX("Special_plane");
            } else if (cardtype == AppConfig.CardType.FourPlusOne) {
                this.playSFX("Man_sidaier");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.FourPlusTwo) {
                this.playSFX("Man_sidailiangdui");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.Bomb || cardtype == AppConfig.CardType.SoftBomb || cardtype == AppConfig.CardType.LazarilloBomb) {
                this.playSFX("Man_zhadan");
                this.playSFX("Special_Bomb");
                this.playBGM("MusicEx_Exciting");
            } else if (cardtype == AppConfig.CardType.DoubleKing) {
                this.playSFX("Man_wangzha");
                this.playSFX("rocket");
                this.playBGM("MusicEx_Exciting");
            }
        } else {
            ///////
            if (cardtype == "mingpai") {
                this.playSFX("Woman_Share");
                this.playSFX("Special_Multiply");
            } else if (cardtype == "jiaodizhu") {
                this.playSFX("Woman_Order");
            } else if (cardtype == "bujiao") {
                this.playSFX("Woman_NoOrder");
            } else if (cardtype == "qiangdizhu") {
                this.playSFX("Woman_Rob1");
            } else if (cardtype == "buqiang") {
                this.playSFX("Woman_NoRob");
            } else if (cardtype == "buyao") {
                this.playSFX("Woman_buyao1");
            } else if (cardtype == "baojing1") {
                this.playSFX("Woman_baojing1");
                this.playSFX("Special_alert");
            } else if (cardtype == "baojing2") {
                this.playSFX("Woman_baojing2");
                this.playSFX("Special_alert");
            } else if (cardtype == "dani") {
                this.playSFX("Woman_dani1");
            } else if (cardtype == "jiabei") {
                this.playSFX("Woman_jiabei");
            } else if (cardtype == "jiabeiNo") {
                this.playSFX("Woman_jiabeiNo");
            } else if (cardtype == AppConfig.CardType.Single) {
                var value = cards[0];
                var str = this.getCardValue(value);
                this.playSFX("Woman_" + str);
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.Pair) {
                var value = cards[1];
                var str = this.getCardValue(value);
                this.playSFX("Woman_dui" + str);
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.ThreeOfKind) {
                var value = cards[2];
                var str = this.getCardValue(value);
                this.playSFX("Woman_tuple" + str);
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.ThreeOfKindPlusOne) {
                this.playSFX("Woman_sandaiyi");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.ThreeOfKindPlusPair) {
                this.playSFX("Woman_sandaiyidui");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.Straight) {
                this.playSFX("Woman_shunzi");
                this.playSFX("Special_star");
            } else if (cardtype == AppConfig.CardType.StraightDouble) {
                this.playSFX("Woman_liandui");
                this.playSFX("Special_star");
            } else if (cardtype == AppConfig.CardType.StraightThree) {
                this.playSFX("Woman_feiji");
                this.playSFX("Special_plane");
            } else if (cardtype == AppConfig.CardType.StraightThreePlusSingle) {
                this.playSFX("Woman_feiji");
                this.playSFX("Special_plane");
            } else if (cardtype == AppConfig.CardType.StraightThreePlusPair) {
                this.playSFX("Woman_feiji");
                this.playSFX("Special_plane");
            } else if (cardtype == AppConfig.CardType.FourPlusOne) {
                this.playSFX("Woman_sidaier");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.FourPlusTwo) {
                this.playSFX("Woman_sidailiangdui");
                this.playSFX("Special_give");
            } else if (cardtype == AppConfig.CardType.Bomb || cardtype == AppConfig.CardType.SoftBomb || cardtype == AppConfig.CardType.LazarilloBomb) {
                this.playSFX("Woman_zhadan");
                this.playSFX("Special_Bomb");
                this.playBGM("MusicEx_Exciting");
            } else if (cardtype == AppConfig.CardType.DoubleKing) {
                this.playSFX("Woman_wangzha");
                this.playSFX("rocket");
                this.playBGM("MusicEx_Exciting");
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AudioMgr.js.map
        