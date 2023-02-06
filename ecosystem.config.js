module.exports = {
  apps: [{
    name: "app",
    script: "server/index.js",
    instances: "max",
    autorestart: true,
    watch: true,
    time: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}