<template>
  <div class="fill-height" v-if="user.role === 'user'">
    <home-default title="Home" :items="[account]"/>
  </div>
  <div v-else class="display-1">O usuário não possui permissões para acessar telas</div>
</template>

<script>
import HomeDefault from '@/views/home/HomeDefault';
import {mapState} from 'vuex';
import {account} from '@/lib/menu';

export default {
  name: 'Home',
  components: {HomeDefault},
  data() {
    return {
      account: account()
    }
  },
  computed: {
    ...mapState({
      user: state => state.config.user
    })
  }
}
</script>
