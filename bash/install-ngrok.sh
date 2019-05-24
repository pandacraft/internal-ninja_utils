#!/usr/bin/env bash

echo "Create ngrok dir configuration"
mkdir -p $HOME/.ngrok2

HOMEBREW_NO_AUTO_UPDATE=1 brew install ngrok

cat <<EOF > $HOME/.ngrok2/ngrok.yml
authtoken: ngrok_token
#log_level: info
#log_format: json
#log: /var/log/ngrok.log
region: eu
tunnels:
  pandacraft:
    addr: 443
    proto: http
    subdomain: pandacraft
    inspect: true
EOF
