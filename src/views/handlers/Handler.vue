<template>
  <v-container class="fill-height">
    <v-row class="text-center" align="center" justify="center">
      <v-col>
        <v-avatar tile size="60" width="90">
          <v-img src="../../assets/logo.png" alt="logo"/>
        </v-avatar>
        <h2>{{ title }}</h2>
        <h5>{{ subtitle }}</h5>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
  },
  name: 'Handler'
}
</script>
