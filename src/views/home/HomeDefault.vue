<template>
  <div class="fill-height">
    <app-nav-bar :title-bar="title" action-menu/>

    <v-main class="fill-height">
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12">
            <div class="pt-5 pb-3 headline text-center">
              {{ `OLÁ, ${user.name}` }}
              <div class="caption">{{ `versão ${git}` }}</div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col :key="i" v-for="(item, i) in items" cols="12" sm="6" md="6" lg="4">
            <v-card class="fill-height" flat outlined>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="6">
                      {{ item.text }}
                    </v-col>
                    <v-col class="text-center" cols="6">
                      <v-avatar size="100" tile>
                        <img alt="project icon" :src="require(`../../assets/menu/start/${item.img}`)"/>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider/>
              <v-card-actions>
                <v-btn color="primary" large text @click="item.click">
                  {{ item.button }}
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
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

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  name: 'HomeDefault',
  components: {AppNavBar},
  computed: {
    ...mapState({
      user: state => state.config.user
    })
  }
}
</script>
