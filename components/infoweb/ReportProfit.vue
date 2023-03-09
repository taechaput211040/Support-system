<template>
  <div>
    <h3 class="mb-2">กำไร / ขาดทุน</h3>
    <search-filter @search="search"></search-filter>
    <div class="row pa-3" v-if="dataProfit">
      <div class="col-6">
        <v-card
          class="rounded-lg elevation-4 pa-2 d-flex justify-space-between"
        >
          <div>
            <div class="primary--text font-weight-bold">
              ฝาก
            </div>
            <div class="font-weight-bold ">
              {{ dataProfit.deposit || 0 | numberFormat }}
            </div>
          </div>
          <v-icon large>mdi-account-cash</v-icon>
        </v-card>
      </div>
      <div class="col-6">
        <v-card
          class="rounded-lg elevation-4 pa-2 d-flex justify-space-between"
        >
          <div>
            <div class="pink--text font-weight-bold">
              ถอน
            </div>
            <div class="font-weight-bold ">
              {{ dataProfit.withdraw || 0 | numberFormat }}
            </div>
          </div>
          <v-icon large>mdi-cash-minus</v-icon>
        </v-card>
      </div>
      <div class="col-6">
        <v-card
          class="rounded-lg elevation-4 pa-2 d-flex justify-space-between"
        >
          <div>
            <div class="purple--text font-weight-bold">
              โบนัส
            </div>
            <div class="font-weight-bold ">
              {{ dataProfit.bonus || 0 | numberFormat }}
            </div>
          </div>
          <v-icon large>mdi-gift</v-icon>
        </v-card>
      </div>
      <div class="col-6">
        <v-card
          class="rounded-lg elevation-4 pa-2 d-flex justify-space-between"
        >
          <div>
            <div class="purple--text font-weight-bold">
              ฝาก+โบนัส
            </div>
            <div class="font-weight-bold ">
              {{ dataProfit.dp_bonus || 0 | numberFormat }}
            </div>
          </div>
          <v-icon large>mdi-chevron-right-circle</v-icon>
        </v-card>
      </div>
      <div class="col-6">
        <v-card
          class="rounded-lg elevation-4 pa-2 d-flex justify-space-between"
        >
          <div>
            <div class="green--text font-weight-bold">
              กำไรขาดทุน
            </div>
            <div class="font-weight-bold ">
              {{ dataProfit.winlose || 0 | numberFormat }}
            </div>
          </div>
          <v-icon large>mdi-finance</v-icon>
        </v-card>
      </div>
    </div>
    <div v-else>
      <v-alert dense outlined type="error" variant="outlined"
        >เลือกวันที่ที่ต้องการด้านบนแล้วกดค้นหาเพื่อดูยอดกำไรขาดทุน</v-alert
      >
    </div>
  </div>
</template>

<script>
import SearchFilter from "../SearchFilter.vue";
export default {
  components: { SearchFilter },
  props: {
    iteminfo: {}
  },
  watch: {
    iteminfo: {
      async handler() {
        this.dataProfit = null;
      }
    }
  },
  data() {
    return {
      dataProfit: {}
    };
  },
  methods: {
    getParameter(filter) {
      let params = {
        start: this.$moment(filter.startDate).format("YYYY-MM-DD"),
        end: this.$moment(filter.endDate).format("YYYY-MM-DD"),
        company: this.iteminfo.company.toLowerCase(),
        agent: this.iteminfo.agent_username.toLowerCase()
      };
      return params;
    },
    async search(filter) {
      let params = this.getParameter(filter);
      try {
        let response = await this.$store.dispatch(
          "setting/getProfitReport",
          params
        );

        this.dataProfit = response;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
