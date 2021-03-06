"use strict";
cc._RF.push(module, '72169xwyh5J6r9Ilqxc5XxE', 'doubleControl');
// Script/animation/doubleControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        addNum: {
            default: null,
            type: cc.Sprite
        },
        animNode: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        var width = cc.director.getWinSize().width;
        console.log("width:" + width);
        this.node.width = width;
    },
    start: function start() {
        // var self = this;
        // var callFunc = cc.callFunc(function(){
        //     self.node.destroy();
        // });
        // var delay = cc.delayTime(1);
        // this.node.runAction(cc.sequence(delay,callFunc)); 
        // this.show(1);
    },
    show: function show(args) {
        var self = this;
        var times = args.arg1;
        var seatNum = args.arg2;
        if (times < 2 || times > 5) return;

        console.log(">>>seatNum:" + seatNum);

        if (seatNum == 1) {//自己   
        } else if (seatNum == 0) {
            //右边
            this.animNode.x = this.node.width / 5;
        } else if (seatNum == 2) {
            //左边
            this.animNode.x = -this.node.width / 5;
        }

        if (times != 2) {
            var numUrl = "showTips/p_addX" + times;
            console.log(numUrl);
            cc.loader.loadRes(numUrl, cc.SpriteFrame, function (err, spriteFrame) {
                self.addNum.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        var scaleTo_1 = cc.scaleTo(0.1, 1.2);
        var scaleTo_2 = cc.scaleTo(0.1, 0.95);
        var scaleTo_3 = cc.scaleTo(0.1, 1);
        var delayTime = cc.delayTime(0.1);
        var fadeTo = cc.fadeTo(0.2, 0);
        var callFunc = cc.callFunc(function () {
            self.node.destroy();
        });
        this.animNode.runAction(cc.sequence(delayTime, scaleTo_1, scaleTo_2, scaleTo_3, delayTime, fadeTo, callFunc));
    },
    close: function close() {
        this.node.destroy();
    }
});

cc._RF.pop();