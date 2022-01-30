# Car rental APP
Cross platform mobile app for renting a car. Connects to [Car rental API](https://github.com/mareksnincak/car-rental-api). This project serves as part of the research where participants were asked to code part of car rental company system (search and car booking) based on provided system specification.

## How to run

### Prerequisites
- [Expo](https://docs.expo.dev/get-started/installation/) and it's dependencies
- [OPTIONAL] [Yarn](https://classic.yarnpkg.com/lang/en/docs/install). Alternatively you can use npm

### Running the app

1. Create config:
    ```bash
    cp .env.example .env
    vi .env
    # Set API_URL to address where Car rental API is running
    ```

1. Install dependencies:
    ```bash
    yarn
    ```
    
1. Run:
    ```bash
    yarn start
    ```
