<template>
  <div class="fill-height">
    <app-nav-bar title-bar="Alterar senha" :back-route="backRoute"/>

    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col cols="12" md="8" lg="6">
            <v-form ref="form">
              <v-card :loading="loading" :disabled="loading">
                <v-card-text>
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
                                      :counter="maxPasswordLength"
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
                                      :counter="maxPasswordLength"
                                      @keyup.enter="doNewPassword"
                                      :rules="[rulePassword]"
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
                                      :counter="maxPasswordLength"
                                      @keyup.enter="doChangePassword"
                                      :rules="[rulePassword]"
                                      @click:append="newPasswordConfirm.visible = !newPasswordConfirm.visible"
                                      @input="newPasswordConfirm.errors = []"
                                      :error-messages="newPasswordConfirm.errors"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" @click="doChangePassword">Alterar</v-btn>
                </v-card-actions>
              </v-card>
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
import {INVALID_PASSWORD, NOT_EQUAL_PASSWORDS, rulePassword, TOO_MANY_ATTEMPTS} from '@/lib/validation/rules';
import {mapActions, mapState} from 'vuex';
import {goToHome} from '@/lib/redirects';
import {putChangePassword} from '@/lib/backend/auth';

const NEW_PASSWORD_DIFF = 'A nova senha deve ser diferente da antiga senha';

export default {
  name: 'ChangePassword',
  components: {AppNavBar},
  data() {
    return {
      loading: false,
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
      rulePassword: rulePassword
    }
  },
  methods: {
    ...mapActions('config', ['setHasToChangePassword']),
    ...mapActions('alert', ['showAlert']),
    doPassword() {
      this.$refs.newPassword.focus();
    },
    doNewPassword() {
      this.$refs.newPasswordConfirm.focus();
    },
    finish(action) {
      if (action) {
        action();
      }
      this.loading = false;
    },
    clearErrors() {
      this.password.errors = [];
      this.newPassword.errors = [];
      this.newPasswordConfirm.errors = [];
    },
    async doChangePassword() {
      this.clearErrors();
      if (!this.$refs.form.validate()) {
        return this.finish();
      }
      if (this.password.value === this.newPassword.value) {
        return this.finish(() => {
          this.newPassword.errors = [NEW_PASSWORD_DIFF];
          this.$refs.newPassword.focus();
        });
      }
      if (this.newPassword.value !== this.newPasswordConfirm.value) {
        return this.finish(() => {
          this.newPasswordConfirm.errors = [NOT_EQUAL_PASSWORDS];
          this.$refs.newPasswordConfirm.focus();
        });
      }
      this.loading = true;
      const response = await putChangePassword({
        password: this.password.value,
        new_password: this.newPassword.value
      });
      if (!response) return this.finish();

      this.password.value = '';
      this.newPassword.value = '';
      this.newPasswordConfirm.value = '';

      if (response.status === 200) {
        return this.finish(() => {
          this.setHasToChangePassword(true);
          goToHome();
        })
      } else if (response.status === 401) {
        return this.finish(() => {
          this.password.errors = [INVALID_PASSWORD];
          this.$refs.password.focus();
        });
      } else if (response.status === 409) {
        return this.finish(() => {
          this.showAlert({message: TOO_MANY_ATTEMPTS});
        });
      } else {
        return this.finish(() => {
          this.showAlert({message: response.message});
        });
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.config.user
    }),
    backRoute() {
      return this.user.has_to_change_password ? null : goToHome
    }
  }
}
</script>
