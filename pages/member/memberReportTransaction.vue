<template>
  <div>
    <!-- <loading-page v-if="isloading"></loading-page> -->
    <loading-page v-if="isloading"></loading-page>

    <h2 class="text-center mt-2 mb-4">รายการเล่นของสมาฃิก</h2>
    <v-card class="pa-3">
      <v-alert outlined dense type="info" class="mx-3 mb-0">
        <h3>
          สามารถค้นหาย้อนหลังได้ 2 วัน หากต้องการเพิ่มเติม
          กรุณาติดต่อเจ้าหน้าที่ หรือสามารถไปค้นหาได้ที่หน้า agent
        </h3>
      </v-alert>
      <v-row class=" d-flex align-baseline ma-auto">
        <v-col cols="12" sm="3" class="d-flex  align-baseline">
          <v-text-field
            name="name"
            v-model="username"
            dense
            outlined
            clearable
            label="กรอก username เพื่อค้นหา"
            placeholder="เช่น xx1234567"
            hide-details="auto"
          ></v-text-field> </v-col
        ><v-col cols="12" sm="9" class="d-flex   align-baseline">
          <!-- <date-filter :filter="dateFilter"></date-filter> -->
          <date-filter-transaction
            :filter="dateFilter"
          ></date-filter-transaction>
        </v-col>
      </v-row>
      <v-row class=" d-flex align-baseline ma-auto">
        <v-col
          cols="12"
          sm="3"
          class="d-flex  align-baseline"
          v-if="searchSuccess"
        >
          <div class="py-0">
            <v-select
              label="เลือกจากยอดฝากล่าสุด 5 รายการ"
              dense
              hide-details="auto"
              outlined
              name="deposit5List"
              placeholder="เลือกยอดฝาก"
              :items="deposit_list_option"
              v-model="selectDeposit"
            ></v-select>
          </div>
        </v-col>
        <v-col cols="12" sm="3" class="d-flex  align-baseline py-0">
          <div>
            <v-btn color="primary" @click="searchdata()">
              <v-icon left dark> mdi-magnify </v-icon>
              ค้นหา</v-btn
            >
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          class="d-flex  align-baseline"
          v-if="searchSuccess && this.$route.query.group"
        >
          <div class=" py-0">
            <v-btn color="black " dark @click="exportExcel()">
              <v-icon left dark> mdi-download-box </v-icon>
              EXPORT</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="elevation-4 mt-5 rounded-lg">
      <report-transection
        :dbresult="itemResult"
        v-if="!this.$route.query.group"
      ></report-transection>
      <detail-transection :dbresult="itemResult" v-else></detail-transection>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { saveExcel } from "@progress/kendo-vue-excel-export";
