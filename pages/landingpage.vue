<template>
  <div class="container">
    <h2 class="text-center mt-2 mb-4">จัดการหน้า Landing</h2>
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
      <v-alert dense text type="success" v-show="!hashStatic"
        >เลือกเว็ปที่ต้องการด้านบนแล้วกดค้นหาเพื่อตั้งค่าหน้า
        Landingpage</v-alert
      >
      <iframe
        v-show="hashStatic"
        id="myIframe"
        src=""
        frameborder="none"
        width="100%"
        style="min-height: 100vh"
        height="100vh"
      ></iframe>
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
      hashStatic: null
    };
  },
  watch: {
    selectWeb: {
      async handler() {
        this.hashStatic = null;
      }
    }
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
      let select = this.itemweb.find(x => x.hash == this.selectWeb);

      try {
        let response = await this.$store.dispatch(
          "setting/getStaticHashWebsite",
          {
            company: select.company,
            agent: select.agent_username
          }
        );
        this.hashStatic = response.data.hash;
        console.log("response", this.hashStatic);
        await this.getIframeRender(this.hashStatic);
      } catch (error) {
        console.log(error);
      }
    },
    async getIframeRender(hash) {
      const list = document.getElementsByTagName("iframe");
      list[0].src = "";

      let linked = `https://admin-salepage.zamba777.com/#/?hash=${hash}`;
      console.log(linked);

      setTimeout(() => {
        list[0].src = linked;
      }, 100);
      this.renderFrame = true;
    }
  }
};
</script>

<style></style>
