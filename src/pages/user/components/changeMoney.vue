<template>
  <el-container class="user-center">
    <el-header class="user-header">
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-aside width="200px">
        <menu-box></menu-box>
      </el-aside>
      <el-main>
        <div class="wrapper">
          <div class="box page-part transaction">
            <div class="box-contain clearfix">
              <div class="text-center">
                <i
                  style="font-size: 1.5rem;"
                  class="maincolor-font iconfont icon-jiaoyi"
                ></i>
              </div>
              <el-card class="box-card" style="margin-top:20px;">
                <!-- <div slot="header" class="clearfix">
                    <span>指数转融资</span>
                    <span class="red">转账金额仅支持整数</span>
                </div> -->
                <div class="text item">
                  <el-tabs v-model="activeName3">
                    <el-tab-pane label="本金转港股" name="first">
                      <div class="auth-box">
                        <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前本金池可用余额' +
                              $store.state.userInfo.userCapital
                          "
                          type="warning"
                        >
                        </el-alert>
                        <el-form
                          label-width="100px"
                          v-model="form"
                          ref="ruleForm"
                          class="demo-form-inline"
                        >
                          <el-form-item label="转账金额" prop="number">
                            <el-input
                              type="number"
                              v-model="form.account5"
                              @change="getIntNumber5"
                              placeholder="请输入转账金额"
                            >
                              <el-button @click="selectAll5" slot="append"
                                >全部</el-button
                              >
                            </el-input>
                            <span class="red">转账金额仅支持整数</span>
                          </el-form-item>
                        </el-form>

                        <el-form
                          label-width="100px"
                          class="demo-form-inline"
                        >
                          <el-form-item label="约等于资金" prop="number">
                            <el-input
                              type="number"
                              v-model="count5"
                              :disabled="true"
                            >
                            <!-- <el-button @click="compute5" slot="append"
                                >计算</el-button
                              > -->
                            </el-input>
                          </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                          <el-button
                            type="primary"
                            :loading="isloading"
                            @click="Onsubmit(5)"
                            >确认转入港股账户</el-button
                          >
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="港股转本金" name="second">
                      <div class="auth-box">
                        
                        <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前港股账户可用本金余额' +
                              ($store.state.userInfo.userStockHKCapital)
                          "
                          type="warning"
                        >
                        </el-alert>

                        <!-- <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前港股账户可用余额' +
                              ($store.state.userInfo.enableHmt - $store.state.userInfo.noTransHmt)
                          "
                          type="warning"
                        >
                        </el-alert> -->
                        <!-- <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前港股账户不可划去余额' +
                              $store.state.userInfo.noTransHmt
                          "
                          type="warning"
                        >
                        </el-alert> -->
                        <el-form
                          label-width="100px"
                          v-model="form"
                          ref="ruleForm"
                          class="demo-form-inline"
                        >
                          <el-form-item label="转账金额" prop="number">
                            <el-input
                              type="number"
                              v-model="form.account6"
                              @change="getIntNumber6"
                              placeholder="请输入转账金额"
                              disabled
                            >
                              <!-- <el-button @click="selectAll6" slot="append"
                                >全部</el-button
                              > -->
                            </el-input>
                            <span class="red">转账金额仅支持整数</span>
                          </el-form-item>
                        </el-form>

                        <el-form
                          label-width="100px"
                          class="demo-form-inline"
                        >
                          <el-form-item label="约等于本金" prop="number">
                            <el-input
                              type="number"
                              v-model="count6"
                              :disabled="true"
                            >
                            <!-- <el-button @click="compute6" slot="append"
                                >计算</el-button
                              > -->
                            </el-input>
                          </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                          <el-button
                            type="primary"
                            :loading="isloading"
                            @click="Onsubmit(6)"
                            >确认转入本金账户</el-button
                          >
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-card>

              <el-card class="box-card" style="margin-top:20px;">
                <!-- <div slot="header" class="clearfix">
                    <span>指数转融资</span>
                    <span class="red">转账金额仅支持整数</span>
                </div> -->
                <div class="text item">
                  <el-tabs v-model="activeName4">
                    <el-tab-pane label="本金转A股" name="first">
                      <div class="auth-box">
                        <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前本金池可用余额' +
                              $store.state.userInfo.userCapital
                          "
                          type="warning"
                        >
                        </el-alert>
                        <el-form
                          label-width="100px"
                          v-model="form"
                          ref="ruleForm"
                          class="demo-form-inline"
                        >
                          <el-form-item label="转账金额" prop="number">
                            <el-input
                              type="number"
                              v-model="form.account7"
                              @change="getIntNumber7"
                              placeholder="请输入转账金额"
                            >
                              <el-button @click="selectAll7" slot="append"
                                >全部</el-button
                              >
                            </el-input>
                            <span class="red">转账金额仅支持整数</span>
                          </el-form-item>
                        </el-form>

                        <el-form
                          label-width="100px"
                          class="demo-form-inline"
                        >
                          <el-form-item label="约等于资金" prop="number">
                            <el-input
                              type="number"
                              v-model="count7"
                              :disabled="true"
                            >
                            <!-- <el-button @click="compute7" slot="append"
                                >计算</el-button
                              > -->
                            </el-input>
                          </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                          <el-button
                            type="primary"
                            :loading="isloading"
                            @click="Onsubmit(7)"
                            >确认转入A股账户</el-button
                          >
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="A股转本金" name="second">
                      <div class="auth-box">
                        <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前A股账户可用本金余额' +
                              ($store.state.userInfo.canWithdrawCapital)
                          "
                          type="warning"
                        >
                        </el-alert>
                        <!-- <el-alert
                          center
                          :closable="false"
                          style="width:400px;margin:10px auto;"
                          :title="
                            '当前A股账户不可划去余额' +
                              $store.state.userInfo.noTransAmt
                          "
                          type="warning"
                        >
                        </el-alert> -->
                        <el-form
                          label-width="100px"
                          v-model="form"
                          ref="ruleForm"
                          class="demo-form-inline"
                        >
                          <el-form-item label="转账金额" prop="number">
                            <el-input
                              type="number"
                              v-model="form.account8"
                              @change="getIntNumber8"
                              placeholder="请输入转账金额"
                              disabled
                            >
                              <!-- <el-button @click="selectAll8" slot="append"
                                >全部</el-button
                              > -->
                            </el-input>
                            <span class="red">转账金额仅支持整数</span>
                          </el-form-item>
                        </el-form>

                        <el-form
                          label-width="100px"
                          class="demo-form-inline"
                        >
                          <el-form-item label="约等于本金" prop="number">
                            <el-input
                              type="number"
                              v-model="count8"
                              :disabled="true"
                            >
                            <!-- <el-button @click="compute8" slot="append"
                                >计算</el-button
                              > -->
                            </el-input>
                          </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                          <el-button
                            type="primary"
                            :loading="isloading"
                            @click="Onsubmit(8)"
                            >确认转入本金账户</el-button
                          >
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <!-- <home-footer :siteInfo="siteInfo"></home-footer> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from "../../../components/HeaderOrder";
import HomeFooter from "../../../components/Footer";
import MenuBox from "./menu";
import * as api from "../../../axios/api";

