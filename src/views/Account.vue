<template>
  <div class="fill-height">
    <app-nav-bar title-bar="Conta" action-menu :back-route="goToHome"/>

    <v-main>
      <v-card class="ma-3" flat outlined>
        <v-container>
          <v-row no-gutters>
            <v-col :key="i" v-for="(item, i) in items" cols="12">
              <v-container class="item" v-if="item" @click="item.action">
                <v-row>
                  <v-col cols="3">
                    <span class="caption grey--text">{{ item.title }}</span>
                  </v-col>
                  <v-col cols="6">
                    <span class="heading">{{ item.value }}</span>
                  </v-col>
                  <v-col cols="3">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider v-else/>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import AppNavBar from '@/components/AppNavBar';
import {mapState} from 'vuex';
import {goToChangePassword, goToHome} from '@/lib/redirects';

export default {
  name: 'Account',
  components: {AppNavBar},
  data() {
    return {
      goToHome: goToHome,
      goToChangePassword: goToChangePassword
    }
  },
  computed: {
    ...mapState({
      user: state => state.config.user
    }),
    items() {
      return [
        {
          title: 'NOME',
          value: this.user.name,
          action: () => {
          }
        },
        null,
        {
          title: 'SENHA',
          value: '••••••••',
          action: this.goToChangePassword
        }
      ]
    },
    isDarkMode() {
      return this.$vuetify.theme.dark;
    }
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
}
</style>
