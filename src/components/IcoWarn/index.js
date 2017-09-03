import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import {icoMsgFunc} from 'redux/modules/icoWarning';

import config from '../../config';

@connect(
    state => ({ language: state.auth.language, }),
    {icoMsgFunc}
)
export default class ICOwarningModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    language: PropTypes.string,

    icoMsgFunc: PropTypes.func,
  };

  onCloseFunc() {
    this.props.onClose();
  }

  onCheck() {
    const str = document.getElementsByName('warn');
    const objarray = str.length;
    const warnList = [];

    for ( let ii = 0; ii < objarray; ii++ ) {
      if (str[ii].checked === true) {
        warnList.push(str[ii].value);
      }
    }

    if (objarray === warnList.length) {
      this.props.icoMsgFunc(config.app.icoBar.address);
      setTimeout(() => {
        this.props.onClose();
      }, 50);
    } else {
      const pValue = document.getElementById('pText');
      if (!pValue) {
        const theText = document.getElementById('theText');
        let pText;
        if (this.props.language === 'zn') {
          pText = '<p id="pText" >请认真阅读并勾选以上所有内容</p>';
        } else {
          pText = '<p id="pText" >Check all boxes to proceed</p>';
        }
        theText.insertAdjacentHTML('beforeBegin', pText);
      } else {
        return;
      }
    }
  }

  render() {
    const styles = require('./warning.scss');
    const {language} = this.props;

    return (
        <Modal show={this.props.show} onHide={this.props.onHide}>
            <div className={styles['astro-warning-modal']}>
              {language === 'zn' && <h4>万维链Token购买申明</h4>}
              {language === 'zn' && <p>请仔细阅读如下内容，并确保您理解了足够的信息</p>}

              {language === 'en' && <h4>Wanchain Tokens Purchase Statement</h4>}
              {language === 'en' && <p>Please read the following carefully and confrm you understand enough information</p>}
              <hr/>
              <span className="glyphicon glyphicon-remove" id={styles['astro-warning-gly']} onClick={this.onCloseFunc.bind(this)}></span>
              <div className={styles['astro-warning-modal-button']}>
                {language === 'zn' &&
                <div className={styles['astro-warning-modal-div']}>
                  <div className="checkbox" id={styles['astro-warning-checkbox']}>
                    <label><input type="checkbox" name="warn" value="" />
                      请点击确定您不是美国或者新加坡公民、居民或者实体，并切不代表任何美国或新加坡人购买WAN Tokens。</label>
                  </div>
                  <div className="checkbox" id={styles['astro-warning-checkbox']}>
                    <label><input type="checkbox" name="warn" value="" />请点击确定您已经阅读、理解并且同意了
                      <a>WAN Token的购买协议</a>。</label>
                  </div>
                  <div className="checkbox" id={styles['astro-warning-checkbox']}>
                    <label><input type="checkbox" name="warn" value="" />请点击确定您已经阅读、理解了万维链的
                      <a href={config.app.files.WhitepaperCH} target="_blank">白皮书</a>和
                      <a href={config.app.files.CommercialCH} target="_blank">商业白皮书</a>。
                    </label>
                  </div>
                </div>
                }
                {language === 'en' &&
                <div className={styles['astro-warning-modal-div']}>
                  <div className="checkbox" id={styles['astro-warning-checkbox']}>
                    <label><input type="checkbox" name="warn" value="" />Check here to confim that you are not a U.S. and Singapore citizen, resident or entity nor are you purchasing WAN Tokens or signing on behalf of a U.S. and Singapore Person.</label>
                  </div>
                  <div className="checkbox" id={styles['astro-warning-checkbox']}>
                    <label><input type="checkbox" name="warn" value="" />Check here to comfirm that you have read, understand and agree to the terms of the
                      <a> WAN Token Purchase Agreement</a>.</label>
                  </div>
                  <div className="checkbox" id={styles['astro-warning-checkbox']}>
                    <label><input type="checkbox" name="warn" value="" />Check here to comfirm that you have read and understand the
                      <a href={config.app.files.WhitepaperEN} target="_blank">Wanchain White Paper </a>and
                      <a href={config.app.files.CommercialEN} target="_blank"> Wanchain Commecial White Paper</a>.
                    </label>
                  </div>
                </div>
                }
                {language === 'zn' && <button key="1" onClick={this.onCheck.bind(this)} id="theText">确定</button>}
                {language === 'en' && <button key="1" onClick={this.onCheck.bind(this)} id="theText">Ok</button>}
              </div>
            </div>
        </Modal>
    );
  }
}