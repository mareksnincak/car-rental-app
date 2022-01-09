module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@themes": "./src/themes",
            "@ctypes": "./src/types",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
