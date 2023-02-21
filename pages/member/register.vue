<template>
  <v-flex>
    <h3>สมัครสมาชิกใหม่</h3>
    <v-card class="mt-2 pa-3 elevation-4 mt-5 rounded-lg">
      <v-form ref="form" v-model="valid" lazy-validation
        ><v-row class="pa-3">
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic">ชื่อ</span>
            <v-text-field
              placeholder="กรอกชื่อ"
              hide-details="auto"
              v-model="formRegister.name"
              dense
              outlined
              :rules="rulesFrom.nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >นามสกุล</span
            >
            <v-text-field
              placeholder="กรอกนามสกุล"
              hide-details="auto"
              v-model="formRegister.lastname"
              :rules="rulesFrom.nameRules"
              dense
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ชื่อ (ภาษาอังกฤษ)*ไม่บังคับ</span
            >
            <v-text-field
              placeholder="กรอกชื่อ (ภาษาอังกฤษ)"
              hide-details="auto"
              v-model="formRegister.nameEng"
              dense
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >นามสกุล (ภาษาอังกฤษ)*ไม่บังคับ</span
            >
            <v-text-field
              placeholder="กรอกนามสกุล (ภาษาอังกฤษ)"
              hide-details="auto"
              dense
              v-model="formRegister.lastnameEng"
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ธนาคาร</span
            >
            <v-select
              v-model="formRegister.bankName"
              :rules="rulesFrom.bankRules"
              hide-details="auto"
              dense
              outlined
              :items="$store.state.bank"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >หมายเลขบัญชี / หมายเลข TRUEWALLET</span
            >

            <v-text-field
              placeholder="หมายเลขบัญชี / หมายเลข TRUEWALLET"
              hide-details="auto"
              dense
              type="number"
              @keydown="e => rangeInput(e, 13, formRegister.bankAcc)"
              :rules="rulesFrom.banknumRules"
              v-model="formRegister.bankAcc"
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >เบอร์โทรศัพท์</span
            >
            <v-text-field
              placeholder="กรอบเบอร์โทรศัพท์"
              hide-details="auto"
              dense
              type="number"
              :rules="rulesFrom.phoneRules"
              v-model="formRegister.phone"
              @keydown="e => rangeInput(e, 11, formRegister.phone)"
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ไลน์ ID</span
            >
            <v-text-field
              placeholder="กรอก LINE ID"
              hide-details="auto"
              dense
              outlined
              v-model="formRegister.lineID"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ผู้แนะนำ</span
            >
            <v-text-field
              placeholder="ถ้าไม่มีไม่ต้องกรอก"
              hide-details="auto"
              dense
              outlined
              v-model="formRegister.recommender"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >รู้จักจาก</span
            >
            <v-select
              :items="know_from_list"
              hide-details="auto"
              v-model="formRegister.knowFrom"
              dense
              outlined
            ></v-select
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >หมายเหตุ</span
            >
            <v-text-field
              hide-details="auto"
              dense
              outlined
              v-model="formRegister.remark"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >วันเกิด</span
            >
            <el-date-picker
              class="full-width"
              v-model="formRegister.birthdate"
              type="date"
              placeholder="วันที่"
              style="width: 100%"
            />
          </v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic">เพศ</span>
            <v-radio-group mandatory v-model="formRegister.gender">
              <v-radio label="ชาย" value="ชาย"></v-radio>
              <v-radio label="หญิง" value="หญิง"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >โบนัส</span
            >

            <v-select
              :items="bonus_list"
              v-model="formRegister.bonusid_v2"
              hide-details="auto"
              dense
              outlined
              required
            ></v-select
          ></v-col>
          <v-col cols="6" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >อนุมัติฝากออโต้</span
            >
            <v-switch v-model="formRegister.dpAuto"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="3"
            ><span class="purple--text font-weight-bold font-italic"
              >อนุมัติถอนออโต้</span
            >
            <v-switch v-model="formRegister.wdAuto"></v-switch
          ></v-col> </v-row
      ></v-form>

      <v-card-actions class="justify-center mt-3">
        <v-btn color="primary" @click="submitform"
          >สมัครสมาชิกใหม่</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      know_from_list: [
        { text: "FACEBOOK", value: "FACEBOOK" },
        { text: "GOOGLE", value: "GOOGLE" },
        { text: "YOUTUBE", value: "YOUTUBE" },
        { text: "LINE", value: "LINE" },
        { text: "TWITTER", value: "TWITTER" },
        { text: "INSTRAGRAM", value: "INSTRAGRAM" },
        { text: "TIKTOK", value: "TIKTOK" },
        { text: "เพื่อนแนะนำมา", value: "FRIEND" },
        { text: "อื่นๆ", value: "OTHER" }
      ],
      valid: false,
      rulesFrom: {
        nameRules: [v => !!v || "กรุณากรอกชื่อ"],
        lastnameRules: [v => !!v || "กรุณากรอกนามสกุล"],
        bankRules: [v => !!v || "กรุณาเลือกธนาคาร"],
        banknumRules: [
          v => !!v || "กรุณากรอกหมายเลขธนาคาร",
          v =>
            (v && v.length <= 13 && v.length >= 10) ||
            "กรุณากรอกหมายเลขธนาคารให้ถูกต้อง 10 ถึง 13หลัก"
        ],
        phoneRules: [
          v => !!v || "กรุณากรอกหมายเลขมือถือให้ถุกต้อง",
          v =>
            (v && v.length <= 11 && v.length >= 10) ||
            "กรณากรอกหมายเลขโทรศัพท์ 10 ถึง11หลัก"
        ]
      },
      bank: [
        { value: "SCB", text: "SCB - ธนาคารไทยพานิชย์" },
        { value: "TRUEWALLET", text: "TRUEWALLET - ทรูวอเล็ต" },
        { value: "KBANK", text: "KBANK - ธนาคารกสิกรไทย" }
      ],
      formRegister: {
        name: null,
        lastname: null,
        nameEng: null,
        lastnameEng: null,
        gender: "male",
        bankName: "SCB",
        bankAcc: "",
        bankAccRef: null,
        phone: "",
        lineID: null,
        recommender: null,
        remark: null,
        birthdate: new Date().toISOString().slice(0, 10),
        dpAuto: true,
        wdAuto: true,
        bonusid: 0,
        bonusid_v2: "0",
        knowFrom: "สมัครผ่านแอดมิน",
        username: null,
        password: null,
        operator: this.$store.state.auth.user
      }
    };
  },
  computed: {
    ...mapState("promotion", ["bonus_list"])
  },
  async fetch() {
    await this.getPromotion();
  },
  methods: {
    ...mapActions("promotion", ["getPromotion"]),
    ...mapActions("member", ["createMember"]),
    createUsername() {
      this.formRegister.username =
        this.$store.state.auth.company + this.$store.state.auth.agent;
      this.generatepassnum() +
        this.generatepassnum() +
        this.generatepassnum() +
        this.generatepassnum();
    },
    generatepassnum() {
      return Math.floor(Math.random(100) * 10);
    },
    async submitform() {
      if (this.$refs.form.validate()) {
        await this.checkbank();
        await this.createUsername();
        this.formRegister.birthdate = this.$moment(
          this.formRegister.birthdate
        ).format(`YYYY-MM-DD`);
        this.$swal({
          title: "ยืนยันการสมัครสมาชิก",
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel"
        }).then(async result => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            await this.createMember(this.formRegister);
            this.$swal({
              icon: "success",
              title: "สมัครสมาชิกสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500
            }).then(async result => {
              if (result) {
                this.$refs.form.reset();
              }
            });
          }
        });
      }
    },
    rangeInput(self, length, itemmodel) {
      if (/[0-9]/g.test(self.key) && itemmodel.length >= length) {
        self.preventDefault();
      }
    },
    async checkbank() {
      if (this.formRegister.bankName == "SCB") {
        this.formRegister.bankAccRef = "X" + this.formRegister.bankAcc.slice(4);
      } else if (this.formRegister.bankName == "KBANK") {
        this.formRegister.bankAccRef =
          "X-" + this.formRegister.bankAcc.slice(6);
      } else if (this.formRegister.bankName == "TRUEWALLET") {
        this.formRegister.bankAccRef = this.formRegister.phone;
      } else if (this.formRegister.bankName == "GSB") {
        this.formRegister.bankAccRef = "X" + this.formRegister.bankAcc.slice(6);
      } else if (this.formRegister.bankName == "BAAC") {
        this.formRegister.bankAccRef = "X" + this.formRegister.bankAcc.slice(6);
      } else {
        this.formRegister.bankAccRef = "X" + this.formRegister.bankAcc.slice(4);
      }
    }
  }
};
</script>

<style></style>
