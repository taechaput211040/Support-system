<template>
  <v-flex>
    <v-container>
      <loading-page v-if="loading"></loading-page>
      <h2 class="text-center mt-2 mb-4">เช็คข้อมูลสมาชิก</h2>

      <v-row class="select-item p-0">
        <v-col cols="8" md="2">
          <v-text-field
            v-model="username"
            outlined
            solo
            dense
            label="กรอก Username"
          ></v-text-field
        ></v-col>

        <v-col>
          <v-btn color="green lighten-1" dark depressed @click="search">
            ค้นหา
          </v-btn>
          <v-btn
            color=" lighten-1 black"
            rounded
            v-if="itemInfo"
            dark
            depressed
            @click="clearCatch()"
          >
            <v-icon left>mdi-refresh</v-icon>
            เคลียแคช
          </v-btn></v-col
        >
      </v-row>

      <div v-if="itemInfo">
        <div class="row">
          <div class="col-12 col-sm-6">
            <v-card class="pa-3">
              <v-card-title class="justify-center">
                ข้อมูลของ :
                <span class="font-weight-bold primary--text mx-1">{{
                  itemInfo.username
                }}</span></v-card-title
              >

              <v-card class="pa-2">
                <h3 class="pa-2">ข้อมูลเบื้องต้น</h3>
                <div class="row pa-3">
                  <div class="col-6">
                    ชื่อ-นามสกุล : {{ itemInfo.name }}
                    {{ itemInfo.lastname }}
                  </div>
                  <div class="col-6">
                    ชื่อ-นามสกุล(อังกฤษ) : {{ itemInfo.nameEng || "-" }}
                    {{ itemInfo.lastnameEng }}
                  </div>
                  <div class="col-6">ชื่อธนาคาร : {{ itemInfo.bankName }}</div>
                  <div class="col-6">
                    หมายเลขธนาคาร : {{ itemInfo.bankAcc }}
                  </div>
                  <div class="col-6">
                    หมายเลขโทรศัพท์มือถือ : {{ itemInfo.phone }}
                  </div>
                  <div class="col-6">LINE : {{ itemInfo.lineID || "-" }}</div>
                  <div class="col-6">
                    ผู้แนะนำ : {{ itemInfo.lineID || "-" }}
                  </div>
                  <div class="col-6">
                    รู้จักมาจาก : {{ itemInfo.knowFrom || "-" }}
                  </div>
                </div>
              </v-card>
              <v-card class="pa-2 mt-4">
                <h3 class="pa-2">ข้อมูลการตั้งค่า</h3>
                <div class="row pa-3">
                  <div class="col-6">
                    ฝากออโต้ :
                    <v-chip color="success" small v-if="itemInfo.dpAuto"
                      ><v-icon left>mdi-circle</v-icon>
                      {{ itemInfo.dpAuto ? "เปิด" : "ปิด" }}</v-chip
                    >
                    <v-chip color="error" small v-else
                      ><v-icon left>mdi-circle</v-icon>
                      {{ itemInfo.dpAuto ? "เปิด" : "ปิด" }}</v-chip
                    >
                  </div>
                  <div class="col-6">
                    ถอนออโต้ :
                    <v-chip color="success" small v-if="itemInfo.wdAuto"
                      ><v-icon left>mdi-circle</v-icon>
                      {{ itemInfo.wdAuto ? "เปิด" : "ปิด" }}</v-chip
                    >
                    <v-chip color="error" small v-else
                      ><v-icon left>mdi-circle</v-icon>
                      {{ itemInfo.wdAuto ? "เปิด" : "ปิด" }}</v-chip
                    >
                  </div>
                  <div class="col-6">
                    สถานะการใช้งาน :
                    <v-chip color="success" small v-if="itemInfo.status"
                      ><v-icon left>mdi-circle</v-icon>
                      {{ itemInfo.status ? "เปิด" : "ปิด" }}</v-chip
                    >
                    <v-chip color="error" small v-else
                      ><v-icon left>mdi-circle</v-icon>
                      {{ itemInfo.status ? "เปิด" : "ปิด" }}</v-chip
                    >
                  </div>
                  <div class="col-6">สมัครโดย : {{ itemInfo.operator }}</div>
                </div>
              </v-card>
            </v-card>
          </div>
          <div class="col-12 col-sm-6 "></div>
          <div class="col-12 ">
            <v-card class="pa-3">
              <v-card-title class="justify-center">
                <span class="success--text font-weight-bold">
                  รายการฝากล่าสุด :
                </span>
                {{ itemsdeposit.length }} รายการ
              </v-card-title>
              <v-divider class="pt-2 pb-2"> </v-divider>
              <v-card>
                <v-data-table
                  width="70%"
                  :items="itemsdeposit"
                  :headers="headersdeposit"
                >
                  <template #[`item.smsdatetime`]="{ item }">
                    {{ item.smsdatetime | dateFormat }}
                  </template>
                  <template #[`item.created_at`]="{ item }">
                    {{ item.created_at | dateFormat }}
                  </template></v-data-table
                >
              </v-card></v-card
            >
          </div>
          <div class="col-12 ">
            <v-card class="pa-3">
              <v-card-title class="justify-center">
                <span class="error--text font-weight-bold"
                  >รายการถอนล่าสุด :
                </span>
                {{ itemswithdraw.length }} รายการ
              </v-card-title>
              <v-divider class="pt-2 pb-2"> </v-divider>
              <v-card>
                <v-data-table
                  width="70%"
                  :items="itemswithdraw"
                  :headers="headerswithdraw"
                >
                  <template #[`item.requsettime`]="{ item }">
                    {{ item.requsettime | dateFormat }} </template
                  ><template #[`item.transferTime`]="{ item }">
                    {{ item.requsettime | dateFormat }}
                  </template>
                </v-data-table>
              </v-card></v-card
            >
          </div>
        </div>
      </div>
      <v-alert dense text type="success" v-else
        >กรอก Username
        ที่ต้องการค้นหาด้านบนแล้วกดค้นหาเพื่อเช็คข้อมูลสมาชิก</v-alert
      >
    </v-container>
  </v-flex>
