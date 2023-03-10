<template>
  <div class="container">
    <h2 class="text-center mt-2 mb-4">เช็คข้อมูลโปรโมชัน</h2>
    <div class="row pa-3 mt-3">
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
      <div class="col-12 pa-2 col-sm-6">
        <v-btn color="green lighten-1" dark depressed @click="search">
          ค้นหา
        </v-btn>
      </div>
      <v-alert dense text type="success"
        >เลือกเว็ปที่ต้องการด้านบนแล้วกดค้นหาเพื่อดูรายละเอียดโปรโมชัน</v-alert
      >
    </div>
    <div v-if="itempromotion.length > 0">
      <v-card class="elevation-4 rounded-lg pa-3">
        <v-card-title>
          รายละเอียดโปรโมชันทั้งหมด
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="4"
            v-for="(item, i) in itempromotion"
            :key="i"
          >
            <div class="card_promotion">
              <div
                class="title_card"
                :class="{ active_card: item.status == true }"
              >
                <div class="text-right">
                  <v-tooltip bottom color="success" v-if="item.status == true">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="green darken-4"
                        x-small
                        outlined
                        icon
                        fab
                        ><v-icon>mdi-power-standby</v-icon>
                      </v-btn></template
                    >
                    <span>กำลังเปิดใช้งาน</span>
                  </v-tooltip>
                  <v-tooltip bottom color="red" v-else>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="red"
                        x-small
                        outlined
                        icon
                        fab
                        ><v-icon>mdi-power-standby</v-icon>
                      </v-btn></template
                    >

                    <span>ปิดใช้งานอยู่</span>
                  </v-tooltip>
                </div>

                <div class="mt-4">
                  <div class="text-center">ชื่อโปรโมชัน</div>
                  <div class="text-center">
                    <v-chip color="success" label dark v-if="item.status">{{
                      item.promotionname
                    }}</v-chip>
                    <v-chip color="grey" label dark v-else>{{
                      item.promotionname
                    }}</v-chip>
                  </div>
                </div>
              </div>

              <div class="pa-3">
                <div class="text-center">
                  <img class="img_promotion" :src="item.promotionpic" alt="" />
                </div>

                <div class="font-weight-bold">คำอธิบายที่ลูกค้าเห็น</div>
                <v-card class="elevatoin-3 pa-3 rounded-lg">
                  {{ item.promotiondescription }}
                </v-card>

                <div
                  v-for="(detail, index) in item.promotion_details"
                  :key="index"
                >
                  <div v-if="detail">
                    <div class="my-2 font-weight-bold">
                      ประเภทโปรโมชัน :
                      <v-chip
                        color="success"
                        label
                        dark
                        v-if="detail.typestatus == true"
                        >{{ detail.promotiontypename }}</v-chip
                      >
                      <v-chip v-else color="grey" label dark>{{
                        detail.promotiontypename
                      }}</v-chip>
                    </div>
                    <v-card
                      class="elevatoin-3 pa-3 rounded-lg"
                      v-if="detail.typestatus == true"
                    >
                      <v-row class="row" no-gutters>
                        <v-col class="col-6 col-md-6 col-lg-4">
                          <span class="font-weight-bold">ฝากขั้นต่ำ:</span>
                          {{ detail.mindp }}</v-col
                        >
                        <v-col class="col-6 col-md-6 col-lg-4"
                          ><span class="font-weight-bold">ฝากสูงสุด:</span>
                          {{ detail.maxdp }}</v-col
                        >
                        <v-col class="col-6 col-md-6 col-lg-4"
                          ><span class="font-weight-bold">ประเภท:</span>
                          {{ detail.bonustype }}</v-col
                        >
                        <v-col class="col-6 col-md-6 col-lg-4"
                          ><span class="font-weight-bold">จำนวนโบนัส:</span>
                          {{ detail.bonusvalue }}</v-col
                        >
                        <v-col class="col-6 col-md-6 col-lg-4"
                          ><span class="font-weight-bold">โบนัสสูงสุด:</span>
                          {{ detail.maxbonusvalue }}</v-col
                        >
                        <v-col class="col-6 col-md-6 col-lg-4"
                          ><span class="font-weight-bold">เทิร์น:</span>
                          {{ detail.STEP }}</v-col
                        >
                        <v-col class="col-6 col-md-6 col-lg-4"
                          ><span class="font-weight-bold"> อั้นถอน:</span>
                          {{ detail.wdlimit }}</v-col
                        >
                      </v-row>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectWeb: null,
      itemweb: [],
      selectItem: null,
      itempromotion: []
    };
  },

  async created() {
    try {
      const res = await this.$store.dispatch("auth/getAllWebsite");
      this.itemweb = res.map(x => {
        return { value: x.hash, text: x.auto_link, ...x };
      });
    } catch (error) {
      console.log(error);
    }
    // await this.getProvider();
  },
  methods: {
    Toggle(Bool, index) {},
    async search() {
      if (this.selectWeb) {
        let select = this.itemweb.find(x => x.hash == this.selectWeb);
        try {
          let response = await this.$store.dispatch("setting/getPromotion", {
            company: select.company,
            agent: select.agent_username
          });
          this.itempromotion = response;
          if (response.length <= 0) {
            this.$swal({
              icon: "warning",
              title: `ไม่พบรายละเอียดการตั้งค่าโปรโมชั่นของเว็ปไซต์นี้`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          icon: "warning",
          title: `กรุณาเลือกเว็ปไซต์`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }
};
</script>
<style></style>
