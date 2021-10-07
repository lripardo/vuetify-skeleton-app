<template>
  <v-card flat>
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
          <v-btn :color="isDarkMode ? '' : 'primary'" block @click="ok">
            <v-icon v-if="iconOk" class="mr-3">
              {{ iconOk }}
            </v-icon>
            {{ textOk }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn :color="isDarkMode ? '' : 'primary'" x-small text @click="change">
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
    iconOk: {
      type: String,
      required: false,
      default: ''
    },
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
  },
  computed: {
    isDarkMode() {
      return this.$vuetify.theme.dark;
    }
  }
}
</script>
