import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import pt from 'vuetify/es5/locale/pt';

Vue.use(Vuetify);

const dark = localStorage.getItem("dark");

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        dark: dark === 'true',
        themes: {
            light: {
                primary: '#40b7ab',
                secondary: '#3c7d9d'
            },
            dark: {
                primary: colors.shades.white,
                secondary: colors.grey.lighten5
            }
        }
    },
    lang: {
        locales: {pt},
        current: 'pt'
    }
});
