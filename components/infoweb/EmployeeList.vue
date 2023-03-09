<template>
  <div>
    <h3 class="mb-4">พนักงาน</h3>
    <v-card width="100%" class="elevation-4 rounded-lg">
      <v-data-table
        :headers="employeeHeader"
        :items="employee"
        hide-default-footer
        disable-pagination
      >
        <template #[`item.no`]="{ index }">
          <span class="font-weight-bold">
            {{ index + 1 }}
          </span>
        </template>
        <template #[`item.position`]="{ item }">
          <span v-if="item.is_admin == true">ADMIN</span>
          <span v-else>STAFF</span>
        </template>
        <template #[`item.created_at`]="{ item }">
          <div class="pa-2">{{ item.created_at | dateFormat }}</div>
        </template>
        <template #[`item.status`]="{ item }">
          <v-chip
            color="success"
            small
            outlined
            dark
            v-if="item.status == true"
          >
            <v-icon left small>mdi-circle</v-icon>
            เปิดใช้งาน
          </v-chip>
          <v-chip color="error" small outlined dark v-else>
            <v-icon left small>mdi-circle</v-icon>
            ปิดใช้งาน
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeHeader: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ชื่อ",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold"
        },
        {
          text: "เบอร์โทรศัพท์",
          value: "phone",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "ระดับพนักงาน",
          value: "position",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold error--text"
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "สร้างโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เมื่อ",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ]
    };
  },
  props: {
    employee: []
  },
  methods: {}
};
</script>

<style></style>
