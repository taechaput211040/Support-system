<template>
  <v-flex>
    <v-row>
      <v-container>
        <h2 class="text-center mt-2 mb-4">เปิด-ปิด ฟีเจอร์</h2>

        <div class="row pa-3 mt-3">
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
              v-model="selectweb"
            ></v-autocomplete>
          </div>
          <div class="col-12 pa-2 col-sm-6">
            <v-btn color="green lighten-1" dark depressed @click="search">
              ค้นหา
            </v-btn>
          </div>
        </div>

        <v-container
          ><v-card class="mx-auto mt-5 justify-center classtable">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="itemtable"
              item-key="name"
              hide-default-footer
              ><template #[`item.manage`]="{item}">
                <v-switch :input-value="item.manage" color="success" />
              </template>
            </v-data-table>
            <div class="text-right pa-2">
              <v-btn class="justify-center col-2" color="success">บันทึก</v-btn>
            </div>
          </v-card>
        </v-container>
      </v-container>
    </v-row></v-flex
  >
</template>

<script>
export default {
  data() {
    return {
      webshow: "",
      items: [],
      showtable: false,
      selectweb: "",
      selected: [],
      headers: [
        {
          text: "เปิด-ปิด feature",
          align: "start",
          sortable: true,
          value: "manage",
          width: "15%"
        },
        {
          text: "ชื่อ feature",
          align: "start",
          sortable: true,
          value: "name"
        }
      ],
      itemtable: [
        {
          name: "เครดิตฟรี",
          manage: true
        },
        {
          name: "กงล้อนำโชค",
          manage: false
        },
        {
          name: "เปิดไพ่6ใบ",
          manage: false
        },
        {
          name: "เปิดหีบสมบัติ",
          manage: false
        },
        {
          name: "เชคอินรายวัน",
          manage: false
        },
        {
          name: "สะสมแต้ม",
          manage: false
        },
        {
          name: "ของพรีเมี่ยม",
          manage: false
        }
      ]
    };
  },
  async created() {
    try {
      const res = await this.$store.dispatch("auth/getAllWebsite");
      this.items = res.map(x => {
        return { value: x.hash, text: x.auto_link, ...x };
      });
    } catch (error) {
      console.log(error);
    }
    // await this.getProvider();
  },
  methods: {
    Toggle(Bool, index) {},
    search() {}
  }
};
</script>
