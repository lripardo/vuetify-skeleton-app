<template>
  <div class="fill-height">
    <app-nav-bar title-bar="Conta" action-menu :back-route="goToHome"/>

    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card>
              <v-container fluid>
                <v-row no-gutters>
                  <v-col class="item" cols="12">
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <span class="caption grey--text">INFORMAÇÕES ADICIONAIS</span>
                        </v-col>
                        <v-col cols="6">
                          <span class="heading">{{ user.name }}</span>
                        </v-col>
                        <v-col cols="3">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="12">
                    <v-divider/>
                  </v-col>
                  <v-col class="item" cols="12">
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <span class="caption grey--text">SENHA</span>
                        </v-col>
                        <v-col cols="6">
                          <span class="heading">••••••••</span>
                        </v-col>
                        <v-col cols="3">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AppNavBar from '@/components/AppNavBar';
import {mapState} from 'vuex';
import {goToHome} from '@/lib/redirects';

export default {
  name: 'Account',
  components: {AppNavBar},
  data() {
    return {
      goToHome: goToHome,
    }
  },
  computed: {
    ...mapState({
      user: state => state.config.user
    })
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
}
</style>
