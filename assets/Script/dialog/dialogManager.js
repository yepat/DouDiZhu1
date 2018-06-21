
var commonControl = require("commonControl");

var CancelDelegateController = require("CancelDelegateController");
var opratShowCardControl = require("opratShowCardControl");
var opratDoubleControl = require("opratDoubleControl");

var doubleControl = require("doubleControl");

var dialogManager = cc.Class({
    extends: cc.Component,
    statics: {
        showDialog(prefabUrl,mControl,args){
            cc.loader.loadRes(prefabUrl, function (err, prefab) {
                if (err) {
                    console.log(err);
                    return;
                }
                var newNode = cc.instantiate(prefab);
                cc.director.getScene().addChild(newNode,9999);
                if(mControl){
                    newNode.getComponent(mControl).show(args);
                    return newNode.getComponent(mControl);
                }    
            });
        },
        showCommonDialog(title,content,enterClick,cancelClick){
            var args = {};
            args.arg1 = title;
            args.arg2 = content;
            args.arg3 = enterClick;
            args.arg4 = cancelClick;
            this.showDialog("prefab/commonDialog",commonControl,args);
        },
        showBagDialog(){
            this.showDialog("prefab/bagDialog");
        },
        showEmailDialog(){
            this.showDialog("prefab/emailDialog");
        },
        showExchangeDialog(){
            this.showDialog("prefab/exchangeDialog");
        },
        showFanKuiDialog(){
            this.showDialog("prefab/fankuiDialog");
        },
        showAboutDialog(){
            this.showDialog("prefab/aboutDialog");
        },
        showGameResultDialog(isWin){
            if(isWin){
                this.showDialog("prefab/gameResultWin");
            }else{
                this.showDialog("prefab/gameResultLose");
            }   
        }, 
        showSetDialog(){
            this.showDialog("prefab/setDialog");
        }, 
        showTaskDialog(){
            this.showDialog("prefab/taskDialog");
        }, 
        showJpqNode(){
            this.showDialog("prefab/jpqNode");
        },
        showShareDialog(){
            this.showDialog("prefab/shareDialog");
        },
        showShopDialog(){
            this.showDialog("prefab/shopDialog");
        },
        showChatDialog(){
            this.showDialog("prefab/chatDialog");
        },


        //牌桌操作界面
        showOpratCallLord(){
            this.showDialog("prefab/opratCallLord");
        },
        showOpratOutCard(){
            this.showDialog("prefab/opratOutCard");
        },
        showOpratDouble(click1,click2){
            var args = {};
            args.arg1 = click1;
            args.arg2 = click2;
            this.showDialog("prefab/opratDouble",opratDoubleControl,args);
        },
        showOpratShowCard(click){
            this.showDialog("prefab/opratShowCard",opratShowCardControl,click);
        },
        showCancelDelegate(click){
            this.showDialog("prefab/CancelDelegate",CancelDelegateController,click);
        },


        //动画
        showAnimChunTian(){
            this.showDialog("animatiom/anim_chuntian");
        },
        showAnimFeiJi(){
            this.showDialog("animatiom/anim_feiji");
        },
        showAnimHuoJian(){
            this.showDialog("animatiom/anim_huojian");
        },
        showAnimZhaDan(){
            this.showDialog("animatiom/anim_zhadan");
        },
        //加倍动画
        showAnimDouble(rate,seatNum){
            var args = {};
            args.arg1 = rate;
            args.arg2 = seatNum;
            this.showDialog("animatiom/anim_double",doubleControl,args);
        },

    },
});
