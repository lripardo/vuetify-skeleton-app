<template>
  <v-card>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-avatar tile size="60" width="90">
            <v-img src="../../assets/logo.png" alt="logo"/>
          </v-avatar>
        </v-col>
        <v-col cols="12">
          <v-form ref="form" lazy-validation>
            <slot name="fields"/>
          </v-form>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" block @click="ok">
            {{ textOk }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn class="primary--text" small plain text @click="change">
            {{ textChange }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    textOk: String,
    textChange: String
  },
  name: 'LoginStep',
  methods: {
    ok() {
      this.$emit('ok');
    },
    change() {
      this.$emit('change');
    },
    validate() {
      return this.$refs.form.validate();
    },
    resetValidation() {
      return this.$refs.form.resetValidation();
    }
  }
}
</script>
