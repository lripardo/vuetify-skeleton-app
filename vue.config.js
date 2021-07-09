const {gitDescribeSync} = require('git-describe');
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        disableHostCheck: true
    }
};
