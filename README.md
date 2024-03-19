# White Board API

## REST API

Run `npx http-server` and visit localhost:8080 to view the specification.

## Loader

Run `npm run build` to build the loader module. The output is in the `./dist` folder. Look at the usage example in the `./example` folder.

## JWT Keys

To generate a key pair for ECDSA using the `ES256` algorithm, you can use OpenSSL or a similar tool.

1. Generate a private key:

```bash
openssl ecparam -genkey -name prime256v1 -noout -out private_key.pem
```

2. Extract the corresponding public key from it:

```bash
openssl ec -in private_key.pem -pubout -out public_key.pem
```

Now you have two files: `private_key.pem` contains the private key, and `public_key.pem` contains the corresponding public key. They can be used for signing and verifying JWTs, respectively.