</template>
<script>
import { mapActions, mapState } from "vuex";
import LoadingPage from '../components/LoadingPage.vue';
export default {
  components: { LoadingPage },
  data() {
    return {
      loading: false,
      dlInfo: false,
      itemInfo: null,
      username: null,
      website: null,
      itemswithdraw: [],
      itemsdeposit: [],
      valid: true,
      headerswithdraw: [
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "Username",
          value: "username",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "ประเภท",
          value: "type",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "ยอดโอน",
          value: "amount",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลากดถอน",
          value: "requsettime",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลาโอนสำเร็จ",
          value: "transferTime",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "สภานะ",
          value: "status",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "ถอนโดย",
          value: "operator",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          class: "grey darken-2 white--text",
          sortable: false
        }
      ],
      headersdeposit: [
        {
          text: "ธนาคารเว็ป",
          value: "companyBank",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "Username",
          value: "username",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เติมโดย",
          value: "topupby",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          class: "grey darken-2 white--text",
          sortable: false
        }
      ],
      deposit: false,
      withdraw: false,
      items: [],
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          value: "no",
          sortable: false
        },
        {
          text: "ชื่อ",
          align: "start",
          value: "name",
          sortable: false
        },
        {
          text: "นามสกุล",
          align: "start",
          value: "lastname",
          sortable: false
        },
        { text: "ธนาคาร", align: "start", value: "bankName", sortable: false },
        {
          text: "เลขบัญชีธนาคาร",
          align: "start",
          value: "bankAcc",
          sortable: false
        },
        { text: "เบอร์โทร", align: "start", value: "phone", sortable: false },
        { text: "ไลน์", align: "start", value: "lineID", sortable: false },

        {
          text: "username",
          align: "start",
          sortable: false,
          value: "username"
        },
        {
          text: "ผู้เเนะนำ",
          align: "start",
          value: "recommender",
          sortable: false
        },
        {
          text: "มาจากช่องทาง",
          align: "start",
          value: "knowFrom",
          sortable: false
        },
        {
          text: "วันที่สมัคร",
          align: "start",
          value: "created_at",
          sortable: false
        },
        {
          text: "วันที่เเก้ไขล่าสุด",
          align: "start",
          value: "updated_at",
          sortable: false
        },
        {
          text: "ผู้เเก้ไขล่าสุด",
          align: "start",
          value: "operator",
          sortable: false
        },
        {
          text: "การดำเนินก่าร",
          align: "start",
          value: "setting",
          sortable: false
        }
      ],
      itemtable: []
    };
  },

  methods: {
    async handleClickInfo(itemInfo) {
      this.itemInfo = { ...itemInfo };
      this.dlInfo = true;
    },
    ...mapActions("auth", {
      getMemberInfo: "getMemberInfo",
      getMemberDeposit: "getMemberDeposit",
      getMemberWithdraw: "getMemberWithdraw"
    }),
    async search() {
      if (this.username) {
        this.loading = true;
        try { 
          let m = await this.getMemberInfo({
            username: this.username
            // website: this.website
          });
          this.itemInfo = m.data;
          await this.todeposit(this.itemInfo);
          await this.towithdraw(this.itemInfo);
        } catch (error) {
          this.$swal({
            icon: "error",
            title: `กรุณากรอก username ให้ถูกต้อง`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
        }
        this.loading = false;
      } else {
        this.$swal({
          icon: "warning",
          title: `กรุณากรอก username !!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async todeposit(item) {
      try {
        let m = await this.getMemberDeposit({
          username: item.username
          // website: this.website
        });
        this.itemsdeposit = m.data;
      } catch (error) {
        console.log(error);
      }
    },
    async towithdraw(item) {
      try {
        let m = await this.getMemberWithdraw({
          username: item.username
          // website: this.radioGroup
        });
        this.itemswithdraw = m.data;
      } catch (error) {
        console.log(error);
      }
    },
    async checkturnTowithdraw(item) {
      try {
        let turnstatus = await this.$store.dispatch("auth/getCheckturn", {
          username: item.username
        });
        console.log(turnstatus, "turnstatus");
      } catch (error) {
        console.log(error);
      }
    },
    async clearCatch() {
      //** clearcatchapi */
      try {
        let res = await this.$store.dispatch(
          "member/clearCatch",
          this.username
        );
        this.$swal({
          icon: "success",
          title: `Clear Catch เสร็จสิ้น`,
          showConfirmButton: false,
          timer: 1500
        });
        await this.search();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
