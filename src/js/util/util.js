// import Vue from "vue";
// import Base64 from "@/js/util/base64";
// import K from "@/js/util/loca_key";
import moment from "moment";
import AES from "@/js/util/AES";
window.AES = AES;
// import { getSignature, ossUploadImg } from "@/js/api/member/api";
let util = {
  /**
   * 獲取用戶標識 -- 隨機數
   * @param {boolean} randomFlag
   * @param {number} min
   * @param {number} max
   */
  randomWord (randomFlag, min, max) {
    let str = "",
      range = min,
      arr = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];

    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },
  /**
   * 設置主題色
   * @param {string} rgb 0,0,0
   * @param {*} t 判斷依據
   */
  setThemeColor (rgb = "190,28,66", t) {
    // 如果是 clinkpos 域名, 則全部為黑色主題
    if (location.origin.indexOf("clinkpos.com") > -1) {
      rgb = "0,0,0";
    }
    if (rgb) rgb = rgb.replace("rgb(", "").replace(")", "");
    if (t) {
      if (localStorage.getItem('theme_color')) {
        rgb = localStorage.getItem('theme_color');
      }
    }
    // 判斷 rgb 是否合理 不合理 設置默認值
    try {
      let rgbArr = rgb.split(",");
      if (rgbArr.length == 4) {
        rgbArr.splice(3, 1);
        rgb = rgbArr.join(",");
      } else if (rgbArr.length != 3) {
        rgb = "190,28,66";
      }
    } catch (error) {
      rgb = "190,28,66";
    }

    if (!rgb) {
      return;
    } else {
      localStorage.setItem('theme_color', rgb);
    }

    let R = `rgb(${rgb})`;
    // Vue.prototype.ThemeColor = R;
    let R5 = `rgba(${rgb},0.5)`;
    util.setRootColor("--themeColor", R);
    util.setRootColor("--themeColor5", R5);
    let R2 = `rgba(${rgb},0.2)`;
    if (document.querySelector("#self_style")) {
      document.querySelector("#self_style").remove();
    }
    let style_ = document.createElement("style");
    style_.id = "self_style";
    // .app_index,.app_reservation_box .van-tabs__line,.van-badge{background-color:${R} !important;}   299
    let css_ = `
          .theme_bg_color,
          .scanTable-stepper .van-stepper__plus,
          .scan-person .van-button--default{background-color:${R} !important;}
          .theme_color,
          .scanTable-stepper .van-stepper__minus{color:${R} !important;}
          .theme_border_color,
          .scanTable-stepper .van-stepper__minus{border-color:${R} !important;}
          .theme_border_top_color{border-top-color:${R} !important;}
          .theme_border_right_color{border-right-color:${R} !important;}
          .theme_border_bottom_color{border-bottom-color:${R} !important;}
          .theme_border_left_color{border-left-color:${R} !important;}
          .theme_bg_color_5{ background-color:${R5} !important;}
          .theme_bg_color_2{ background-color:${R2} !important;}

          .van-radio__icon--checked .van-icon,
          .van-button--primary,
          .van-checkbox__icon--checked .van-icon{background-color:${R} !important; border-color:${R} !important;}
          .app_index .van-tabs__line,.van-badge,.app_reservation_box .van-tabs__line{background-color:${R} !important;}

          .self_body .self_tabs .van-tab--active{color:${R} !important;}
          .app_reservation_box .van-tab--active{color:${R} !important;}
          .notice_tabs .van-tabs__nav,.notice_tabs .van-tab--active{border-radius:8px;}
          .notice_tabs .van-tabs__nav--card .van-tab{border-right:none;}
          .notice_tabs .van-tabs__wrap{position:fixed;width:100%;background-color: rgb(242,242,242);z-index:10;padding:5px 0;}
          .notice_title_icon .van-badge{background-color:rgb(204,26,78) !important;left:-4px;top:4px;right:auto;}
          .add_address .isdefault.van-switch--on{background-color:${R} !important;}
          .resources_agree .van-checkbox__icon .van-icon{border-color:#9c9292;}
          .tagContent .van-tab--active .van-tab__text{background-color:${R} !important;}
          .el-dropdown-menu__item:not(.is-disabled):hover {background-color: ${R2};color: ${R};}
          .menu-box .group-box .item .badeg .el-badge__content{background-color:${R} !important;}
          .pc-el-confirm .el-message-box__btns .el-button:nth-of-type(1):hover{background-color: ${R2};color: ${R};border-color:${R} !important;}
          .pc-el-confirm .el-message-box__btns .el-button:nth-of-type(2){background-color: ${R};border-color:${R} !important;}
          .pc-el-alert .el-message-box__btns .el-button:nth-of-type(1){background-color: ${R};border-color:${R} !important;}
          .el-loading-spinner .path{stroke:${R};}
          .theme_bg_color.is-disabled{background-color:${R2} !important;}
          .theme_border_color.is-disabled{border-color:${R2} !important;}
          .el-checkbox__inner:hover{border-color:${R} !important;}
          .el-checkbox__input.is-checked .el-checkbox__inner{border-color:${R} !important;background-color:${R} !important;}
          .el-checkbox__input.is-focus .el-checkbox__inner{border-color:${R} !important;}
          .el-checkbox__input.is-checked+.el-checkbox__label{color:${R} !important;}
          .el-pagination.is-background .el-pager li:not(.disabled).active{background-color:${R} !important;}
          .el-pagination.is-background .el-pager li:not(.disabled):hover{color:${R} !important;}
          .el-input__inner:focus{border-color:${R} !important;}
          .van-button.van-button--default.van-button--large.van-dialog__confirm{color:${R}}
        `;
    style_.textContent = css_;
    document.head.append(style_);
  },
  /**
   * 將 內容轉為字符串, 判斷是否為空
   * @param {*} obj
   */
  isNull (obj) {
    obj = obj + "";
    if (
      obj == null ||
      obj == undefined ||
      obj == "" ||
      obj == "NaN" ||
      obj == "undefined" ||
      obj == "null"
    ) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 判斷是否為空, 並返回值
   * @param {*} obj
   * @param {*} t
   */
  ifNull (obj, t) {
    if (this.isNull(obj)) {
      return t;
    }
    return obj;
  },
  /**
   * 獲取 window 寬高
   */
  getWindowInner () {
    let J = {};
    let w = document.body.clientWidth; // window.innerWidth; //用這玩意, 在 蘋果微信裡面, 經過 qrcode.html 轉發後, 第一次打開食品圖片巨大.... 所以改了
    let h = window.innerHeight;
    if (this.IsPC()) {
      J.w = w;
      J.h = h;
      // J.w = 375;
      // J.h = 637; // 應該是 657 , 這裡和 app.vue 中的一致, 但是多了個 頂部img , 高度是20 , 所以這裡減掉
      // if (h < 665) {
      //   J.h = h - 30;
      // }
    } else {
      // 橫屏 就 寬就是高
      let orientation = window.orientation;
      if (w > h && orientation != 0) {
        let a = w;
        w = h;
        h = a;
      }
      J.w = w;
      J.h = h;
    }
    return J;
  },
  /**
   * 獲取 帶 ***** 的手機號碼
   */
  getStarPhone (appUserPhone = "") {
    if (!appUserPhone) appUserPhone = localStorage.getItem('user_phone');
    if (appUserPhone) {
      let phone = appUserPhone + "";
      let p = "";
      if (phone.length == 11) {
        return phone.substring(0, 3) + "****" + phone.substring(7, 11);
      } else {
        for (let i = 0; i < phone.length - 4; i++) {
          p += "*";
        }
        return (
          phone.substring(0, 3) +
          "***" +
          phone.substring(phone.length - 2, phone.length)
        );
      }
    }
    return "";
  },
  /**
   * 更改 網頁 title
   * @param {string} name
   */
  setDocumentTitle (name) {
    if (!name && localStorage.getItem('document_title')) {
      document.title = localStorage.getItem('document_title');
    } else {
      document.title = name + "|demo";
    }
  },
  /**
   * 設置 網頁 icon
   * @param {*} id
   */
  setDocumentIcon (id) {
    let logoImg = document.getElementById(id);
    let links = document.getElementsByTagName("link"); // 獲取所有 link 元素
    for (let i = 0; i < links.length; i++) {
      //遍歷 link 元素
      let link = links[i];
      let rel = link.rel; // rel 表示 link 的類型  icon 對應 shortcut icon
      rel = rel.toLowerCase(); // 部分網站 會 大寫. 統一轉成小寫
      if (rel.indexOf("icon") > -1) {
        // 當連接中存在 shortcut icon 字眼
        link.href = logoImg.src; // 修改 網站icon
        break;
      }
    }
  },
  /**
   * 獲取當前頁 的 參數
   * @param {element} t this
   */
  getQueryParams (t, s) {
    let params = t.$route.params;
    let arg = params.arg;
    if (arg) {
      return this.BASE_.dec(arg, s);
    } else {
      if (s == 1) {
        return [];
      } else {
        // 提示
        t.$dialog
          .alert({
            title: '温馨提示',
            message:
              '数据丢失' + " " + '请退出再重试',
            confirmButtonText: '确认',
            confirmButtonColor: this.ThemeColor
          })
          .then(() => {
            // on close
          });
        return [];
      }
    }
  },
  /**
   * 獲取 掃碼點餐 參數
   * @param {*} t
   */
  getQueryParams_qr (t) {
    try {
      let query = t.$route.query;
      let arg = query.arg;
      if (arg) {
        return JSON.parse(arg);
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  },
  /**
   * 生成 頁面參數
   * @param {*} t
   */
  setQueryParams (t) {
    // return Base64.ba_encode(t);
    return this.BASE_.enc(t);
  },
  /**
   * 判斷 餐牌頁 是否可以返回
   * @param {*} t
   */
  getIndexBack (t) {
    try {
      let params = t.$route.params;
      let arg = params.arg;
      if (arg) {
        // return Base64.ba_decode(arg);
        let r = this.BASE_.dec(arg);
        let i = r[2];
        if (i == 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  /**
   * 判斷是否是 pc
   */
  IsPC () {
    let userAgentInfo = navigator.userAgent;
    let Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod"
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  getExplore () {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/))
      ? (Sys.ie = s[1])
      : (s = ua.match(/msie ([\d\.]+)/))
        ? (Sys.ie = s[1])
        : (s = ua.match(/edge\/([\d\.]+)/))
          ? (Sys.edge = s[1])
          : (s = ua.match(/firefox\/([\d\.]+)/))
            ? (Sys.firefox = s[1])
            : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
              ? (Sys.opera = s[1])
              : (s = ua.match(/chrome\/([\d\.]+)/))
                ? (Sys.chrome = s[1])
                : (s = ua.match(/version\/([\d\.]+).*safari/))
                  ? (Sys.safari = s[1])
                  : 0;
    // 根据关系进行判断
    if (Sys.ie) return "IE: " + Sys.ie;
    if (Sys.edge) return "EDGE: " + Sys.edge;
    if (Sys.firefox) return "Firefox: " + Sys.firefox;
    if (Sys.chrome) return "Chrome"; //('Chrome:' + Sys.chrome);
    if (Sys.opera) return "Opera: " + Sys.opera;
    if (Sys.safari) return "Safari"; //('Safari: ' + Sys.safari);
    return "Other";
  },
  /**
   * 判斷是否是 蘋果瀏覽器
   * google 瀏覽器 沒有 谷歌標識  居然和 safari 瀏覽器一模一樣
   */
  isSafari () {
    let nav = navigator.userAgent.toLowerCase();
    let flag =
      /safari/.test(nav) &&
      !/chrome/.test(nav) &&
      !/qqbrowser/.test(nav) &&
      !/huawei/.test(nav);
    if (flag && util.getExplore() == "Safari") {
      return true;
    }
    return false;
  },
  /**
   * 數學方法
   */
  Math: {
    /*
     * 判断obj是否为一个整数
     */
    isInteger (obj) {
      return Math.floor(obj) === obj;
    },
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    toInteger (floatNum) {
      let ret = {
        times: 1,
        num: 0
      };
      if (this.isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
      }
      let strfi = floatNum + "";
      let dotPos = strfi.indexOf(".");
      let len = strfi.substr(dotPos + 1).length;
      let times = Math.pow(10, len);
      let intNum = parseInt(floatNum * times + 0.5, 10);
      ret.times = times;
      ret.num = intNum;
      return ret;
    },
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    operation (a, b, op) {
      let o1 = this.toInteger(a);
      let o2 = this.toInteger(b);
      let n1 = o1.num;
      let n2 = o2.num;
      let t1 = o1.times;
      let t2 = o2.times;
      let max = t1 > t2 ? t1 : t2;
      let result = null;
      let d = 0,
        f = 0;
      switch (op) {
        case "add":
          if (t1 === t2) {
            // 两个小数位数相同
            result = n1 + n2;
          } else if (t1 > t2) {
            // o1 小数位 大于 o2
            result = n1 + n2 * (t1 / t2);
          } else {
            // o1 小数位 小于 o2
            result = n1 * (t2 / t1) + n2;
          }
          return result / max;
        case "subtract":
          if (t1 === t2) {
            result = n1 - n2;
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) - n2;
          }
          return result / max;
        case "multiply":
          d = n1 * n2;
          f = t1 * t2;
          if ((d + "").indexOf(".") > -1 || (f + "").indexOf(".") > -1) {
            result = this.divide(d, f);
          }
          result = d / f;
          return result;
        case "divide":
          d = n1 / n2;
          f = t2 / t1;
          if ((d + "").indexOf(".") > -1 || (f + "").indexOf(".") > -1) {
            result = this.multiply(d, f);
          } else result = d * f;
          return result;
      }
    },
    // 加
    add (a = 0, b = 0) {
      return this.operation(a, b, "add");
    },
    // 減
    subtract (a = 0, b = 0) {
      return this.operation(a, b, "subtract");
    },
    // 乘
    multiply (a = 0, b = 0) {
      return this.operation(a, b, "multiply");
    },
    // 除
    divide (a = 0, b = 1) {
      return this.operation(a, b, "divide");
    },
    /**
     * 四捨五入
     * @param {*} num 值
     * @param {*} t  小數位, 默認一位
     */
    round (num, t) {
      try {
        num = parseFloat(num);
      } catch (e) {
        num = 0;
      }
      if (!num) num = 0;
      if (!t) t = 1;
      let result =
        Math.round((num + Number.EPSILON) * Math.pow(10, t)) / Math.pow(10, t);
      let xsd = result.toString().split(".");
      let a = xsd[1];
      if (a) {
        if (a.length < t) {
          let h = t - a.length;
          return (
            xsd[0] +
            "." +
            a +
            Math.pow(10, h)
              .toString()
              .replace("1", "")
          );
        } else {
          return result;
        }
      } else {
        return (
          xsd[0] +
          "." +
          Math.pow(10, t)
            .toString()
            .replace("1", "")
        );
      }
    },
    /**
     * 保留小數位, 返回 1.00 格式
     */
    round_ (num, t) {
      try {
        num = parseFloat(num);
      } catch (e) {
        num = 0;
      }
      if (!num) num = 0;
      if (!t) t = 1;
      let result =
        Math.round((num + Number.EPSILON) * Math.pow(10, t)) / Math.pow(10, t);
      let xsd = result.toString().split(".");
      let a = xsd[1];
      if (a) {
        if (a.length < t) {
          let h = t - a.length;
          return (
            xsd[0] +
            "." +
            a +
            Math.pow(10, h)
              .toString()
              .replace("1", "")
          );
        } else {
          return result;
        }
      } else {
        return (
          xsd[0] +
          "." +
          Math.pow(10, t)
            .toString()
            .replace("1", "")
        );
      }
    },
    /**
     * 賬單小數
     */
    /**
     * 金額 及 賬單小數 計算方式
     * 不是傳統的四捨五入
     * 舉個栗子,在保留一位小數的情況下:
     * 在傳統的四捨五入中  --> 0.46 ==> 0.4 //  0.66 => 0.7
     * 在自定義規則中  --> 0.4 ==> 0.0  //  0.66 ==> 0.1
     *
     * 如上文 [0.66], 保留一位小數, 但是 我有兩位, [6] [6] , 所以要先砍掉一個 [6] ==> [0.6];
     * 然後再判斷 [0] [6] , [0] 作為保留值, 先不動, [6] 作為 判斷值, 進行邏輯判斷
     * 當 進入, 四捨五入 的邏輯時, 判斷  [6 ]滿足哪個條件 ==> [6 > 0.4]
     * 因此是 [入] , 然後將 [6] 砍為 [0], 保留值 [0] 進行 ++ 操作. ==> [1.0]
     *
     */
    flexd (val, i, t) {
      console.log(val, i, t);
      if (i < 0 || i > 3 || t < 1 || t > 2) {
        return val;
      }
      if (util.isNull(i)) {
        i = 0;
      }
      if (util.isNull(t)) {
        t = 1;
      }

      // 計算 小數位

      let b = val * Math.pow(10, t); // 1.5
      let c = (b + "").split("."); // [1,5] // 1 是保留值 5 是不要的
      let d = c[0];
      let e = d / 10; // 需要拿到最好一位數字
      let f = (e + "").split(".");
      let g = f[0]; // 總值
      let h = f[1]; // 小數值, 用來判斷規則
      if (util.isNull(h)) h = 0;
      if (i == 0) {
        // [0.1-0.9 = 0]
        h = 0;
      } else if (i == 1) {
        // [0.1-0.9 = 1.0]
        if (h > 0) {
          g++; // 總值 ++
          h = 0;
        }
      } else if (i == 2) {
        //[ 0.1 - 0.4 = 0.0] && [0.5-0.9 = 1.0]
        if (h > 0 && h < 5) {
          h = 0;
        } else if (h > 4 && h < 10) {
          g++;
          h = 0;
        }
      } else if (i == 3) {
        // [0.1-0.5 = 0.5] && [0.6-0.9 = 1]
        if (h > 0 && h < 6) {
          h = 5;
        } else if (h > 4 && h < 10) {
          g++;
          h = 0;
        }
      }
      let j = parseInt(g + "" + h); // 講計算後的值重新拼接
      let k = j / Math.pow(10, t); // 按小數點重新取回值
      let l = (k + "").split("."); // 分離值, 計算後兩位是否滿足條件
      return l[0] + "." + this.addNum(l[1], t);
    },
    addNum (u, x) {
      if (util.isNull(u)) {
        // 這個判斷 是為了 當上面方法 計算為整數時, u 會 為 undefined, 所以 這裡需要給默認值
        u = "0";
      }
      let len = (u + "").length;
      let r_u = u;
      for (let i = 0; i < x - len; i++) {
        r_u += "0";
      }
      return r_u;
    },

    // 截取小数位
    splice (t = 0, n = 0) {
      t = String(t);
      if (t.includes(".")) {
        let t_ = t.split(".");
        if (n == 0) {
          return t_[0];
        } else {
          let o = t_[1];
          console.log("o", o);
          let s = o.substring(0, n);
          console.log("s", s);
          return t_[0] + "." + s;
        }
      } else return t;
    }
  },
  /**
   * 對象複製
   * @param {*} obj
   */
  cloneObject (obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 獲取指定時間yyyy-mm-dd dd:mm:ss 格式
   * @param {*} date  時間
   */
  getDate (date) {
    if (typeof date == "string") {
      date = date.replace(/-/g, "/");
      date = date.replace(".0", "");
    }
    let d = new Date(date);
    if (date == null || util.isNull(d.getTime() + "")) {
      d = new Date();
    }
    let m = d.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    let day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let minu = d.getMinutes();
    if (minu < 10) {
      minu = "0" + minu;
    }

    let sources = d.getSeconds();
    if (sources < 10) {
      sources = "0" + sources;
    }
    return (
      d.getFullYear() +
      "-" +
      m +
      "-" +
      day +
      " " +
      d.getHours() +
      ":" +
      minu +
      ":" +
      sources
    );
  },
  /**
   * 時間差 返回秒  time 被減數
   * @param {*} type 1 秒 2 分
   * @param {*} time 被減數
   * @param {*} time2 減數
   */
  timeDifference (type = 1, time = new Date(), time2 = new Date()) {
    if (typeof time == "string") {
      time = time.replace(/-/g, "/");
      time = time.replace(".0", "");
      time = new Date(time);
    }
    if (time2 == undefined) {
      time2 = new Date();
    } else if (typeof time2 == "string") {
      time2 = time2.replace(/-/g, "/");
      time2 = time2.replace(".0", "");
      time2 = new Date(time2);
    }
    if (type == 1) {
      return parseInt(((time2 - time) / 1000).toFixed(0));
    } else if (type == 2) {
      let m = (time2 - time) / 1000 / 60;
      return parseInt(m.toFixed(0));
    }
    return 0;
  },
  /**
   * 天數減法, 相隔幾天
   * @param {減數} t
   * @param {被減數} t_
   * @returns
   */
  getTimesDay (t = new Date(), t_ = new Date()) {
    try {
      // t.setMinutes(0);
      // t.setHours(0);
      // t.setSeconds(0);
      // t_.setMinutes(0);
      // t_.setHours(0);
      // t_.setSeconds(0);
      let x = (t - t_) / 1000 / 86400;
      return x;
    } catch (error) {
      return 0;
    }
  },
  /**
   * 天數加減
   * @param {*} date
   * @param {*} days
   */
  addDate (date, days = 0) {
    if (!util.isNull(date)) {
      date = date.replace(/-/g, "/");
      date = date.replace(".0", "");
    }
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    let m = d.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    let day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return d.getFullYear() + "-" + m + "-" + day;
  },
  /**
   * 獲取 指定分鐘的時間
   * @param {number} min
   */
  addMinutes (min) {
    let d = new Date();
    d.setMinutes(d.getMinutes() + parseInt(min));
    return d;
  },
  /**
   * 輸入秒, 得到具體的天-時-分-秒
   * @param {秒} t
   * @returns
   */
  getD_H_M_S (t = 0) {
    try {
      if (t < 0) t = t * -1;
      let d = 86400, // 一天有多少秒
        h = 3600, // 一小時有多少秒
        m = 60; // 一分鐘有多少秒
      let d1 = "00",
        h1 = "00",
        m1 = "00",
        s1 = "00";
      if (t == 0) {
        return {
          f: false,
          h: h1,
          d: d1,
          m: m1,
          s: s1
        };
      }
      if (t >= d) {
        d1 = parseInt(util.Math.divide(t, d)); // 得到 天數
        if (d1 < 10) d1 = `0${d1}`;
        t = util.Math.subtract(t, util.Math.multiply(d1, d));
      }
      if (t >= h) {
        h1 = parseInt(util.Math.divide(t, h)); // 得到小時
        if (h1 < 10) h1 = `0${h1}`;
        t = util.Math.subtract(t, util.Math.multiply(h1, h));
      }
      if (t >= m) {
        m1 = parseInt(util.Math.divide(t, m)); // 得到分鐘
        if (m1 < 10) m1 = `0${m1}`;
        s1 = util.Math.subtract(t, util.Math.multiply(m1, m));
        if (s1 < 10) s1 = `0${s1}`;
      } else if (t > 0 && t < 60) {
        s1 = t;
        if (t < 10) s1 = `0${t}`;
      }
      return {
        f: true,
        h: h1,
        d: d1,
        m: m1,
        s: s1
      };
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 獲取特定格式時間
   * @param {*} type  1 時分 2 年月日
   * @param {*} obj
   */
  fmtDate (type, obj) {
    if (typeof obj === "string") obj = obj.toString().replace(/\-/g, "/");
    let date = new Date(obj);
    let result = "";
    if (type == 1) {
      // 时分
      let h = date.getHours();
      if (h < 10) {
        h = "0" + h;
      }
      let m = date.getMinutes();
      if (m < 10) {
        m = "0" + m;
      }
      result = h + ":" + m;
    } else if (type == 2) {
      // 年月日
      let date = new Date(obj);
      let y = 1900 + date.getYear();
      let m = "0" + (date.getMonth() + 1);
      let d = "0" + date.getDate();
      result =
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length);
    }
    return result;
  },
  /**
   * 判斷 字符串是否在arr裡
   * @param {array} obj
   * @param {string} str
   */
  isArrayContains (obj, str) {
    let arrayContains = (obj, str) => {
      let index = obj.length;
      while (index--) {
        if (obj[index] === str) {
          return true;
        }
      }
      return false;
    };
    return arrayContains(obj.split(","), str + "");
  },
  isArrayContains_ (obj, str) {
    let arrayContains = (obj, str) => {
      let index = obj.length;
      while (index--) {
        if (obj[index] == str) {
          return true;
        }
      }
      return false;
    };
    return arrayContains(obj, str + "");
  },
  /**
   * 判斷是安卓還是ioc
   */
  isIosOrAndroid () {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let isIphone = sUserAgent.match(/iphone/i) == "iphone";
    let isAndroid = sUserAgent.match(/android/i) == "android";
    if (isIphone) {
      return "ios";
    } else if (isAndroid) {
      return "android";
    } else {
      return "other";
    }
  },
  /**
   * 金額格式化
   * @param {int} price 金額
   * @param {int} number 數量
   * @param {int} t 小數位
   */
  toPrice (price = 0, number, t = 1, f = "$ ") {
    price = util.ifNull(price, 0);
    t = util.ifNull(t, 1);
    if (util.isNull(number)) {
      // return `${f}${util.changePrice(util.Math.round(price))}`;
      return `${f}${util.changePrice(price)}`;
    } else {
      let p = util.Math.multiply(price, number);
      // return `${f}${util.changePrice(util.Math.round(p, t))}`;
      return `${f}${util.changePrice(p)}`;
    }
  },
  /**
   * 將傳入的數值 變為帶逗號的價格
   * @param {Object} p 傳入的數值
   */
  changePrice (str) {
    let result = "";
    let f = "";
    let a = str.toString();
    if (a.indexOf("-") > -1) {
      f = "-";
    } else if (a.indexOf("+") > -1) {
      f = "+";
    }
    a = a.replace(/[-+]/g, "");
    let d = a.substring(a.indexOf("."), a.length);
    a = a.substring(0, a.indexOf("."));
    let c = a.length - 4;
    for (let i = a.length - 1; i >= 0; i--) {
      if (c == i) {
        result = a[i] + "," + result;
        c -= 3;
      } else {
        result = a[i] + result;
      }
    }
    return f + result + d;
  },
  /**
   * 字符串格式化
   * @param {string} str 本體
   * @param {string} from 誰
   * @param {string} to 替換成誰
   */
  strReplace (str, from, to) {
    return str.replace(from, to);
  },
  /**
   * 獲取凍鏈類型
   * 怕會有改動, 所以單獨提出來
   */
  getColdType () {
    return 5;
  },
  /**
   * 獲取 外送 / 自取 送達時間 主體
   * @param {string} startTime  開始時間
   * @param {string} endTime 結束時間
   * @param {number} limit  時間間隔
   * @param {number} deliveryCharge  餐盒費
   * @param {number} day 持續天數
   * @param {string} w  是外送(w)還是自取(z)
   */
  getListByTimer (startTime, endTime, limit, deliveryCharge, day, w) {
    deliveryCharge = util.ifNull(deliveryCharge, 0);
    limit = parseInt(limit); // 時間間隔保證是int
    let now = new Date(); // 獲取當前時間
    let t = new Date(); // 定義開始時間
    let et = new Date(); // 定義結束時間
    let st_a = startTime.split(":"); // 分離 開始時間 時 和 分
    // 設置時間
    t.setHours(st_a[0]);
    t.setMinutes(st_a[1]);
    t.setSeconds(0);
    let e_a = endTime.split(":");
    // 設置時間
    et.setHours(e_a[0]);
    et.setMinutes(e_a[1]);
    et.setSeconds(0);
    let arr = [],
      json = {},
      nowt = false;
    // 組裝 時
    let hoursFun = (t, s) => {
      return t.getHours() < 10 ? `0${t.getHours()}${s}` : `${t.getHours()}${s}`;
    };
    // 組裝 分
    let minutesFun = (t, s) => {
      return t.getMinutes() < 10
        ? `0${t.getMinutes()}${s}`
        : `${t.getMinutes()}${s}`;
    };
    // 定義死循環, 用來組裝數據
    for (let i = 0; i < i + 1; i++) {
      json = {};
      // 當 開始時間 > 結束時間 => 結束循環
      if (t > et) {
        break;
      }
      let fl = t > now;
      if (day > 1) {
        fl = true;
      }
      if (fl) {
        json.deliveryCharge = deliveryCharge; // 設置 配送費
        json.time = `${hoursFun(t, `:`)}${minutesFun(t, `~`)}`; // 組裝前半截
        json.type = 1;
        json.show = true;
      }
      t.setMinutes(t.getMinutes() + limit); // 累加 間隔時間 這裡可能會出現 跨天, 則退出
      if (t.getDate() > now.getDate()) {
        break;
      }
      if (fl) {
        json.time += `${hoursFun(t, `:`)}${minutesFun(t, ``)}`; // 組裝後半截
        json.type = 1;
        json.show = true;
        arr.push(json); // 加入 數組
        let c = (et - t) / 1000 / 60;
        if (c > 0 && c < limit) {
          json = {};
          json.deliveryCharge = deliveryCharge;
          json.time = `${hoursFun(t, `:`)}${minutesFun(t, `~`)}`; // 組裝 前半截
          json.time += `${hoursFun(et, `:`)}${minutesFun(et, ``)}`; // 組裝 後半截
          json.type = 1;
          json.show = true;
          arr.push(json); // 接入數組
        }
      } else if (!nowt) {
        // 時間不對 設置 立即送達
        json.time =
          w == "w" ? '尽快送达' : '立即送达';
        json.type = 0;
        json.show = true;
        arr.push(json);
        nowt = true;
      }
    }
    return arr;
  },
  /**
   * 計算優惠券優惠
   * @param {object} couponData  優惠券數據
   * @param {number} money  金額
   */
  initCounpon (couponData, money) {
    let result = {};
    result.show = false; // 沒有優惠券
    let money_ = 0;
    if (!couponData) {
      return result;
    }
    if (!util.isNull(couponData.id)) {
      // 計算優惠後金額
      let couponMoney = couponData.amount, //優惠金額
        discount = couponData.discount, // 折扣
        couponType = couponData.couponType, // 優惠類型
        spend = couponData.spend, // 消費滿
        billMinAmount = couponData.billMinAmount, // 優惠上線
        accumulate = couponData.accumulate || 0; // 是否開啟累加
      if (spend < 0) spend = 0;
      // 是否滿足使用優惠券條件,
      if (spend > money) {
        // 頁面上顯示  滿xx可用,當前為xx
        result.spend = spend;
        result.money = money;
        return result;
      }
      // 優惠金額
      if (couponType == 2) {
        // 優惠後金額
        money_ = util.Math.subtract(money, couponMoney);
        // 判斷是否開啟累加, 並重新開始計算
        if (accumulate != 0 && spend != 0) {
          // 拿到優惠總次數
          let dm = parseInt(util.Math.divide(money, spend));
          // 拿到 總優惠金額
          let ym = util.Math.multiply(dm, couponMoney);
          // 存在 優惠上線
          if (billMinAmount > 0) {
            // 當 總優惠金額, 超出了 優惠上線, 則 優惠金額 = 優惠上線
            if (ym > billMinAmount) {
              ym = billMinAmount;
            }
          }
          // 優惠後金額
          money_ = util.Math.subtract(money, ym);
          couponMoney = ym;
        }
      } else {
        //折扣
        // 計算優惠金額,
        let ym = util.Math.multiply(money, util.Math.divide(discount, 100));
        // 存在 優惠上線
        if (billMinAmount > 0) {
          // 當 總優惠金額, 超出了 優惠上線, 則 優惠金額 = 優惠上線
          if (ym > billMinAmount) {
            ym = billMinAmount;
          }
        }
        // 優惠後金額
        money_ = util.Math.subtract(money, ym);
        couponMoney = ym;
      }
      if (money_ < 0) {
        couponMoney = money;
        money_ = 0;
      }
      result.show = true;
      result.id = couponData.id; // 優惠券id
      result.couponId = couponData.couponId; // 使用優惠券的id
      result.yPrice = util.Math.round(couponMoney); // 優惠金額
      result.name = util.setNameByEn(
        couponData.couponTypeName,
        couponData.couponTypeName1
      );
      // 校驗
      let p_ = util.Math.round(money_);
      if (util.Math.subtract(money, result.yPrice) != p_) {
        p_ = util.Math.subtract(money, result.yPrice);
      }
      result.price = p_; //優惠優金額
      return result;
    }
    return result;
  },
  /**
   * 判斷字符串中是否存在 表情
   * @param {string} substring
   */
  isEmojiCharacterIndex (substring) {
    if (substring) {
      let flag = false;
      let index = -1;
      for (let i = 0; i < substring.length; i++) {
        let hs = substring.charCodeAt(i);
        // console.log(hs, i)
        if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
            let ls = substring.charCodeAt(i + 1);
            let uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
            if (0x1d000 <= uc && uc <= 0x1f77f) {
              flag = true;
              index = i;
              break;
            }
          }
        } else if (substring.length > 1) {
          let ls = substring.charCodeAt(i + 1);
          if (ls == 0x20e3) {
            flag = true;
            index = i;
            break;
          }
        } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
            flag = true;
            index = i;
            break;
          } else if (0x2b05 <= hs && hs <= 0x2b07) {
            flag = true;
            index = i;
            break;
          } else if (0x2934 <= hs && hs <= 0x2935) {
            flag = true;
            index = i;
            break;
          } else if (0x3297 <= hs && hs <= 0x3299) {
            flag = true;
            index = i;
            break;
          } else if (
            hs == 0xa9 ||
            hs == 0xae ||
            hs == 0x303d ||
            hs == 0x3030 ||
            hs == 0x2b55 ||
            hs == 0x2b1c ||
            hs == 0x2b1b ||
            hs == 0x2b50
          ) {
            flag = true;
            index = i;
            break;
          }
        }
      }
      return index;
    }
  },
  /**
   * 表情校驗 字符截斷
   * @param {*} index
   * @param {*} str
   */
  subToIndex (index, str) {
    let res = str.substring(0, index);
    res += str.substring(index + 2, str.length);
    return res;
  },
  /**
   * 外部調用
   * @param {str} str
   */
  isEmojiCharacter (str) {
    let str_ = str;
    let flag = false;
    let msg = {};
    let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    if (regStr.test(str_)) {
      str_ = str_.replace(regStr, "");
      msg.data = str_;
      msg.res = true;
      return msg;
    }
    // 利用死循环 将每一个表情剔除
    for (let i = 0; i < 1 + i; i++) {
      let index = util.isEmojiCharacterIndex(str_);
      if (index > -1) {
        flag = true;
        str_ = util.subToIndex(index, str_);
      } else {
        break;
      }
    }
    msg.data = str_;
    msg.res = flag;
    return msg;
  },
  /**
   * 加解密
   * 加密後會出現 =, 將= 替換成 Rp8 意思是 ricepon82002022 的縮寫.
   */
  BASE_: {
    // 解密
    dec (str, t) {
      try {
        let tt = str.replace(/Rp8/g, "=");
        tt = tt.replace(/RP8/g, "=");
        let r = window.atob(tt);
        let arg = [];
        arg = r.split("_");
        return arg; //把base64解码
      } catch (error) {
        if (t != 1) location.href = "/shop/error";
        else return [];
      }
    },
    // 加密
    enc (obj) {
      let k = obj;
      if (typeof obj == "object") {
        k = obj.join("_");
      }
      let enc_ = window.btoa(k);
      return enc_.replace(/=/g, "Rp8");
    }
  },
  getSubmitKey (qrcode) {
    let ran = Math.random()
      .toString(36)
      .substr(2); //生成 11 位數隨機字母+數字碼
    let timestamp2 = new Date().valueOf(); // 獲取當前時間的時間戳
    return ran + qrcode.substring(8, 24) + timestamp2;
  },
  /**
   * 手機橫屏處理
   */
  setPhoneRotate () {
    if (document.getElementById("preventTran")) {
      document.getElementById("preventTran").remove();
    }
    let imgData =
      "data:image/png;base64,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";
    let pd = document.createElement("div");
    pd.setAttribute("id", "preventTran");
    pd.style.position = "fixed";
    pd.style.left = "0";
    pd.style.top = "0";
    pd.style.width = "100%";
    pd.style.height = "100%";
    pd.style.overflow = "hidden";
    pd.style.backgroundColor = "#2e2e2e";
    pd.style.textAlign = "center";
    pd.style.zIndex = "99999";
    document.getElementsByTagName("body")[0].appendChild(pd);
    var img = document.createElement("img");
    img.src = imgData;
    pd.appendChild(img);
    img.style.margin = "60px auto 30px";
    var br = document.createElement("br");
    var p = document.createElement("p");
    p.style.width = "100%";
    p.style.height = "auto";
    p.style.fontSize = "22px";
    p.style.color = "#626262";
    p.style.lineHeight = "34px";
    p.style.textAlign = "center";
    p.innerHTML = "為了您的良好體驗";
    p.appendChild(br);
    p.innerHTML += "請將手機/平板豎屏操作";
    pd.appendChild(p);
  },
  /**
   * 獲取 樣式
   * @param {元素節點/類名} ele
   * @param {具體屬性} style
   * @returns
   */
  getStyle (ele, style) {
    try {
      if (typeof ele == "object") {
        let p = ele.style[style];
        if (!p) p = getComputedStyle(ele)[style];
        return p;
      } else {
        let dom = document.querySelector(ele);
        let p = dom.style[style];
        if (!p) p = getComputedStyle(dom)[style];
        return p;
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  // oss 圖片裁剪 具體參考 https://help.aliyun.com/document_detail/44688.html
  getOssObjectFit (url = "", w = 150, h = 150) {
    url = this.getImageUrl(url);
    if (url.indexOf("ricepon.oss") > -1)
      return `${url}?x-oss-process=image/resize,limit_0,m_fill,w_${parseInt(
        w
      )},h_${parseInt(h)}`;
    return url;
  },
  /**
   * 拼湊 完整的 圖片路徑
   * @param {*} url
   * @returns
   */
  getImageUrl (url = "") {
    if (!url.includes("http") && url) {
      // 獲取環境配置
      let envHost = localStorage.getItem("envHost") || "oss";
      if (envHost == "oss") {
        if (
          location.origin.includes("http://") ||
          location.host.includes("hktest.ricepon.com")
        )
          url = `https://hk-ricepon.oss-cn-hongkong.aliyuncs.com/${url}`;
        else url = `https://ricepon.oss-cn-hongkong.aliyuncs.com/${url}`;
      } else {
      }
    }
    return url;
  },
  /**
   * 獲取 rgb 格式
   * @param {*} rgba
   * @returns rgba rgb
   */
  getRgba (rgba) {
    if (rgba)
      rgba = rgba
        .replace("rgba(", "")
        .replace("rgb(", "")
        .replace(")", "");
    // 判斷 rgb 是否合理 不合理 設置默認值
    let rgb = rgba;
    let f = 1;
    try {
      let rgbArr = rgba.split(",");
      if (rgbArr.length == 4) {
        f = rgbArr.splice(3, 1);
        rgb = rgbArr.join(",");
      } else if (rgbArr.length != 3) {
        rgb = "";
      }
    } catch (error) {
      rgb = "";
    }
    return {
      rgba: `rgba(${rgb},${f})`,
      rgb: `rgb(${rgb})`,
      rgba_t: `${rgb},${f}`,
      rgb_t: rgb
    };
  },
  /**
   * 16 轉 rgb
   * @param {*} color
   * @returns
   */
  olorRgb (color) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange.join(",");
    } else {
      let rgbs = util.getRgba(sColor);
      return rgbs.rgb_t;
    }
  },
  /**
   * rgb 轉 16
   * @param {*} color
   * @returns
   */
  _RgbTo16 (color) {
    let values = color
      .replace(/rgba?\(/, "")
      .replace(/\)/, "")
      .replace(/[\s+]/g, "")
      .split(",");
    let a = parseFloat(values[3] || 1),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return (
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2)
    );
  },
  // /**
  //  *  設置動態顏色
  //  * @param {*} name
  //  * @param {*} color
  //  */
  setRootColor (name, color) {
    let root = document.querySelector(":root");
    root.setAttribute("style", `${name}: ${color}`);
  },
  setRootFontSize (name, size) {
    let root = document.documentElement;
    root.style.setProperty(`${name}`, `${size}`);
  },

  /**
   * 排序
   * @param {*} arr 數組
   * @param {*} type  第一級 - 第四級
   */
  sort (arr, type) {
    // clone 原數據, 避免修改了外部數據
    let arr_ = util.cloneObject(arr);
    // 開始排序
    arr_.sort((a, b) => {
      // 取 組類型 3 食品 4 細項
      let at = a.foodType || 0,
        bt = b.foodType || 0;
      // 當 組類型一致, 判斷 排序
      if (at == bt) {
        let akey = 0,
          bkey = 0;
        // 各級的排序, 以及 套餐/細項排序 不是一個字段
        if (type == 1 || type == 3) {
          akey = a.fcSeqNo || a.fmSeqNo || 0;
          bkey = b.fcSeqNo || b.fmSeqNo || 0;
        } else if (type == 2 || type == 4) {
          akey = a.mSeqNo || a.ciSeqNo || 0;
          bkey = b.mSeqNo || b.ciSeqNo || 0;
        }
        if (akey != bkey) {
          return akey - bkey;
        } else {
          // 套餐id  和 細項id  不是一個字段, 分開取
          let aid = a.fmId || a.fcId || a.id;
          let bid = b.fmId || b.fcId || b.id;
          return aid - bid;
        }
      } else {
        // 4(細項) 的 排在前面
        return at == 4 ? -1 : 1;
      }
    });
    return arr_;
  },
  // 時間方法
  time: {
    types: {
      1: "YYYY-MM-DD HH:mm:ss", // 年月日 時分秒
      2: "YYYY-MM-DD", // 年月日
      3: "MM-DD", // 月日
      4: "HH:mm:ss", // 時分秒
      5: "HH:mm", // 時分
      6: "YYYYMMDD", // 年月日
      7: "MM-DD HH:mm",
      8: "YYYY-MM-DD HH:mm",
      9: "YYYY/MM/DD"
    },
    /**
     * 格式化
     * @param {number} type
     * @param {string||number||Date} d
     * @returns
     */
    format (type = 1, d) {
      if (!d) d = new Date();
      else if (typeof d == "string") {
        d = d.replace(/-/g, "/");
        d = d.replace(".0", "");
      }
      let date = d;
      if (typeof d === "string" || typeof d === "number") date = new Date(d);
      return moment(date)
        .utcOffset(8)
        .format(this.types[type]);
    }
  },
  // 獲取 瀏覽器信息
  getBrowserType () {
    var ua = navigator.userAgent.toLowerCase();
    var msg = {};
    msg.type = "other";
    if (ua.indexOf(" qq") > -1) {
      //qq内置浏览器 （‘ qq’） qq浏览器 （‘qq’）
      msg.type = "QQ";
    }
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //微信浏览器
      msg.type = "Wx";
    }
    if (ua.indexOf("alipayclient") > -1) {
      //判断是否是支付宝浏览器打开
      msg.type = "zfb";
      return msg;
    }
    if (ua.match(/Alipay/i) == "alipay") {
      msg.type = "Ali";
    }
    return msg;
  },
  image: {
    /**
     * 上傳文件
     * @param { file } obj
     * @param { function } back
     */
    uploadFile (file, back = () => { }) {
      getSignature().then(res => {
        if (res.success) {
          let policyData = res.data;
          let ossUrl = policyData.host;
          let name = file.name || "";
          if (name) {
            name = file.name.split(".")[1];
          } else {
            name = ".png";
          }
          let accessUrl = policyData.dir + "/" + Date.now() + name; //上傳路徑
          let sendData = new FormData();
          sendData.append("OSSAccessKeyId", policyData["accessKeyId"]);
          sendData.append("policy", policyData["encodedPolicy"]);
          sendData.append("Signature", policyData["postSignature"]);
          sendData.append("keys", policyData["dir"]);
          sendData.append("key", accessUrl); //上传的文件路径
          sendData.append("success_action_status", 200); // 指定返回的状态码
          sendData.append("type", "image/*");
          sendData.append("file", file);
          sendData.append("configType", "ossFile");
          // 開始上傳
          ossUploadImg(ossUrl, sendData)
            .then(res => {
              // 成功后没有回调， 只要觸發了 then , 就默認為成功
              let file = ossUrl + "/" + accessUrl; //获得到的url需要将其存数据库中
              back({
                success: true,
                data: file
              });
            })
            .catch(e => {
              console.log(e);
              back({
                success: false
              });
            });
        }
      });
    },
    // base64 轉 file
    dataURLtoFile (dataURI, type) {
      let binary = window.atob(dataURI.split(",")[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },
    downloadRemoteImg (url, filename) {
      this.getBlob(url, blob => {
        this.saveAs(blob, filename);
      });
    },
    /**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @return {cb}
     */
    getBlob (url, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (xhr.status === 200) {
          cb(xhr.response);
        }
      };
      xhr.send();
    },
    /**
     * 保存
     * @param  {Blob} blob
     * @param  {String} filename 想要保存的文件名称
     */
    saveAs (blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        var body = document.querySelector("body");

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
      }
    }
  },
  history: {
    changeURLArg () {
      function changeURLArg_ (arg, arg_val) {
        let url = location.href;
        let pattern = arg + "=([^&]*)";
        let replaceText = arg + "=" + arg_val;
        if (url.match(pattern)) {
          let tmp = "/(" + arg + "=)([^&]*)/gi";
          tmp = url.replace(eval(tmp), replaceText);
          return tmp;
        } else {
          if (url.match("[?]")) {
            return url + "&" + replaceText;
          } else {
            return url + "?" + replaceText;
          }
        }
      }
      let unformatStr = changeURLArg_("t", "1");
      if (!!(window.history && history.pushState)) {
        history.replaceState(null, "", unformatStr);
      }
    }
  },
  goOther: {
    host (port) {
      if (
        location.host.includes("192.") ||
        location.host.includes("localhost") ||
        location.host.includes("127.")
      )
        return `http://${location.hostname}:${port}`;
      else return "";
    },
    embed (router, type = 1) {
      if (type == 1)
        window.location.href = `${this.host(8660)}/embed/${router}`;
      else window.location.replace(`${this.host(8660)}/embed/${router}`);
    },
    activities (router, arg) {
      window.location.href = `${this.host(9601)}/activities/${router}/${arg}`;
    }
  }
};
export default util;
