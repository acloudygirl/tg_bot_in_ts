module.exports = {
  apps: [
    {
      name: "my-bot",
      script: "./bot.js",
      cwd: __dirname,
      env: {
        BOT_TOKEN: process.env.BOT_TOKEN,
      },
    },
  ],
};
