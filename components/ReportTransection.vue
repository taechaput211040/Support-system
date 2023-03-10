<template>
  <v-card class="elevation-3">
    <v-data-table
      disable-pagination
      :headers="header"
      hide-default-footer
      :items="dbresult"
    >
      <template #[`item.grouped`]="{item}"
        ><div class="font-weight-bold text-group" @click="showmore(item)">
          {{ item.grouped }}
          <v-btn class="mx-2" dark color="black" x-small
            >คลิกเพื่อดูรายละเอียด</v-btn
          >
        </div>
      </template>

      <template #[`item.payout`]="{item}"
        ><span>{{ item.payout.toFixed(2) }}</span>
      </template>
      <template #[`item.turnover`]="{item}"
        ><span>{{ item.turnover.toFixed(2) }}</span>
      </template>
      <template #[`item.bet`]="{item}"
        ><span>{{ item.bet.toFixed(2) }}</span>
      </template>
      <template #[`item.winlose`]="{item}"
        ><span
          :class="[
            { 'error--text': item.winlose < 0 },
            { 'success--text': item.winlose > 0 }
          ]"
          >{{ item.winlose.toFixed(2) }}</span
        >
      </template>
    </v-data-table></v-card
  >
</template>

<script>
export default {
  props: {
    dbresult: Array
  },
  data() {
    return {
      header: [
        {
          text: "ค่ายเกม",
          value: "grouped",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "จำนวนครั้งในการเดิมพัน",
          value: "wagers",
          align: "center",
          sortable: false
        },
        {
          text: "turnover",
          value: "turnover",
          align: "center",
          sortable: false
        },
        {
          text: "วางเดิมพัน",
          value: "bet",
          align: "center",
          sortable: false
        },
        {
          text: "ค่ายเกมส์จ่าย",
          value: "payout",
          align: "center",
          sortable: false
        },
        {
          text: "แพ้/ชนะ",
          value: "winlose",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    async showmore(item) {
      this.$router.push(`${this.$route.path}?group=${item.grouped}`);
    }
  }
};
</script>

<style></style>
