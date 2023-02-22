<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <v-row>
        <h2 class="mb-2">รายการสมาชิก</h2>
      </v-row>
      <div class="row">
        <div class="col-12 pa-2 col-sm-6">
          <v-autocomplete
            auto-select-first
            clearable
            hide-details="auto"
            solo
            :items="items"
            label="กรอก เว็บไซต์"
            outlined
            dense
            v-model="radioGroup"
          ></v-autocomplete>
        </div>
        <div class="col-12 pa-2 col-sm-6">
          <v-btn color="green lighten-1" dark depressed @click="search">
            ค้นหา
          </v-btn>
        </div>
      </div>
      <v-row>
        <v-card class="elevation-4 mt-5 rounded-lg pb-5" width="100%">
          <div class="tabledata">
            <!-- {{ options }} -->
            <v-data-table
              :headers="columnReport"
              :items="itemSearch.data"
              :options.sync="options"
              :footer-props="{
                showFirstLastPage: true,
                'items-per-page-text': ''
              }"
              :server-items-length="
                itemSearch.meta ? itemSearch.meta.itemCount : 0
              "
            >
              <template #[`item.bankAcc`]="{ item }">
                <div class="row px-6 detailbank justify-center">
                  <div class="ma-auto col-3 pa-0">
                    <img-bank :value="item.bankName"></img-bank>
                  </div>
                  <div class="font-weight-bold col-9 pa-0">
                    <span class="primary--text">{{ item.bankName }}</span
                    ><br />
                    {{ item.bankAcc }}
                  </div>
                </div>
              </template>
              <template #[`item.no`]="{ index }">
                {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
              </template>
              <!-- <template #[`item.created_at`]="{item}">
                <span>
                  {{ getthaidate(item.created_at) }}
                </span>
              </template>
              <template #[`item.updated_at`]="{item}">
                <span>
                  {{ getthaidate(item.updated_at) }}
                </span>
              </template> -->
              <template #[`item.name`]="{ item }">
                <div>
                  <span> {{ item.name }} {{ item.lastname }} </span>
                </div>
                <div>ฝาก {{ item.dp_count }} , ถอน {{ item.wd_count }}</div>
              </template>
              <template #[`item.knowFrom`]="{ item }">
                <div>
                  <span> {{ item.knowFrom }} </span>
                </div>
                <div>สมัครเมื่อ {{ item.created_at | dateFormat }}</div>
              </template>
              <template #[`item.username`]="{ item }">
                <div>{{ item.username }}</div>
                <div>
                  <small>IP:{{ item.ip }}</small>
                </div>
                <div v-if="item.group == 'common'">
                  <small
                    ><b>
                      <v-chip class="ma-2" x-small color="blue" outlined>
                        สมากชิกทั่วไป
                      </v-chip></b
                    >
                  </small>
                </div>
                <div v-else>
                  <small
                    ><b>
                      <v-chip class="ma-2" x-small color="red" outlined>
                        {{ item.group }}
                      </v-chip></b
                    >
                  </small>
                </div>
              </template>
              <template #[`item.log`]="{ item }">
                <div class="">
                  <v-btn
                    class="mx-1"
                    color="success"
                    dark
                    small
                    @click.stop="CheckDeposit(item.username)"
                    >ฝาก</v-btn
                  ><v-btn
                    class="mx-1"
                    color="error"
                    dark
                    small
                    @click.stop="CheckWithdraw(item.username)"
                    >ถอน</v-btn
                  >
                </div>
              </template>
              <template #[`item.actions`]="{ item }">
                <div class="d-sm-flex justify-center">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }"
                      ><v-btn
                        @click="openchangePass(item)"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="canwrite"
                        color="primary mx-1"
                        x-small
                        fab
                        ><v-icon>mdi-lastpass</v-icon></v-btn
                      ></template
                    >
                    <span>เปลี่ยนรหัสผ่าน</span>
                  </v-tooltip>

                  <v-tooltip bottom color="warning">
                    <template v-slot:activator="{ on, attrs }"
                      ><v-btn
                        @click="handleUpdateMember(item)"
                        v-bind="attrs"
                        :disabled="canwrite"
                        v-on="on"
                        color="warning mx-1"
                        x-small
                        fab
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      ></template
                    >
                    <span>แก้ไขข้อมูล</span>
                  </v-tooltip>
                  <v-tooltip bottom color="black">
                    <template v-slot:activator="{ on, attrs }"
                      ><v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="black mx-1"
                        x-small
                        dark
                        :disabled="canwrite"
                        fab
                        @click="handleLockUser(item)"
                        ><v-icon v-if="item.status"
                          >mdi-lock-open-outline</v-icon
                        >
                        <v-icon v-if="!item.status" color="red"
                          >mdi-lock</v-icon
                        >
                      </v-btn></template
                    >
                    <span v-if="item.status">LOCK USER!</span>
                    <span v-if="!item.status">UNLOCK USER!</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-row>
      <v-dialog
        v-model="dlDeposit"
        :overlay="false"
        transition="dialog-transition"
      >
        <v-card class="pa-3">
          <h3 class="pa-3">รายการฝากเงินล่าสุด : 50 รายการ</h3>
          <v-data-table
            :options.sync="options_deposit"
            :headers="headers_deposit"
            :items="items_deposit"
            pagination.sync="pagination"
          >
            <!-- <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options_deposit.itemsPerPage * (options_deposit.page - 1) +
                (index + 1)
              }}</span>
            </template> -->

            <template #[`item.created_at`]="{ item }">{{
              created_at | dateFormat
            }}</template>
            <template #[`item.smsdatetime`]="{ item }">{{
              smsdatetime | dateFormat
            }}</template>
            <template #[`item.companyBank`]="{ item }"
              ><img-bank :value="item.companyBank"></img-bank
            ></template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dlWithdraw"
        :overlay="false"
        transition="dialog-transition"
      >
        <v-card class="pa-3">
          <h3 class="pa-3">
            รายการถอนเงินล่าสุด : {{ items_withdraw.length }} รายการ
          </h3>
          <v-data-table
            :options.sync="options_withdraw"
            :headers="headers_withdraw"
            :items="items_withdraw"
            pagination.sync="pagination"
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options_withdraw.itemsPerPage * (options_withdraw.page - 1) +
                  (index + 1)
              }}</span>
            </template>
            <template #[`item.companyBank`]="{ item }"
              ><img-bank :value="item.companyBank"></img-bank
            ></template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <v-dialog v-model="updateMember" max-width="800px">
        <v-card class="pa-3">
          <v-card-title>ข้อมูลผู้ใช้ :{{ updateForm.username }} </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-form>
            <div class="row">
              <div class="col-12 col-sm-6">
                เบอร์โทรศัพท์
                <v-text-field
                  outlined
                  v-model="updateForm.phone"
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                กลุ่ม
                <v-select
                  v-model="updateForm.group"
                  outlined
                  :items="userGroup"
                  dense
                  hide-details="auto"
                ></v-select>
              </div>
              <div class="col-12 col-sm-6">
                ชื่อ
                <v-text-field
                  outlined
                  v-model="updateForm.name"
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                นามสกุล
                <v-text-field
                  v-model="updateForm.lastname"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                ธนาคาร
                <v-select
                  v-model="updateForm.bankName"
                  outlined
                  :items="bank"
                  dense
                  hide-details="auto"
                ></v-select>
              </div>
              <div class="col-12 col-sm-6">
                เลขบัญชีธนาคาร
                <v-text-field
                  outlined
                  v-model="updateForm.bankAcc"
                  hide-details="auto"
                  dense
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                ผู้เเนะนำ manual
                <v-text-field
                  v-model="updateForm.recommender"
                  outlined
                  hide-details="auto"
                  dense
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                ผู้เเนะนำ affiliate
                <v-text-field
                  v-if="updateForm.parent_username"
                  outlined
                  disabled
                  v-model="updateForm.parent_username"
                  hide-details="auto"
                  dense
                ></v-text-field>
                <v-text-field
                  v-else
                  outlined
                  disabled
                  filled
                  placeholder="ไม่มี"
                  hide-details="auto"
                  dense
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                affiliate code
                <v-text-field
                  outlined
                  disabled
                  v-model="updateForm.aff_id"
                  hide-details="auto"
                  dense
                  filled
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                LINE
                <v-text-field
                  outlined
                  v-model="updateForm.lineID"
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                มาจากช่องทาง
                <v-text-field
                  outlined
                  v-model="updateForm.knowFrom"
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                PROMOTION
                <v-select
                  v-model="updateForm.bonusid_v2"
                  outlined
                  :items="bonus_list"
                  dense
                  hide-details="auto"
                ></v-select>
              </div>
            </div>
            <div class="text-center my-2">
              <v-btn color="success" @click="editmemberByOperator()"
                >บันทึก</v-btn
              >
              <v-btn color="error" @click="updateMember = false">ปิด</v-btn>
            </div>
          </v-form>
          <v-divider class="mt-5"></v-divider>
          <div class="row pa-3">
            <div class="col-12 col-sm-6">
              USERNAME: {{ updateForm.username }}
            </div>
            <div class="col-12 col-sm-6">
              วันที่สมัคร: {{ updateForm.created_at | dateFormat }}
            </div>
            <div class="col-12 col-sm-6">
              ฝากออโต้:
              <v-switch v-model="updateForm.dpAuto">
                <span v-if="updateForm.dpAuto">เปิด</span
                ><span v-else>ปิด</span></v-switch
              >
            </div>
            <div class="col-12 col-sm-6">
              ถอนออโต้:
              <v-switch v-model="updateForm.wdAuto">
                <span v-if="updateForm.wdAuto">เปิด</span
                ><span v-else>ปิด</span></v-switch
              >
            </div>
            <div class="col-12 col-sm-6">
              สมัครโดย: {{ updateForm.operator }}
            </div>
            <div class="col-12 col-sm-6">
              สถานะ user: <span v-if="updateForm.status">ปกติ</span
              ><span v-else>LOCKED</span>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
    <v-dialog
      v-model="changpassdl"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-3">
        <v-card-title class="justify-center" primary-title>
          เปลี่ยนรหัสผ่าน
        </v-card-title>
        <v-form ref="changepass">
          <v-text-field
            v-model="newPass.password"
            dense
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="handlesubmitChangePass()"
            >เปลี่ยนรหัสผ่าน</v-btn
          ><v-btn color="error" @click="closeChangepass()">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
