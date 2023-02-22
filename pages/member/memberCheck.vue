<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <h3 class="mb-2">เช็คข้อมูลการเล่นของลูกค้า / จำนวนเทิร์น</h3>
      <v-row>
        <v-col lg="6" sm="12" md="12" cols="12">
          <div class=" card-child elevation-5">
            <v-row class="d-flex align-baseline ma-auto"
              ><v-col
                cols="12"
                sm="12"
                md="12"
                lg="6"
                class="d-flex align-baseline"
                ><v-text-field
                  name="name"
                  dense
                  outlined
                  clearable
                  v-model="username"
                  label="กรอก username เพื่อค้นหา"
                  placeholder="เช่น xx1234567"
                  hide-details="auto"
                ></v-text-field> </v-col
              ><v-col cols="12" sm="12" md="12" lg="6" class="text-center">
                <v-btn color="primary" @click="searchdata">
                  <v-icon left dark>
                    mdi-magnify
                  </v-icon>
                  ค้นหา</v-btn
                >
                <v-btn color="pink" dark @click="changeTurn">
                  <v-icon left dark>
                    mdi-pencil
                  </v-icon>
                  แก้ไขเทิร์น</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" v-if="serchsuccess == true">
          <card-report
            title="USERNAME"
            :value="ip_data.username"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="CREDIT"
            :value="result.balance"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/credit-card.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="เวลาที่เข้าใช้งานล่าสุด (อัพเดททุก 30 นาที)"
            :value="ip_data.updated_at | dateFormat"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/time-left.png"
          ></card-report>
        </v-col>

        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="ค่ายเกมที่เข้าเล่นล่าสุด"
            :value="ip_data.game_name"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/game-control.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="ค่ายเกมที่เข้าล่าสด"
            :value="provider[ip_data.code] ? provider[ip_data.code] : 'no data'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/book.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="IP address ที่เข้าใช้งานล่าสุด"
            :value="ip_data.ip"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/placeholder.png"
          ></card-report>
        </v-col>
      </v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" v-if="serchsuccess == true">
        <v-card class="elevation-3">
          <v-data-table :headers="header" hide-default-footer :items="response">
          </v-data-table
        ></v-card>
      </v-card>
    </v-container>
    <v-dialog v-model="dialogFixTurn" max-width="1000">
      <v-card>
        <v-card-title>
          <h4>แก้ไขเทิร์น</h4>
        </v-card-title>

        <v-row v-if="turn_fix" class="px-5">
          <v-col lg="4" sm="4" cols="4" class="px-5">
            <h4>SLOT</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN SLOT"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.SL"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN SLOT ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.SL"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>CASINO</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN CASINO"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.LC"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN CASINO ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.LC"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>SPORTBOOK</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN SPORTBOOK"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.SB"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN SPORTBOOK ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.SB"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>ESPORT</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN ESPORT"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.ES"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN ESPORT ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.ES"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>FISHING</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN FISHING"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.FH"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN FISHING ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.FH"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>LOTTO</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN LOTTO"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.LT"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN LOTTO ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.LT"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>OTHERS</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN OTHERS"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              disabled
              dense
              bold
              :value="turn_fix.OT"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="TURN OTHERS ที่ต้องการ"
              placeholder="กรอกจำนวนวางเดิมพันที่ต้องทำ"
              type="number"
              dense
              v-model.trim="turn_new.OT"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" cols="4" class="px-5">
            <h4>อั้นถอนจากการเติม</h4>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="อั้นถอน(บาท)"
              placeholder="กรอกจำนวนอั้นถอน"
              disabled
              dense
              bold
              :value="turn_fix.limitwithdraw"
              outlined
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" cols="12" class="px-5">
            <v-text-field
              label="อั้นถอนที่ต้องการ(บาท)"
              placeholder="กรอกจำนวนอั้นถอน"
              type="number"
              dense
              v-model.trim="turn_new.limitwithdraw"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="fixturn_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogFixTurn = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";

