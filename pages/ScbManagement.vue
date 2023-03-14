<template>
  <div class="container">
    <h2 class="text-center mt-2 mb-4">ลงทะเบียน SCB</h2>

    <v-card class="pa-3 mt-5 justify-center">
      <v-alert dense text type="info"
        >กรุณากรอกรายละเอียดเพื่อลงทะเบียน</v-alert
      >

      <v-form ref="formsingle">
        <v-row class="pa-3">
          <v-col md="3" cols="12">
            <v-text-field
              outlined
              dense
              v-model="form.deviceID"
              hide-details="auto"
              label="Device ID"
              required
            ></v-text-field
          ></v-col>
          <v-col md="3" cols="12">
            <v-text-field
              hide-details="auto"
              outlined
              v-model="form.pin"
              dense
              label="PIN"
              required
            ></v-text-field
          ></v-col>
          <v-col md="3" cols="12">
            <v-text-field
              outlined
              dense
              label="หมายเลขบัญชีธนาคาร"
              required
              v-model="form.BankNumber"
              hide-details="auto"
            ></v-text-field
          ></v-col>
          <v-col md="3" cols="12">
            <v-text-field
              outlined
              dense
              label="หมายเลขโทรศัพท์"
              required
              v-model="form.PhoneNumber"
              hide-details="auto"
            ></v-text-field
          ></v-col>
          <v-col md="3" cols="12">
            <v-text-field
              hide-details="auto"
              outlined
              dense
              v-model="form.company"
              label="COMPANY"
              required
            ></v-text-field
          ></v-col>
          <v-col md="3" cols="12">
            <v-text-field
              outlined
              hide-details="auto"
              dense
              label="AGENT"
              v-model="form.agent"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-card-actions
          ><v-btn color="primary" @click="register">ลงทะเบียน</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    register() {}
  }
};
</script>

<style></style>
