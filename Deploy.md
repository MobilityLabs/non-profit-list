# Use 1GB Ubuntu DO Droplet

# Log in as root
`ssh root@<the new ip>`

# Create swapfile
- `fallocate -l 1G /swapfile`
- `chmod 600 /swapfile`
- `mkswap /swapfile`
- `swapon /swapfile`

# Download and install node
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs
```

# Install yarn
`npm install -g yarn`

# Install pm2
`yarn global add pm2`

# Add app user
`useradd -m -s bash -G sudo <app name>`

# Edit sshd_config to use authorized_keys
nano /etc/ssh/sshd_config

# Add authorized_keys
Add public key we will access server with

# Verify you can connect to server with ssh
From your local machine
`ssh -v <app name>@<app domain or ip>`

# Add deploy key to Github
Generate a key for server and add to Github repo as deploy key

Connect to github with ssh to authorize host
`ssh git@github.com`

You should see a message from github with the repo and then get disconnected

# Install postgres
`sudo apt-get install postgresql postgresql-contrib`

## Create user
`adduser <app name>`

## Create db
`createdb <app name>`

## Add user to db
- `su <app name>`
- `psql`
- `grant all privileges on database <app name> to <app name>;`

# Install caddy server
[Gist with easy setup](https://gist.github.com/Jamesits/2a1e2677ddba31fae62d022ef8aa54dc)
