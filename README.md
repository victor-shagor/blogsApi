# Blog

## Technologies Used

- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [mongodb](https://www.mongodb.com/)


## Getting Started

---

### Installing/Run locally

- Make sure you have `nodejs` installed.

  ```bash

    - yarn install

    - Create/configure `.env` environment with the following credentials
      MONGODB_URI
    - Run `npm run start-dev` to start the server development
  ```

### Testing

- To test or consume the API locally, you can make use of [_Postman_](https://www.getpostman.com) to simulate a front-end client.
- You can also test by running `npm test`.

## HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a data
- `GET` Get a data or data

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `OK` created successfully
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `500` `Internal serval error` There was a problem with the network or database