import LoadingPage from "../../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      options: {},
      isLoading: false,
      updateForm: {},
      items: [],
      dpdialog: false,
      updateMember: false,
      changpassdl: false,
      wddialog: false,
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().slice(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().slice(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
      userGroup: [
        { text: "สมาชิกทั่วไป", value: "common" },
        { text: "VIP1", value: "VIP1" },
        { text: "VIP2", value: "VIP2" },
        { text: "VIP3", value: "VIP3" },
        { text: "VIP4", value: "VIP4" }
      ],
      columnReport: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          width: "20px"
        },
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          align: "center",
          sortable: false
        },
        {
          text: "ชื่อ-นามสกุล / ฝาก-ถอน (ครั้ง)",
          value: "name",
          align: "center",
          sortable: false
        },
        {
          text: "username / กลุ่ม",
          value: "username",
          align: "center",
          width: "100px",
          sortable: false
        },
        {
          text: "ผู้เเนะนำ manual",
          value: "recommender",
          align: "center",
          sortable: false
        },
        {
          text: "ผู้เเนะนำ affiliate",
          value: "parent_username",
          align: "center",
          sortable: false
        },
        {
          text: "มาจากช่องทาง",
          value: "knowFrom",
          align: "center",
          sortable: false
        },

        {
          text: "ผู้แก้ไขล่าสุด",
          value: "operator",
          align: "center",
          sortable: false
        },
        {
          text: "ประวัติการฝาก/ถอน",
          value: "log",
          align: "center",
          sortable: false
        },

        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      options_deposit: {},
      itemSearch: [],
      headers_deposit: [
        { text: "ลำดับ", align: "center", value: "no" },
        { text: "ธนาคารเว็ป", align: "center", value: "companyBank" },
        { text: "เวลาใน SMS", align: "center", value: "smsdatetime" },
        { text: "เวลาเติม", align: "center", value: "created_at" },
        { text: "username", align: "center", value: "username" },
        { text: "จำนวนเงิน", align: "center", value: "amount" },
        { text: "จำนวนโบนัส", align: "center", value: "bonusamount" },
        { text: "เครดิตก่อนเติม", align: "center", value: "bfcredit" },
        { text: "เครดิตหลังเติม", align: "center", value: "afcredit" },
        { text: "เติมโดย", align: "center", value: "topupby" },
        { text: "หมายเหตุ", align: "center", value: "remark" }
      ],
      options_withdraw: {},
      headers_withdraw: [
        { text: "ลำดับ", align: "center", value: "no" },
        { text: "ธนาคารลูกค้า", align: "center", value: "bankName" },
        { text: "username", align: "center", value: "username" },
        { text: "ประเภท", align: "center", value: "type" },
        { text: "ยอดโอน", align: "center", value: "amount" },
        { text: "เวลากดถอน", align: "center", value: "requsettime" },
        { text: "เวลาโอนสำเร็จ", align: "center", value: "transferTime" },
        { text: "สถานะ", align: "center", value: "status" },
        { text: "กดถอนโดย", align: "center", value: "operator" },
        { text: "หมายเหตุ", align: "center", value: "remark" }
      ],
      items_deposit: [],
      items_withdraw: [],
      dlDeposit: false,
      dlWithdraw: false,
      newPass: {
        id: "",
        password: ""
      }
    };
  },
  watch: {
    options: {
      async handler() {
        // await this.getData();
        // await this.getPromotion();
      }
    }
  },
  async fetch() {
    this.bank = this.$store.state.bank;
    // await this.getProvider();
    const res = await this.getAllWebsite();

    this.items = res.map(x => {
      return { value: x.website, text: x.website };
    });
  },
  computed: {
    ...mapState("promotion", ["bonus_list"])
  },
  methods: {
    ...mapActions("auth", {
      getProviderList: "getProviderList",

      getAllWebsite: "getAllWebsite"
    }),
    ...mapActions("promotion", ["getPromotion"]),
    ...mapActions("member", [
      "getReportmember",
      "getReportmemberbyid",
      "getMemberDeposit",
      "getMemberWithdraw",
      "changePasswordMember",
      "changeStatus",
      "editMember"
    ]),

    async editmemberByOperator() {
      console.log(this.updateForm);
      try {
        this.$swal({
          title: `ยืนยันการแก้ไขข้อมูล User : ${this.updateForm.username} นี้ ?`,
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
            await this.editMember(this.updateForm);

            this.$swal({
              icon: "success",
              title: "บันทึกข้อมูลเรียบร้อย",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500
            }).then(async result => {
              this.isLoading = false;
              this.updateMember = false;
              if (result) {
                await this.getData();
              }
            });

            this.isLoading = false;
          }
        });
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "พบข้อผิดพลาด !",
          text: error.message,
          allowOutsideClick: true,
          showConfirmButton: true,
          timer: 1500
        });
        this.isLoading = false;
        console.log(error);
      }
    },

    checkStatusMember(status) {
      if (status == true) {
        return "ปกติ";
      } else {
        return "LOCKED";
      }
    },
    checkStatusAuto(status) {
      if (status == true) {
        return "เปิด";
      } else {
        return "ปิด";
      }
    },
    handleUpdateMember(item) {
      this.updateForm = Object.assign({}, item);
      this.updateMember = true;
    },

    getthaidate(timethai) {
      const time = this.$moment(timethai).format("YYYY-MM-DD เวลา HH:mm:ss");

      return time;
    },
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return this.$moment(
        `${this.$moment(date).format(dateFormat)} ${this.$moment(time).format(
          timeFormat
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .utc()
        .format(`${dateFormat} ${timeFormat}`);
    },
    getDateFilter() {
      let start = undefined;
      let end = undefined;
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(
            this.dateFilter.startDate,
            this.dateFilter.startTime
          );
        } else {
          start = this.getDateTime(
            this.dateFilter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(
            this.dateFilter.endDate,
            this.dateFilter.endTime
          );
        } else {
          end = this.getDateTime(
            this.dateFilter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      return {
        end: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
        start: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z"
      };
    },
    getParameter() {
      let dateFill = this.getDateFilter();
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: dateFill.start,
        end: dateFill.end,
        username: null
      };
      return parameter;
    },
    async getData(input = null) {
      this.isLoading = true;
      let params = this.getParameter();
      if (!input) {
        try {
          console.log(params);
          const data = await this.getReportmember(params);
          this.itemSearch = data;
          console.log(this.itemSearch, "data");
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      } else {
        console.log(input);
        params.username = input;
        try {
          console.log(params);
          const data = await this.getReportmember(params);
          this.itemSearch = data;
          console.log(this.itemSearch, "data");
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      }
    },

    setYesterday() {
      this.dateFilter.startDate = dayjs()
        .add(-1, "day")
        .format("YYYY-MM-DD");
      this.dateFilter.startTime = dayjs()
        .add(-1, "day")
        .format("HH:mm:ss");
      this.dateFilter.endDate = dayjs()
        .endOf(-1, "day")
        .format("YYYY-MM-DD");
      this.dateFilter.endTime = dayjs()
        .endOf(-1, "day")
        .format("HH:mm:ss");
    },
    async getYesterDay() {
      this.isLoading = true;
      let params = this.getParameter();
      await this.setYesterday();

      params.start = dayjs()
        .add(-1, "day")
        .startOf("day")
        .toISOString();
      params.end = dayjs()
        .add(-1, "day")
        .endOf("day")
        .toISOString();
      try {
        console.log(params);
        const data = await this.getReportmember(params);
        this.itemSearch = data;
        console.log(this.itemSearch, "data");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getToday() {
      this.isLoading = true;
      let params = this.getParameter();
      params.start = dayjs()
        .startOf("day")
        .toISOString();
      params.end = dayjs()
        .endOf("day")
        .toISOString();
      try {
        console.log(params);
        const data = await this.getReportmember(params);
        this.itemSearch = data;
        console.log(this.itemSearch, "data");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async CheckDeposit(username) {
      this.isLoading = true;
      let res = await this.getMemberDeposit(username);
      console.log(res.data);
      this.items_deposit = res.data;
      this.isLoading = false;
      this.dlDeposit = true;
    },
    async CheckWithdraw(username) {
      this.isLoading = true;
      let { data } = await this.getMemberWithdraw(username);

      console.log(data);
      this.items_withdraw = data.info ? data.info : [];
      this.isLoading = false;

      this.dlWithdraw = true;
    },
    yesterday() {
      console.log("yesterday");
    },
    today() {
      console.log("today");
    },
    openchangePass(item) {
      this.newPass.id = item.id;
      this.changpassdl = true;
    },
    async handleLockUser(item) {
      const payload = {
        id: item.id,
        status: !item.status
      };
      if (item.status) {
        try {
          this.$swal({
            title: `แน่ใจหรือว่าต้องการ Lock User : ${item.username} นี้ ?`,
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
              await this.changeStatus(payload);

              this.$swal({
                icon: "success",
                title: "Lock เรียบร้อย",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500
              }).then(async result => {
                this.isLoading = false;
                if (result) {
                  this.changpassdl = false;
                  await this.getData();
                }
              });
            }
          });
        } catch (error) {
          this.isLoading = false;
          console.log(error);
        }
      } else {
        try {
          this.$swal({
            title: `แน่ใจหรือว่าต้องการ ปลดล็อค User : ${item.username} นี้ ?`,
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
              await this.changeStatus(payload);

              this.$swal({
                icon: "success",
                title: "ปลดล็อค เรียบร้อย",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500
              }).then(async result => {
                this.isLoading = false;
                if (result) {
                  this.changpassdl = false;
                  await this.getData();
                }
              });
            }
          });
        } catch (error) {
          this.isLoading = false;
          console.log(error);
        }
      }
    },
    async handlesubmitChangePass() {
      try {
        this.$swal({
          title: "ต้องการเปลี่ยนรหัสผ่านหรือไม่ ?",
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel"
        }).then(async result => {
          if (result.isConfirmed) {
            let body = {
              id: this.newPass.id,
              password: this.newPass.password
            };
            console.log(body, "body");
            await this.changePasswordMember(body);
            this.$swal({
              icon: "success",
              title: "เปลี่ยนรหัสผ่านสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500
            }).then(async result => {
              if (result) {
                this.changpassdl = false;
                await this.getData();
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    closeChangepass() {
      this.$refs.changepass.reset();
      this.changpassdl = false;
    }
  }
};
</script>

<style></style>
