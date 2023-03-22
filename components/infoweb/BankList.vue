<template>
  <div>
    <h3 class="mb-4">ธนาคารของเว็บ</h3>
    <v-data-table
      :headers="bankHeader"
      :items="dataBank"
      hide-default-footer
      disable-pagination
    >
      <template #[`item.status`]="{ item }">
        <v-chip
          color="success"
          label
          outlined
          dark
          small
          v-if="item.status == true"
        >
          <v-icon left small>mdi-circle</v-icon>
          เปิดใช้งาน
        </v-chip>
        <v-chip color="error" small label outlined dark v-else>
          <v-icon left small>mdi-circle</v-icon>
          ปิดใช้งาน
        </v-chip>
      </template>
      <template #[`item.mode`]="{ item }">
        <div
          class=" d-flex justify-center align-baseline"
          v-if="item.mode == 2"
        >
          <v-chip color="red" small label outlined dark>
            <v-icon left small>mdi-circle</v-icon>
            API
          </v-chip>
        </div>
        <div
          class="pt-2"
          v-if="item.mode == 0 && item.Companybank != 'TRUEWALLET'"
        >
          <v-chip color="green" small label outlined dark>
            <v-icon left small>mdi-circle</v-icon>
            SMS
          </v-chip>
        </div>
        <div
          class="pt-2"
          v-if="item.mode == 0 && item.Companybank == 'TRUEWALLET'"
        >
          <v-chip color="blue" small label outlined dark>
            <v-icon left small>mdi-circle</v-icon>
            NOTI
          </v-chip>
        </div>
      </template>
      <template #[`item.no`]="{ index }">
        <span class="font-weight-bold">
          {{ index + 1 }}
        </span>
      </template>
      <template #[`item.type`]="{ item }">
        <v-chip
          color="yellow"
          v-if="item.type == true"
          class="font-weight-bold"
        >
          ถอน
        </v-chip>

        <v-chip dark color="primary" v-else class="font-weight-bold">
          ฝาก
        </v-chip>
      </template>

      <template #[`item.balance`]="{ item,index }">
        {{ item.balance }}
        <v-tooltip bottom color="primary white--text" v-if="item.mode == 2">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="checkCredit(item, index)"
              class="mx-1"
              color="primary"
              fab
              :loading="item.loading"
              icon
              x-small
              v-bind="attrs"
              v-on="on"
              ><v-icon>mdi-refresh</v-icon></v-btn
            ></template
          ><span>เช็คยอดเงิน</span></v-tooltip
        >
      </template>

      <template #[`item.Companybankacountnumber`]="{ item }">
        <div>
          {{ item.Companybankacountnumber }}
          <v-tooltip bottom color="black white--text" v-if="item.mode == 2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-1"
                color="black"
                fab
                @click="openDlReportTransaction(item)"
                icon
                small
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-clipboard</v-icon></v-btn
              ></template
            ><span>รายการเดินบัญชี</span></v-tooltip
          >
        </div>
      </template>
      <template #[`item.visibletomember`]="{ item }">
        <span
          v-if="item.type == true && item.visibletomember == false"
          class="font-weight-bold"
          >-</span
        >
        <span
          v-else-if="item.type == false && item.visibletomember == true"
          class="font-weight-bold"
          ><v-chip color="success" small>เปิดการมองเห็น</v-chip></span
        >
        <span v-else class="font-weight-bold"
          ><v-chip color="grey" dark small>ปิดการมองเห็น</v-chip></span
        >
      </template>
    </v-data-table>
    <v-dialog max-width="1000px" v-model="dltransaction">
      <v-card>
        <v-card-title class="justify-center"> รายการเดินบัญชี </v-card-title>
        <div>
          <div class="p-auto ma-4">
            <v-btn
              color="warning"
              :disabled="page <= 1"
              small
              rounded
              @click="prevPage"
              ><v-icon left>mdi-menu-left</v-icon>BACK</v-btn
            >
            <v-btn color="success" small rounded @click="nextPage"
              >NEXT<v-icon right>mdi-menu-right</v-icon></v-btn
            >
          </div>
          <div class="pa-2">
            <v-data-table
              hide-default-footer
              :headers="fields"
              :items="transactionScbApi"
            >
              <template #[`item.amount`]="{ item }">
                {{ item.amount | numberFormat }}
              </template>
              <template #[`item.deposit_time`]="{ item }">
                {{ item.deposit_time | dateFormat }}
              </template>
            </v-data-table>
          </div>
        </div>
        <v-card-actions class="justify-center">
          <v-btn color="error" small @click.stop="dltransaction = false"
            >ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dataBank: []
  },
  data() {
    return {
      dltransaction: false,
      transactionScbApi: [],
      selectBanck: null,
      page: 1,
      fields: [
        { value: "type", text: "ประเภท", sortable: false },
        { value: "chanel", text: "ช่องทาง", sortable: false },

        { value: "deposit_time", text: "เวลาในสลิป", sortable: false },
        { value: "fromBank", text: "จาก", sortable: false },
        { value: "name", text: "รายการ", sortable: false },
        {
          value: "accRef",
          text: "เลขอ้างอิง",
          sortable: false
        },
        {
          value: "amount",
          text: "จำนวนเงิน",
          sortable: false
        },
        {
          value: "remark",
          text: "หมายเหตุ",
          cellClass: "font-weight-bold purple--text",
          sortable: false
        }
      ],
      bankHeader: [
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "40px"
        },
        {
          text: "MODE",
          value: "mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ธนาคาร",
          value: "Companybank",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "40px"
        },
        {
          text: "ยอดเงิน",
          value: "balance",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ชื่อบัญชี",
          value: "Companybankname",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "120px"
        },
        {
          text: "เลขบัญชี / เบอร์โทรศัพท์",
          value: "Companybankacountnumber",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เปิดให้สมาชิกเห็น",
          value: "visibletomember",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    async nextPage() {
      this.page++;
      await this.handleOpenReport();
    },
    async prevPage() {
      this.page--;
      if (this.page == 0) {
        this.page = 1;
      }
      await this.handleOpenReport();
    },
    async checkCredit(item) {
      item.loading = true;
      try {
        let response = await this.$store.dispatch(
          `setting/CheckCreditBank`,
          item.Companybankacountnumber
        );
        item.balance = response.balance;
        item.loading = false;
      } catch (error) {
        console.log(error);
      }
      item.loading = false;
    },
    async openDlReportTransaction(item) {
      this.selectBanck = item;
      await this.handleOpenReport();
      this.dltransaction = true;
    },
    async handleOpenReport() {
      try {
        let result = await this.$store.dispatch(
          "setting/ReportTransactionScbApi",
          { acc_num: this.selectBanck.Companybankacountnumber, page: this.page }
        );
        this.transactionScbApi = result;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