export default {
  components: {
    HomeHeader,
    HomeFooter,
    MenuBox
  },
  props: {},
  data() {
    return {
      hasAuth: false,
      isloading: false,
      form: {
        account1: "",
        account2: "",
        account3: "",
        account4: "",
        account5: "",
        account6: Math.floor(this.$store.state.userInfo.userStockHKCapital),
        account7: "",
        account8: Math.floor(this.$store.state.userInfo.canWithdrawCapital),
        password: ""
      },
      activeName: "first",
      activeName2: "first",
      activeName3: "first",
      activeName4: "first",

      count5: '',
      count6: Math.floor(this.$store.state.userInfo.userStockHKCapital*this.$store.state.userInfo.fixedHRate),
      count7: '',
      count8: Math.floor(this.$store.state.userInfo.canWithdrawCapital),
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.$store.state.userMenu = "change";
  },
  methods: {
    async getUserInfo() {
      // 获取用户信息
      let data = await api.getUserInfo();
      if (data.status === 0) {
        // 判断是否登录
        this.$store.state.userInfo = data.data;
      } else {
      }
    },
    getIntNumber() {
      if (this.form.account1 >= this.$store.state.userInfo.enableAmt) {
        this.form.account1 = this.$store.state.userInfo.enableAmt;
      }
      this.form.account1 = Math.floor(this.form.account1);
    },
    getIntNumber2() {
      if (this.form.account2 >= this.$store.state.userInfo.enableIndexAmt) {
        this.form.account2 = this.$store.state.userInfo.enableIndexAmt;
      }
      this.form.account2 = Math.floor(this.form.account2);
    },
    getIntNumber3() {
      if (this.form.account3 >= this.$store.state.userInfo.enableAmt) {
        this.form.account3 = this.$store.state.userInfo.enableAmt;
      }
      this.form.account3 = Math.floor(this.form.account3);
    },
    getIntNumber4() {
      if (this.form.account4 >= this.$store.state.userInfo.enableFuturesAmt) {
        this.form.account4 = this.$store.state.userInfo.enableFuturesAmt;
      }
      this.form.account4 = Math.floor(this.form.account4);
    },
     getIntNumber5() {
      if (this.form.account5 >= this.$store.state.userInfo.userCapital) {
        this.form.account5 = this.$store.state.userInfo.userCapital;
      }
      this.form.account5 = Math.floor(this.form.account5);
      this.compute5();
    },
     getIntNumber6() {
      // if (this.form.account6 >= this.$store.state.userInfo.userStockHKCapital) {
      //   this.form.account6 = this.$store.state.userInfo.userStockHKCapital;
      // }
      this.form.account6 = Math.floor(this.$store.state.userInfo.userStockHKCapital);
      this.count6 = Math.floor(this.$store.state.userInfo.userStockHKCapital*this.$store.state.userInfo.fixedHRate);
      this.compute6();
    },
    getIntNumber7() {
      if (this.form.account7 >= this.$store.state.userInfo.userCapital) {
        this.form.account7 = this.$store.state.userInfo.userCapital;
      }
      this.form.account7 = Math.floor(this.form.account7);
      this.compute7();
    },
    getIntNumber8() {
      // if (this.form.account8 >= this.$store.state.userInfo.enableAmt) {
      //   this.form.account8 = this.$store.state.userInfo.enableAmt;
      // }
      this.form.account8 = Math.floor(this.$store.state.userInfo.canWithdrawCapital);
      this.count8 = Math.floor(this.$store.state.userInfo.canWithdrawCapital);
      this.compute8();
    },
    selectAll1() {
      // 选择全部
      this.form.account1 = Math.floor(this.$store.state.userInfo.enableAmt);
    },
    selectAll2() {
      // 选择全部
      this.form.account2 = Math.floor(
        this.$store.state.userInfo.enableIndexAmt
      );
    },
    selectAll3() {
      // 选择全部
      this.form.account3 = Math.floor(this.$store.state.userInfo.enableAmt);
    },
    selectAll4() {
      // 选择全部
      this.form.account4 = Math.floor(
        this.$store.state.userInfo.enableFuturesAmt
      );
    },
    selectAll5() {
      // 选择全部
      this.form.account5 = Math.floor(
        this.$store.state.userInfo.userCapital
      );
      this.compute5();
    },
    selectAll6() {
      // 选择全部
      this.form.account6 = Math.floor(
        // this.$store.state.userInfo.enableHmt
        // this.$store.state.userInfo.enableHmt - this.$store.state.userInfo.noTransHmt
        this.$store.state.userInfo.userStockHKCapital
      );
      this.compute6();
    },
    selectAll7() {
      // 选择全部
      this.form.account7 = Math.floor(
        this.$store.state.userInfo.userCapital
      );
      this.compute7();
    },
    selectAll8() {
      // 选择全部
      this.form.account8 = Math.floor(
        // this.$store.state.userInfo.enableAmt
        // this.$store.state.userInfo.userStockACapital
        this.$store.state.userInfo.canWithdrawCapital
        // this.$store.state.userInfo.enableAmt - this.$store.state.userInfo.noTransAmt
      );
      this.compute8();
    },
    async compute5() {
      let data = await api.capitalToHmtChange({
        amt: this.form.account5
      });
      if (data.status === 0) {
        // 成功
        this.count5 = data.data.countHmt;
      } else {
        this.$message.error(data.msg);
      }
      // this.count5 = Math.floor(this.form.account5) * this.$store.state.userInfo.hFundingLevel;
    },
    async compute6() {
      this.count6 = this.$store.state.userInfo.userStockHKCapital
      // let data = await api.hmtToCapitalChange({
      //   amt: this.form.account6
      // });
      // if (data.status === 0) {
      //   // 成功
      //   this.count6 = data.data.countCapital;
      // } else {
      //   this.$message.error(data.msg);
      // }
      // this.count6 = Math.floor(this.form.account6) / this.$store.state.userInfo.hFundingLevel;
    },
    compute7() {
      this.count7 = Math.floor(this.form.account7) * this.$store.state.userInfo.hFundingLevel;
    },
    compute8() {
      this.count8 = this.form.account8;
      // this.count8 = Math.floor(this.form.account8) / this.$store.state.userInfo.aFundingLevel;
    },
    async getSettingInfo() {
      // 网站设置信息
      let data = await api.getSetting();
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
    async Onsubmit(type) {
      if (type === 5) {
        // 本金转港股
        let opt = {
          amt: this.form.account5,
          type: 1
        };
        let data = await api.capitalTransHmtChange(opt);
        if (data.status === 0) {
          this.$message.success(data.msg);
          this.$router.push("/user");
        } else {
          this.$message.error(data.msg);
        }
      } else if (type === 6) {
        // 港股转本金
        let opt = {
          amt: this.form.account6,
          type: 2
        };
        let data = await api.capitalTransHmtChange(opt);
        if (data.status === 0) {
          this.$message.success(data.msg);
          this.$router.push("/user");
        } else {
          this.$message.error(data.msg);
        }
      } else if (type === 7) {
        // 本金转A股
        let opt = {
          amt: this.form.account7,
          type: 1
        };
        let data = await api.capitalTransAmtChange(opt);
        if (data.status === 0) {
          this.$message.success(data.msg);
          this.$router.push("/user");
        } else {
          this.$message.error(data.msg);
        }
      } else if (type === 8) {
        // A股转本金
        let opt = {
          amt: this.form.account8,
          type: 2
        };
        let data = await api.capitalTransAmtChange(opt);
        if (data.status === 0) {
          this.$message.success(data.msg);
          this.$router.push("/user");
        } else {
          this.$message.error(data.msg);
        }
      } else {
        // 融资转指数
        let opt = {
          amt:
            type === 1
              ? this.form.account1
              : type === 2
              ? this.form.account2
              : type === 3
              ? this.form.account3
              : this.form.account4,
          type: type // 1 融资转指数 2 指数转融资
        };
        let data = await api.AmtChange(opt);
        if (data.status === 0) {
          this.$message.success(data.msg);
          this.$router.push("/user");
        } else {
          this.$message.error(data.msg);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.code {
  font-size: 12px;
  color: #999;
}

.auth-box {
  margin-top: 20px;

  .el-row {
    margin-bottom: 10px;
  }
}

.authed-box {
  .el-row {
    padding-top: 40px;
    width: 400px;
    margin: 0 auto;
  }
}

.wrapper {
  padding: 20px;

  .demo-form-inline {
    width: 400px;
    margin: 20px auto;
  }

  .auth-box {
    .dialog-footer {
      width: 400px;
      margin: 0 auto;

      .el-button {
        margin-left: 100px;
        width: 300px;
      }
    }
  }

  .prompt-box {
    padding-bottom: 20px;
    color: #f44336;

    p {
      line-height: 24px;
    }
  }

  .rule-box {
    margin-top: 30px;
    line-height: 26px;
    margin-left: 70px;
  }
}

.box-card {
  .red {
    font-size: 12px;
    margin-left: 10px;
  }
}
</style>
