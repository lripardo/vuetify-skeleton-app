<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row v-if="loading" class="fill-height" align="center" justify="center">
      <v-col cols="12">
        <div class="text-center">
          <v-progress-circular color="primary" :size="size" indeterminate/>
        </div>
      </v-col>
    </v-row>
    <v-row class="fill-height ma-0" v-show="!loading">
      <v-col class="pa-0" cols="12">
        <slot name="content"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    loading: Boolean,
    size: {
      type: String,
      required: false,
      default: '32'
    }
  }
}
</script>
