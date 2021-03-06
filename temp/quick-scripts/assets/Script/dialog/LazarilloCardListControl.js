(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/dialog/LazarilloCardListControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0f81dFeq5ZMW7N2Emr13L4l', 'LazarilloCardListControl', __filename);
// Script/dialog/LazarilloCardListControl.js

"use strict";

var PokerControl = require("PokerControl");
var config = require("config");
var CardUtil = require("CardUtil");
var GameNetMgr = require("GameNetMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        pokerCard: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {
        this.index = -1;
    },
    start: function start() {
        // var cards = ["25", "15", "14", "43"];
        // this.show(cards);
    },
    show: function show(lazCards, index, parentNode) {
        this.index = index;
        this.lazCards = lazCards;
        this.parentNode = parentNode;

        var cards = lazCards[0];
        var pokerData = CardUtil.serverCardsToClient(cards);
        var jokto = lazCards[1];
        var joktoIndex = 0;
        var jokerValue = CardUtil.serverCardValueToClient(config.joker);
        for (var i = 0; i < pokerData.length; i++) {
            var cardNode = cc.instantiate(this.pokerCard);
            cardNode.parent = this.node;
            cardNode.scale = 0.3;
            var poker = cardNode.getComponent(PokerControl);
            pokerData[i].canTouch = false;
            if (jokto[joktoIndex] && pokerData[i].showTxt == jokerValue) {
                var joktoValue = CardUtil.serverCardValueToClient(jokto[joktoIndex]);
                poker.convertLazarillo(joktoValue);
                joktoIndex++;
            } else {
                poker.showPoker(pokerData[i]);
            }
        }
    },
    Click: function Click() {
        console.log("cardlist click");
        if (this.index != -1) {
            console.log("index = ", this.index);
            var jackto = this.lazCards[1];
            for (var i = 0; i < jackto.length; i++) {
                jackto[i] = CardUtil.serverCardValueToServer(jackto[i]);
            }
            GameNetMgr.sendRequest("Game", "sendCard", { 0: this.lazCards[0], 1: jackto });
            if (this.parentNode) {
                console.log("-----parentNode.closeClick");
                this.parentNode.closeClick();
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
        //# sourceMappingURL=LazarilloCardListControl.js.map
        