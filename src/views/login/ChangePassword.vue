<template>
  <div class="fill-height">
    <app-nav-bar title-bar="Alterar senha" :back-route="backRoute"/>

    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="6" lg="5">
            <v-form ref="form">
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12">
                    <input style="display: none;" autocomplete="email" type="text" name="email"
                           :value="user.email"/>
                    <v-text-field v-model="password.value"
                                  ref="password"
                                  autocomplete="current-password"
                                  name="password"
                                  :append-icon="password.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="password.visible ? 'text' : 'password'"
                                  label="Senha"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxPasswordLength"
                                  @keyup.enter="doPassword"
                                  :rules="[rulePassword]"
                                  @click:append="password.visible = !password.visible"
                                  @input="password.errors = []"
                                  :error-messages="password.errors"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="newPassword.value"
                                  ref="newPassword"
                                  autocomplete="new-password"
                                  name="new-password"
                                  :append-icon="newPassword.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="newPassword.visible ? 'text' : 'password'"
                                  label="Nova senha"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxPasswordLength"
                                  @keyup.enter="doNewPassword"
                                  :rules="[rulePassword, rulePasswords]"
                                  @click:append="newPassword.visible = !newPassword.visible"
                                  @input="newPassword.errors = []"
                                  :error-messages="newPassword.errors"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="newPasswordConfirm.value"
                                  ref="newPasswordConfirm"
                                  autocomplete="new-password-confirm"
                                  name="new-password-confirm"
                                  :append-icon="newPasswordConfirm.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="newPasswordConfirm.visible ? 'text' : 'password'"
                                  label="Confirme a nova senha"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxPasswordLength"
                                  @keyup.enter="doChangePassword"
                                  :rules="[rulePassword, ruleConfirmPassword(newPassword)]"
                                  @click:append="newPasswordConfirm.visible = !newPasswordConfirm.visible"
                                  @input="newPasswordConfirm.errors = []"
                                  :error-messages="newPasswordConfirm.errors"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn :color="isDarkMode ? '' : 'primary'" @click="doChangePassword" rounded block>
                      Alterar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AppNavBar from '@/components/AppNavBar';
import {MAX_PASSWORD_LENGTH} from '@/lib/validation/constants';
import {
  INVALID_PASSWORD,
  ruleConfirmPassword,
  rulePassword,
  TOO_MANY_ATTEMPTS
} from '@/lib/validation/rules';
import {mapActions, mapState} from 'vuex';
import {goToAccount, goToLogin} from '@/lib/redirects';
import {putChangePassword} from '@/lib/backend/auth';

const NEW_PASSWORD_DIFF = 'A nova senha deve ser diferente da antiga senha';

export default {
  name: 'ChangePassword',
  components: {AppNavBar},
  data() {
    return {
      password: {
        value: '',
        visible: false,
        errors: []
      },
      newPassword: {
        value: '',
        visible: false,
        errors: []
      },
      newPasswordConfirm: {
        value: '',
        visible: false,
        errors: []
      },
      maxPasswordLength: MAX_PASSWORD_LENGTH,
      rulePassword: rulePassword,
      ruleConfirmPassword: ruleConfirmPassword,
      rulePasswords: p => typeof p === 'string' && this.password.value !== p || NEW_PASSWORD_DIFF
    }
  },
  mounted() {
    this.delayedPasswordFocus();
  },
  methods: {
    ...mapActions('config', ['setHasToChangePassword']),
    ...mapActions('alert', ['showAlert']),
    delayedPasswordFocus() {
      setTimeout(() => {
        this.$refs.password.focus();
      }, 100);
    },
    doPassword() {
      this.$refs.newPassword.focus();
    },
    doNewPassword() {
      this.$refs.newPasswordConfirm.focus();
    },
    clearErrors() {
      this.password.errors = [];
      this.newPassword.errors = [];
      this.newPasswordConfirm.errors = [];
    },
    clearFields() {
      this.password.value = '';
      this.newPassword.value = '';
      this.newPasswordConfirm.value = '';
    },
    async doChangePassword() {
      this.$refs.newPasswordConfirm.blur();
      this.clearErrors();
      if (!this.$refs.form.validate()) {
        return this.$refs.password.focus();
      }
      const response = await putChangePassword({
        password: this.password.value,
        new_password: this.newPassword.value
      });
      if (!response) return;
      this.clearFields();
      this.$refs.password.focus();

      if (response.status === 200) {
        this.setHasToChangePassword(true);
        goToLogin();
      } else if (response.status === 401) {
        this.password.errors = [INVALID_PASSWORD];
      } else if (response.status === 409) {
        this.showAlert({message: TOO_MANY_ATTEMPTS});
      } else {
        this.showAlert({message: response.message});
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.config.user
    }),
    backRoute() {
      return this.user.has_to_change_password ? null : goToAccount
    },
    isDarkMode() {
      return this.$vuetify.theme.dark;
    }
  }
}
</script>
