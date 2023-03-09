<template>
  <v-flex
    ><v-row>
      <v-container>
        <h3 class="text-center mt-2 mb-4">เช็คข้อมูลสมาชิก</h3>

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
            <v-btn
              color="green lighten-1"
              class="col-12 col-md-1"
              dark
              depressed
              @click="search"
            >
              ค้นหา
            </v-btn></v-col
          >
        </v-row>

        <v-card class="rounded-lg elevation-4">
          <v-form ref="form" v-model="valid" lazy-validation
            ><v-row class="pa-3">
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >ชื่อ</span
                >
                {{ itemtable.name }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >นามสกุล</span
                >
                {{ itemtable.lastname }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >ชื่อ (ภาษาอังกฤษ)*ไม่บังคับ</span
                >
                {{ itemtable.nameEng }}</v-col
              >
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >นามสกุล (ภาษาอังกฤษ)*ไม่บังคับ</span
                >
                {{ itemtable.lastnameEng }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >ธนาคาร</span
                >
                {{ itemtable.bankName }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >หมายเลขบัญชี / หมายเลข TRUEWALLET</span
                >

                {{ itemtable.bankAcc }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >เบอร์โทรศัพท์</span
                >
                {{ itemtable.phone }}</v-col
              >
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >ไลน์ ID</span
                >
                {{ itemtable.lineID }}</v-col
              >
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >ผู้แนะนำ</span
                >
                {{ itemtable.recommender }}</v-col
              >
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >รู้จักจาก</span
                >
                {{ itemtable.knowFrom }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >หมายเหตุ</span
                >
                {{ itemtable.remark }}</v-col
              >
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >วันเกิด</span
                >
                {{ itemtable.birthdate }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >เพศ</span
                >
                {{ itemtable.gender }}
              </v-col>
              <v-col cols="12" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >โบนัส</span
                >

                {{ itemtable.bonusid_v2 }}
              </v-col>
              <v-col cols="6" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >อนุมัติฝากออโต้</span
                >
                {{ itemtable.dpAuto }}
              </v-col>
              <v-col cols="6" sm="4" md="3"
                ><span class="purple--text font-weight-bold font-italic"
                  >อนุมัติถอนออโต้</span
                >
                {{ itemtable.wdAuto }}
              </v-col>
            </v-row></v-form
          >
        </v-card>
        {{ this.itemtable }}
      </v-container>
    </v-row></v-flex
  >
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      dlInfo: false,
      itemInfo: {},
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
          text: "กดถอนโดย",
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
      itemtable: {}
    };
  },

  methods: {
    async handleClickInfo(itemInfo) {
      this.itemInfo = { ...itemInfo };
    },
    ...mapActions("auth", {
      getMemberInfo: "getMemberInfo",
      getMemberDeposit: "getMemberDeposit",
      getMemberWithdraw: "getMemberWithdraw"
    }),
    async search() {
      if (this.username) {
        try {
          let m = await this.getMemberInfo({
            username: this.username
            // website: this.website
          });
          this.itemtable = m.data;
          this.showtable = true;
        } catch (error) {
          this.$swal({
            icon: "error",
            title: `กรุณากรอก username ให้ถูกต้อง`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
        }
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
        this.showtable = true;

        this.deposit = true;
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
        this.showtable = true;

        this.withdraw = true;
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
    }
  }
};
</script>
