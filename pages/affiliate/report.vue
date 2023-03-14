<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <div>
      <h2 class="text-center mt-2 mb-4">รายงาน affiliate</h2>
      <div class="row my-5">
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
        <div class="col-12 row pa-3">
          <div class="col-12 col-sm-4">
            จากวันที่
            <el-date-picker
              placeholder="วันที่"
              style="width: 100%"
              v-model.trim="startdate"
            />
          </div>
          <div class="col-12 col-sm-4">
            ถึงวันที่
            <el-date-picker
              v-model.trim="enddate"
              placeholder="วันที่"
              style="width: 100%"
            />
          </div>
        </div>

        <div class="col-12 pa-2 col-sm-6">
          <v-btn color="green lighten-1" dark depressed @click="search">
            ค้นหา
          </v-btn>
        </div>
      </div>
      <div v-if="feature_status" class="mt-5 rounded-lg" width="100%">
        <v-card class="pa-3 mt-2"
          ><h4 class="mb-2">รายงานสมาชิก affiliate</h4>
          <v-data-table
            :headers="headerReport"
            :items="datatable"
            hide-default-footer
            disable-pagination
          >
            <template #[`item.no`]="{index}">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>
          </v-data-table>
        </v-card>
        <v-card class="elevation-4 rounded-lg pa-3 mt-4">
          <h4 class=" mb-2">การตั้งค่า affiliate</h4>
          <div>
            <v-data-table
              :headers="headerReportmain"
              :items="settingList"
              hide-default-footer
            >
              <template #[`item.recieve_mode`]="{ item }">
                <span>
                  {{
                    type_recieve.find(x => x.value === item.recieve_mode).text
                  }}
                </span>
              </template>
              <template #[`item.no`]="{index}">
                <span class="font-weight-bold">
                  {{ index + 1 }}
                </span>
              </template>
              <template #[`item.dp_bonus`]="{ item }">
                <span> {{ item.dp_bonus }} % </span>
              </template>
              <template #[`item.dp_bonus_type`]="{ item }">
                <span v-if="item.dp_bonus_type">ครั้งแรก </span>
                <span v-else> ทุกยอดฝาก </span>
              </template>
              <template #[`item.created_at`]="{ item }">
                <span> {{ item.created_at | dateFormat }} </span>
              </template>
              <template #[`item.winlose_bonus`]="{ item }">
                <span> {{ item.winlose_bonus }} % </span>
              </template>
              <template #[`item.commision_bonus`]="{ item }">
                <span v-if="!item.commision_mode">
                  <v-chip x-small color="success">ทุกประเภท</v-chip> <br />{{
                    item.commision_bonus
                  }}
                  %
                </span>
                <span v-if="item.commision_mode">
                  <v-chip x-small color="primary">แยกประเภท</v-chip> <br />
                  SLOT:{{ item.commision_bonus_all.SL }}% CASINO:{{
                    item.commision_bonus_all.LC
                  }}% SPORT:{{ item.commision_bonus_all.SB }}% <br />ESPORT:{{
                    item.commision_bonus_all.ES
                  }}% HORSERACING:{{ item.commision_bonus_all.OT }}%
                </span>
              </template>

              <template #[`item.enable`]="{ item }">
                <v-chip
                  outlined
                  small
                  color="error"
                  v-if="item.enable == false"
                >
                  <v-icon x-small left>mdi-circle</v-icon> ปิดใช้งาน
                </v-chip>
                <v-chip
                  small
                  color="success"
                  class="px-2"
                  outlined
                  v-if="item.enable == true"
                >
                  <v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน
                </v-chip>
              </template>
            </v-data-table>
          </div>
          <h4 class=" mt-4 mb-2">
            กรอก username เพื่อดูการตั้งค่าปัจจุบันของ ลูกค้า
          </h4>
          <div class="d-flex align-baseline">
            <div class="col-8 col-md-3 pa-0">
              <v-text-field
                v-model.trim="username"
                outlined
                dense
                solo
                hide-details="auto"
                placeholder="กรอก Username"
              />
            </div>
            <v-btn class="mx-2" color="primary" @click="searchByUser"
              ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
            >
          </div>
          <div class="mt-2">
            <v-data-table
              :headers="headerReportchild"
              :items="dataRender"
              hide-default-footer
            >
              <template #[`item.no`]="{ index }">
                <span class="font-weight-bold">
                  {{ index + 1 }}
                </span>
              </template>

              <template #[`item.config_name`]="{ item }">
                <div class="pa-3">
                  {{ item.config_name }}
                </div>
              </template>
              <template #[`item.child_setting_name`]="{ item }">
                <div class="pa-3">
                  {{ item.config_name }}
                </div>
              </template>
              <template #[`item.dp_bonus_type`]="{ item }">
                {{ item.dp_bonus }} %
                <span v-if="item.dp_bonus_type">(ครั้งแรก) </span>
                <span v-else> (ทุกยอดฝาก) </span>
              </template>
              <template #[`item.winlose_bonus`]="{ item }">
                {{ item.winlose_bonus }} %
                <span v-if="item.winlose_bonus_mode == false">
                  (ติดลบได้)
                </span>
              </template>

              <template #[`item.commision_mode`]="{ item }">
                <span v-if="!item.commision_mode">
                  <v-chip x-small color="success">ทุกประเภท</v-chip> <br />{{
                    item.commision_bonus
                  }}
                  %
                </span>
                <span v-if="item.commision_mode">
                  <v-chip x-small color="primary">แยกประเภท</v-chip> <br />
                  SLOT:{{ item.commision_bonus_all.SL }}% CASINO:{{
                    item.commision_bonus_all.LC
                  }}% SPORT:{{ item.commision_bonus_all.SB }}% <br />ESPORT:{{
                    item.commision_bonus_all.ES
                  }}% HORSERACING:{{ item.commision_bonus_all.OT }}%
                </span>
              </template>

              <template #[`item.created_at`]="{ item }">
                <span> {{ item.created_at | dateFormat }} </span>
              </template>
              <template #[`item.recieve_mode`]="{ item }">
                <span>
                  {{
                    type_recieve.find(x => x.value === item.recieve_mode).text
                  }}
                </span>
              </template>
              <template #[`item.enable`]="{ item }">
                <v-chip
                  outlined
                  small
                  color="error"
                  v-if="item.enable == false"
                >
                  <v-icon x-small left>mdi-circle</v-icon> ปิดใช้งาน
                </v-chip>
                <v-chip
                  small
                  color="success"
                  class="px-2"
                  outlined
                  v-if="item.enable == true"
                >
                  <v-icon x-small left>mdi-circle</v-icon> เปิดใช้งาน
                </v-chip>
              </template>
            </v-data-table>
          </div></v-card
        >

        <div></div>
      </div>
      <v-alert outlined dense text type="info" v-else>
        เลือกเว็ปที่ต้องการค้นหาด้านบนแล้วกดค้นหาเพื่อเช็คข้อมูลการตั้งค่าลิงก์รับทรัพย์
      </v-alert>
    </div>
  </div>
