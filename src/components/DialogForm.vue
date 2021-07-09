<template>
  <v-dialog v-model="dialog" :max-width="maxWidth" persistent>
    <v-card :loading="dialogLoading" :disabled="dialogLoading">
      <v-card-title>
        <span class="headline">{{ dialogLabel }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <slot name="fields"/>
          <!-- Prevent form submit on Chrome -->
          <label>
            <input type="text" style="display: none"/>
          </label>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <slot name="btn"></slot>
        <v-spacer/>
        <v-btn v-show="!onlyOk" color="primary" text @click="emitCancel">Cancelar</v-btn>
        <v-btn color="primary" text @click="emitOk">Concluído</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogForm',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    dialogLabel: {
      type: String,
      required: false,
      default: ''
    },
    dialogLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    onlyOk: {
      type: Boolean,
      required: false,
      default: false
    },
    maxWidth: {
      type: String,
      required: false,
      default: '500'
    }
  },
  methods: {
    emitCancel() {
      this.$refs.form.resetValidation();
      this.$emit('input', false);
    },
    emitOk() {
      if (this.$refs.form.validate()) {
        this.$refs.form.resetValidation();
        this.$emit('ok');
      }
    }
  },
  computed: {
    dialog: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit('input', value);
      }
    }
  }
}
</script>
