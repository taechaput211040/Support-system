<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h3 class="text-center mt-2">โยกเงินเข้า-ออก ค่ายเกมส์</h3>

          <template>
            <v-card fluid class="elevation-2 mt-2">
              <v-form>
                <v-container>
                  <v-card-title>เติมเครดิต</v-card-title>
                  <div class="col-12 pa-0 col-sm-6">
                    <v-autocomplete
                      auto-select-first
                      clearable
                      small-chips
                      solo
                      :items="itemgamecompany"
                      label="กรอก ค่ายเกม"
                      outlined
                      dense
                      v-model="dprovider"
                    ></v-autocomplete>
                  </div>

                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        dense
                        v-model="dpusername"
                        label="username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        dense
                        v-model="dpcredit"
                        label="จำนวนเงิน"
                        required
                        type="number"
                      ></v-text-field> </v-col
                    ><v-col cols="4" md="1">
                      <v-btn color="success" @click="topup">เติมเครดิต</v-btn>
                    </v-col>
                  </v-row>
                  <v-card-title>ตัดเครดิต</v-card-title>
                  <div class="col-12 pa-0 col-sm-6">
                    <v-autocomplete
                      auto-select-first
                      clearable
                      small-chips
                      solo
                      :items="itemgamecompany"
                      label="กรอก ค่ายเกม"
                      outlined
                      dense
                      v-model="wprovider"
                    ></v-autocomplete>
                  </div>

                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        dense
                        v-model="wdusername"
                        label="username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        outlined
                        dense
                        v-model="wdcredit"
                        label="จำนวนเงิน"
                        required
                        type="number"
                      ></v-text-field> </v-col
                    ><v-col cols="4" md="1">
                      <v-btn color="error" @click="withdraw">ตัดเครดิต</v-btn>
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
            <v-card-title
              ><v-spacer></v-spacer>
              <div class="col-12 col-sm-4 pa-1">
                <v-text-field
                  outlined
                  dense
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="username"
                  single-line
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="itemtable"
              disable-pagination
              hide-default-footer
              :search="search"
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
        <v-card class="pa-3">
          <h2 class="text-center grey lighten-2">เติมเครดิต</h2>

          <div class="pa-2">
            รายละเอียด :
            <span class="purple--text">{{ transaction_detail }} </span>ref:
            <span class="purple--text"> {{ pin_ref }}</span>
          </div>

          <v-divider></v-divider>
          <h4 class="font-weight-bold text-center mt-1">กรอก PIN</h4>
          <v-text-field
            outlined
            dense
            v-model="pin"
            required
            hide-details="auto"
            type="number"
          ></v-text-field>

          <v-card-actions>
            <v-btn color="error" text @click="cancleTopup">
              ยกเลิก
            </v-btn>
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
      search: "",
      transaction_detail: null,
      method: null,
      pin: null,
      pin_ref: null,
      dialog: false,
      response_display: {
        Username: null,
        Action: null,
        Amount: null,
        ProviderCode: null,
        TimeStamp: null
      },
      provider: null,
      isLoading: false,
      dprovider: null,
      wprovider: null,
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
    await this.getProvider();
    await this.getTransaction_map();
  },
  methods: {
    ...mapActions("auth", {
      getProviderList: "getProviderList",
      checkCredit: "checkCredit",
      topup_provider: "topup_provider",
      withdraw_provider: "withdraw_provider",
      generateRef: "generateRef",
      validatePin: "validatePin",
      getTransaction: "getTransaction"
    }),
    async cancleTopup() {
      await this.getTransaction_map();
      this.dialog = false;
    },
    async getTransaction_map() {
      const table = await this.getTransaction();

      this.itemtable = table.data;
    },
    async getProvider() {
      const provider = await this.getProviderList();
      this.itemgamecompany = provider.data.map(x => {
        return { value: x.code, text: x.name };
      });

      console.log(this.itemgamecompany);
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

    async topup() {
      if (!this.dpcredit || !this.dpusername || !this.dprovider) {
        this.$swal("กรุณากรอก ข้อมูลให้ครบ");
        return;
      }
      this.method = "deposit";

      try {
        const res = await this.generateRef({
          username: this.dpusername,
          amount: this.dpcredit,
          provider_code: this.dprovider,
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
      this.isLoading = true;

      this.dialog = true;
      return;
      //ask for pin with ref
      try {
        this.isLoading = true;
        const res = await this.topup_provider({
          username: this.dpusername,
          amount: this.dpcredit,
          provider_code: this.dprovider
        });

        this.isLoading = false;
      } catch (error) {
        console.log(error.response);
        this.isLoading = false;
      }
    },
    async withdraw() {
      if (!this.wdcredit || !this.wdusername || !this.wprovider) {
        this.$swal("กรุณากรอก ข้อมูลให้ครบ");
        return;
      }
      this.method = "withdraw";

      try {
        const res = await this.generateRef({
          username: this.wdusername,
          amount: this.wdcredit,
          provider_code: this.wprovider,
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