</template>

<script>
import LoadingPage from "../../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  watch: {
    startdate(newValue, Oldvalue) {
      if (newValue) {
        this.startdate;
      }
    },
    enddate(newValue, Oldvalue) {
      if (newValue) {
        this.enddate;
      }
    }
  },
  data() {
    return {
      select: null,
      headerReportchild: [
        {
          text: "No.",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สายงาน",
          value: "config_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "	สายงาน downline	",
          value: "child_setting_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonus ยอดฝาก",
          value: "dp_bonus_type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonusจากยอดเสีย",
          value: "winlose_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonusจากturnover(commission)",
          value: "commision_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "การรับรายได้",
          value: "recieve_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "enable",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "วันที่สร้าง",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สร้างโดย",
          value: "create_by",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        }
      ],
      detailDl: false,
      type_recieve: [
        { value: 1, text: "รายวัน" },
        { value: 2, text: "รายเดือน" },
        { value: 3, text: "รายสัปดาห์" }
      ],
      type_line: ["A", "B"],
      type_obtion: [
        { value: true, text: "ครั้งแรก" },
        { value: false, text: "ทุกยอดฝาก" }
      ],
      detailSetting: {},
      settingList: [],
      headerReportmain: [
        {
          text: "No.",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สายงาน",
          value: "config_name",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "	bonusจากยอดฝาก	",
          value: "dp_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "	ประเภท	",
          value: "dp_bonus_type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonusจากยอดเสีย",
          value: "winlose_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "bonusจากturnover(commission)",
          value: "commision_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "การรับรายได้",
          value: "recieve_mode",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สถานะ",
          value: "enable",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "วันที่สร้าง",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สร้างโดย",
          value: "create_by",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        }
      ],
      itemweb: [],
      selectWeb: null,
      headerReport: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดถอนรายได้",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาถอน",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      loading: false,
      feature_status: false,
      username: "",
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
      Affiliate: {
        link: "Linkdemo",
        activeMember: 20,
        newMember: 12,
        depositMember: 12,
        recieveMember: 10,
        incomeBalance: 10,
        bonusDeposit: 100,
        bonusLoss: 500,
        bonusCommission: 500
      },
      datatable: [],
      dataRender: []
    };
  },
  async mounted() {
    const res = await this.$store.dispatch("auth/getAllWebsite");
    this.itemweb = res.map(x => {
      return { value: x.hash, text: x.auto_link, ...x };
    });
    // await this.getFeatureStatus();
    if (this.feature_status) {
      const st = new Date().toISOString().slice(0, 10);
      const ed = new Date().toISOString().slice(0, 10);
      // this.startdate = st
      // this.enddate = ed
      await this.getDataTable(st, ed);
    }
  },
  methods: {
    async searchByUser() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `${
            process.env.AFF_SETTING
          }/api/Aff/Member/Service/${this.username.toLowerCase()}/${
            this.select.agent_username
          }`
        );

        // await this.getFeatureStatus();
        console.log(res.data);

        this.dataRender = [res.data];
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    async handDleDetail(item) {
      this.detailDl = true;
      this.detailSetting = { ...item };
    },
    async search() {
      let select = this.itemweb.find(x => x.hash == this.selectWeb);
      this.select = select;
      await this.getFeatureStatus(select.hash);
      if (this.feature_status) {
        await this.getDataTable(
          this.startdate,
          this.enddate,
          select.agent_username
        );
      } else {
        this.$swal({
          icon: "error",
          title: `เว็ปไซต์ ${select.text} ไม่ได้เปิดใช้ feature ลิงก์รับทรัพย์`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    // async searchAffwithdrawByDate() {
    //   // this.getData();
    //   // this.getDataTable(this.startdate, this.enddate, this.hash, this.username);
    // },
    async getDataTable(dateForm, dateTo, agent) {
      this.loading = true;
      try {
        const res_data = await this.$axios.get(
          `${process.env.ALL_DEPOSIT}/api/Aff/Report/Withdraw/${this.$moment(
            dateForm
          ).format("YYYY-MM-DD")}T00:00:00/${this.$moment(dateTo).format(
            "YYYY-MM-DD"
          )}T23:59:59/${agent.toLowerCase()}`
        );
        this.datatable = res_data.data.map(x => {
          x.created_at = new Date(x.created_at).toLocaleString("th-TH");
          x.amount = x.amount.toFixed(2);
          return x;
        });
      } catch (error) {
        this.dataRender = [];
      }
      this.loading = false;
    },
    async getFeatureStatus(hash) {
      try {
        this.loading = true;
        let { data } = await this.$axios.get(
          `${process.env.AFF_SETTING}/api/MainSetting/${hash}`
        );
        this.feature_status = data.feature_status;
        // console.log(data.config, "data.config");
        this.settingList = data.config;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.feature_status = false;
        this.loading = false;
      }
    }
  }
};
</script>
