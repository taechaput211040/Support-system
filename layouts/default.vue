<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" />

      <v-spacer />

      <v-speed-dial direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-chip btn> <v-icon left> mdi-account-circle </v-icon>admin </v-chip>
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
              @click="logout()"
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
      width="280"
    >
      <v-toolbar-title class="font-weight-bold text-center pa-3" align-center>
        <h1>SUPPORT</h1>
        <h2 class="warning--text">SMARTBET</h2>
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
            <v-list-item-title :inner-text.prop="link.title" />
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
              <v-list-item-title :inner-text.prop="sublink.text" />
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
          title: "เปิด-ปิด เว็ปไซต์",
          icon: "mdi-toggle-switch",
          to: "/webManagement",
          status: true
        },
        {
          title: "เปิด-ปิด feature",
          icon: "mdi-tune",
          to: "/systemfeature",
          status: true
        },
        {
          title: "เช็คข้อมูลปัจจุบัน/จำนวนเทิร์น",
          icon: "mdi-timetable",
          to: "/member/memberCheck",
          status: true
        },
        {
          title: "เช็คข้อมูลการเล่น",
          icon: "mdi-ticket",
          to: "/member/memberReportTransaction",
          status: true
        },

        {
          title: "ข้อมูลเว็ปไซต์",
          icon: "mdi-feature-search",
          to: "/webinfo",
          status: true
        },
        {
          title: "ข้อมูล Cashback",
          icon: "mdi-feature-search",
          to: "/checkCashback",
          status: true
        },
        {
          title: "รายงาน/การตั้งค่าลิงก์รับทรัพย์",
          icon: "mdi-chart-line",
          to: "/affiliate/report",
          status: true
        },
        {
          title: "ข้อมูลสมาชิกลิงก์รับทรัพย์",
          icon: "mdi-treasure-chest",
          to: "/affiliate/userInfo",
          status: true
        },
        {
          title: "ข้อมูลสมาชิก",
          icon: "mdi-account",
          to: "/checkMember",
          status: true
        },
        {
          title: "เช็คข้อมูลโปรโมชั่น",
          icon: "mdi-gift-open",
          to: "/generalPromotion",
          status: true
        },
        {
          title: "จัดการ Landing Page",
          icon: "mdi-monitor-shimmer",
          to: "/landingpage",
          status: true
        },
        {
          title: "จัดการ Member Page",
          icon: "mdi-monitor-dashboard",
          to: "/memberpage",
          status: true
        },
        {
          title: "เปิด-ปิด ค่ายเกม",
          icon: "mdi-controller-classic",
          to: "/gamefeature",
          status: true
        },
        {
          title: "เชคเครดิตเอเย่น",
          icon: "mdi-credit-card-clock",
          to: "/checkCreditAgent",
          status: true
        },
        {
          title: "ลงทะเบียน SCB API",
          icon: "mdi-bank",
          to: "/ScbManagement",
          status: true
        },
        {
          title: "สร้างข้อมูล Macrodroid",
          icon: "mdi-android",
          to: "/MacrodroidInfo",
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
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss"></style>
