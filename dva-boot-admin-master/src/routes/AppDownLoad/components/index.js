import React, { Component, Fragment } from 'react';
import { Layout, Button, Col, Row } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './styles.less';
import logo from '../../../assets/images/logo2.png';
import headwecat from '../../../assets/images/headwecat.png';
import headwecatios from '../../../assets/images/headwecatios.png';
import {connect} from "dva";
import QRCode from 'qrcode-react'

@connect(({ appDownLoad, loading }) => ({
    appDownLoad,
    loading: loading.models.appDownLoad
}))
export default class extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            tipAndroidFlag: "none",
            tipIOSFlag: "none",
            downAndroidFlag:"none",
            downIOSFlag:"none",
            downButtonAndroidFlag:"none",
            downButtonIOSFlag:"none",
            thisURL:""
        };
    }

    componentDidMount() {
        if (navigator.userAgent.match("Android")) {
            this.setState({
                downAndroidFlag: "block",
                downButtonAndroidFlag: "block",
            });
        } else {
            this.setState({
                downIOSFlag: "block",
                downButtonIOSFlag: "block",
            });
        }
        const isWeixin = this.is_weixin();//调用is_weixin函数；获取到值
        if(isWeixin){
            if(navigator.userAgent.match("Android")){
                this.setState({
                    tipAndroidFlag: "block",
                    downButtonAndroidFlag:"none"
                });
            }else{
                this.setState({
                    tipIOSFlag: "block",
                    downButtonIOSFlag:"none"
                });
            }
        } else {

        }
        var url = window.location.href;
        this.setState({
            thisURL: url,
        });
    }
    is_weixin= () => {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const {appDownLoad} = this.props;
        const {appIOS,appAndroid} = appDownLoad;
        return(
            <div className="template-2  template-wrap">
                <div style={{display:this.state.tipAndroidFlag}}>
                    <div className="test" style={{width:"100%"}}>
                        <img src={headwecat}style={{width:"100%"}}/>
                    </div>
                </div>
                <div style={{display:this.state.tipIOSFlag}}>
                    <div className="test" style={{width:"100%"}}>
                        <img src={headwecatios}style={{width:"100%"}}/>
                    </div>
                </div>
                <div className="t-bg-2"></div>
                <div className="container">
                    <div className="content">
                        <div className="template-common">
                            <div className="t-icon">
                                <img src={logo}/>
                            </div>
                            <div className="t-name"  style={{display:this.state.downAndroidFlag}}>
                                <div className="tit">翼贸通</div>
                                <div className="name-info pc-pwd">
                                    <span>Ver {appAndroid.softVersion}</span>
                                    {/*<span>填写apk的大小</span>*/}
                                </div>
                            </div>
                            <div className="template-btn-wrap" style={{display:this.state.downButtonAndroidFlag}}>
                                <a href={appAndroid.updateLocation}
                                   link={appAndroid.updateLocation}
                                   className="ms-btn template-btn clearfix pc-pwd down_load">
                                    <span clsss="f1">下载安装</span>
                                </a>
                            </div>
                            <div className="t-name" style={{display:this.state.downIOSFlag}}>
                                <div className="tit">翼贸通</div>
                                <div className="name-info pc-pwd">
                                    <span>Ver {appIOS.softVersion}</span>
                                    {/*<span>填写apk的大小</span>*/}
                                </div>
                            </div>
                            <div className="template-btn-wrap" style={{display:this.state.downButtonIOSFlag}}>
                                {/*<a href={appIOS.updateLocation}*/}
                                {/*   link={appIOS.updateLocation}*/}
                                {/*   className="ms-btn template-btn clearfix pc-pwd down_load">*/}
                                {/*    <span clsss="f1">下载安装{appIOS.updateLocation}</span>*/}
                                {/*</a>*/}
                                <div className="tit">苹果客户端请至appStore下载</div>
                            </div>
                            <div className="t-icon1 t-icon-img">
                                <QRCode
                                    value={this.state.thisURL}
                                    size={150}
                                    logo={logo}
                                    logoWidth={50}
                                    logoHeight={50}
                                ></QRCode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
