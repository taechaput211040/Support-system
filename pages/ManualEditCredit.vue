<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">เช็คข้อมูลรายการผิดพลาด</h2>
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
    <div class="mt-4" v-if="selectData">
      <search-filter-report
        @search="searchdata(dateFilter.inputfilter)"
        @yesterday="searchdata(dateFilter.inputfilter)"
        @today="searchdata(dateFilter.inputfilter)"
        :searchinput="true"
        :filter="dateFilter"
      ></search-filter-report>
      <!-- @search="searchdata(dateFilter.inputfilter)" -->
      <div class="mt-2">
        <v-data-table
          single-expand
          show-expand
          :headers="header"
          :items="itemcredit.data"
          :options.sync="options"
          :footer-props="{
            showFirstLastPage: true,
            'items-per-page-text': '',
            'items-per-page-options': [50, 100]
          }"
          :server-items-length="itemcredit.meta ? itemcredit.meta.itemCount : 0"
        >
          <template #[`item.no`]="{ index }">
            {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
          </template>
          <template #[`item.data-table-expand`]="{ isExpanded, expand }">
            <div class="px-2">
              <v-btn
                @click="expand(true)"
                v-if="!isExpanded"
                color="black"
                dark
                small
                >ดูเพิ่มเติม</v-btn
              >
              <v-btn
                @click="expand(false)"
                v-if="isExpanded"
                color="black"
                dark
                small
                >ปิด</v-btn
              >
            </div>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div class="text-center font-weight-bold purple--text">
                {{ item.remark }}
              </div>
            </td>
          </template>

          <template #[`item.created_at`]="{ item }">
            <span>
              {{ item.created_at | dateFormat }}
            </span>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import SearchFilterReport from "../components/SearchFilterReport.vue";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: { SearchFilterReport, LoadingPage },
  data() {
    return {
      isLoading: false,
      itemcredit: [],
      header: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "font-weight-bold"
        },
        {
          text: "เวลา",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-2"
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "primary--text font-weight-bold"
        },
        {
          text: "จำนวนเครดิต",
          value: "credit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "จำนวนโบนัส",
          value: "bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "เครกิตก่อน",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },

        {
          text: "เครดิตหลัง",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "ทำโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "font-weight-bold"
        }
      ],
      selectWeb: null,
      itemweb: [],
      selectData: null,
      dateFilter: {
        inputfilter: "",
        startDate: dayjs()
          .startOf("day")
          .toISOString(),
        endDate: dayjs()
          .endOf("day")
          .toISOString(),
        options: "username"
      },
      options: {}
    };
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
    getParameter() {
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: this.dateFilter.startDate,
        end: this.dateFilter.endDate,
        company: this.selectData.company,
        agent: this.selectData.agent,
        keyword: this.dateFilter.inputfilter
      };
      return parameter;
    },
    async getAllDataInfo() {
      let select = this.itemweb.find(x => x.hash == this.selectWeb);
      console.log(select, "select");
      this.selectData = {
        company: select.company,
        agent: select.agent_username
      };
      await this.searchdata();
    },
    async searchdata(input = null, option = null) {
      this.isLoading = true;
      let params = this.getParameter();
      params.keyword = input;
      params.options = option;

      try {
        let data = await this.$store.dispatch(
          "setting/getManualEditCredit",
          params
        );
        this.itemcredit = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    }
  }
};
</script>

<style></style>
