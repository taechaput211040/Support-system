<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h3 class="text-center mt-2">โยกเงินเข้า-ออก ในระบบ Smart</h3>
          <template>
            <v-card fluid class="elevation-2 mt-2">
              <v-form>
                <v-container>
                  <v-card-title>เติมเครดิต</v-card-title>
                  <v-row class="pa-0">
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        dense
                        v-model="dpcredit"
                        label="จำนวนเงิน"
                        required
                        type="number"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        dense
                        v-model="dpusername"
                        label="username"
                        hide-details="auto"
                        required
                      ></v-text-field> </v-col
                    ><v-col cols="4" md="1">
                      <v-btn color="success" @click="topup">เติมเงิน</v-btn>
                    </v-col>
                  </v-row>
                  <v-card-title>ตัดเครดิต</v-card-title>
                  <v-row class="pa-0">
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        hide-details="auto"
                        dense
                        v-model="wdcredit"
                        label="จำนวนเงิน"
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        v-model="wdusername"
                        label="username"
                        required
                      ></v-text-field> </v-col
                    ><v-col cols="4" md="1">
                      <v-btn color="success" @click="withdraw">ตัดเงิน</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form></v-card
            >
          </template>
          <div
            class="elevation-3 mt-4 rounded pa-3 col-6"
            v-if="response_display.Username"
          >
            <div>username::{{ response_display.Username }}</div>
            <div>action::{{ response_display.Action }}</div>
            <div>Amount::{{ response_display.Amount }}</div>
            <div>ProviderCode::{{ response_display.ProviderCode }}</div>
            <div>time::{{ response_display.TimeStamp }}</div>
          </div>
          <v-card class="mx-auto mt-5 justify-center classtable">
            <v-data-table
              :headers="headers"
              :items="itemtable"
              :items-per-page="100"
            >
              <template #[`item.no`]="{ index }">
                {{ index + 1 }}
              </template>

              <template #[`item.action`]="{ item }">
                <v-btn color="success" @click="insertPin(item)"> ใส่ PIN</v-btn>
              </template>

              <template #[`item.TransactionDate`]="{ item }">
                {{ item.TransactionDate.toString().slice(0, 10) }} <br />
                {{ item.TransactionDate.toString().slice(11, 19) }}
              </template>
            </v-data-table>
          </v-card>
        </v-container>
      </v-row>
    </div>

    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div>
      <v-dialog persistent v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            เติมเครดิต
          </v-card-title>
          ลายละเอียด : {{ transaction_detail }} ref: {{ pin_ref }}
          <v-divider></v-divider>
          pin:
          <v-text-field
            outlined
            dense
            v-model="pin"
            required
            hide-details="auto"
            type="number"
          ></v-text-field>
          <v-card-actions>
            <v-btn color="primary" text @click="cancleTopup"> ยกเลิก </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="validate_pin(pin)">
              ยืนยัน
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-flex>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      isLoading: false,
      response_display: {
        Username: null,
        Action: null,
        BeforeBalance: null,
        AfterBalance: null,
        TimeStamp: null
      },
      dpcredit: "",
      wdcredit: "",
      companykey: "",
      dpusername: "",
      wdusername: "",
      loaddingspin: false,
      showtable: false,
      items: [],
      itemgamecompany: [],
      renderdata: [
        {
          name: "betflix",
          credit: "20,000"
        },
        {
          name: "bk-bet",
          credit: "20,000"
        }
      ],
      headers: [
        { text: "ลำดับ", align: "start", value: "no" },

        { text: "action", align: "start", value: "method" },
        { text: "amount", align: "start", value: "amount" },
        { text: "provider", align: "start", value: "provider" },
        { text: "username", align: "start", value: "username" },
        { text: "ref", align: "start", value: "ref" },
        { text: "สถานะ", align: "start", value: "status" },
        { text: "เวลาเติม", align: "start", value: "topup_time" },
        { text: "ACTION", align: "start", value: "action" }
      ],
      itemtable: []
    };
  },
  async created() {
    await this.getTransaction_map();
  },
  methods: {
    ...mapActions("auth", [
      "deposit_smart",
      "withdraw_smart",
      "generateRef",
      "generateRef",
      "validatePin",
      "getTransaction"
    ]),
    async cancleTopup() {
      await this.getTransaction_map();
      this.dialog = false;
    },
    async validate_pin(pin) {
      this.dialog = false;
      this.isLoading = true;
      if (this.pin) {
        try {
          const res = await this.validatePin({
            ref: this.pin_ref,
            pin: this.pin
          });

          this.response_display = res.data;
          await this.getTransaction_map();
          this.isLoading = false;

          this.$swal("สำเร็จ");
        } catch (error) {
          this.isLoading = false;
          // this.$swal(error.response.data);
          this.$swal("pin ไม่ถูกต้อง");
          this.dialog = true;
        }
      } else {
        this.$swal("กรุณากรอก pin");
        await this.getTransaction_map();
      }
    },
    async insertPin(item) {
      this.transaction_detail =
        item.username +
        ":" +
        item.method +
        ":" +
        item.amount +
        ":" +
        item.provider;
      this.pin_ref = item.ref;
      this.dialog = true;
    },
    async topup() {
      if (!this.dpcredit || !this.dpusername) {
        this.$swal("กรุณากรอก ข้อมูลให้ครบ");
        return;
      }
      this.method = "deposit";

      try {
        const res = await this.generateRef({
          username: this.dpusername,
          amount: this.dpcredit,
          provider_code: "SMART",
          method: this.method
        });

        this.transaction_detail =
          res.data.username +
          ":" +
          res.data.method +
          ":" +
          res.data.amount +
          ":" +
          res.data.provider;
        this.pin_ref = res.data.ref;
        this.dialog = true;
      } catch (error) {
        console.log(error);
      }

      return;
    },
    async withdraw() {
      if (!this.wdcredit || !this.wdusername) {
        this.$swal("กรุณากรอก ข้อมูลให้ครบ");
        return;
      }
      this.method = "withdraw";

      try {
        const res = await this.generateRef({
          username: this.wdusername,
          amount: this.wdcredit,
          provider_code: "SMART",
          method: this.method
        });

        this.transaction_detail =
          res.data.username +
          ":" +
          res.data.method +
          ":" +
          res.data.amount +
          ":" +
          res.data.provider;
        this.pin_ref = res.data.ref;
        this.dialog = true;
      } catch (error) {
        console.log(error);
      }
    },

    async getTransaction_map() {
      const table = await this.getTransaction();

      this.itemtable = table.data;
    },

    async search() {
      this.showtable = true;
    },
    async refreshContent(name) {
      console.log("hi");
      this.loaddingspin = name;
      setTimeout(() => (this.loaddingspin = false), 1000);
    }
  }
};
</script>

<style lang="scss"></style>
