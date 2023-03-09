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
        <div class="pt-2" v-if="item.mode == 2">
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

      <template #[`item.visibletomember`]="{ item }">
        <span
          v-if="item.type == true && item.visibletomember == false"
          class="font-weight-bold"
          >-</span
        >
        <span
          v-else-if="item.type == false && item.visibletomember == true"
          class="font-weight-bold"
          ><v-btn color="success" small>เปิดการมองเห็น</v-btn></span
        >
        <span v-else class="font-weight-bold"
          ><v-btn color="grey" dark small>ปิดการมองเห็น</v-btn></span
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    dataBank: []
  },
  data() {
    return {
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
  }
};
</script>

<style></style>
