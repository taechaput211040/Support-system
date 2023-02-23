<template>
  <v-flex
    ><v-row>
      <v-container>
        <h3 class="text-center mt-2 mb-4">เปิด-ปิดเว็ปไซต์</h3>

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

        <template> </template>
      </v-container> </v-row
  ></v-flex>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      username: null,
      radioGroup: null,
      items: []
    };
  },
  async created() {
    // await this.getProvider();
    const res = await this.$store.state.dispatch("auth/getAllWebsite");

    this.items = res.map(x => {
      return { value: x.website, text: x.website };
    });
  },
  methods: {
    ...mapActions("auth", {
      getProviderList: "getProviderList",
      getAllWebsite: "getAllWebsite",
      getMemberInfo: "getMemberInfo",
      getMemberDeposit: "getMemberDeposit",
      getMemberWithdraw: "getMemberWithdraw"
    }),
    async search() {}
  }
};
</script>
