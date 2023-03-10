<template>
  <v-flex
    ><v-row>
      <v-container>
        <h2 class="text-center mt-2 mb-4">เปิด-ปิด ค่ายเกม</h2>
      </v-container>
    </v-row>
    <template>
      <v-card class="pa-3 mt-5 justify-center">
        <v-card-title>เปิด-ปิด ค่ายเกมทั้งหมด</v-card-title>
        <v-form ref="formall" v-model="validall">
          <v-row>
            <v-col md="9" cols="12">
              <v-text-field
                outlined
                dense
                :rules="rulesall.message"
                label="กรอกข้อความที่จะประกาศปิด"
                required
              ></v-text-field
            ></v-col>
            <v-col md="3" cols="12">
              <v-text-field
                :rules="rulesall.time"
                outlined
                dense
                label="กรอกเวลาทำรายการ"
                required
              ></v-text-field
            ></v-col>
          </v-row>

          <v-btn color="primary" @click.stop="openall">เปิดทั้งหมด</v-btn>
          <v-btn color="error" @click.stop="closeall">ปิดทั้งหมด</v-btn>
        </v-form>
      </v-card>
      <v-card class="pa-3 mt-5 justify-center">
        <v-card-title>เปิด-ปิด ค่ายเกม</v-card-title>
        <v-form ref="formsingle" v-model="validsingle">
          <v-row>
            <v-col md="3" cols="12">
              <v-select
                :rules="rulessingle.selected"
                :items="selectgame"
                outlined
                dense
                label="เลือกค่ายเกมที่ต้องการทำรายการ"
                required
              ></v-select
            ></v-col>
            <v-col md="6" cols="12">
              <v-text-field
                outlined
                :rules="rulessingle.message"
                dense
                label="กรอกข้อความที่จะประกาศเปิด-ปิด"
                required
              ></v-text-field
            ></v-col>
            <v-col md="3" cols="12">
              <v-text-field
                :rules="rulessingle.time"
                outlined
                dense
                label="กรอกเวลาทำรายการ"
                required
              ></v-text-field
            ></v-col>
          </v-row>

          <v-btn color="primary" @click.stop="opensingle">เปิดค่ายเกม</v-btn>
          <v-btn color="error" @click.stop="closesingle">ปิดค่ายเกม</v-btn>
        </v-form>
      </v-card>
    </template></v-flex
  >
</template>

<script>
export default {
  data() {
    return {
      selectgame: ["asdsad", "sadsadsa"],
      validsingle: true,
      validall: true,
      rulesall: {
        message: [v => !!v || "กรุณากรอกข้อความที่ต้องการประกาศ"],
        time: [v => !!v || "กรุณากรอกเวลาที่ต้องการเปิด-ปิดค่ายเกม"]
      },
      rulessingle: {
        selected: [v => !!v || "กรุณากรอกข้อความที่ต้องการประกาศ"],
        message: [v => !!v || "กรุณากรอกข้อความที่ต้องการประกาศ"],
        time: [v => !!v || "กรุณากรอกเวลาที่ต้องการเปิด-ปิดค่ายเกม"]
      },
      time: null,
      menu2: false,
      modal2: false
    };
  },
  methods: {
    closeall() {
      this.$refs.formall.validate();
      if (this.validall) {
        console.log("Open เเล้ว");
      }
    },
    openall() {
      this.$refs.formall.validate();
      if (this.validall) {
        console.log("closeเเล้ว");
      }
    },
    opensingle() {
      this.$refs.formsingle.validate();
      if (this.validsingle) {
        console.log("Open เเล้ว");
      }
    },
    closesingle() {
      this.$refs.formsingle.validate();
      if (this.validsingle) {
        console.log("close เเล้ว");
      }
    }
  }
};
</script>

<style scoped>
.refrech {
  width: 20px;
  position: absolute;
  right: 20px;
  cursor: pointer;
}

.spiner {
  animation: spiner 1s linear infinite;
}
@keyframes spiner {
  from {
    transform: scale(1) rotate(0deg);
  }
  to {
    transform: scale(1) rotate(360deg);
  }
}
</style>
