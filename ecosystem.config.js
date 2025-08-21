module.exports = {
  apps: [
    {
      name: 'tracnghiem-web',
      script: './server.py',
      args: '8000',
      cwd: '/home/hikaru/tracnghiem',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      interpreter: 'python3'
    },
    {
      name: 'tracnghiem-json',
      script: './server.py',
      args: '8003',
      cwd: '/home/hikaru/tracnghiem',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8003
      },
      error_file: './logs/err-json.log',
      out_file: './logs/out-json.log',
      log_file: './logs/combined-json.log',
      time: true,
      interpreter: 'python3'
    }
  ]
};
