<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 my-4">เช็คเครดิต AGENT</h2>
    <div class="row mt-3">
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
    <div v-if="select">
      <div class="col-12 col-sm-3 px-0 mt-3">
        <v-card class="rounded-lg elevation-4 pa-2">
          <v-card-title class="justify-center">จำนวนเครดิตคงเหลือ</v-card-title>
          <div class="font-weigh-bold text-center">
            <v-progress-circular
              v-if="loadingAmount"
              indeterminate
              color="blue-grey"
            ></v-progress-circular>
            <h2 class="primary--text" v-else>{{ Balance | numberFormat }}</h2>
          </div>
          <div class="text-center">
            <v-btn
              color="black"
              @click="getBalance"
              dark
              rounded
              small
              class="my-2"
            >
              <v-icon left>mdi-refresh</v-icon>refresh
            </v-btn>
          </div>
        </v-card>
      </div>
      <div>
        <h2>ประวัติการโยกเงิน</h2>
        <v-card class="classtable mt-2">
          <v-data-table
            :headers="headersHistory"
            :options.sync="options"
            :items="itemHistory.docs"
            :server-items-length="itemHistory.count"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [10, 25, 50, 100]
            }"
          >
            <template #[`item.no`]="{ index }">
              {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
            </template>
            <template #[`item.credit`]="{ item }"
              ><div
                class="font-weight-bold"
                :class="item.credit > 0 ? 'success--text' : 'error--text'"
              >
                {{ item.credit | numberFormat }}
              </div>
            </template>
            <template #[`item.createdAt`]="{ item }">
              {{ item.createdAt | dateFormat }}
            </template></v-data-table
          >
        </v-card>
      </div>
    </div>
    <v-alert class="mt-3" dense text type="success" v-else
      >เลือกเว็ปที่ต้องการด้านบนแล้วกดค้นหาเพื่อเช็คเครดิต Agent
      รวมถึงประวัติการโยกเงิน</v-alert
    >
  </div>
</template>

<script>
import LoadingPage from "../components/LoadingPage.vue";
export default {
  data() {
    return {
      loadingAmount: false,
      options: {},
      isLoading: false,
      LoadingPageoptions: {},
      itemHistory: [],
      Balance: 0,
      selectWeb: null,
      itemweb: [],
      select: null,
      headersHistory: [
        {
          text: "No.",
          align: "center",
          value: "no",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "username",
          value: "username",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "type",
          value: "type",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "Credit",
          value: "credit",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "Date/Time",
          value: "createdAt",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "Type Ref.",
          value: "ref.type",
          sortable: false,
          cellClass: "font-weight-bold "
        },
        {
          text: "username ปลายทาง",
          value: "ref.username",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "role",
          value: "ref.role",
          sortable: false,
          cellClass: "font-weight-bold"
        }
      ]
    };
  },
  watch: {
    options: {
      handler() {
        if (this.select) {
          this.getCreditLog();
        }
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
    search() {
      if (this.selectWeb) {
        let select = this.itemweb.find(x => x.hash == this.selectWeb);
        this.getDetailWeb(select);
      }
    },
    async getDetailWeb(select) {
      this.isLoading = true;
      try {
        let details = await this.$store.dispatch(
          `setting/getDetailAgent`,
          select
        );
        this.select = details[0].username;
        await this.getBalance();
        await this.getCreditLog();
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async getBalance() {
      if (this.selectWeb) {
        this.loadingAmount = true;
        try {
          let { amount } = await this.$store.dispatch(
            "setting/getBalance",
            this.select
          );
          this.Balance = amount;
        } catch (error) {
          console.log(error);
        }
        this.loadingAmount = false;
      }
    },
    async getCreditLog() {
      if (this.selectWeb) {
        this.isLoading = true;
        let params = this.getParameterHistory(this.select);
        try {
          let { data } = await this.$store.dispatch(
            `setting/getHistoryCredit`,
            params
          );
          this.itemHistory = data.result;
        } catch (error) {
          console.log(error);
        }
        this.isLoading = false;
        this.open_history = true;
      }
    },
    getParameterHistory(username) {
      let params = {
        limit: this.options.itemsPerPage,
        page: this.options.page,
        username: username,
        type: undefined
      };
      return params;
    }
  }
};
</script>

<style></style>
