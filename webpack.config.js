var path = require('path')

module.exports = {
    mode: "development",
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true,
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader: "babel-loader",
                query: {
                        presets: ["react", "es2015", "stage-1"]
                }
            }
        ]
    }
}


