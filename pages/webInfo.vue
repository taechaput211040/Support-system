<template>
  <div>
    <div class="row">
      <div class="col-12 pa-2 col-sm-6">
        <v-autocomplete
          auto-select-first
          clearable
          hide-details="auto"
          solo
          :items="itemweb"
          label="กรอก เว็บไซต์"
          v-model="selectWeb"
          outlined
          dense
        ></v-autocomplete>
      </div>
      <div class="col-12 pa-2 col-sm-6">
        <v-btn color="success" @click="getAllDataInfo">ค้นหา</v-btn>
      </div>
    </div>

    -เชคข้อมูล ข้อมูลเว็ป -ตั้งค่าระบบ -พนักงาน -รายการสรุปกำไรขาดทุน -ธนาคาร
    -โปรโมชั่น
    <v-card class="rounded-lg elevation-2 pa-3 ma-2">
      <div class="row">
        <div class="col-12 col-md-6">
          <system-show :datasetting="systemSetting"></system-show>
        </div>
        <div class="col-12 col-sm-6"></div>
      </div>
    </v-card>
  </div>
</template>

<script>
import SystemShow from "../components/infoweb/SystemShow.vue";
export default {
  components: { SystemShow },
  data() {
    return {
      itemweb: [],
      selectWeb: "",
      systemSetting: {}
    };
  },
  async mounted() {
    const res = await this.$store.dispatch("auth/getAllWebsite");
    this.itemweb = res.map(x => {
      return { value: x.hash, text: x.auto_link, ...x };
    });
  },
  methods: {
    async getAllDataInfo() {
      console.log(this.selectWeb, "this.selectWeb");
      let select = this.itemweb.find(x => x.hash == this.selectWeb);
      console.log(select, "select");
      this.systemSetting = await this.$store.dispatch(
        "setting/getSystemSetting",
        select.hash
      );
    }
  }
};
</script>

<style></style>
