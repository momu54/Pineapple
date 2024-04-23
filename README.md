# <center>Project Pineapple</center>

A browser extension to block gaming videos and shorts from spicific channel you set on Youtube

It's used to block my classmate who watch Youtube videos at school

## Features

-   Block shorts from spicific channel
-   Block all gaming video

## Build

1. Clone this repository
2. Select the package manager you like (For example, `pnpm`)
3. Install dependencies

    ```bash
    pnpm install
    ```

4. Build the extension

    ```bash
    pnpm build
    ```

5. Load the extension to your browser

    - Start in development mode

        ```bash
        pnpm start:firefox
        pnpm start:chrome
        pnpm start:edge
        ```

    - Build the extension

        - Firefox

            ```bash
            pnpm build:xpi
            ```

        - Chromium
            - Open your favorite browser and go to `chrome://extensions/`
            - Enable `Developer mode`
            - Click `Pack extension` and select dist folder
