<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" />

      <v-spacer />

      <v-speed-dial direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon> mdi-account-circle </v-icon>
          </v-btn>
        </template>

        <v-tooltip left color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              v-bind="attrs"
              v-on="on"
              small
              color="red"
              @click="logoutAuto()"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>ออกจากระบบ</span>
        </v-tooltip>
      </v-speed-dial>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="270"
    >
      <v-toolbar-title class="font-weight-bold text-center pa-3" align-center>
        <h1>SUPPORT</h1>
        <h2>SMARTBET</h2>
      </v-toolbar-title>
      <v-list nav dense>
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            class="pa-1 font-weight-bold"
            active-class="bg-primary-grediaun"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="link.title" />
          </v-list-item>
          <v-list-group
            color="deep-purple lighten-2 "
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </template>
            <v-list-item
              class="pa-1"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              active-class="bg-primary-grediaun"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
            </v-list-item>
          </v-list-group>
        </div>
        <div>
          <v-list-item @click="logout()" class="pa-1">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-slide-x-transition>
        <v-container>
          <div class="mainshow py-sm-4 px-2 rounded-xl">
            <Nuxt />
          </div>
        </v-container>
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  middleware: "auth",
  data() {
    return {
      image: "",
      audio: null,
      messages: [],
      socket: null,

      showMember: false,
      memberOnline: 26,
      soundsetting: {
        noauto: true,
        dp: true,
        wd: true
      },
      dialogsound: false,
      fab: false,
      dialogOutside: false,
      dialogInside: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          title: "ประวัติการโยกเงิน",
          icon: "mdi-history",
          to: "/",
          status: true
        },
        {
          title: "เติมเงินเข้า-ออก ค่ายเกม",
          icon: "mdi-history",
          to: "/topup",
          status: true
        },

        {
          title: "จัดการสมาชิก",
          icon: "mdi-account",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "สมัครสมาชิก",
              to: "/member/register",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานสมาชิก",
              to: "/member/reportMember",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คข้อมูลปัจจุบัน/จำนวนเทิร์น",
              to: "/member/memberCheck",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คข้อมูลการเล่น",
              to: "/member/memberReportTransaction",
              status: true
            }
          ]
        },
        {
          title: "รายงานฝาก/ถอน",
          icon: "mdi-credit-card-check",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "รายการฝากสมาชิก",
              to: "/reportTransaction/deposite",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการถอนสมาชิก",
              to: "/reportTransaction/withdraw",
              status: true
            }
          ]
        },
        {
          title: "ตั้งค่าโปรโมชั่น",
          icon: "mdi-history",
          to: "/promotion/generalPromotion",
          status: true
        },
        {
          title: "โยกเงินเข้า-ออกในระบบ",
          icon: "mdi-history",
          to: "/transfer",
          status: true
        },
        {
          title: "ทางเข้าหลังบ้านค่ายเกม",
          icon: "mdi-history",
          to: "/showwebgame",
          status: true
        },
        {
          title: "เปิด-ปิด ค่ายเกม",
          icon: "mdi-history",
          to: "/gamefeature",
          status: true
        }
      ]
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getsatatusBank();
      }
    }
  },
  mounted() {},
  async fetch() {},

  async beforeMount() {},
  computed: {},
  methods: {
    logout() {
      this.$router.push("/logout");
    }
  }
};
</script>
<style lang="scss"></style>
