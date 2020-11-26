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
          <div class="box page-part">

            <div v-if="this.$store.state.userInfo.isActive === 1 ||  this.$store.state.userInfo.isActive === 2"
                 class="box-contain clearfix">
              <div class="text-center thingsOk">
                <i v-if="this.$store.state.userInfo.isActive === 1" style="color:red;font-size: 1.5rem;"
                   class="iconfont icon-renzhengzhong"></i>
                <img v-else src="../../../../assets/image/thingsOk.png" alt="">
              </div>
              <!-- <div class="text-center">
                  <i style="color:red;font-size: 1.5rem;" class="iconfont icon-tongguo1"></i>

              </div> -->
              <!-- <div class="auth-box authed-box">
                  <el-row>
                      <el-col>
                      真实姓名：{{$store.state.userInfo.realName}}
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col>
                      身份证号：{{$store.state.userInfo.idCard}}
                      </el-col>
                  </el-row>
              </div> -->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>认证信息</span>
                </div>
                <div class="text item">
                  <div class="auth-box">
                    <i v-if="$store.state.userInfo.isActive === 2" style="font-size: 2rem;"
                       class="maincolor-font iconfont icon-tongguo1"></i>
                    <i v-else style="font-size: 2rem;" class="maincolor-font iconfont icon-shenhezhong"></i>
                    <!-- <p>您已通过实名认证</p> -->
                  </div>
                  <el-row>
                    <el-col>
                      <span class="name">真实姓名：</span>
                      <span class="info">{{$store.state.userInfo.realName}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <span class="name">身份证号：</span>
                      <span class="info">{{$store.state.userInfo.idCard}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <span class="name">身份证正面：</span>
                      <span class="img-auth">
                                        <img :src="$store.state.userInfo.img1Key" alt="">
                                    </span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <span class="name">身份证反面：</span>
                      <span class="img-auth">
                                        <img :src="$store.state.userInfo.img2Key" alt="">
                                    </span>
                    </el-col>
                  </el-row>
                  <!-- <el-row>
                      <el-col>
                          <span class="name">手持身份证：</span>
                          <span class="img-auth">
                              <img :src="$store.state.userInfo.img3Key" alt="">
                          </span>
                      </el-col>
                  </el-row> -->
                </div>
              </el-card>
            </div>
            <div v-if="this.$store.state.userInfo.isActive === 0 ||  this.$store.state.userInfo.isActive === 3"
                 class="box-contain clearfix">
              <div class="text-center prompt-box">
                <i v-if="this.$store.state.userInfo.isActive === 1" style="color:red;font-size: 1.5rem;"
                   class="iconfont icon-shenhezhong"></i>
                <i v-else style="color:red;font-size: 1.5rem;" class="iconfont icon-icon-test"></i>
                <!-- <p>* 请填写真实有效的验证信息，虚假认证可能会导致账户被冻结，由虚假认证产生的一切后果由用户负责！</p> -->
                <p>系统自动审核认证，认证成功后不能再修改，请务必如实填写！</p>
              </div>
              <div class="auth-box">
                <el-form :hide-required-asterisk='true' :model="form" label-width="100px" ref="ruleForm" :rules="rule"
                         class="demo-form-inline">
                  <el-form-item label="真实姓名" prop="name">
                    <el-input type='text' v-model="form.name" placeholder="请输入真实姓名">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="身份证号码" prop="idCard">
                    <el-input type='text' v-model="form.idCard" placeholder="请输入身份证号码">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="身份证正面" prop="idCard">
                    <el-row>
                      <el-col :span="10">
                        <el-upload
                          :with-credentials='true'
                          class="avatar-uploader"
                          :action="admin+'/user/upload.do'"
                          list-type="picture-card"
                          name="upload_file"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.img1key" :src="form.img1key" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-col>
                      <el-col :span="14">
                        <img src="../../../../assets/image/img1.jpg" alt="">
                      </el-col>
                    </el-row>

                  </el-form-item>
                  <el-form-item label="身份证背面" prop="idCard">
                    <el-row>
                      <el-col :span="10">
                        <el-upload
                          :with-credentials='true'
                          class="avatar-uploader"
                          list-type="picture-card"
                          name="upload_file"
                          :action="admin+'/user/upload.do'"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess2"
                          :before-upload="beforeAvatarUpload2">
                          <img v-if="form.img2key" :src="form.img2key" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-col>
                      <el-col :span="14">
                        <img src="../../../../assets/image/img2.jpg" alt="">
                      </el-col>
                    </el-row>

                  </el-form-item>
                  <!-- <el-form-item label="手持身份证" prop="idCard">
                      <el-row>
                          <el-col :span="10">
                              <el-upload
                                :with-credentials='true'
                                  class="avatar-uploader"
                                  list-type="picture-card"
                                  name="upload_file"
                                  :action="admin+'/user/upload.do'"
                                  :show-file-list="false"
                                  :on-success="handleAvatarSuccess3"
                                  :before-upload="beforeAvatarUpload3">
                                  <img v-if="form.img3key" :src="form.img3key" class="avatar">
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              </el-upload>
                          </el-col>
                          <el-col :span="14">
                              <img src="../../../../assets/image/img3.jpg" alt="">
                          </el-col>
                      </el-row>
                  </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" :loading="islogin" @click="submit('ruleForm')">认证</el-button>
                  <!-- <el-button  type="primary" :loading="islogin" @click="submit('ruleForm')">认证</el-button> -->
                </div>
              </div>

            </div>
            <div class="rule-box">
              <div class="title">认证规则：</div>
              <ul>
                <li>1、新用户注册后必须通过实名认证审核。</li>
                <li>2、姓名和身份证号码一经认证不予修改，修改请联系客服。</li>
                <li>3、真实姓名必须和出金银行卡户名一致。</li>
              </ul>
            </div>
          </div>

        </div>
        <!-- <home-footer :siteInfo="siteInfo"></home-footer> -->
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import HomeHeader from '../../../../components/HeaderOrder'
  import HomeFooter from '../../../../components/Footer'
  import MenuBox from '../menu'
  import * as api from '../../../../axios/api'

  export default {
    components: {
      HomeHeader,
      HomeFooter,
      MenuBox
    },
    props: {},
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'))
        } else {
          let myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证校验
          if (!myreg.test(value)) {
            callback(new Error('请输入正确的身份证号码'))
          }
          callback()
        }
      }
      return {
        hasAuth: false,
        form: {
          name: '',
          idCard: '',
          img1key: '',
          img2key: '',
          img3key: ''
        },
        rule: {
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          idCard: [
            { required: true, validator: validatePass, message: '请输入身份证', trigger: 'blur' }
          ],
          img1key: [
            { required: true, message: '请上传身份证图片', trigger: 'blur' }
          ],
          img2key: [
            { required: true, message: '请上传身份证图片', trigger: 'blur' }
          ],
          img3key: [
            { required: false, message: '请上传身份证图片', trigger: 'blur' }
          ]
        },
        islogin: false,
        admin: ''
      }
    },
    watch: {},
    computed: {},
    created () {
      if (this.$store.state.userInfo.idCard) {
        this.form.idCard = this.$store.state.userInfo.idCard
        this.form.name = this.$store.state.userInfo.realName
        if (this.$store.state.userInfo.isActive === 2) {
          this.hasAuth = true
        }
      } else {
        this.getUserInfo()
      }
    },
    mounted () {
      this.admin = process.env.API_HOST
      if (this.admin === undefined) {
        this.admin = ''
      }
      this.$store.state.userMenu = '2-9'
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.form.img1key = res.data.url
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('请选择jpg或者png的图片格式!')
        }
        // if (!isLt2M) {
        //     this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG && isLt2M
      },
      handleAvatarSuccess2 (res, file) {
        this.form.img2key = res.data.url // URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload2 (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        return isJPG && isLt2M
      },
      handleAvatarSuccess3 (res, file) {
        this.form.img3key = res.data.url // URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload3 (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('请选择jpg或者png的图片格式!')
        }
        return isJPG && isLt2M
      },
      async getUserInfo () {
        // 获取用户信息
        let data = await api.getUserInfo()
        if (data.status === 0) {
          // 判断是否登录
          this.$store.state.userInfo = data.data
          if (this.$store.state.userInfo.isActive === 2) {
            this.hasAuth = true
          }
        } else {

        }
      },
      submit (formName) {
        // 提交
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 实名认证
            let opts = {
              realName: this.form.name,
              idCard: this.form.idCard,
              img1key: this.form.img1key,
              img2key: this.form.img2key,
              img3key: this.form.img3key
            }
            this.islogin = true
            let data = await api.userAuth(opts)
            if (data.status === 0) {
              this.$message.success('认证成功!')
              this.getUserInfo()
            } else {
              this.$message.success(data.msg)
            }
            this.islogin = false
          } else {
            return false
          }
        })
      }
    }
  }
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

  .thingsOk {
    margin: 30px;

    img {
      width: 150px;
    }
  }

  .box-card {
    position: relative;

    .el-row {
      line-height: 30px;
    }

    .auth-box {
      position: absolute;
      top: 0px;
      right: 20%;
    }

    .name {
      width: 96px;
      text-align: right;
      display: inline-block;
      color: #6e6e6e;
    }

    .info {
      font-size: 16px;
    }
  }

  .wrapper {
    padding: 40px 100px;

    .demo-form-inline {
      // width: 400px;
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
      margin-left: 120px;
    }

    .img-auth {
      img {
        max-height: 230px;
        max-width: 80%;
      }
    }

  }

  .el-upload {
    /deep/ .el-upload--picture-card {
      width: 230px;
    }

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>
