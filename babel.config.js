module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "inline-dotenv",
      [
        'module-resolver',
        {
          alias: {
            "@api": "./src/api",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@stacks": "./src/stacks",
            "@themes": "./src/themes",
            "@ctypes": "./src/types",
            "@utils": "./src/utils",
          },
        },
      ]
    ],
  };
};
