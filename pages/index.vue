<template>
  <v-flex>
    <div v-if="!isLoading">
      <v-row>
        <v-container>
          <h3 class="text-center mt-2">ประวัติการโยกเงิน</h3>

          <v-row class="select-item p-0 align-center">
            <h4 class="px-4">กรอก Username :</h4>

            <v-col cols="8" md="2">
              <v-text-field
                v-model="username"
                outlined
                hide-details="auto"
                dense
                label="กรอก Username"
              ></v-text-field
            ></v-col>
            <v-col cols="8" md="2">
              <v-text-field
                v-model="limit"
                type="number"
                hide-details="auto"
                outlined
                dense
                label="limit รายการ"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-btn
                color="green lighten-1"
                class="col-12 col-md-1"
                dark
                depressed
                @click="search(username)"
              >
                ค้นหา
              </v-btn></v-col
            >
          </v-row>

          <template>
            <v-card
              class="mt-5 justify-center"
              max-width="600"
              v-show="renderdata.Username"
            >
              <v-list-item
                ><v-list-item-content
                  ><v-list-item-title class="py-2"
                    >รายละเอียดการโยกเงิน
                  </v-list-item-title>

                  <v-list-item-subtitle
                    >Transaction active :
                    <strong> {{ renderdata.ActiveProvider }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    >Internal balance :

                    <strong> {{ renderdata.InternalBalance }} </strong>
                  </v-list-item-subtitle>

                  <v-list-item-subtitle
                    >External balance :
                    <strong>
                      {{ renderdata.ExternalBalance }}
                    </strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    >เครดิตปัจจุบัน :
                    <strong>
                      {{ renderdata.credit }}
                    </strong>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn color="success" @click="CheckDeposit" rounded
                  >เช็คฝากเงิน</v-btn
                >
                <v-btn color="black" dark rounded @click="CheckWithdraw"
                  >เช็คถอนเงิน</v-btn
                >
                <v-btn color="black" dark rounded>เข้าเกม</v-btn>
              </v-card-actions></v-card
            >
            <v-card class="mx-auto mt-5 justify-center classtable">
              <v-data-table
                :headers="headers"
                :items="itemtable"
                :items-per-page="100"
              >
                <template #[`item.no`]="{ index }">
                  {{ index + 1 }}
                </template>
                <template #[`item.ProviderCode`]="{ item }">
                  {{ item.ProviderCode }}
                </template>
                <template #[`item.IsActive`]="{ item }">
                  <v-chip
                    color="success"
                    small
                    outlined
                    v-if="item.IsActive == true"
                  >
                    <v-icon class="mr-2" color="success" small
                      >mdi mdi-checkbox-blank-circle</v-icon
                    >
                    success</v-chip
                  >
                  <v-chip
                    color="red"
                    small
                    outlined
                    v-if="item.IsActive == false"
                  >
                    <v-icon color="error" class="mr-2" small
                      >mdi mdi-checkbox-blank-circle</v-icon
                    >
                    failed</v-chip
                  >
                </template>
                <template #[`item.CreditType`]="{ item }">
                  <div v-if="item.CreditType == 'transfer'" style="color: blue">
                    เข้า ====:
                  </div>
                  <div v-if="item.CreditType == 'receive'" style="color: blue">
                    :==== ออก
                  </div>
                  <div v-if="item.CreditType == 'deposit'" style="color: green">
                    ฝาก/เติมเครดิต
                  </div>
                  <div v-if="item.CreditType == 'withdraw'" style="color: red">
                    ถอน/ตัดเครดิต
                  </div>
                </template>

                <template #[`item.TransactionDate`]="{ item }">
                  {{ item.TransactionDate }} <br />
                </template>
              </v-data-table>
            </v-card>
            <v-dialog
              v-model="dlDeposit"
              :overlay="false"
              transition="dialog-transition"
            >
              <v-card class="pa-3">
                <h3 class="pa-3">
                  รายการฝากเงินล่าสุด : {{ items_deposit.length }} รายการ
                </h3>
                <v-data-table
                  :options.sync="options_deposit"
                  :headers="headers_deposit"
                  :items="items_deposit"
                  pagination.sync="pagination"
                >
                  <template #[`item.no`]="{index}">
                    <span class="font-weight-bold">{{
                      options_deposit.itemsPerPage *
                        (options_deposit.page - 1) +
                        (index + 1)
                    }}</span>
                  </template>
                </v-data-table>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="dlWithdraw"
              :overlay="false"
              transition="dialog-transition"
            >
              <v-card class="pa-3">
                <h3 class="pa-3">
                  รายการถอนเงินล่าสุด : {{ items_withdraw.length }} รายการ
                </h3>
                <v-data-table
                  :options.sync="options_withdraw"
                  :headers="headers_withdraw"
                  :items="items_withdraw"
                  pagination.sync="pagination"
                >
                  <template #[`item.no`]="{index}">
                    <span class="font-weight-bold">{{
                      options_withdraw.itemsPerPage *
                        (options_withdraw.page - 1) +
                        (index + 1)
                    }}</span>
                  </template>
                </v-data-table>
              </v-card>
            </v-dialog>
          </template>
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
  </v-flex>
</template>
<script>
import * as moment from "moment";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      options_deposit: {},
      headers_deposit: [
        { text: "ลำดับ", align: "start", value: "no" },
        { text: "ธนาคารเว็ป", align: "center", value: "companyBank" },
        { text: "เวลาใน SMS", align: "center", value: "smsdatetime" },
        { text: "เวลาเติม", align: "center", value: "created_at" },
        { text: "member_id", align: "center", value: "username" },
        { text: "จำนวนเงิน", align: "center", value: "amount" },
        { text: "จำนวนโบนัส", align: "center", value: "bonusamount" },
        { text: "เครดิตก่อนเติม", align: "center", value: "bfcredit" },
        { text: "เครดิตหลังเติม", align: "center", value: "afcredit" },
        { text: "เติมโดย", align: "center", value: "topupby" },
        { text: "หมายเหตุ", align: "center", value: "remark" }
      ],
      options_withdraw: {},
      headers_withdraw: [
        { text: "ลำดับ", align: "start", value: "no" },
        { text: "ธนาคารลูกค้า", align: "center", value: "bankName" },
        { text: "username", align: "center", value: "username" },
        { text: "ประเภท", align: "center", value: "type" },
        { text: "ยอดโอน", align: "center", value: "amount" },
        { text: "เวลากดถอน", align: "center", value: "requsettime" },
        { text: "เวลาโอนสำเร็จ", align: "center", value: "transferTime" },
        { text: "สถานะ", align: "center", value: "status" },
        { text: "กดถอนโดย", align: "center", value: "operator" },
        { text: "หมายเหตุ", align: "center", value: "remark" }
      ],
      items_deposit: [],
      items_withdraw: [],
      dlDeposit: false,
      dlWithdraw: false,
      itemDeposit: [],
      tempCredit: null,
      isLoading: false,
      username: "",
      limit: 20,
      renderdata: {
        Username: null,

        ActiveProvider: null,
        InternalBalance: null,
        ExternalBalance: null,
        GameCode: null,
        GameType: null,
        GameName: null,
        Data: []
      },
      repair: null,
      showtable: false,
      items: [],
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          value: "no"
        },
        {
          text: "ผู้ให้บริการ",
          align: "start",
          value: "ProviderCode"
        },
        { text: "จำนวนเงิน", align: "start", value: "Amount" },
        { text: "รูปแบบการทำรายการ", align: "start", value: "CreditType" },
        { text: "Username", align: "start", value: "Username" },
        { text: "Supervisor", align: "start", value: "Supervisor" },
        { text: "สถานะ", align: "start", value: "IsActive" },
        { text: "วันที่", align: "start", value: "TransactionDate" },
        { text: "BackTrack logs", align: "start", value: "BackTrack" }
      ],
      itemtable: [
        // {
        //   bank: "KTB",
        //   name: "ภฺูมิทัศ นากร",
        //   username: "RC3377012",
        //   price: "159",
        //   dateSection: "2/12/2540",
        //   status: "สำเร็จ"
        // },
        // {
        //   bank: "KTC",
        //   name: "เอกราช ไชยศรี",
        //   username: "RC3377002",
        //   price: "149",
        //   dateSection: "2/12/2540",
        //   status: "ไม่สำเร็จ"
        // }
      ]
    };
  },
  methods: {
    ...mapActions("auth", {
      credit_history: "credit_history",
      repairTransaction: "repairTransaction",
      checkCredit: "checkCredit",
      getMember: "getMember",
      getMemberDepositV2: "getMemberDepositV2",
      getMemberWithdrawV2: "getMemberWithdrawV2"
    }),
    async CheckDeposit() {
      let { data } = await this.getMemberDepositV2(this.renderdata.Username);
      console.log(data);
      this.items_deposit = data.info;
      this.dlDeposit = true;
    },
    async CheckWithdraw() {
      let { data } = await this.getMemberWithdrawV2(this.renderdata.Username);
      console.log(data);
      this.items_withdraw = data.info;
      this.dlWithdraw = true;
    },

    getthaidate(timethai) {
      const time = moment(timethai)
        .add(7, "hours")
        .format("YYYY-MM-DD เวลา HH:mm:ss");
      return time;
    },

    async check_Credit(item, index) {
      const res = await this.checkCredit({
        username: item.Username,
        provider_code: item.ProviderCode
      });
      this.itemtable[index].test = res.data.balance;
    },

    async search(username) {
      this.showtable = true;
      console.log(username);
      this.isLoading = true;
      const a = await this.credit_history({
        username: username,
        limit: this.limit
      });

      this.itemtable = a.data.Data;
      this.itemtable = this.itemtable.map(x => {
        return {
          ...x,
          test: null
        };
      });
      let { data: memberdata } = await this.getMember({
        Id: a.data.Id,
        limit: this.limit
      });

      this.renderdata = { ...a.data, ...memberdata };
      console.log(this.renderdata, "data");
      this.repair = a.data.Data.filter(x => {
        return x.CreditType == "transfer";
      });
      if (this.repair.length > 3) {
        this.repair = this.repair.slice(0, 3);
      }

      this.isLoading = false;
      return a.data;
    },

    async repareCredit() {
      this.isLoading = true;
      const res3 = await this.repairTransaction({
        username: this.username,
        active_provider: this.renderdata.ActiveProvider,
        repair: this.repair
      });
      if (res3.data.sum > 0) {
        this.isLoading = false;
        this.$swal("ยอดเงินที่ซ่อม " + res3.data.sum + " การซ่อมสำเร็จ");
      } else {
        this.isLoading = false;
        this.$swal("การซ่อมสำเร็จ ไม่มีเงินค้างในค่ายอื่น");
      }
    }
  }
};
</script>
