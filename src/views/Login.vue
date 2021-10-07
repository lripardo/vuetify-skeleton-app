<template>
  <v-card class="fill-height pl-3 pr-3" :disabled="loading" :loading="loading" flat>
    <v-container class="pa-0 fill-height" fluid>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" sm="10" md="7" lg="3">
          <v-stepper v-model="stepper" flat>
            <v-stepper-items>
              <v-stepper-content step="1">
                <login-step ref="authenticateStep" @ok="doAuthenticate" @change="changeStep(steps.register)"
                            text-ok="Entrar"
                            text-change="Criar conta">
                  <div slot="fields">
                    <v-text-field v-model="authenticate.email.value"
                                  autocomplete="email"
                                  ref="authenticateEmail"
                                  type="email"
                                  name="email"
                                  label="E-mail"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxEmailLength"
                                  @keyup.enter="$refs.authenticatePassword.focus()"
                                  :rules="rulesEmail"
                                  @input="authenticate.email.errors = []"
                                  @change="authenticate.email.value = authenticate.email.value.toLowerCase()"
                                  :error-messages="authenticate.email.errors"
                    />
                    <v-text-field v-model="authenticate.password.value"
                                  autocomplete="password"
                                  ref="authenticatePassword"
                                  name="password"
                                  :append-icon="authenticate.password.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="authenticate.password.visible ? 'text' : 'password'"
                                  label="Senha"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxPasswordLength"
                                  @keyup.enter="doAuthenticate"
                                  :rules="[rulePassword]"
                                  @input="authenticate.password.errors = []"
                                  @click:append="authenticate.password.visible = !authenticate.password.visible"
                                  :error-messages="authenticate.password.errors"
                    />
                  </div>
                </login-step>
              </v-stepper-content>

              <v-stepper-content step="2">
                <login-step ref="registerStep" @ok="doRegister" @change="changeStep(steps.authenticate)"
                            text-ok="Criar conta"
                            text-change="Fazer login">
                  <div slot="fields">
                    <v-text-field v-model="register.email.value"
                                  autocomplete="email"
                                  ref="registerEmail"
                                  type="email"
                                  name="email"
                                  label="E-mail"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxEmailLength"
                                  :rules="rulesEmail"
                                  @keyup.enter="$refs.registerName.focus()"
                                  @input="register.email.errors = []"
                                  @change="register.email.value = register.email.value.toLowerCase()"
                                  :error-messages="register.email.errors"
                    />
                    <v-text-field v-model="register.name.value"
                                  autocomplete="name"
                                  ref="registerName"
                                  name="name"
                                  label="Nome"
                                  outlined
                                  validate-on-blur
                                  @keyup.enter="$refs.registerPassword.focus()"
                                  :maxLength="maxNameUserLength"
                                  :rules="rulesName"
                                  @input="register.name.errors = []"
                                  @change="register.name.value = register.name.value.toUpperCase()"
                                  :error-messages="register.name.errors"
                    />
                    <v-text-field v-model="register.password.value"
                                  autocomplete="password"
                                  ref="registerPassword"
                                  :append-icon="register.password.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="register.password.visible ? 'text' : 'password'"
                                  label="Senha"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxPasswordLength"
                                  @keyup.enter="$refs.registerPasswordConfirm.focus()"
                                  :rules="[rulePassword]"
                                  @click:append="register.password.visible = !register.password.visible"
                                  @input="register.password.errors = []"
                                  :error-messages="register.password.errors"
                    />
                    <v-text-field v-model="register.passwordConfirm.value"
                                  autocomplete="password-confirm"
                                  ref="registerPasswordConfirm"
                                  :append-icon="register.passwordConfirm.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="register.passwordConfirm.visible ? 'text' : 'password'"
                                  label="Confirmar senha"
                                  outlined
                                  validate-on-blur
                                  :maxLength="maxPasswordLength"
                                  @keyup.enter="doRegister"
                                  :rules="[rulePassword, ruleConfirmPassword]"
                                  @click:append="register.passwordConfirm.visible = !register.passwordConfirm.visible"
                                  @input="register.passwordConfirm.errors = []"
                                  :error-messages="register.passwordConfirm.errors"
                    />
                  </div>
                </login-step>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {postLogin, postRegister} from '@/lib/backend/auth';
import {mapActions} from 'vuex';
import {validEmail} from '@/lib/validation/validation';
import {goToChangePassword, goToHome} from '@/lib/redirects';
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_USER_LENGTH,
  MAX_PASSWORD_LENGTH
} from '@/lib/validation/constants';
import LoginStep from '@/views/login/LoginStep';
import {INVALID_PASSWORD, NOT_EQUAL_PASSWORDS, rulePassword, TOO_MANY_ATTEMPTS} from '@/lib/validation/rules';

