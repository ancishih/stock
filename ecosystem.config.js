module.exports = {
  apps: [
    {
      name: 'stock',
      script: 'server.js',
      instances: 1,
      // exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '250M',
      env_production: {
        APP_ENV: 'production',
      },
    },
  ],
}
