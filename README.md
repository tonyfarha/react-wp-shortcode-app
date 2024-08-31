# React WP Shortcode App (wip)

React WP Shortcode App is an extended version of the [React WP Shortcode Boilerplate](https://github.com/tonyfarha/react-wp-shortcode-boilerplate) plugin. It enables easy integration and rendering of a React application within any post or page through a straightforward shortcode. Built on @wordpress/scripts, it offers a streamlined development and build workflow perfect for custom projects.

## Installation

### Prerequisites

Ensure you have `Node.js` and `npm` installed on your machine.

1. **Download the Plugin**: Download the ZIP file of this plugin and extract it to your WordPress plugin directory (`wp-content/plugins/react-wp-shortcode-app`).

2. **Install Dependencies**: Navigate to the plugin's root directory in a terminal and run `npm install` to install the required dependencies.

3. **Build for Production**: Run `npm run build` to compile and optimize your React app for production use.

4. **Activate the Plugin**: Navigate to the "Plugins" menu in your WordPress admin area. Find "React WP Shortcode App" in the list and click "Activate".

## Usage

To use the plugin, simply add the following shortcode to the content of any post or page where you want your React app to appear:

```shortcode
[react_wp_shortcode_app]
```

Or you can optionally specify an ID attribute for the root element of your React app and an app name attribute to load a specific React app:

```shortcode
[react_wp_shortcode_app id="my-react-app" app="Counter"]
```

By default, when no app name is specified, the plugin will load the `HelloWorld` component from the `src/Apps/HelloWorld/App.jsx` file.

## Development

### Prerequisites

Ensure you have `Node.js` and `npm` installed on your development machine.

### Getting Started

1. **Clone the Plugin**: Clone this repository into your WordPress plugin directory.

2. **Install Dependencies**: Navigate to the plugin's root directory in a terminal and run `npm install` to install the required dependencies.

3. **Start Development**: Run `npm start` to start the development server. This command watches for any changes in your `src` directory and automatically rebuilds your app.

4. **Build for Production**: Run `npm run build` to compile and optimize your React app for production use.

## Customization

You can customize the React app by editing the files in the `src` folder. After making changes, remember to run `npm run build` to compile your changes.

## Add Your Own Apps

To create a new React app, follow these steps:

1. Run the script below, replacing `[AppName]` with the desired name for your app:

```bash
npm run generate-app [AppName]
```

2. To load your newly created React app, use the following shortcode, replacing [AppName] with the name of your app:

```bash
[react_wp_shortcode_app app="[AppName]"]
```