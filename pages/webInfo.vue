<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">เช็คข้อมูลเว็ปไซต์</h2>
    <div class="row  my-5">
      <div class="col-12 pa-2 col-sm-6">
        <v-autocomplete
          auto-select-first
          clearable
          hide-details="auto"
          solo
          :items="itemweb"
          label="กรอก เว็บไซต์"
          v-model="selectWeb"
          outlined
          dense
        ></v-autocomplete>
      </div>
      <div class="col-12 pa-2 col-sm-6">
        <v-btn color="success" @click="getAllDataInfo">ค้นหา</v-btn>
      </div>
    </div>

    <v-card class="rounded-lg elevation-2 pa-3 ma-2" v-if="selectItem">
      <div class="row">
        <div class="col-12 col-md-6">
          <report-profit :iteminfo="selectItem"></report-profit>
        </div>
        <div class="col-12 col-md-6">
          <system-show
            :message="message"
            :datasetting="systemSetting"
          ></system-show>
        </div>
        <div class="col-12 ">
          <employee-list :employee="employeelist"></employee-list>
        </div>
        <div class="col-12 ">
          <bank-list :dataBank="bankCompany"></bank-list>
        </div>
      </div>
    </v-card>
    <v-alert dense text type="success" v-else
      >เลือกเว็ปที่ต้องการด้านบนแล้วกดค้นหาเพื่อเช็คข้อมูลเว็ปไซต์</v-alert
    >
  </div>
</template>

<script>
import BankList from "../components/infoweb/BankList.vue";
import EmployeeList from "../components/infoweb/EmployeeList.vue";
import ReportProfit from "../components/infoweb/ReportProfit.vue";
import SystemShow from "../components/infoweb/SystemShow.vue";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: { SystemShow, EmployeeList, BankList, ReportProfit, LoadingPage },
  data() {
    return {
      itemweb: [],
      selectWeb: "",
      systemSetting: {},
      message: {},
      employeelist: [],
      bankCompany: [],
      selectItem: null,
      loading: false
    };
  },
  watch: {
    selectWeb: {
      async handler() {
        this.selectItem = null;
      }
    }
  },
  async mounted() {
    const res = await this.$store.dispatch("auth/getAllWebsite");
    this.itemweb = res.map(x => {
      return { value: x.hash, text: x.auto_link, ...x };
    });
  },
  methods: {
    async getAllDataInfo() {
      if (this.selectWeb) {
        this.loading = true;
        let select = this.itemweb.find(x => x.hash == this.selectWeb);
        this.selectItem = select;
        this.systemSetting = await this.$store.dispatch(
          "setting/getSystemSetting",
          select.hash
        );
        await this.getMessage(select.hash);
        await this.getEmployee(select);
        await this.getBankCompany(select.hash);
        this.loading = false;
      }
    },
    async getMessage(hash) {
      try {
        this.message = await this.$store.dispatch(
          "setting/getWebMessage",
          hash
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getEmployee(payload) {
      try {
        let { data } = await this.$store.dispatch(
          "setting/getEmployee",
          payload
        );
        this.employeelist = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBankCompany(hash) {
      try {
        let data = await this.$store.dispatch("setting/getCompanybank", hash);
        this.bankCompany = data.map(x => {
          return {
            loading: false,
            ...x
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
