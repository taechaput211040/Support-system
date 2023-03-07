<template>
  <v-flex
    ><v-row>
      <v-container>
        <h3 class="text-center mt-2 mb-4">เช็คข้อมูลรายการฝากถอน</h3>

        <div class="col-12 pa-0 col-sm-6">
          <v-autocomplete
            auto-select-first
            clearable
            small-chips
            solo
            :items="items"
            label="กรอก เว็บไซต์"
            outlined
            dense
            v-model="radioGroup"
          ></v-autocomplete>
        </div>

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

        <template>
          <!-- <v-card-title>
            <v-col cols="6" md="3">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field
            ></v-col>
          </v-card-title> -->
          <v-card class="mx-auto mt-5 justify-center classtable">
            <v-data-table
              :headers="headers"
              :items="itemtable"
              hide-default-footer
              :items-per-page="100"
            >
              <template #[`item.setting`]="{item}">
                <v-btn
                  dark
                  small
                  color="success gry-2"
                  @click.stop="todeposit(item)"
                >
                  ฝาก
                </v-btn>
                <v-btn
                  dark
                  small
                  color="error gry-2"
                  @click.stop="towithdraw(item)"
                >
                  ถอน
                </v-btn>
                <v-btn
                  small
                  color="yellow accent-3"
                  @click.stop="toeditmember(item)"
                >
                  แก้ไขข้อมูล
                </v-btn>
                <v-btn
                  :loading="loading"
                  dark
                  small
                  color="grey darken-1"
                  @click="lockuser(item)"
                >
                  LOCK USER
                </v-btn>
              </template>
              <template #[`item.no`]="{index}">
                {{ index + 1 }}
              </template>
              <template #[`item.bank`]="{item}">
                <!-- <v-avatar color="indigo lighten-1 elevation-3">
                  <v-icon dark>
                    <img v-if="item.bank == 'KTB'" src="" />
                  </v-icon>
                </v-avatar> -->
                {{ item.bank }}
              </template></v-data-table
            >
          </v-card>
          <v-dialog v-model="deposit">
            <v-card class="pa-3">
              <p class="outlined text--h3">
                รายการฝากล่าสุด : {{ itemsdeposit.length }} รายการ
              </p>
              <v-divider class="pt-2 pb-2"> </v-divider>
              <v-card>
                <v-data-table
                  width="70%"
                  :items="itemsdeposit"
                  :headers="headersdeposit"
                ></v-data-table> </v-card
            ></v-card>
          </v-dialog>
          <v-dialog v-model="withdraw" max-width="80%">
            <v-card class="pa-3">
              <p class="outlined text--h3">
                รายการถอนล่าสุด : {{ itemswithdraw.length }} รายการ
              </p>
              <v-divider class="pt-2 pb-2"> </v-divider>
              <v-card>
                <v-data-table
                  width="70%"
                  :items="itemswithdraw"
                  :headers="headerswithdraw"
                  hide-default-footer
                ></v-data-table> </v-card
            ></v-card>
          </v-dialog>
          <v-dialog
            v-model="editmember"
            max-width="800"
            class="bgcolor"
            persistent
          >
            <v-card class="pb-1"
              ><v-form v-model="valid" ref="form">
                <v-card-title>แก้ไขข้อมูลลูกค้า</v-card-title>
                <v-divider></v-divider>
                <v-card class="mt-5 ma-3 pa-3">
                  <v-row>
                    <v-col cols="12" sm="6">
                      ชื่อ
                      <v-text-field
                        placeholder="ชื่อ"
                        :rules="rules.name"
                        dense
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"
                      >นามสกุล
                      <v-text-field
                        placeholder="นามสกุล"
                        :rules="rules.lastname"
                        dense
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"
                      >ชื่อ(ภาษาอังกฤษ)*ไม่บังคับ
                      <v-text-field
                        placeholder="ชื่อ(ภาษาอังกฤษ)"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"
                      >นามสกุล(ภาษาอังกฤษ)*ไม่บังคับ
                      <v-text-field
                        placeholder="นามสกุล(ภาษาอังกฤษ)"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"
                      >ธนาคาร
                      <v-select
                        placeholder="ธนาคาร"
                        required
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      หมายเลขบัญชี/หมายเลข TRUEWALLET
                      <v-text-field
                        placeholder="เบอร์โทรศัพท์"
                        dense
                        :rules="rules.numbank"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"
                      >เบอร์โทรศัพท์
                      <v-text-field
                        placeholder="เบอร์โทรศัพท์"
                        :rules="rules.telnumber"
                        dense
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      ไลน์ ID
                      <v-text-field placeholder="ไลน์ ID" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      ผู้เเนะนำ
                      <v-text-field
                        placeholder="ผู้เเนะนำ"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      รู้จักจาก
                      <v-select
                        placeholder="รู้จักจาก"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      หมายเหตุ
                      <v-text-field placeholder="หมายเหตุ" dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      วันเกิด
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :rules="rules.date"
                            v-model="date"
                            label="ปี/เดือน/วัน เกิด"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4">
                      เพศ
                      <v-radio-group v-model="gender" row>
                        <v-radio label="ชาย" value="radio-1"></v-radio>
                        <v-radio label="หญิง" value="radio-2"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="4"
                      >โบนัส
                      <v-select
                        placeholder="เลือกโบนัส"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4"
                      >อนุมัติฝากออโต้
                      <v-switch v-model="switch1"></v-switch>
                    </v-col>
                    <v-col cols="12" sm="4"
                      >อนุมัติถอนออโต้
                      <v-switch v-model="switch2"></v-switch>
                    </v-col>
                  </v-row>
                  <div class="p-2 text-center">
                    <v-btn
                      class="m-5"
                      color="success"
                      width="40%"
                      align="dark"
                      @click="goedit"
                      >อัพเดท</v-btn
                    >
                    <v-btn
                      class="m-5"
                      color="error"
                      width="40%"
                      align="dark"
                      @click="close"
                      >ปิด</v-btn
                    >
                  </div>
                </v-card>
              </v-form></v-card
            >
          </v-dialog>
        </template>
      </v-container>
    </v-row></v-flex
  >
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      username: null,
      radioGroup: null,
      itemswithdraw: [],
      loading: false,
      menu2: false,
      date: "",
      gender: "",
      itemsdeposit: [],
      switch1: false,
      switch2: false,
      rules: {
        name: [v => !!v || "กรุณากรอกชื่อ"],
        lastname: [v => !!v || "กรุณากรอกนามสกุล"],
        numbank: [v => !!v || "กรุณากรอกหมายเลขธนาคาร"],
        telnumber: [v => !!v || "กรุณากรอกเบอร์โทรศัพท์"],
        date: [v => !!v || "กรุณากรอกวันเกิด"]
      },
      valid: true,
      headerswithdraw: [
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          class: "grey darken-2 white--text"
        },
        {
          text: "Username",
          value: "username",
          class: "grey darken-2 white--text"
        },
        {
          text: "ประเภท",
          value: "type",
          class: "grey darken-2 white--text"
        },
        {
          text: "ยอดโอน",
          value: "amount",
          class: "grey darken-2 white--text"
        },
        {
          text: "เวลากดถอน",
          value: "requsettime",
          class: "grey darken-2 white--text"
        },
        {
          text: "เวลาโอนสำเร็จ",
          value: "transferTime",
          class: "grey darken-2 white--text"
        },
        {
          text: "สภานะ",
          value: "status",
          class: "grey darken-2 white--text"
        },
        {
          text: "กดถอนโดย",
          value: "operator",
          class: "grey darken-2 white--text"
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          class: "grey darken-2 white--text"
        }
      ],
      headersdeposit: [
        {
          text: "ธนาคารเว็ป",
          value: "companyBank",
          class: "grey darken-2 white--text"
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          class: "grey darken-2 white--text"
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          class: "grey darken-2 white--text"
        },
        {
          text: "Username",
          value: "member_id",
          class: "grey darken-2 white--text"
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          class: "grey darken-2 white--text"
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          class: "grey darken-2 white--text"
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          class: "grey darken-2 white--text"
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          class: "grey darken-2 white--text"
        },
        {
          text: "เติมโดย",
          value: "topupby",
          class: "grey darken-2 white--text"
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          class: "grey darken-2 white--text"
        }
      ],
      deposit: false,
      withdraw: false,
      editmember: false,
      topupitem: {},
      modelitem: {},
      items: [],
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          value: "no"
        },
        {
          text: "ชื่อ",
          align: "start",
          value: "name"
        },
        {
          text: "นามสกุล",
          align: "start",
          value: "lastname"
        },
        { text: "ธนาคาร", align: "start", value: "bankName" },
        { text: "เลขบัญชีธนาคาร", align: "start", value: "bankAcc" },
        { text: "เบอร์โทร", align: "start", value: "phone" },
        { text: "ไลน์", align: "start", value: "lineID" },

        {
          text: "username",
          align: "start",
          sortable: true,
          value: "username"
        },
        {
          text: "ผู้เเนะนำ",
          align: "start",
          value: "recommender"
        },
        {
          text: "มาจากช่องทาง",
          align: "start",
          value: "knowFrom"
        },
        { text: "วันที่สมัคร", align: "start", value: "created_at" },
        { text: "วันที่เเก้ไขล่าสุด", align: "start", value: "updated_at" },
        { text: "ผู้เเก้ไขล่าสุด", align: "start", value: "operator" },
        { text: "การดำเนินก่าร", align: "start", value: "setting" }
      ],
      itemtable: []
    };
  },
  async created() {
    // await this.getProvider();
    const res = await this.getAllWebsite();

    this.items = res.map(x => {
      return { value: x.website, text: x.website };
    });
  },
  methods: {
    ...mapActions("auth", {
      getProviderList: "getProviderList",

      getAllWebsite: "getAllWebsite",
      getMemberInfo: "getMemberInfo",
      getMemberDeposit: "getMemberDeposit",
      getMemberWithdraw: "getMemberWithdraw"
    }),
    async search() {
      if (this.username) {
        try {
          let m = await this.getMemberInfo({
            username: this.username,
            website: this.radioGroup
          });
          this.itemtable = m.data.info;
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
      let m = await this.getMemberDeposit({
        username: item.username,
        website: this.radioGroup
      });
      this.itemsdeposit = m.data.info;
      this.showtable = true;

      this.deposit = true;
    },
    async towithdraw(item) {
      let m = await this.getMemberWithdraw({
        username: item.username,
        website: this.radioGroup
      });
      this.itemswithdraw = m.data.info;
      this.showtable = true;

      this.withdraw = true;
    },
    toeditmember(item) {
      this.modelitem = item;
      this.editmember = true;
    },
    goedit() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log("success");
        this.editmember = false;
      }
    },
    close() {
      this.$refs.form.reset();
      this.editmember = false;
    },
    lockuser(item) {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1500);
      console.log(item);
    }
  }
};
</script>
