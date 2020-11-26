<template>
  <div class="wrapper">
    <div class="header">
      <!-- <a href="/homes" class="nav-left pull-left">
          <img :src="siteInfo.siteLogo" alt="">
      </a> -->
      <home-header></home-header>
    </div>
    <div class="loginbg-box">
      <!-- <img class="login-img" src="../../assets/image/login.jpeg" alt=""> -->
    </div>
    <div class="login-box">
      <div class="form-box top-box">
        <p class="animated fadeInDown">专线直连 机构版交易</p>
        <p class="prompt animated fadeInUp">为投资者量身定做机构版投资软件</p>
      </div>
      <div class="form-box">
        <h2>注册</h2>
        <el-form
          :hide-required-asterisk="true"
          :model="form"
          ref="ruleForm"
          :rules="rule"
          class="demo-form-inline"
        >
          <el-form-item label="" prop="email">
            <el-input
              type="text"
              v-model="form.email"
              placeholder="请输入邮箱"
            >
              <i slot="prepend" class="iconfont icon-shouji1"></i>
            </el-input>
          </el-form-item>

          <!-- <el-form-item label="" prop="phone">
            <el-input maxlength='11' max="11" type='text' v-model="form.phone" placeholder="请输入手机号码">
              <i slot="prepend" class="iconfont icon-shouji1"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="code" v-if="$store.state.siteInfo.smsDisplay">
            <el-input type='text' v-model="form.code" placeholder="验证码">
              <el-button v-if="codeshow" @click="getCode" slot="append">点击获取验证码</el-button>
              <el-button v-if="!codeshow" slot="append">{{count}}S</el-button>
              <i slot="prepend" class="iconfont icon-tongguo5"></i>
            </el-input>
          </el-form-item> -->

          <el-form-item label="" prop="userPwd">
            <el-input
              type="password"
              v-model="form.userPwd"
              placeholder="密码为6~12位数字、字母或符号"
            >
              <i slot="prepend" class="iconfont icon-lr_password"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="pwd2">
            <el-input
              type="password"
              v-model="form.pwd2"
              placeholder="请再次确认密码"
            >
              <i slot="prepend" class="iconfont icon-lr_password"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="agentCode">
            <el-input
              disabled
              type="text"
              v-model="form.agentCode"
              placeholder="机构代码"
            >
              <i slot="prepend" class="iconfont icon-tuijian"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row class="buy-item text-left agree-box">
          <el-checkbox
            class="check-box"
            v-model="agree"
            name="type"
          ></el-checkbox>
          我已阅读并同意<a
            @click="agreeDialogVisible = true"
            href="javascript:;"
            >《注册协议》</a
          >和<a @click="tradeDialogVisible = true" href="javascript:;"
            >《{{ siteInfo.tradeAgreeTitle }}》</a
          >
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="box-btn"
            type="primary"
            :loading="islogin"
            @click="submit('ruleForm')"
            >注 册</el-button
          >
        </div>
        <div class="text-left">已有账号？<a @click="toLogin">返回登录</a></div>
      </div>
    </div>
    <div></div>
    <home-footer :siteInfo="siteInfo"></home-footer>
    <!-- <code-dialog ref="codeDialog"></code-dialog> -->
    <!-- <el-dialog
      title="验证码"
      class="er-code-dialog"
      :center="true"
      :visible.sync="dialogVisible"
      width="400px"
    >
      <div class="dialog-box">
        <el-form :hide-required-asterisk="true" class="demo-form-inline">
          <el-form-item label="" prop="phone">
            <el-input
              type="text"
              v-model="form.code2"
              placeholder="请输入验证码"
            >
              <img
                slot="append"
                @click="refreshImg"
                :src="adminUrl + '/code/getCode.do?time=' + imgCodeTime"
                height="45px"
                width="100px"
              />
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="text-center dialog-footer">
          <el-button type="primary" @click="checkImg">确定</el-button>
        </div>
      </div>
    </el-dialog> -->
    <el-dialog
      title="注册协议"
      class="agree-dialog"
      :center="true"
      :visible.sync="agreeDialogVisible"
      width="80%"
    >
      <div class="dialog-iframe">
        <div
          class="content"
          style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;"
        >
          <p v-for="item in regAgreeText.split('。')" :key="item">
            {{ item }}。
          </p>
        </div>
        <!-- <iframe class="iframe-box" :src="$store.state.siteInfo.regAgree" frameborder="0"></iframe> -->
        <div slot="footer" class="text-center dialog-footer">
          <el-button type="primary" @click="agreeRegister"
            >我已阅读并同意注册协议</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="siteInfo.tradeAgreeTitle"
      class="agree-dialog"
      :center="true"
      :visible.sync="tradeDialogVisible"
      width="80%"
    >
      <div class="dialog-iframe">
        <div
          class="content"
          style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;"
        >
          <p v-for="item in tradeAgreeText.split('。')" :key="item">
            {{ item }}。
          </p>
        </div>
        <!-- <iframe class="iframe-box" :src="$store.state.siteInfo.tradeAgree" frameborder="0"></iframe> -->
        <div slot="footer" class="text-center dialog-footer clearfix">
          <el-button type="primary" @click="agreeTrade"
            >我已阅读并同意{{ siteInfo.tradeAgreeTitle }}</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HomeFooter from "../../components/Footer";
