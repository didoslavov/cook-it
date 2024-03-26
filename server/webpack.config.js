const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts', // Entry point of your TypeScript server code
    target: 'node', // Specify the target environment as Node.js
    externals: [nodeExternals()], // Exclude node_modules from the bundle
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Name of the output bundle
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Apply the loader to all .ts files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'ts-loader', // Use ts-loader for transpiling TypeScript code
                },
            },
        ],
    },
};
