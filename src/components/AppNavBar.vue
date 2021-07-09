<template>
  <div>
    <v-navigation-drawer v-if="mainMenu" v-model="drawer" width="350" app temporary>
      <v-list dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../assets/logo.png" alt="logo"/>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle>
              {{ user.name }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ `VERSÃO ${version} ${git}` }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-divider/>
        <template v-for="(item, i) in mainMenuItems">
          <v-divider :key="i" v-if="!item"/>
          <v-list-item :key="i" v-else @click="closeDrawerOnClick(item.click)">
            <v-list-item-action>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :color="$vuetify.theme.dark ? '' : 'primary'" app dark>
      <v-app-bar-nav-icon v-if="backRoute" @click="backClick">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon v-else-if="mainMenu" @click.stop="drawer = !drawer"/>
      <v-toolbar-title>{{ titleBar }}
        <slot name="append-title-icon"></slot>
      </v-toolbar-title>
      <div v-if="actionMenu" class="flex-grow-1"/>
      <v-menu v-if="actionMenu" transition="slide-x-transition" :min-width="150" bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in actionMenuItems" :key="i" @click="item.click">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {version} from '../../package';
import {goToLogout} from '@/lib/redirects';

const LOGOUT = 'Sair';

export default {
  name: 'AppNavBar',
  props: {
    mainMenu: {
      type: Boolean,
      required: false,
      default: false
    },
    titleBar: {
      type: String,
      required: false,
      default: ''
    },
    actionMenu: {
      type: Boolean,
      required: false,
      default: false
    },
    backRoute: {
      type: Function,
      required: false,
      default: null
    },
    mainMenuItems: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      drawer: null,
      version: version,
      actionMenuItems: [{
        title: LOGOUT,
        click: this.logout
      }]
    }
  },
  methods: {
    ...mapActions('alert', ['showAlert']),
    logout() {
      goToLogout();
    },
    closeDrawerOnClick(click) {
      this.drawer = false;
      click();
    },
    backClick() {
      this.backRoute();
    }
  },
  computed: {
    ...mapState({
      user: state => state.config.user
    }),
    git() {
      return process.env.VUE_APP_GIT_HASH || 'Dev';
    }
  }
}
</script>
