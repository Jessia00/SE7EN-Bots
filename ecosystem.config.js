module.exports = {
  apps: [
    {
      name: "Mainframe",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Voucher"
    },
    {
      name: "Requirements",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Requirements"
    },
    {
      name: "Statistics",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Statistics"
    },
    {
      name: "Security_I",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_I"
    },
    {
      name: "Security_II",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_II"
    },
    {
      name: "Security_III",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_III"
    },
    {
      name: "Security_IV",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Guard_IV"
    },
    {
      name: "Distributors",
      namespace: "SEHIRA",
      script: 'main.sehira',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Server/Distributors"
    },
  ]
};