import LoadingPage from "../../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      isLoading: false,
      serchsuccess: false,
      username: "",
      data: { lastest_dpref: "58579427-a2b0-41e5-9501-b9350f7804ba" },

      turn_new: {
        limitwithdraw: 0,
        SL: 0,
        LC: 0,
        SB: 0,
        ES: 0,
        OT: 0,
        LT: 0,
        FH: 0
      },
      turn_fix: null,
      dialogFixTurn: false,

      ip_data: {
        code: "",
        created_at: "",
        device: "",
        game_name: "",
        id: "",
        ip: "ip",
        provider_name: "",
        updated_at: "เวลาล่าสุด",
        username: "username"
      },
      result: {
        credit: 0,
        id: "",
        name: "",
        phone: "",
        provider_active: "ค่ายเกม",
        role: "",
        status: 1,
        user: "username"
      },
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "TURN",
          value: "turn",
          align: "center",
          sortable: false
        },
        {
          text: "ยอด วางเดิมพัน ที่ต้องทำ",
          value: "turnTarget",
          align: "center",
          sortable: false
        },
        {
          text: "วางเดิมพัน",
          value: "winlose",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดวางเดิมพันคงค้าง",
          value: "outstanding",
          align: "center",
          sortable: false
        },
        {
          text: "อั้นถอนจากการเติม",
          value: "limitwithdraw",
          align: "center",
          sortable: false
        },
        {
          text: "อั้นถอนของระบบ",
          value: "sys_limit_amount",
          align: "center",
          sortable: false
        }
      ],
      response: [
        {
          id: 4687,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 15,
          turnTarget: 3380,
          type: "SL",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 81052.4
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["provider", "gameType"])
  },
  methods: {
    ...mapActions("member", ["getTurnByid", "updateTurn"]),
    getContValue(turn) {
      const value = turn;
      return value;
    },
    async fixturn_confirm() {
      this.turn_fix = { ...this.turn_fix, ...this.turn_new };
      this.turn_fix.editturn = true;

      await this.reMaping(this.response);
      // console.log(this.turn_fix)
      try {
        this.$swal({
          title: `ยืนยันการแก้ไขข้อมูล?`,
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
            await this.updateTurn(this.turn_fix);

            this.$swal({
              icon: "success",
              title: "บันทึกข้อมูลเรียบร้อย",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500
            }).then(async result => {
              this.isLoading = false;
            });
            this.dialogFixTurn = false;
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
    async changeTurn() {
      this.dialogFixTurn = true;
    },
    async searchdata() {
      this.isLoading = true;
      try {
        this.serchsuccess = true;
        console.log(this.username);
        let response = await this.getTurnByid(this.username);
        this.ip_data = response.data.ip_data;
        this.turn_fix = response.data.turn;
        const display_turn = await this.mapTurn(response.data);

        console.log(display_turn);
        this.response = display_turn;
        this.result = response.data.result;
        this.isLoading = false;
      } catch (error) {
        this.serchsuccess = false;
        this.isLoading = false;
        console.log(error);
      }
    },
    async getWinloseFromData(turn_amount, gameType) {
      return turn_amount.find(x => x.gameType == gameType).bet;
    },
    async mapTurn(data) {
      const convert_turn = JSON.parse(data.turn.turn);
      const turn_array = data.winlose.validAmount.map(x => {
        return {
          turn: convert_turn[x.gameType],
          turnTarget: data.turn[x.gameType],
          type: this.gameType[x.gameType],
          type_code: x.gameType,
          limitwithdraw: data.turn.limitwithdraw,
          sys_limit_amount: data.turn.sys_limit_amount,
          winlose: x.bet,
          outstanding: data.winlose.outstanding.find(
            y => y.gameType == x.gameType
          ).bet
        };
      });

      return turn_array;
    },
    async reMaping(response) {
      this.response = response.map(x => {
        if (this.turn_fix[x.type_code]) {
          x.turnTarget = this.turn_fix[x.type_code];
        }
        x.limitwithdraw = this.turn_fix.limitwithdraw;
        return x;
      });
    }
  }
};
</script>

<style></style>
