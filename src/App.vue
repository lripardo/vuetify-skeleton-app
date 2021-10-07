<template>
  <v-app>
    <v-dialog v-model="confirmationShow"
              persistent
              style="z-index: 1000"
              max-width="290">
      <v-card>
        <v-card-title class="title">{{ confirmationTitle }}</v-card-title>
        <v-card-text>{{ confirmationText }}</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" x-small text @click="closeConfirmation">Não</v-btn>
          <v-btn color="primary" x-small text @click="executeYesConfirmation">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="alertShow"
                bottom
                right
                vertical
                :timeout="alertTimeout"
                :color="alertColor">
      {{ alertMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" dark text @click="closeAlert">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <router-view v-if="render"/>
  </v-app>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {fetchInitialData} from '@/lib/backend/http';
import {goToHome, goToLogin, goToChangePassword, goToError, goToForbidden} from '@/lib/redirects';

export default {
  name: 'App',
  data() {
    return {
      render: false
    }
  },
  computed: {
    alertShow: {
      get() {
        return this.alertShowState;
      },
      set(value) {
        this.setShowAlert(value);
      }
    },
    confirmationShow: {
      get() {
        return this.confirmationShowState;
      },
      set(value) {
        this.setShowConfirmation(value);
      }
    },
    ...mapState({
      alertShowState: state => state.alert.show,
      alertMessage: state => state.alert.message,
      alertTimeout: state => state.alert.timeout,
      alertColor: state => state.alert.color,
      confirmationShowState: state => state.confirmation.show,
      confirmationTitle: state => state.confirmation.title,
      confirmationText: state => state.confirmation.text
    })
  },
  methods: {
    ...mapActions('config', ['setConfig']),
    ...mapActions('alert', ['closeAlert', 'showAlert', 'setShowAlert']),
    ...mapActions('confirmation', ['closeConfirmation', 'setShowConfirmation', 'executeYesConfirmation']),
    finish(finishAction) {
      if (finishAction) {
        finishAction();
      }
      this.render = true;
    },
    async startApp() {
      console.log(this.$route)
      const response = await fetchInitialData();
      if (!response) return this.finish(goToError);
      if (response.status === 200) {
        this.setConfig(response.data);
        if (response.data.user.has_to_change_password) {
          return this.finish(goToChangePassword);
        }
        if (this.$route.name === 'login') {
          return this.finish(goToHome);
        }
        if (this.$route.meta.roles.length && !this.$route.meta.roles.includes(response.data.user.role)) {
          return this.finish(goToForbidden);
        }
      } else if (response.status === 401) {
        if (!this.$route.meta.all) {
          return this.finish(goToLogin);
        }
      } else {
        return this.finish(goToError);
      }
      this.finish();
    }
  },
  mounted() {
    this.startApp();
  }
}
</script>