const FIELD_REQUIRED = 'Este campo é obrigatório';
const INVALID_EMAIL = 'E-mail inválido';
const NO_ACCOUNT_ASSOCIATED = 'Não há conta associada à este email';
const ALREADY_ACCOUNT_ASSOCIATED = 'Já existe uma conta associada à este email';
const ACCOUNT_CREATED_DO_LOGIN = 'Conta criada. Faça o login para continuar.';

export default {
  name: 'Login',
  components: {LoginStep},
  data() {
    return {
      steps: {
        authenticate: 1,
        register: 2
      },
      authenticate: {
        email: {
          value: '',
          errors: []
        },
        password: {
          value: '',
          visible: false,
          errors: []
        }
      },
      register: {
        email: {
          value: '',
          errors: []
        },
        name: {
          value: '',
          errors: []
        },
        password: {
          value: '',
          errors: [],
          visible: false
        },
        passwordConfirm: {
          value: '',
          errors: [],
          visible: false
        }
      },
      stepper: 1,
      loading: false,
      maxEmailLength: MAX_EMAIL_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
      maxNameUserLength: MAX_NAME_USER_LENGTH,
      rulePassword: rulePassword,
      rulesEmail: [e => typeof e === 'string' && validEmail(e) || INVALID_EMAIL],
      rulesName: [n => typeof n === 'string' && n.length > 0 && n.length <= MAX_NAME_USER_LENGTH || FIELD_REQUIRED]
    }
  },
  mounted() {
    this.delayedAuthenticateEmailFocus();
  },
  computed: {
    isDarkMode() {
      return this.$vuetify.theme.dark;
    }
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    ...mapActions('config', ['setConfig']),
    ruleConfirmPassword(v) {
      return typeof v === 'string' && this.register.password.value === v || NOT_EQUAL_PASSWORDS;
    },
    async doAuthenticate() {
      if (!this.$refs.authenticateStep.validate()) return;
      this.loading = true;
      const response = await postLogin({
        email: this.authenticate.email.value,
        password: this.authenticate.password.value,
        cookie: true
      });
      this.loading = false;
      if (!response) return;
      if (response.status === 200) {
        this.setConfig(response.data.config);
        if (response.data.config.user.has_to_change_password) {
          return goToChangePassword();
        }
        goToHome();
      } else if (response.status === 401) {
        this.authenticate.password.errors = [INVALID_PASSWORD];
        this.$refs.authenticatePassword.focus();
      } else if (response.status === 406) {
        this.authenticate.email.errors = [NO_ACCOUNT_ASSOCIATED];
        this.$refs.authenticateEmail.focus();
      } else if (response.status === 429) {
        this.showAlert({
          message: TOO_MANY_ATTEMPTS
        });
      } else {
        this.showAlert({
          message: response.message,
          timeout: -1
        })
      }
      this.authenticate.password.value = '';
    },
    changeStep(step) {
      this.clearFields();
      this.stepper = step;
    },
    async doRegister() {
      this.$refs.registerPasswordConfirm.blur();
      if (!this.$refs.registerStep.validate()) return;
      this.loading = true;
      const response = await postRegister({
        email: this.register.email.value,
        password: this.register.password.value,
        name: this.register.name.value
      });
      this.loading = false;
      if (!response) return;
      if (response.status === 200) {
        this.clearFields();
        this.changeStep(this.steps.authenticate);
        this.showAlert({
          message: ACCOUNT_CREATED_DO_LOGIN,
          color: this.isDarkMode ? '' : 'primary'
        });
      } else if (response.status === 400) {
        this.register.email.errors = [INVALID_EMAIL];
      } else if (response.status === 409) {
        this.register.email.errors = [ALREADY_ACCOUNT_ASSOCIATED];
      } else {
        this.showAlert({
          message: response.message
        });
      }
    },
    clearFields() {
      this.authenticate = {
        email: {
          value: '',
          errors: []
        },
        password: {
          value: '',
          visible: false,
          errors: []
        }
      };
      this.register = {
        email: {
          value: '',
          errors: []
        },
        name: {
          value: '',
          errors: []
        },
        password: {
          value: '',
          errors: [],
          visible: false
        },
        passwordConfirm: {
          value: '',
          errors: [],
          visible: false
        }
      };
      this.$refs.authenticateStep.resetValidation();
      this.$refs.registerStep.resetValidation();
    },
    delayedAuthenticateEmailFocus() {
      setTimeout(() => {
        this.$refs.authenticateEmail.focus();
      }, 100);
    },
    delayedRegisterEmailFocus() {
      setTimeout(() => {
        this.$refs.registerEmail.focus();
      }, 100);
    }
  },
  watch: {
    stepper(step) {
      if (step === this.steps.authenticate) {
        this.delayedAuthenticateEmailFocus();
      } else if (step === this.steps.register) {
        this.delayedRegisterEmailFocus();
      }
    }
  }
}
</script>
