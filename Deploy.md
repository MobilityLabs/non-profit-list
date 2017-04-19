Use 1GB DO Droplet

Log in as root

Enable gzip
nano /etc/nginx/nginx.conf

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs

Install yarn

Install pm2

Add app user

Add authorized_keys
Add public key we will access server with

Verify you can connect to server with ssh

Add reverse proxy
nano /etc/nginx/sites-available/default

Add deploy key
Generate a key for server and add to Github repo as deploy key

Connect to github with ssh to authorize host
ssh git@github.com

Edit sshd_config to use authorized_keys
nano /etc/ssh/sshd_config