import HomeHeader from "../../components/HeaderOrder";
// import CodeDialog from './code'
import * as api from "../../axios/api";

export default {
  components: {
    HomeFooter,
    HomeHeader
    // CodeDialog
  },
  props: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        // let myreg = /^[1][3,4,5,7,8][0-9]{9}$/  //手机号码验证
        let myreg = /^[0-9]{11}$/; // 手机号码验证
        if (!myreg.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        }
        callback();
      }
    };
    let validatePassEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        let myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; // 邮箱验证
        if (!myreg.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // let val = value.replace(/\s*/g, '')
        let valuereg = value.replace(/\s*/g, "");
        let myreg = /^[a-zA-Z0-9!@#$%^&*.]{6,12}$/; // 密码
        if (!myreg.test(valuereg)) {
          callback(new Error("请输入正确的密码"));
        }
        callback();
      }
    };
    let validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else {
        if (value !== this.form.pwd2) {
          callback(new Error("两次输入的密码不一致"));
        }
        callback();
      }
    };
    return {
      agree: true,
      tradeDialogVisible: false, // 风险揭示
      agreeDialogVisible: false, // 协议弹窗
      dialogVisible: false,
      islogin: false,
      regAgreeText: "",
      tradeAgreeText: "",
      siteInfo: {},
      form: {
        email: "",
        // code: "",
        // code2: "",
        userPwd: "",
        pwd2: "",
        agentCode: "",
      },
      rule: {
        email: [
          {
            required: true,
            validator: validatePassEmail,
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        userPwd: [
          {
            required: true,
            validator: validatePass2,
            message: "请输入密码",
            trigger: "blur"
          }
          // { min: 6,max:12, message: '密码最少为6到12位数', trigger: 'blur' },
        ],
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pwd2: [
          {
            required: true,
            validator: validatePass3,
            message: "请确认密码",
            trigger: "blur"
          }
        ],
        agentCode: [
          { required: true, message: "请输入机构代码", trigger: "blur" }
        ]
      },
      adminUrl: "",
      timer: null,
      count: 0,
      codeshow: true,
      imgCodeTime: 0
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.getInfoSite();
    this.form.agentCode = this.$route.query.code;
  },
  methods: {
    refreshImg() {
      this.adminUrl = "";
      this.imgCodeTime = Date.now();
      this.dialogImgShow = false;
      let this_ = this;
      setTimeout(function() {
        this_.adminUrl = process.env.API_HOST;
        if (this_.adminUrl === undefined) {
          this_.adminUrl = "";
        }
        this_.dialogImgShow = true;
      }, 500);
    },
    async getInfoSite() {
      // 获取网站信息
      let result = await api.getInfoSite();
      if (result.status === 0) {
        this.siteInfo = result.data;
        if (this.siteInfo.smsDisplay === false) {
          this.code = "6666";
        }
        this.regAgreeText = this.siteInfo.regAgreeText;
        this.tradeAgreeText = this.siteInfo.tradeAgreeText;
        this.$store.state.siteInfo = this.siteInfo;
        // this.form.agentCode = this.siteInfo.agentCode;
      } else {
        this.$message.error(result.msg);
      }
    },
    submit(formName) {
      // 提交
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (!this.agree) {
            this.$message.error("请先同意注册协议");
          }
          let opts = {
            // agentCode:'4023', // SR330001
            agentCode: this.form.agentCode,
            email: this.form.email,
            userPwd: this.form.userPwd,
          };
          this.islogin = true;
          let data = await api.registerEmail(opts);
          if (data.status === 0) {
            this.$message.success("注册成功，请登录");
            this.$router.push("/loginEmail");
          } else {
            this.$message.error(data.msg);
          }
          this.islogin = false;
        } else {
          return false;
        }
      });
    },
    getCode() {
      if (!this.form.phone) {
        this.$message.error("请输入电话号码");
      } else {
        // let myreg = /^[1][3,4,5,7,8][0-9]{9}$/  //手机号码验证
        let myreg = /^[0-9]{11}$/; // 手机号码验证
        if (!myreg.test(this.form.phone)) {
          this.$message.error("请输入正确的电话号码");
        } else {
          this.checkPhone();
        }
      }
    },
    async checkPhone() {
      // 先验证是否已经注册
      let data = await api.checkPhone({ phoneNum: this.form.phone });
      if (data.status === 0) {
        // 如果用户已存在返回 0
        this.$message.error("已注册,请登录");
        this.$router.push("/loginEmail");
      } else {
        this.adminUrl = process.env.API_HOST;
        if (this.adminUrl === undefined) {
          this.adminUrl = "";
        }
        // this.dialogVisible = true
        this.getcode();
      }
    },
    async checkImg() {
      if (!this.form.code2) {
        this.$message.error("您输入的验证码有误,请重新输入");
        return;
      }
      // await this.checkCode()
      let data = await api.checkCode({ code: this.form.code2 });
      if (data === "true" || data === true) {
        this.getcode();
        this.dialogVisible = false;
      } else {
        this.refreshImg();
        this.$message.error("您输入的验证码有误,请重新输入");
      }
    },
    async getcode() {
      //   var sign  = this.$md5(this.phone+'W&WzL42v').toUpperCase()
      let result = await api.getCode({ phoneNum: this.form.phone });
      if (result.status === 0) {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.codeshow = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.codeshow = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        } else {
          this.$message.error(result.msg);
        }
      } else {
        this.$message.error(result.msg);
      }
    },
    toLogin() {
      // 去注册
      this.$store.state.loginIsShow = false;
      this.$router.push("/loginEmail");
    },
    agreeRegister() {
      // this.agree = true
      this.agreeDialogVisible = false;
    },
    agreeTrade() {
      // this.agree = true
      this.tradeDialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  // background: #fff;
  padding: 0 20px;

  img {
    height: 58px;
    line-height: 58px;
  }
}

