#/bin/bash
echo "Changing directory to chitter"
cd /home/ec2-user/chitter
touch testfile.txt
echo "Hello, world" >> testfile.txt
cat testfile.txt

# Geting the nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm bash_completion
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install 12.14.1

# Installing mongodb
cd /etc/yum.repos.d
touch mongodb-org-4.0.repo
echo "[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc" >> mongodb-org-4.0.repo
yum install -y mongodb-org
systemctl start mongod
systemctl daemon-reload
systemctl status mongod
systemctl enable mongod

# Installing app dependencies
cd /home/ec2-user/chitter
npm install
npm i pm2@latest -g

# starts application
pm2 delete all
pm2 start npm --name "chitter" -- start