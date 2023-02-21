<template>
  <v-flex
    ><v-row>
      <v-container>
        <h3 class="text-center mt-2">ทางเข้าหลังบ้านค่ายเกม</h3>
      </v-container>
    </v-row>

    <template>
      <v-card fluid class="elevation-2 mt-2">
        <v-form>
          <v-container>
            <v-card-title>กรุณากรอกรายละเอียด</v-card-title>

            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  outlined
                  dense
                  :items="company"
                  label="OPCODE"
                  required
                  v-model="opcode"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn color="success" @click="search">ค้นหา</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form></v-card
      >
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
          items-per-page="100"
          outlined
        >
          <template #[`item.vpn`]="{ item }">
            <v-chip color="red" small outlined v-if="item.vpn == true">
              <v-icon class="mr-2" color="success" small
                >mdi mdi-checkbox-blank-circle</v-icon
              >
              success</v-chip
            >
          </template>
        </v-data-table>
      </v-card>
    </template></v-flex
  >
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      opcode: "bbkt",
      itemgamecompany: null,
      radiogroup: null,
      company: ["brit", "bbkt"],
      showtable: false,
      headers: [
        {
          text: "ชื่อค่ายเกม",
          align: "start",
          sortable: true,
          value: "provider_name"
        },
        {
          text: "CODE",
          align: "start",
          sortable: true,
          value: "provider_code"
        },
        { text: "URL", align: "start", value: "provider_BO_link" },
        {
          text: "login",
          align: "start",
          sortable: true,
          value: "bo_username"
        },
        {
          text: "Password",
          align: "start",
          sortable: true,
          value: "bo_password"
        },
        {
          text: "หมายเหตุอื่นๆ",
          align: "start",
          sortable: true,
          value: "remark"
        },
        {
          text: "เข้าผ่าน REMOTE",
          align: "start",
          sortable: true,
          value: "vpn"
        }
      ],
      itemtable: []
    };
  },
  async created() {
    await this.getProvider();
  },
  methods: {
    ...mapActions("auth", {
      getProviderList: "getProviderList",
      getProviderEntance: "getProviderEntance"
    }),
    async search() {
      let g = await this.getProviderEntance({ opcode: this.opcode });
      this.itemtable = g.data;
    },
    async getProvider() {
      const provider = await this.getProviderList();
      this.itemgamecompany = provider.data.map(x => {
        return { value: x.code, text: x.name };
      });

      console.log(this.itemgamecompany);
    }
  }
};
</script>
