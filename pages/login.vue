<template>
  <div class="bg-page">
    <div class="container mb-3">
      <div class="row bg_login justify-center mx-2">
        <div class="col-12 col-sm-7 col-md-5 card">
          <div class="bgdark_login pa-3 m-3">
            <v-form ref="loginform">
              <div class="pa-3">
                <h2 class="text-center">SUPPORT SMARTBET</h2>
                <div class="pa-2">
                  <v-text-field
                    label="username"
                    outlined
                    dense
                    v-model="formLogin.username"
                    hide-details="auto"
                    rounded
                  ></v-text-field>
                </div>
                <div class="pa-2">
                  <v-text-field
                    label="พาสเวิร์ด"
                    type="password"
                    outlined
                    v-model="formLogin.password"
                    dense
                    hide-details="auto"
                    rounded
                  ></v-text-field>
                </div>
                <div class="text-center">
                  <v-btn color="success" @click="login()" rounded
                    >เข้าสู่ระบบ</v-btn
                  >
                </div>
              </div>
            </v-form>
            <div class="font-weight-bold text-center">
              <small>มีปัญหาเข้าสู่ระบบ?</small>
              <small class="pink--text">ติดต่อผู้ให้บริการ</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "session",
  data() {
    return {
      formLogin: {
        username: "",
        passsword: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", {
      actionLogin: "login"
    }),
    async login() {
      try {
        let res = await this.actionLogin(this.formLogin);
        if (res.data.access_token) {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