import dayjs from "dayjs";
import DateFilterTransaction from "../../components/DateFilterTransaction.vue";
import DetailTransection from "../../components/DetailTransection.vue";
import LoadingPage from "../../components/LoadingPage.vue";
import ReportTransection from "../../components/ReportTransection.vue";
export default {
  components: {
    ReportTransection,
    DetailTransection,

    LoadingPage,
    DateFilterTransaction
  },
  data() {
    return {
      selectDeposit: null,
      deposit_list_option: [{ text: "ไม่เลือกยอดฝาก", value: null }],
      searchSuccess: false,
      dateFilter: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
        dateLimit: 3
      },
      isloading: false,
      username: null,

      stats: [],
      itemResult: [],

      fields_export: [
        // A virtual column that doesn't exist in items

        { field: "username", title: "username", sortable: true },
        { field: "start_time", title: "เวลา", sortable: true },
        { field: "provider", title: "ค่าย", sortable: true },
        { field: "game_name", title: "เกม", sortable: true },
        { field: "type", title: "ประเภทเกมส์", sortable: true },
        { field: "bet", title: "เดิมพัน", sortable: true },
        { field: "payout", title: "จ่าย", sortable: true },
        { field: "winlose", title: "แพ้ชนะ", sortable: true },
        { field: "status", title: "สถานะการคิดผล", sortable: true },
        { field: "bf_balance", title: "ก่อนเดิมพัน", sortable: true },
        { field: "after_balance", title: "หลังเดิมพัน", sortable: true }
      ]
    };
  },
  async beforeMount() {
    this.renderData();
  },
  watch: {
    "$route.query.group"() {
      this.renderData();
    }
  },
  methods: {
    ...mapActions("member", ["getTransactionMember", "get5DepositRecord"]),
    async exportExcel() {
      let params;
      if (this.selectDeposit) {
        params = this.getParameterWithDp(this.selectDeposit);
      } else {
        params = this.getParameter();
      }
      const res_export = await this.getDataExport();

      if (res_export) {
        saveExcel({
          data: res_export,
          fileName: `transaction_${this.username}_${
            this.$route.query.group
          }_${dayjs(params.starttime).format("YYYY-MM-DDTHH:mm:ss")}_${dayjs(
            params.endtime
          ).format("YYYY-MM-DDTHH:mm:ss")}.xlsx`,
          columns: this.fields_export
        });
      }

      this.isloading = false;
    },
    searchdata() {
      if (this.username) {
        this.$router.replace(`${this.$route.path}`);
        this.renderData();
      } else {
        this.$swal({
          icon: "warning",
          title: `กรุณากรอก username !!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    getParameter() {
      let dateFill = this.getDateFilter();
      let parameter = {
        username: this.username,
        provider: undefined ? undefined : this.$route.query.group,
        roundid: undefined,
        starttime: dayjs(dateFill.start).toISOString(),
        endtime: dayjs(dateFill.end).toISOString()
      };
      return parameter;
    },
    getParameterWithDp(dp) {
      let dateFill = {
        end: dayjs().toISOString(),
        start: dayjs(dp).toISOString()
      };
      let parameter = {
        username: this.username,
        provider: undefined ? undefined : this.$route.query.group,
        roundid: undefined,
        starttime: dateFill.start,
        endtime: dateFill.end
      };
      return parameter;
    },
    //getdate
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return this.$moment(
        `${this.$moment(date).format(dateFormat)} ${this.$moment(time).format(
          timeFormat
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .utc()
        .format(`${dateFormat} ${timeFormat}`);
    },
    //getdate
    getDateFilter() {
      let start = undefined;
      let end = undefined;
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(
            this.dateFilter.startDate,
            this.dateFilter.startTime
          );
        } else {
          start = this.getDateTime(
            this.dateFilter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(
            this.dateFilter.endDate,
            this.dateFilter.endTime
          );
        } else {
          end = this.getDateTime(
            this.dateFilter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      return {
        end: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
        start: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z"
      };
    },
    //getdate
    async renderData() {
      this.isloading = true;
      if (this.username) {
        try {
          let params;
          if (this.selectDeposit) {
            params = this.getParameterWithDp(this.selectDeposit);
          } else {
            params = this.getParameter();
          }

          let response = await this.getTransactionMember(params);

          if (!this.selectDeposit) {
            const lastest_5_deposit = await this.get5DepositRecord(
              this.username
            );
            if (lastest_5_deposit.data.length > 0) {
              await this.mapDepositList(lastest_5_deposit.data);
            }
          }
          this.itemResult = response.data.filter(x => x.bet != 0);
          this.searchSuccess = true;
          // console.log(this.itemResult, "res");
          // this.itemResult = response.data.stats;
          // this.dp = response.data.dp;
        } catch (error) {
          console.log(error);
        }
      }
      this.isloading = false;
    },
    async getDataExport() {
      this.isloading = true;
      if (this.username) {
        try {
          let params;
          if (this.selectDeposit) {
            params = this.getParameterWithDp(this.selectDeposit);
          } else {
            params = this.getParameter();
          }

          let response = await this.getTransactionMember(params);
          return response.data;

          // console.log(this.itemResult, "res");
          // this.itemResult = response.data.stats;
          // this.dp = response.data.dp;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
      this.isloading = false;
    },
    async mapDepositList(deposit_lists) {
      deposit_lists.map(x => {
        this.deposit_list_option.push({
          text: `ฝาก:${x.amount} โบนัส:${x.bonusamount} ${dayjs(
            x.created_at
          ).format("วันที่ DD เวลา HH:mm")}`,
          value: x.created_at
        });
      });
    }
  }
};
</script>

<style></style>
