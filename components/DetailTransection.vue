<template>
  <div>
    <v-btn
      color="error"
      class="ma-4"
      small
      @click="$router.push(`${$route.path}`)"
      >back</v-btn
    >

    <v-card class="elevation-3">
      <v-data-table
        disable-pagination
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :headers="header"
        hide-default-footer
        :items="dbresult"
      >
        <template #[`item.type`]="{ item }">
          <div>
            ค่าย
            {{
              provider[item.provider] ? provider[item.provider] : item.provider
            }}
          </div>
          <div>
            ประเภท {{ gameType[item.type] ? gameType[item.type] : item.type }}
          </div>
          <div>{{ item.game_name }}</div>
        </template>

        <template #[`item.detail_links`]="{ item }">
          <v-btn small rounded color="primary" @click="detail(item)"
            >ดูรายละเอียด</v-btn
          >
        </template>
        <template #[`item.payout`]="{ item }"
          ><span>{{ item.payout.toFixed(2) }}</span>
        </template>
        <template #[`item.turnover`]="{ item }"
          ><span>{{ item.turnover.toFixed(2) }}</span>
        </template>
        <template #[`item.bet`]="{ item }"
          ><span>{{ item.bet.toFixed(2) }}</span>
        </template>
        <template #[`item.winlose`]="{ item }"
          ><span
            :class="[
              { 'error--text': item.winlose < 0 },
              { 'success--text': item.winlose > 0 }
            ]"
            >{{ item.winlose.toFixed(2) }}</span
          >
        </template>
        <template #[`item.status`]="{ item }">
          <div
            class="success--text font-weight-bold"
            v-if="item.status == true"
          >
            สำเร็จ
          </div>
          <div class="warning--text font-weight-bold" v-if="item.status == 0">
            ผลยังไม่จบ
          </div>
          <div class="error--text font-weight-bold" v-if="item.status == false">
            ผลยังไม่จบ
          </div>
        </template>
        <template #[`item.start_time`]="{ item }">
          <div>{{ getDate(item.start_time).slice(0, 10) }}</div>
          <div>{{ getDate(item.start_time).slice(16) }}</div>
        </template>
        <template #[`item.bf_balance`]="{ item }">
          {{ item.bf_balance }}
        </template>
        <template #[`item.after_balance`]="{ item }">
          {{ item.after_balance }}
          <!-- {{item.after_balance + item.payout}}  -->
        </template>
      </v-data-table></v-card
    >
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
export default {
  props: {
    dbresult: Array
  },
  data() {
    return {
      sortBy: "start_time",
      sortDesc: true,
      result: [],
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },

        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false
        },
        {
          text: "เวลา",
          value: "start_time",
          align: "center",
          sortable: true
        },
        {
          text: "รายละเอียด",
          value: "detail_links",
          align: "center",
          sortable: false
        },
        {
          text: "เดิมพัน",
          value: "bet",
          align: "center",
          sortable: true
        },
        {
          text: "จ่าย",
          value: "payout",
          align: "center",
          sortable: true
        },
        {
          text: "แพ้ชนะ",
          value: "winlose",
          align: "center",
          sortable: true
        },
        {
          text: "สถานะการคิดผล",
          value: "status",
          align: "center",
          sortable: false
        },
        {
          text: "ก่อนเดิมพัน",
          value: "bf_balance",
          align: "center",
          sortable: false
        },
        {
          text: "หลังเดิมพัน",
          value: "after_balance",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  async fetch() {
    this.result;
    //get API By id ตรงนี้//
  },
  computed: {
    ...mapState("auth", ["provider", "gameType"])
  },
  methods: {
    ...mapActions("member", ["getDetailLink"]),
    async detail(item) {
      const link = await this.getDetailLink(item.detail_links);

      window.open(link.data, "NewWin", "toolbar=no,status=no");
    },
    getDate(date) {
      return dayjs(date).format(`YYYY-MM-DD เวลา HH:mm:ss`);
    },

    async showmore(item) {
      this.$router.push(`${this.$route.path}?provider=${item.provider}`);
    }
  }
};
</script>

<style></style>
