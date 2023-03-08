<template>
  <v-flex
    ><v-row>
      <v-container>
        <h3 class="text-center mt-2 mb-4">เช็คข้อมูลรายการฝากถอน</h3>

        <div class="col-12 pa-0 col-sm-6">
          <v-autocomplete
            auto-select-first
            clearable
            small-chips
            solo
            :items="items"
            label="กรอก เว็บไซต์"
            outlined
            dense
            v-model="website"
          ></v-autocomplete>
        </div>

        <v-row class="select-item p-0">
          <v-col cols="8" md="2">
            <v-text-field
              v-model="username"
              outlined
              solo
              dense
              label="กรอก Username"
            ></v-text-field
          ></v-col>

          <v-col>
            <v-btn
              color="green lighten-1"
              class="col-12 col-md-1"
              dark
              depressed
              @click="search"
            >
              ค้นหา
            </v-btn></v-col
          >
        </v-row>

        <template>
          <!-- <v-card-title>
            <v-col cols="6" md="3">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field
            ></v-col>
          </v-card-title> -->
          <v-card class="mx-auto mt-5 justify-center classtable">
            <v-data-table
              :headers="headers"
              :items="itemtable"
              hide-default-footer
              :items-per-page="100"
            >
              <template #[`item.setting`]="{item}">
                <div class="d-flex pa-1">
                  <v-btn
                    dark
                    small
                    color="success gry-2"
                    @click.stop="todeposit(item)"
                  >
                    ฝาก
                  </v-btn>
                  <v-btn
                    dark
                    small
                    color="error gry-2"
                    @click.stop="towithdraw(item)"
                  >
                    ถอน
                  </v-btn>
                  <v-btn
                    dark
                    small
                    color="pink gry-2"
                    @click.stop="checkturnTowithdraw(item)"
                  >
                    เชคเทิร์น
                  </v-btn>
                  
                </div>
              </template>
              <template #[`item.no`]="{index}">
                {{ index + 1 }}
              </template>
              <template #[`item.created_at`]="{item}">
                {{ item.created_at | dateFormat }}
              </template>
              <template #[`item.bank`]="{item}">
                <!-- <v-avatar color="indigo lighten-1 elevation-3">
                  <v-icon dark>
                    <img v-if="item.bank == 'KTB'" src="" />
                  </v-icon>
                </v-avatar> -->
                {{ item.bank }}
              </template></v-data-table
            >
          </v-card>
          <v-dialog v-model="deposit">
            <v-card class="pa-3">
              <p class="outlined text--h3">
                รายการฝากล่าสุด : {{ itemsdeposit.length }} รายการ
              </p>
              <v-divider class="pt-2 pb-2"> </v-divider>
              <v-card>
                <v-data-table
                  width="70%"
                  :items="itemsdeposit"
                  :headers="headersdeposit"
                >
                  <template #[`item.smsdatetime`]="{ item }">
                    {{ item.smsdatetime | dateFormat }}
                  </template>
                  <template #[`item.created_at`]="{ item }">
                    {{ item.created_at | dateFormat }}
                  </template></v-data-table
                >
              </v-card></v-card
            >
          </v-dialog>
          <v-dialog v-model="withdraw" max-width="80%">
            <v-card class="pa-3">
              <p class="outlined text--h3">
                รายการถอนล่าสุด : {{ itemswithdraw.length }} รายการ
              </p>
              <v-divider class="pt-2 pb-2"> </v-divider>
              <v-card>
                <v-data-table
                  width="70%"
                  :items="itemswithdraw"
                  :headers="headerswithdraw"
                >
                  <template #[`item.requsettime`]="{ item }">
                    {{ item.requsettime | dateFormat }} </template
                  ><template #[`item.transferTime`]="{ item }">
                    {{ item.requsettime | dateFormat }}
                  </template></v-data-table
                >
              </v-card></v-card
            >
          </v-dialog>
        </template>
      </v-container>
    </v-row></v-flex
  >
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      username: null,
      website: null,
      itemswithdraw: [],
      itemsdeposit: [],
      valid: true,
      headerswithdraw: [
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "Username",
          value: "username",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "ประเภท",
          value: "type",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "ยอดโอน",
          value: "amount",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลากดถอน",
          value: "requsettime",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลาโอนสำเร็จ",
          value: "transferTime",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "สภานะ",
          value: "status",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "กดถอนโดย",
          value: "operator",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          class: "grey darken-2 white--text",
          sortable: false
        }
      ],
      headersdeposit: [
        {
          text: "ธนาคารเว็ป",
          value: "companyBank",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "Username",
          value: "username",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "เติมโดย",
          value: "topupby",
          class: "grey darken-2 white--text",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          class: "grey darken-2 white--text",
          sortable: false
        }
      ],
      deposit: false,
      withdraw: false,
      items: [],
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          value: "no",
          sortable: false
        },
        {
          text: "ชื่อ",
          align: "start",
          value: "name",
          sortable: false
        },
        {
          text: "นามสกุล",
          align: "start",
          value: "lastname",
          sortable: false
        },
        { text: "ธนาคาร", align: "start", value: "bankName", sortable: false },
        {
          text: "เลขบัญชีธนาคาร",
          align: "start",
          value: "bankAcc",
          sortable: false
        },
        { text: "เบอร์โทร", align: "start", value: "phone", sortable: false },
        { text: "ไลน์", align: "start", value: "lineID", sortable: false },

        {
          text: "username",
          align: "start",
          sortable: false,
          value: "username"
        },
        {
          text: "ผู้เเนะนำ",
          align: "start",
          value: "recommender",
          sortable: false
        },
        {
          text: "มาจากช่องทาง",
          align: "start",
          value: "knowFrom",
          sortable: false
        },
        {
          text: "วันที่สมัคร",
          align: "start",
          value: "created_at",
          sortable: false
        },
        {
          text: "วันที่เเก้ไขล่าสุด",
          align: "start",
          value: "updated_at",
          sortable: false
        },
        {
          text: "ผู้เเก้ไขล่าสุด",
          align: "start",
          value: "operator",
          sortable: false
        },
        {
          text: "การดำเนินก่าร",
          align: "start",
          value: "setting",
          sortable: false
        }
      ],
      itemtable: []
    };
  },
  async created() {
    // await this.getProvider();
    try {
      const res = await this.getAllWebsite();

      this.items = res.map(x => {
        return { value: x.website, text: x.website };
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("auth", {
      getProviderList: "getProviderList",
      getAllWebsite: "getAllWebsite",
      getMemberInfo: "getMemberInfo",
      getMemberDeposit: "getMemberDeposit",
      getMemberWithdraw: "getMemberWithdraw"
    }),
    async search() {
      if (this.username) {
        try {
          let m = await this.getMemberInfo({
            username: this.username
            // website: this.website
          });
          this.itemtable = [m.data];
          this.showtable = true;
        } catch (error) {
          this.$swal({
            icon: "error",
            title: `กรุณากรอก username ให้ถูกต้อง`,
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
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
    async todeposit(item) {
      try {
        let m = await this.getMemberDeposit({
          username: item.username
          // website: this.website
        });
        this.itemsdeposit = m.data;
        this.showtable = true;

        this.deposit = true;
      } catch (error) {
        console.log(error);
      }
    },
    async towithdraw(item) {
      try {
        let m = await this.getMemberWithdraw({
          username: item.username
          // website: this.radioGroup
        });
        this.itemswithdraw = m.data;
        this.showtable = true;

        this.withdraw = true;
      } catch (error) {
        console.log(error);
      }
    },
    async checkturnTowithdraw(item) {
      try {
        let turnstatus = await this.$store.dispatch("auth/getCheckturn", {
          username: item.username
        });
        console.log(turnstatus, "turnstatus");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
