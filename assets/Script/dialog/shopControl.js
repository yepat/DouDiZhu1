var config = require("config");
var EventHelper = require("EventHelper");
var PlayerDetailModel = require("PlayerDetailModel");
var dialogManager = require("dialogManager");

cc.Class({
    extends: cc.Component,

    properties: {
        btnCoin : {
            default : null,
            type : cc.Sprite
        },
        btnProp : {
            default : null,
            type : cc.Sprite
        },
        gridCoin: {
            default : null,
            type : cc.Node
        },
        gridProp: {
            default : null,
            type : cc.Node
        },
    },
    // onLoad () {},
    start () {
        var self = this;
        cc.loader.loadRes("shop/p_shopBtn_1",cc.SpriteFrame,function(err,spriteFrame){
            self.btnCoin.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
        cc.loader.loadRes("shop/p_shopBtn_2",cc.SpriteFrame,function(err,spriteFrame){
            self.btnProp.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
        this.gridCoin.active = true;
        this.gridProp.active = false;
    },
    closeClick(){
        console.log("close click");
        this.node.destroy();
        cc.vv.audioMgr.playSFX("SpecOk");
    },
    btnCoinClick(){
        console.log("btnCoinClick");
        this.gridCoin.active = true;
        this.gridProp.active = false;
        var self = this;
        cc.loader.loadRes("shop/p_shopBtn_1",cc.SpriteFrame,function(err,spriteFrame){
            self.btnCoin.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
        cc.loader.loadRes("shop/p_shopBtn_2",cc.SpriteFrame,function(err,spriteFrame){
            self.btnProp.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    },
    btnPropClick(){
        console.log("btnPropClick");
        this.gridCoin.active = false;
        this.gridProp.active = true;
        var self = this;
        cc.loader.loadRes("shop/p_shopBtn_2",cc.SpriteFrame,function(err,spriteFrame){
            self.btnCoin.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
        cc.loader.loadRes("shop/p_shopBtn_1",cc.SpriteFrame,function(err,spriteFrame){
            self.btnProp.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    },
    coinItemClick(event){
        var btnName = event.target.name;
        console.log("coinItemClick:"+btnName);
        
    },
    propItemClick(event){
        var btnName = event.target.name;
        console.log("propItemClick:"+btnName);

    }
});
