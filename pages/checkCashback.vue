<template>
  <div class="container">
    <h2 class="mb-2">ตั้งค่าเครดิตเงินคืน (Cashback)</h2>
    <div class="row">
      <div class="col-12 pa-2 col-sm-6">
        <v-autocomplete
          auto-select-first
          clearable
          hide-details="auto"
          solo
          :items="itemweb"
          label="กรอก เว็บไซต์"
          outlined
          v-model="selectWeb"
          dense
        ></v-autocomplete>
      </div>
      <div class="col-12 pa-2 col-sm-6">
        <v-btn color="green lighten-1" dark depressed @click="search">
          ค้นหา
        </v-btn>
      </div>
    </div>

    <v-card
      class="col-md-3 col-12 elevation-4 mt-5 pa-4 rounded-lg text-center"
    >
      <span class="font-weight-bold">สถานะการใช้งาน</span>
      <v-switch
        hide-details="auto"
        class="mx-5 mt-2"
        disabled
        color="success"
        :true-value="true"
        :false-value="false"
        :label="`สถานะ : ${cashback.status ? 'เปิดใช้งาน' : 'ปิดใช้งานอยู่'}`"
        v-model="cashback.status"
      ></v-switch>
    </v-card>

    <v-card
      width="100%"
      class="elevation-4 mt-5 pa-4 rounded-lg font-weight-bold"
      v-if="cashback.status == 1"
    >
      <v-row
        ><v-col cols="12" sm="6" class="ma-auto text-center">
          <span class="font-weight-bold"
            >รูปโปรโมท(ขนาด 1040x1040 ไม่เกิน 1MB)</span
          >
          <div class="pa-4">
            <img
              :src="cashback.pictureUrl"
              alt=""
              class="img_promotion pa-md-3"
            />
          </div>
        </v-col>
        <v-col cols="6" sm="6">
          <v-row class="pa-md-3 my-auto">
            <v-col cols="12" v-if="company != 'al'">
              <v-switch
                hide-details="auto"
                class="ma-3"
                color="success"
                disabled
                :true-value="true"
                :false-value="false"
                :label="
                  `โหมดการทำงาน : ${cashback.cashback_type ? 'เปิด' : 'ปิด'}`
                "
                v-model="cashback.cashback_type"
              ></v-switch>
              <div
                class="elevation-4 pa-md-3 my-auto"
                v-if="cashback.cashback_type"
              >
                <div>ตัดรอบรายวัน / รายสัปดาห์ / รายเดือน</div>
                <p>
                  คิดยอดเสียให้ตามรอบการรับที่ตั้งไว้ เช่น รายวัน ตัดรอบการคิด
                  00.00 - 23.59 ของเมื่อวาน คิดวันต่อวัน / สัปดาห์ ต่อสัปดาห์
                  เดือน / เดือน
                </p>
              </div>
              <div
                class="elevation-4 pa-md-3 my-auto"
                v-if="!cashback.cashback_type"
              >
                <div>สะสม ยอดเสีย</div>
                <p>
                  คิดยอดเสียให้คำนวนจาก (ฝาก - ถอน) ตั้งแต่ การฝากครั้งแรก หรือ
                  การกดรับแคชแบคครั้งล่าสุด
                </p>
              </div>
            </v-col>
            <v-col cols="12" v-if="company == 'al'">
              โหมดการทำงาน (Legacy)

              <div class="elevation-4 pa-md-3 my-auto">
                <div>สะสม ยอดเสีย</div>
                <p>
                  คิดยอดเสียให้คำนวนจาก ยอดฝากที่ไม่ได้มีการถอน ตั้งแต่
                  การฝากครั้งแรก หรือ การกดรับแคชแบคครั้งล่าสุด เช่น ฝาก 100
                  ไม่ได้ถอน ก็จะนำยอด 100 ไปคิด แคชแบค แต่หาก ฝาก 10000 แล้วถอน
                  200 ยอด 10000 จะไม่ถูกคิดแคชแบค
                </p>
              </div>
            </v-col>
            <v-col sm="4" cols="12">
              เลือกการรับรายได้
              <v-select
                :items="itemstype"
                :item-text="itemstype.text"
                :item-value="itemstype.value"
                v-model="cashback.collect_type"
                outlined
                disabled
                hide-details="auto"
                dense
              ></v-select
            ></v-col>
            <v-col sm="4" cols="12">
              จำนวนเครดิตเงินคืน(%)
              <v-text-field
                type="number"
                v-model="cashback.rate"
                dense
                disabled
                outlined
                hide-details="auto"
              ></v-text-field
            ></v-col>
            <v-col sm="4" cols="12">
              เงินคืนสูงสุด ( 0 คือไม่จำกัด)
              <v-text-field
                type="number"
                disabled
                v-model="cashback.max_amount"
                dense
                hide-details="auto"
                outlined
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              จำนวนอั้นถอน เมื่อกดรับเงินคืน (เป็นจำนวนเท่า ของเงิน cashback
              ที่กด รับ หากไม่อั้นถอนให้ใส่ 1000000 )
              <v-text-field
                type="number"
                disabled
                v-model="cashback.wdlimit_multiply"
                dense
                hide-details="auto"
                outlined
              ></v-text-field
            ></v-col>
          </v-row>
          <div class="px-md-4">
            <v-card-text class="font-weight-bold">
              ตั้งค่าเทิร์น
            </v-card-text>
            <v-row class="mb-4">
              <v-col cols="6" sm="4">
                <v-text-field
                  disabled
                  outlined
                  dense
                  hide-details="auto"
                  label="SLOT"
                  v-model="cashback.SL"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  disabled
                  hide-details="auto"
                  v-model="cashback.SB"
                  label="Sportbook"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  disabled
                  hide-details="auto"
                  label="ESPORT"
                  v-model="cashback.ES"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  disabled
                  hide-details="auto"
                  label="HorseRacing"
                  v-model="cashback.OT"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  disabled
                  hide-details="auto"
                  label="casino"
                  v-model="cashback.LC"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4"
                ><v-text-field
                  outlined
                  dense
                  disabled
                  hide-details="auto"
                  v-model="cashback.LT"
                  label="lotto"
                ></v-text-field
              ></v-col>
            </v-row></div
        ></v-col>
      </v-row>
    </v-card>
    <h2 class="mt-4 mb-2">ตรวจสอบ CASHBACK</h2>
    <v-card
      width="100%"
      class="elevation-4 mt-5 pa-4 rounded-lg font-weight-bold"
    >
      <div v-if="cashback.cashback_type">
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'DAY'">
          คำนวนรายได้ของเมื่อวาน
        </div>
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'WEEK'">
          คำนวนรายได้ของ วันจันทร์ ที่แล้ว ถึง วันอาทิตย์ กดรับได้วันจันทร์
        </div>
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'MOUNTH'">
          คำนวนรายได้ของ เดือนปัจจุบัน กดรับได้วันที่ 1 เดือนถัดไป
        </div>
      </div>
      <div v-if="!cashback.cashback_type && company != 'al'">
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'DAY'">
          คำนวนรายได้ ตั้งแต่กดรับแคชแบคล่าสุด
        </div>
      </div>
      <div v-if="company == 'al'">
        <div class="mt-4 mb-2" v-if="cashback.collect_type == 'DAY'">
          คำนวนรายได้ ตามยอดฝากที่ไม่มีการถอน
        </div>
      </div>
      <div class="container-fluid">
        <div class="card shadow p-3">
          <div mt-3>
            <v-row>
              <v-col cols="6" sm="4">
                <div>
                  <label>กรุณากรอก username เพื่อตรวจสอบ </label>
                  <div class="d-flex align-baseline">
                    <v-text-field
                      type="text"
                      v-model="username_cashback"
                      dense
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                    <v-btn
                      class="mx-2 btn_sty"
                      @click="searchCashback(username_cashback)"
                      color="success"
                      >ค้นหา</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="4">
                <div>
                  <label>เวลารับ แคชแบค ล่าสุด </label>
                  <div class="d-flex">
                    <v-text-field
                      type="text"
                      disabled
                      v-model="cashback_info.start_caltime"
                      dense
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="4">
                <label>แคชแบคที่สามารถรับได้ </label>
                <div class="d-flex">
                  <v-text-field
                    type="text"
                    disabled
                    v-model="cashback_info.cashback"
                    dense
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" sm="4">
                <div>
                  <label
                    >ยอดฝากรวม ตั้งแต่กดรับแคชแบคล่าสุดจนถึงปัจจุบัน
                  </label>
                  <div class="d-flex">
                    <v-text-field
                      type="text"
                      disabled
                      v-model="cashback_info.deposit"
                      dense
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="4">
                <div>
                  <label
                    >ยอดถอนรวม ตั้งแต่กดรับแคชแบคล่าสุดจนถึงปัจจุบัน
                  </label>
                  <div class="d-flex">
                    <v-text-field
                      type="text"
                      disabled
                      v-model="cashback_info.withdraw"
                      dense
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="4">
                <label>winlose </label>
                <div class="d-flex">
                  <v-text-field
                    type="text"
                    disabled
                    v-model="cashback_info.winlose"
                    dense
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      company: null,
      selectCompany: null,
      selectWeb: null,
      itemweb: [],
      cashback_info: {
        cashback: 0,
        deposit: 0,
        withdraw: 0,
        winlose: 0,
        start_caltime: ""
      },
      username_cashback: null,
      isLoading: true,
      inputPicture: undefined,
      cashback: { status: false },
      typeselect: "รับได้รายวัน",
      itemstype: [
        { value: "DAY", text: "รับได้รายวัน" },
        { value: "WEEK", text: "รับได้รายสัปดาห์" },
        { value: "MOUNTH", text: "รับได้รายเดือน" }
      ]
    };
  },
  watch: {
    selectCompany(newVal) {
      if (newVal) {
        this.company = newVal.company;
      }
    }
  },
  async created() {
    try {
      const res = await this.$store.dispatch("auth/getAllWebsite");
      this.itemweb = res.map(x => {
        return { value: x.hash, text: x.auto_link, ...x };
      });
    } catch (error) {
      console.log(error);
    }
    // await this.getProvider();
  },
  methods: {
    async searchCashback() {
      if (!this.username_cashback) {
        this.$swal({
          title: `กรุณากรอก username`,
          icon: "info",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok"
        });
        return;
      }
      this.isLoading = true;
      try {
        const temp_data = await this.$store.dispatch(
          "setting/checkCashback",
          this.username_cashback
        );
        this.cashback_info = temp_data;
        this.cashback_info.start_caltime = dayjs(
          this.cashback_info.start_caltime
        ).format("YYYY-MM-DD HH:mm:ss");
      } catch (error) {
        console.log(error);
        this.$swal({
          title: `ไม่พบข้อมูล username ที่ค้นหา`,
          icon: "error",
          allowOutsideClick: true,

          confirmButtonText: "ok"
        });
        return;
      }

      this.isLoading = false;
    },
    async search() {
      if (this.selectWeb) {
        let select = this.itemweb.find(x => x.hash == this.selectWeb);
        this.selectCompany = select.company;
        this.getCashback(select);
      }
    },
    async getCashback(payload) {
      try {
        let response = await this.$store.dispatch(
          "setting/getCashback",
          payload
        );
        this.cashback = response;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
