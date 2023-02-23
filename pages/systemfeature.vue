<template>
  <v-flex>
    <v-row>
      <v-container>
        <h3 class="text-center mt-2">เปิด-ปิด ฟีเจอร์</h3>
        <hr class="mt-4 mb-4" />

        <div class="container">
          <v-row class="select-item p-0">
            <v-col cols="4" md="3">
              <h4>เลือกเว็ปไซต์ :</h4>
            </v-col>
            <v-col cols="8" md="2">
              <v-select
                label="เลือกเว็ปไซต์"
                v-model="webshow"
                :items="items"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                color="green lighten-1"
                class="col-12 col-md-1"
                dark
                depressed
                @click="showtable = true"
              >
                ค้นหา
              </v-btn></v-col
            >
          </v-row>
        </div>
        <template v-if="showtable == true">
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
                <v-btn class="justify-center col-2" color="success"
                  >บันทึก</v-btn
                >
              </div>
            </v-card>
          </v-container>
        </template>
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
          name: "รูเล็ต",
          manage: false
        },
        {
          name: "กงล้อ",
          manage: false
        },
        {
          name: "สล็อต",
          manage: false
        },
        {
          name: "กีฬา",
          manage: false
        },
        {
          name: "หวย",
          manage: false
        }
      ]
    };
  },
  methods: {
    Toggle(Bool, index) {}
  }
};
</script>
