const path = require('path');

module.exports = {
  entry: './src/index.js', // Archivo de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida para los archivos generados
    filename: 'bundle.js', // Nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aplicar la siguiente regla a los archivos JavaScript
        exclude: /node_modules/, // Excluir la carpeta "node_modules"
        use: {
          loader: 'babel-loader', // Utilizar Babel para transpilar el código
          options: {
            presets: ['@babel/preset-env'], // Presets de Babel a utilizar
          },
        },
      },
    ],
  },
};
