# Study Buddy Chrome Extension

Project for the [Google Chrome Built-in AI Challenge Hackathon](https://googlechromeai.devpost.com/).

## 🏗️ Development

Install the dependencies:

    ```sh
    npm install
    ```

To start the development server:

```sh
npm run dev
```

This will start the Vite development server and open your default browser.

## 📦 Build

To create a production build:

```sh
npm run build
```

This will generate the build files in the `build` directory.

## 📂 Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" using the toggle switch in the top right corner.
3. Click "Load unpacked" and select the `build` directory.

Your React app should now be loaded as a Chrome extension!

## 🗂️ Project Structure

-   `public/`: Contains static files and the `manifest.json`.
-   `src/`: Contains the React app source code.
-   `vite.config.ts`: Vite configuration file.
-   `tsconfig.json`: TypeScript configuration file.
-   `package.json`: Contains the project dependencies and scripts.

## License

This project is licensed under the MIT License.
