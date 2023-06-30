# Cloudflare DDNS

## What is this?

This is a easy-to-use Docker image to automatically update your Cloudflare DNS configuration whenever your servers public IP changes.

## How do I use it?

### 1. Create a Cloudflare API token

When you have signed in to your Cloudflare dashboard, click on the account menu in the top right corner and select "My Profile". Then click on the "API Tokens" tab. Create a new custom token. Give it a name and select **Zone** - **DNS** - **Edit** under **Permissions**.

Under **Zone Resources** you can either choose **Include** **All zones** to give the token access to all your zones _(domains)_, or **Include** **Specific zone** and select the zone _(domain)_ you want to update.

Since this token will be used to update your DNS records when your public IP changes it is recommended to not add any **Client IP Address Filtering** since your public IP will change. **If** you do know your ISPs public IP range you can add it here to increase security, but this could also prevent the script from updating your DNS records if your public IP changes to a different range.

### 2. Run the Docker image

The Docker image can be run with the following command:

```sh
docker run -v /local/data/path:/app/data -e CLOUDFLARE_API_KEY=some_key -e DATA_DIR=./data -p 1470:1470 eloquentiastudios/cloudflare-ddns:latest
```

or with docker-compose (**recommended**):

```yaml
services:
  cloudflare-ddns:
    image: eloquentiastudios/cloudflare-ddns:latest
    restart: always
    ports:
      - 1470:1470
    volumes:
      - /local/data/directory:/app/data
    environment:
      - CLOUDFLARE_API_KEY=some_key
      - DATA_DIR=./data
```

then run `docker-compose up -d`

### 3. Configure your DNS records

Open the Web UI of the Docker image (default port is 1470) and configure your DNS records.

### 4. Profit!

Your DNS records will now be updated whenever your public IP changes!