.login-box {
  width: 80%;
  margin: 0 auto;
  height: 540px;
  position: relative;

  .form-box {
    width: 320px;
    height: 500px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 32px;
    // background: #fff;
    z-index: 2;
    padding: 0 40px;
    border-radius: 4px;

    h2 {
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-size: 26px;
      padding-top: 30px;
    }

    .el-form {
      padding-top: 20px;
    }
  }

  .dialog-footer {
    margin-top: 15px;
  }
}

.login-box .text-left {
  padding: 10px 0;
}

.er-code-dialog {
  /deep/ .el-input-group__append {
    padding: 0;
    border: none;
  }

  /deep/ .el-input__inner {
    height: 45px;
    line-height: 45px;
  }

  /deep/ .el-button--primary {
    width: 80%;
  }
}

.dialog-iframe {
  .iframe-box {
    width: 100%;
    height: 460px;
  }

  .dialog-footer {
    //  height: 300px;
    margin-top: 20px;
  }
}

.form-box {
  .agree-box {
    padding: 10px 0px 0px;
    font-size: 12px;
    line-height: 20px;
  }

  .dialog-footer[data-v-94470b58] {
    margin-top: 10px;
  }
}

.login-box .top-box {
  position: absolute;
  top: 34%;
  width: 50%;
  height: 150px;
  left: 0;
  right: auto;
  background: none;

  .prompt {
    color: #b6b6b6;
    font-size: 18px;
  }

  p {
    color: #efbb53;
    font-size: 34px;
    margin-bottom: 40px;
  }
}
</style>
