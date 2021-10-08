<template>
  <v-app v-show="show">
    <v-overlay :value="overlay" absolute z-index="6">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
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
    <template v-if="render">
      <error v-if="handlerError"/>
      <update v-else-if="handlerUpdate"/>
      <forbidden v-else-if="handlerForbidden"/>
      <router-view v-else/>
    </template>
  </v-app>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import {fetchInitialData} from '@/lib/backend/http';
import {goToHome, goToLogin, goToChangePassword} from '@/lib/redirects';
import Error from '@/views/handlers/Error';
import Update from '@/views/handlers/Update';
import Forbidden from '@/views/handlers/Forbidden';

export default {
  name: 'App',
  components: {Forbidden, Update, Error},
  data() {
    return {
      render: false,
      show: false
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
      confirmationText: state => state.confirmation.text,
      overlay: state => state.overlay.overlay
    }),
    ...mapGetters('handlers', {
      handlerError: 'handlerError',
      handlerUpdate: 'handlerUpdate',
      handlerForbidden: 'handlerForbidden'
    }),
  },
  methods: {
    ...mapActions('config', ['setConfig']),
    ...mapActions('alert', ['closeAlert', 'showAlert', 'setShowAlert']),
    ...mapActions('confirmation', ['closeConfirmation', 'setShowConfirmation', 'executeYesConfirmation']),
    ...mapActions('handlers', ['setHandlerError', 'setHandlerUpdate', 'setHandlerForbidden']),
    finish(finishAction) {
      if (finishAction) {
        finishAction();
      }
      this.render = true;
      this.$nextTick(() => {
        const animation = document.getElementById('logo-container');
        if (animation) {
          animation.remove();
        }
        this.show = true;
      });
    },
    async startApp() {
      const response = await fetchInitialData();
      if (response) {
        if (response.status === 200) {
          this.setConfig(response.data);
          if (response.data.user.has_to_change_password) {
            return this.finish(goToChangePassword);
          }
          if (this.$route.name === 'login') {
            return this.finish(goToHome);
          }
          if (this.$route.meta.roles.length && !this.$route.meta.roles.includes(response.data.user.role)) {
            return this.finish(this.setHandlerForbidden);
          }
        } else if (response.status === 401) {
          return this.finish(goToLogin);
        } else {
          return this.finish(this.setHandlerError);
        }
      }
      this.finish();
    }
  },
  mounted() {
    this.startApp();
  }
}
</script>
