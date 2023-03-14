<template>
  <div class="container">
    <div>
      <div>
        <h2 class="text-center mt-2 mb-4">ข้อมูลสมาชิกลิงก์รับทรัพย์</h2>
        <div class="section_search">
          <div class="d-flex pb-3" style="align-items: baseline">
            <div class="px-2 d-flex align-baseline">
              <v-text-field
                v-model.trim="username"
                outlined
                dense
                solo
                hide-details="auto"
                placeholder="กรอก Username"
              /><v-btn class="mx-2" color="primary" @click="search"
                >ค้นหา</v-btn
              >
            </div>
            <div class="px-2">upline:</div>
            <div class="px-2" v-if="userinfo.parent_username">
              <v-text-field
                v-model="userinfo.parent_username"
                placeholder="กรอก Username"
                style="width: 220px"
                disabled
                dense
                outlined
              ></v-text-field>
            </div>
            <div v-else>
              ไม่มี
            </div>
          </div>
        </div>
        <v-alert outlined dense text type="info" v-if="!searchSuccess"
          >กรอก Username
          ที่ต้องการค้นหาด้านบนแล้วกดค้นหาเพื่อเช็คข้อมูลลิงก์รับทรัพย์</v-alert
        >
        <div class="show_information" v-if="searchSuccess">
          <div class="row">
            <div class="col-12 col-sm-6">
              <!-- useritemcard -->
              <div class="col-12 col-12 p-2">
                <div class="card_affiliate">
                  <div class="text_card">
                    Username : {{ userinfo.username }}
                  </div>
                  <div class="body_card pa-3 pa-md-3">
                    <div class="row pa-2">
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          รายได้วันนี้
                          <hr class="solid my-2" />
                          <div class="text-end  font-weight-bold">
                            {{ userinfo.profit_today.toFixed(2) }}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          รายได้ปัจจุบันที่ยังไม่ได้รับ
                          <hr class="solid my-2" />
                          <div class="text-end  font-weight-bold">
                            {{ userinfo.profit_balance.toFixed(2) }}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          รายสะสมได้ที่รับไปเเล้ว
                          <hr class="solid my-2" />
                          <div class="text-end  font-weight-bold">
                            {{ userinfo.recieved_profit.toFixed(2) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- useritemcard -->

              <!-- downlinecard -->
              <div class="col-12 col-md-12 pa-2">
                <div class="card_affiliate">
                  <div class="text_card_child">Downline</div>
                  <div class="body_card pa-3 pa-md-3">
                    <div class="row pa-2">
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          จำนวน downline ทั้งหมด
                          <hr class="solid my-2" />
                          <div class="text-end  font-weight-bold">
                            {{ userinfo.current_downline }}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          จำนวน downline ติดตัว ทั้งหมด
                          <hr class="solid my-2" />
                          <div
                            style="
                                display: flex;
                                justify-content: space-between;
                              "
                          >
                            <div class="text-end  font-weight-bold">
                              {{ userinfo.current_downline_lv1 }}
                            </div>
                            <div>
                              <v-btn
                                icon
                                v-if="userinfo.current_downline > 0"
                                color="primary"
                                small
                                style="color: white"
                                @click="getDownline(1, 0)"
                              >
                                <v-icon>mdi-magnify</v-icon></v-btn
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          จำนวน ชั้น ของสายลึกที่มีทั้งหมด
                          <hr class="solid my-2" />
                          <div class="text-end  font-weight-bold">
                            {{ userinfo.current_level }}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          ยอดฝาก downline วันนี้
                          <hr class="solid my-2" />
                          <div class="text-end success--text font-weight-bold">
                            {{ userinfo.profit_today }}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          ยอดฝาก downline สะสม
                          <hr class="solid my-2" />
                          <div class="text-end success--text font-weight-bold">
                            {{ userinfo.all_deposit_downline.toFixed(2) }}
                            <span style="color: black"
                              ><b
                                ><small
                                  >(ฝากแรก
                                  {{
                                    userinfo.all_deposit_downline_firsttime.toFixed(
                                      2
                                    )
                                  }})</small
                                ></b
                              ></span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          รายได้ ยอดฝาก downline สะสม
                          <hr class="solid my-2" />
                          <div class="text-end success--text font-weight-bold">
                            {{ userinfo.all_bonus.aff_deposit.toFixed(2) }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          รายได้ ยอดเสีย downline สะสม
                          <hr class="solid my-2" />
                          <div class="text-end error--text font-weight-bold">
                            {{ userinfo.all_bonus.aff_winlose.toFixed(2) }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          รายได้ ยอดคอมมิชชั่น downline สะสม
                          <hr class="solid my-2" />
                          <div class="text-end  font-weight-bold">
                            {{ userinfo.all_bonus.aff_commission.toFixed(2) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- downlinecard -->
            </div>
            <div class="col-12 col-sm-6">
              <!-- linkcard -->
              <div class="col-12 col-md-12 pa-2">
                <div class="card_affiliate">
                  <div class="text_card">Link Affiliate</div>
                  <div class="body_card pa-3 pa-md-3">
                    <div class="row pa-2">
                      <div class="col-12 col-md-12 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          Link Affiliate
                          <hr class="solid my-2" />
                          <div
                            class="d-flex"
                            style="justify-content: space-between"
                          >
                            <div
                              class="copy-link d-flex align-baselined"
                              @click="copylink(userinfo.aff_link)"
                            >
                              <img
                                src="https://image.smart-ai-api.com/public/thongtest/coppybtn.png"
                                alt=""
                                class="copy_icon"
                              />
                              copy
                            </div>
                            <div class="text-end font-weight-bold">
                              {{ userinfo.aff_link }}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-4 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          จำนวนคนเปิดลิงก์ทั้งหมด
                          <hr class="solid my-2" />
                          <div class="text-end font-weight-bold">
                            {{ userinfo.link_click }}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          จำนวน downline ทั้งหมด ทุกขั้น
                          <hr class="solid my-2" />
                          <div
                            style="
                                display: flex;
                                justify-content: space-between;
                              "
                          >
                            <div
                              class="text-end font-weight-bold primary--text"
                            >
                              {{ userinfo.current_downline }}
                            </div>
                            <div>
                              <!-- v-if="userinfo.current_downline > 0" -->

                              <v-btn
                                v-if="userinfo.current_downline > 0"
                                icon
                                color="primary"
                                style="color: white"
                                small
                                @click="getDownline(1, 1)"
                              >
                                <v-icon>mdi-magnify</v-icon></v-btn
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          จำนวนคนสมัคร และมีการฝาก
                          <hr class="solid my-2" />
                          <div
                            style="
                                display: flex;
                                justify-content: space-between;
                              "
                          >
                            <div
                              class="text-end primary--text font-weight-bold"
                            >
                              {{ userinfo.player || 0 }}
                            </div>
                            <div>
                              <!-- v-if="userinfo.current_downline > 0" -->
                              <v-btn
                                icon
                                v-if="userinfo.current_downline > 0"
                                color="primary"
                                small
                                style="color: white"
                                @click="getDownlineDeposit(1, 1)"
                              >
                                <v-icon>mdi-magnify</v-icon></v-btn
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- linkcard -->
              <!-- configcard -->
              <div class="col-12 col-md-12 pa-2">
                <div class="card_affiliate">
                  <div
                    class="d-flex text_card"
                    style="
                        justify-content: space-between;
                        align-items: baseline;
                      "
                  >
                    <span>โหมดการตั้งค่าสายงานปัจจุบัน (Config)</span>
                  </div>

                  <div class="body_card pa-3 p-md-3">
                    <div class="row pa-2">
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          ชื่อ : {{ config.name }}
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          การรับรายได้ : {{ config.recieve_text }}
                        </div>
                      </div>
                      <div class="col-12 col-md-4 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          เปอร์เซ็นยอดฝาก
                          <hr class="solid my-2" />
                          <div class="text-end success--text font-weight-bold">
                            {{ config.percentDeposit }} %
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          เปอร์เซ็นยอดเสีย
                          <hr class="solid my-2" />
                          <div class="text-end error--text font-weight-bold">
                            {{ config.percentLoss }} %
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4 pa-1">
                        <div class="pa-2 elevation-2 rounded-lg pa-2">
                          เปอร์เซ็นCommission
                          <hr class="solid my-2" />
                          <div class="text-end">
                            {{ config.percentCommission }} %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- configcard -->
              <v-dialog
                v-model="memberShow"
                centered
                max-width="800px"
                hide-header-close
                hide-footer
              >
                <v-card class="pa-3">
                  <h2 class="text-center">
                    รายชื่อสมาชิกผ่านลิ้งแนะนำเพื่อน
                  </h2>
                  <v-data-table
                    class="elevation-2"
                    :headers="aff_member_field"
                    :items="aff_member"
                    :items-per-page="perPage"
                    :page="currentPage"
                  >
                  </v-data-table>
                </v-card>
              </v-dialog>
              <v-dialog v-model="depositShow" centered max-width="800px">
                <v-card class="pa-3">
                  <h2 class="text-center">
                    รายชื่อคนสมัคร และมีการฝากแนะนำเพื่อน
                  </h2>
                  <v-data-table
                    class="elevation-2"
                    :items-per-page="rows_deposit"
                    :page="currentPage"
                    :headers="aff_deposit_field"
                    :items="aff_deposit_member"
                  >
                    <template #[`amount`]="{item}">
                      {{ item.amount.toFixed() }}</template
                    >
                  </v-data-table></v-card
                >
              </v-dialog>
            </div>
          </div>
        </div>
      </div>

      <div class=" mt-4" v-if="searchSuccess">
        <v-row class="pa-3 ">
          <div class="col-12 col-sm-2">
            จากวันที่
            <el-date-picker
              placeholder="วันที่"
              style="width: 100%"
              v-model.trim="startdate"
            />
          </div>
          <div class="col-12 col-sm-2">
            ถึงวันที่
            <el-date-picker
              v-model.trim="enddate"
              placeholder="วันที่"
              style="width: 100%"
            />
          </div>
          <div class="col-12 col-sm-3">
            <br class="d-none d-sm-block" />
            <v-btn color="primary" @click="searchByDate()"
              ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
            >
          </div>
        </v-row>
      </div>

      <h4 class="mt-4 mb-2" v-if="searchSuccess">
        รายการฝาก downline ของสมาชิก {{ this.username }}
      </h4>
      <div v-if="searchSuccess">
        <v-data-table
          class="elevation-2"
          :headers="header_downline"
          :items="dataRender"
          disable-pagination
          hide-default-footer
          ><template #[`item.no`]="{index}">
            {{ index + 1 }}
          </template>
          <template #[`item.amount`]="{item}">
            {{ item.amount | numberFormat }}
          </template>

          <template #[`item.cal_dp_status`]="{item}">
            <v-chip color="success" small v-if="item.cal_dp_status"
              >success</v-chip
            >
            <v-chip color="error" small v-else>failed</v-chip>
          </template>
        </v-data-table>
      </div>

      <h4 class="mt-4  mb-2" v-if="searchSuccess">
        รายการโบนัสยอดเสีย และ โบนัส Commission downline ของสมาชิก
        {{ this.username }}
      </h4>
      <div v-if="searchSuccess">
        <v-data-table
          class="elevation-2"
          :headers="header_commissions"
          :items="dataWinloseCommission"
          disable-pagination
          hide-default-footer
          ><template #[`item.no`]="{index}">
            {{ index + 1 }}
          </template>
          <template #[`item.aff_bonus`]="{item}">
            {{ item.aff_bonus | numberFormat }}
          </template>
          <template #[`item.type`]="{item}">
            <v-chip color="purple white--text" small v-if="item.type == 0"
              >โบนัส ยอดฝาก</v-chip
            >
            <v-chip color="primary" small v-else-if="item.type == 1"
              >โบนัส ยอดเสีย
            </v-chip>
            <v-chip color="error" small v-else-if="item.type == 2"
              >โบนัส commission
            </v-chip>
          </template>
          <template #[`item.recieved`]="{item}">
            <v-chip color="success white--text" small v-if="item.recieved"
              >รับแล้ว</v-chip
            >
            <v-chip color="error" small v-else>ยังไม่ได้รับ </v-chip>
          </template>
          <template></template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      searchSuccess: false,
      isLoading: false,
      // dataRender,
      header_downline: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "username downline",
          value: "self_username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดฝาก",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },

        {
          text: "สถานะการคำนวน",
          value: "cal_dp_status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "วันที่ฝาก",
          value: "start_cal_time",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ครั้งที่ฝาก",
          value: "dp_count",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาที่คำนวนโบนัสสำเร็จ",
          value: "end_cal_time",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      header_commissions: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "username downline",
          value: "child_username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "โบนัสที่ได้",
          value: "aff_bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "รูปแบบโบนัส",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "turnover",
          value: "turnover",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "คำนวนประจำวันที่",
          value: "date",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "กำไรของเว็บ",
          value: "web_profit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "รับรายได้",
          value: "recieved",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      loading: false,
      feature_status: false,
      options: ["รายวัน"],
      username: null,
      hash: "membertest",
      aff_member: [],
      userinfo: {
        username: "",
        aff_link: "",
        link_click: 0,
        current_downline: 0,
        current_downline_lv1: 0,
        current_level: 0,
        recieved_profit: 0,
        profit_today: 0,
        profit_balance: 0,
        all_bonus: {
          aff_deposit: 0,
          aff_winlose: 0,
          aff_commission: 0
        },

        all_deposit_downline: 0,
        all_deposit_downline_firsttime: 0
      },
      memberShow: false,
      depositShow: false,
      config: {
        name: "Config name",
        percentDeposit: 0,
        percentLoss: 0,
        percentCommission: 0,
        recieve: 0,
        recieve_text: "รายวัน"
      },
      dataRender: [],

      dataWinloseCommission: [],
      startdate: new Date().toLocaleString("en-CA").slice(0, 10),
      enddate: new Date().toLocaleString("en-CA").slice(0, 10),

      table_load: false,
      currentPage: 1,
      rows: 0,
      perPage: 20,

      aff_member_field: [
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาฝากครั้งแรก",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "จำนวนเพื่อนที่สมัครต่อ",
          value: "current_downline",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      rows_deposit: 0,
      aff_deposit_member: [],
      aff_deposit_field: [
        {
          text: "username",
          value: "self_username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาฝากครั้งแรก",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดฝากแรก",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
        // A virtual column made up from two fields
      ]
    };
  },
  async mounted() {
    // await this.getddl();
  },

  methods: {
    async changepage_deposit(page) {
      this.getDownlineDeposit(page);
    },
    async changpage(page) {
      this.getDownline(page);
    },
    async getDownline(page, all) {
      console.log(page);
      try {
        this.loading = true;
        this.table_load = true;
        let res = await this.$axios.get(
          `${
            process.env.AFF_MEMBER
          }/api/Aff/Downline/${this.userinfo.username.toLowerCase()}?page=${page}&take=${
            this.perPage
          }&all=${all}`
        );

        this.aff_member = res.data.data;
        this.aff_member = this.aff_member.map(x => {
          x.created_at = new Date(x.created_at).toLocaleString("th-TH");
          return x;
        });
        this.rows = res.data.meta.itemCount;
        this.table_load = false;
        this.memberShow = true;

        // console.log(this.selector_option,"aafter")
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async getDownlineDeposit(page) {
      try {
        this.loading = true;
        this.table_load = true;
        let res = await this.$axios.get(
          `${
            process.env.ALL_DEPOSIT
          }/api/Aff/Report/Deposit/${this.userinfo.username.toLowerCase()}?page=${page}&take=${
            this.perPage
          }`
        );

        this.aff_deposit_member = res.data.data;
        this.aff_deposit_member = this.aff_deposit_member.map(x => {
          x.created_at = new Date(x.created_at).toLocaleString("th-TH");
          return x;
        });
        this.rows_deposit = res.data.meta.itemCount;
        this.table_load = false;
        this.depositShow = true;
        // this.$bvModal.show("depositShow");
        // console.log(this.selector_option,"aafter")
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },

    copylink(link) {
      var textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.$swal("", `คัดลอก Link : ${link} เรียบร้อยแล้ว`, "success");
    },
    async search() {
      this.getSetting();
      // this.getData();
      // this.getDataTable(this.startdate, this.enddate, this.hash, this.username);
    },

    async searchByDate() {
      this.getDataTable(this.startdate, this.enddate, this.username);
      this.getDataWinlose(this.startdate, this.enddate, this.username);
    },

    async getSetting() {
      if (this.username) {
        this.isLoading = true;
        try {
          const { data: settings } = await this.$axios.get(
            `${
              process.env.AFF_SETTING
            }/api/Aff/Member/Service/${this.username.toLowerCase()}/${
              this.$store.state.auth.agent
            }`
          );
          const { data: memberinfo } = await this.$axios.get(
            `${
              process.env.AFF_MEMBER
            }/api/Aff/Member/Data/${this.username.toLowerCase()}`
          );
          const { data: deposit } = await this.$axios.get(
            `${
              process.env.ALL_DEPOSIT
            }/api/Aff/Report/Summary/${this.username.toLowerCase()}`
          );

          this.config.id = settings.setting_id;
          this.config.name = settings.config_name;
          this.config.percentDeposit = settings.dp_bonus;
          this.config.percentLoss = settings.winlose_bonus;
          this.config.percentCommission = settings.commision_bonus;
          this.config.recieve_text = "รายวัน";
          this.config.recieve = settings.recieve_mode;

          this.username = memberinfo.username;
          this.userinfo = { ...this.userinfo, ...memberinfo, ...deposit };

          this.userinfo.aff_link = memberinfo.aff_link + "?id=" + memberinfo.id;

          this.isLoading = false;
          this.dataRender = deposit.aff_deposit_list;
          this.dataRender = this.dataRender.map(x => {
            x.start_cal_time = new Date(x.start_cal_time).toLocaleString(
              "th-TH"
            );
            x.end_cal_time = new Date(x.end_cal_time).toLocaleString("th-TH");
            return x;
          });
          this.dataWinloseCommission = deposit.aff_bonus_list;
          this.searchSuccess = true;
          this.isLoading = false;
        } catch (error) {
          this.$swal({
            icon: "warning",
            title: `ไม่พบข้อมูล username ที่ท่านต้องการค้นหา`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
          this.isLoading = false;
          this.searchSuccess = false;
        }
      } else {
        this.$swal({
          icon: "warning",
          title: `กรุณากรอก username !!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    // async getData() {
    //   const { username, Affiliate, Downline, userinfo } = await this.$axios.get(
    //     `/api/Affiliate/Member/${this.username}`
    //   );
    //   this.username = username;
    //   this.Affiliate = Affiliate;
    //   this.Downline = Downline;
    //   this.userinfo = userinfo;
    // },
    async getDataTable(dateForm, dateTo, username) {
      let today = new Date();
      dateForm =
        dateForm === ""
          ? new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toISOString()
          : dateForm;
      dateTo =
        dateTo === ""
          ? new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toISOString()
          : dateTo;
      this.isLoading = true;
      try {
        const res_data = await this.$axios.get(
          `${process.env.ALL_DEPOSIT}/api/Aff/Report/Deposit/${this.$moment(
            dateForm
          ).format("YYYY-MM-DD")}/${this.$moment(dateTo).format(
            "YYYY-MM-DD"
          )}/${username}`
        );
        this.dataRender = res_data.data;
        this.dataRender = this.dataRender.map(x => {
          x.start_cal_time = new Date(x.start_cal_time).toLocaleString("th-TH");
          x.end_cal_time = new Date(x.end_cal_time).toLocaleString("th-TH");
          return x;
        });

        this.isLoading = false;
      } catch (error) {
        this.dataRender = [];
        this.isLoading = false;
      }
    },
    async getDataWinlose(dateForm, dateTo, username) {
      let today = new Date();
      dateForm =
        dateForm === ""
          ? new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toISOString()
          : dateForm;
      dateTo =
        dateTo === ""
          ? new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toISOString()
          : dateTo;
      this.isLoading = true;
      try {
        const res_data = await this.$axios.get(
          `${process.env.ALL_DEPOSIT}/api/Aff/Report/Bonus/${this.$moment(
            dateForm
          ).format("YYYY-MM-DD")}/${this.$moment(dateTo).format(
            "YYYY-MM-DD"
          )}/${username}`
        );
        this.dataWinloseCommission = res_data.data;
        this.loading = false;
      } catch (error) {
        this.dataRender = [];
        this.isLoading = false;
      }
    }
  }
};
</script>
