<template>
  <v-flex
    ><v-row>
      <loading-page v-if="isLoading"></loading-page>
      <v-container>
        <h2 class="text-center mt-2 mb-4">เปิด-ปิดเว็ปไซต์</h2>

        <div class="row">
          <div class="col-12 pa-2 col-sm-6">
            <v-text-field
              v-model.trim="search"
              append-icon="mdi-magnify"
              label="Search"
              dense
              solo
              outlined
              @keyup.enter="searchData"
              single-line
              hide-details
            ></v-text-field>
          </div>
          <div class="col-12 pa-2 col-sm-6">
            <v-btn color="green lighten-1" dark depressed @click="searchData">
              ค้นหา
            </v-btn>
          </div>
        </div>
        <v-card class="mt-4">
          <v-data-table
            :options.sync="options"
            :items="items.data"
            :server-items-length="items.total"
            :headers="headers"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [20, 50, 100]
            }"
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options.itemsPerPage * (options.page - 1) + (index + 1)
              }}</span>
            </template>

            <template #[`item.wd_status`]="{ item }">
              <div class="d-flex justify-center">
                <v-switch
                  @change="changeWithdraw(item)"
                  hide-details
                  v-model="item.wd_status"
                ></v-switch>
              </div>
            </template>
            <template #[`item.system_status`]="{ item }">
              <div class="d-flex justify-center">
                <v-switch
                  @change="changeSystem(item)"
                  hide-details
                  v-model="item.system_status"
                ></v-switch>
              </div>
            </template>
            <template #[`item.actions`]="{item}">
              <div class="d-flex justify-center">
                <v-switch
                  @change="LockDown(item)"
                  hide-details
                  v-model="item.lockdown_status"
                ></v-switch>
              </div>
            </template> </v-data-table
        ></v-card>
      </v-container> </v-row
  ></v-flex>
</template>
<script>
import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      isLoading: false,
      options: {},
      username: null,
      radioGroup: null,
      items: [],
      headers: [
        {
          text: "ลำดับ",
          value: "no",
          sortable: false,
          align: "center"
        },
        {
          text: "ชื่อเว็ป",
          value: "site_name",
          sortable: false,
          align: "center"
        },
        {
          text: "Company key",
          value: "companykey",
          sortable: false,
          align: "center"
        },
        {
          text: "Agent key",
          value: "agent_username",
          sortable: false,
          align: "center"
        },
        {
          text: "ระบบ",
          value: "system_status",
          sortable: false,
          align: "center"
        },
        {
          text: "ถอนเงิน",
          value: "wd_status",
          sortable: false,
          align: "center"
        },
        {
          text: "Lock",
          value: "actions",
          sortable: false,
          align: "center"
        }
      ],
      search: ""
    };
  },

  watch: {
    options: {
      async handler() {
        await this.getData();
      }
    }
  },
  methods: {
    async searchData() {
      this.options.page = 1;
      await this.getData();
    },
    getParameter() {
      let parameter = {
        limit: this.options.itemsPerPage,
        page: this.options.page,
        system_status: this.status,
        withdraw_status: this.withdraw_status,
        search: this.search
      };
      return parameter;
    },
    async getData() {
      this.isLoading = true;
      try {
        let params = this.getParameter();
        let result = await this.$store.dispatch("setting/getWebList", params);
        this.items = result;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async changeSystem(value) {
      let payload = {
        site_id: value.id,
        status: value.system_status
      };
      console.log(payload);
      this.$swal({
        title: `${payload.status ? "เปิด" : "ปิด"} ระบบ`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel"
      }).then(async result => {
        if (result.isConfirmed) {
          this.isLoading = true;
          await this.$store.dispatch("setting/changeSystem", payload);
          await this.$swal({
            icon: "success",
            title: `${payload.status ? "เปิด" : "ปิด"} เสร็จสิ้น`,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500
          });
          await this.getData();
        } else {
          value.system_status = !value.system_status;
        }
      });
    },
    async changeWithdraw(value) {
      let payload = {
        site_id: value.id,
        status: value.wd_status
      };
      this.$swal({
        title: `${payload.status ? "เปิด" : "ปิด"} ถอนเงิน`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel"
      }).then(async result => {
        if (result.isConfirmed) {
          this.isLoading = true;
          await this.$store.dispatch("setting/changeWithdraw", payload);
          await this.$swal({
            icon: "success",
            title: `${payload.status ? "เปิด" : "ปิด"} เสร็จสิ้น`,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500
          });
          await this.getData();
        } else {
          value.wd_status = !value.wd_status;
        }
      });
    },
    async LockDown(value) {
      console.log(value, "value");
      let payload = {
        site_id: value.id,
        status: value.lockdown_status
      };
      this.$swal({
        title: `Lockdown Website??`,
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel"
      }).then(async result => {
        if (result.isConfirmed) {
          this.isLoading = true;
          await this.$store.dispatch("setting/lockdownWebsite", payload);
          await this.$swal({
            icon: "success",
            title: `Lockdown เสร็จสิ้น`,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500
          });
          await this.getData();
        } else {
          value.lockdown_status = !value.lockdown_status;
        }
      });
    }
  }
};
</script>
