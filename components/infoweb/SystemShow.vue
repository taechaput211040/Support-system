<template>
  <v-flex>
    <h5 class="mb-4">ตั้งค่าระบบ</h5>
    <v-card class="pa-3 elevation-3 rounded-lg font-weight-bold">
      <v-row v-if="datasetting">
        <v-col cols="12" sm="6">
          ชื่อเว็ปไซต์
          <v-text-field
            filled
            disabled
            v-model="datasetting.member_site_name"
            dense
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          COMPANY KEY
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.companykey"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          รหัสเอเย่น
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.companyname"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          Line@
          <v-text-field
            outlined
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.companynlineurl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ลิ้งลงทะเบียน
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.register_link"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ลิ้งค์เข้าสู่ระบบ
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.login_link"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          เทิร์นเมื่อไม่รับโบนัส
          <v-text-field
            outlined
            dense
            disabled
            hide-details="auto"
            placeholder="BEGXT"
            v-model.number="datasetting.turnNobonus"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ถอนเงินขั้นต่ำ ( 0 = ไม่มีขั้นต่ำ)
          <v-text-field
            outlined
            dense
            disabled
            hide-details="auto"
            v-model.number="datasetting.least_wd_credits"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ถอนออโต้ทั้งระบบ
          <v-switch
            disabled
            hide-details="auto"
            v-model="datasetting.wdautoAll"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          จำนวนเงินที่อนุญาติให้ถอนออโต้
          <v-text-field
            disabled
            dense
            hide-details="auto"
            v-model.number="datasetting.wd_auto_amount"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นถอนต่อวัน
          <v-switch
            disabled
            hide-details="auto"
            v-model="datasetting.wdlimit"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          จำนวนเงินที่อั้นถอนต่อวันต่อคน
          <v-text-field
            disabled
            :outlined="datasetting.wdlimit"
            dense
            hide-details="auto"
            v-model.number="datasetting.wdlimitcredit"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นถอนจำนวนครั้งต่อวัน
          <v-switch
            hide-details="auto"
            v-model="datasetting.wdlimit_time_status"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นจำนวนครั้งในการถอนต่อวัน
          <v-text-field
            disabled
            v-model.number="datasetting.wdlimitTime"
            dense
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
    </v-card>
    <h5 class="my-4">ตั้งค่าข้อความต้อนรับ</h5>
    <v-card class="pa-3 elevation-3 rounded-lg" v-if="message">
      <v-switch
        hide-details="auto"
        class="my-4 font-weight-bold"
        label="สถานะ"
        v-model.number="message.status"
      ></v-switch>
      <div v-if="message.status == 1">
        <v-row>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">ส่วนบนสุด (HEADER)</span>
            <v-text-field
              outlined
              dense
              disabled
              v-model="message.header"
              hide-details="auto"
              placeholder="กรอกชื่อ HEADER"
              class="mb-2"
            ></v-text-field>
            <span class="font-weight-bold"> หัวข้อเรื่องที่จะประกาศ</span>
            <v-text-field
              outlined
              dense
              disabled
              v-model="message.topic"
              hide-details="auto"
              placeholder="กรอกหัวข้อเรื่องที่จะประกาศ"
              class="mb-2"
            ></v-text-field>
            <span class="font-weight-bold">รายละเอียด (ถ้ามี)</span>
            <v-textarea
              name="input-7-1"
              filled
              disabled
              auto-grow
              placeholder="กรอกรายละเอียด"
              v-model="message.description"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" class="text-center pa-5">
            <div class="font-weight-bold">
              รูปภาพ ขนาดไม่เกิน 1 MB 500x500 px(ถ้ามี)
            </div>
            <img
              class="img_promotion"
              :src="message.img"
              alt=""
              style="width: 330px !important"
            />
            <div></div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    message: {},
    datasetting: {}
  }
};
</script>

<style></style>
