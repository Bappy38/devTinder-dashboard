# Deploy to AWS EC2

- Signed in into AWS console
- Launched a new EC2 instance (Ubuntu)
- Choose an instance type
- Configure the security group to allow: SSH(Port 22), HTTP(Port 80), HTTPS(Port 443)
- Download the `.pem` key
- Connect to the EC2 instance. Open git bash terminal from the folder `.pem` key is located.

```

chmod 400 DevTinderKey.pem
ssh -i "DevTinderKey.pem" ubuntu@175.41.162.218

```

- EC2 Setup:
    - Installed exact node.js version using in my local machine.
    - Github Repository Clone:
        - Generate an SSH Key in EC2 using the command `ssh-keygen -t ed25519 -C "ec2@your-instance"`. In our case, `ssh-keygen -t ed25519 -C "ubuntu@DevTinder"` as our instance name is `DevTinder` and OS is `ubuntu`. Press enter to accept default file location (~/.ssh/id_ed25519). Enter a passphrase (optional)
        - Copy the public key using command `cat ~/.ssh/id_ed25519.pub`
        - Go to GitHub → Settings → SSH and GPG Keys
        - Click New SSH Key
        - Give it a name "DevTinder EC2 Key"
        - Paste the copied public key
        - Now, clone repository via SSH URL
    - Go to project root folder and install all project dependencies using the command `npm i`
    - Build/Bundles the project using the command `npm run build`
    - Update OS dependencies using the command `sudo apt update`
    - Install `nginx` using the command `sudo apt install nginx`. Because, we need an HTTP server to serve our build files to the client
    - Start `nginx` server using the command `sudo systemctl start nginx`
    - Run `nginx` server using the command `sudo systemctl enable nginx`
    - Copy build files to `nginx` root folder. Go to project root folder and give the command `sudo scp -r dist/* /var/www/html`
    - Enable port `:80` of your EC2 instance. To do this, go to security groups and add an inbound rule to make port `:80` publicly accessible
    - Now our frontend will also be served automatically after reboot as we are serving it from `nginx`
- Add a custom domain:
    - Go to `godaddy.com` and purchase a domain name
    - Go to `cloudflare` and setup DNS for your domain
    - Go to `godaddy.com` and change the `name-server` of your domain suggested by `cloudflare`
    - Wait for sometime till your name server are updated
    - Go to `DNS Records` section in `cloudflare`, map your EC2 public IP as `A TYPE` DNS Record
    
- Enable SSL (Use `Certbot` to generate a free SSL certificate):
    - Install `Certbot` using following command
    ```

    sudo apt update
    sudo apt install certbot python3-certbot-nginx -y


    ```
    - Request SSL Cert
    ```

    sudo certbot --nginx -d devtinder.solutions -d www.devtinder.solutions

    ```
    - `Certbot` will auto update your Nginx config and handle renewals
    - Verify it works
    ```

    sudo nginx -t
    sudo systemctl reload nginx


    ```

    - Now set Cloudflare SSL mode to Full (Strict). Also, make sure EC2 Security Group allows port 443 (HTTPS)
    - Also add following two DNS records in Cloudflare

    | Type | Name | Value       | Proxy      |
    | ---- | ---- | ----------- | ---------- |
    | A    | @    | your EC2 IP | ☁️ Proxied |
    | A    | www  | your EC2 IP | ☁️ Proxied |
