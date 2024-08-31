const fs = require('fs');
const prettier = require('prettier');

(async () => {

    try {

        const appName = process.argv[2];

        if (!appName) {
            console.error('\n==============================\n|| Please provide app name. ||\n==============================\n');
            process.exit(1);
        }

        if (!/^[A-Za-z]/.test(appName) || !/^[A-Za-z0-9]+$/.test(appName)) {
            console.error('\n======================================\n|| Please provide a valid app name. ||\n======================================\n');
            process.exit(1);
        }

        const appsDir = './src/Apps/';

        if (fs.existsSync(`${appsDir}${appName}`)) {
            console.error(`\n=========================\n|| App already exists. ||\n=========================\n`);
            process.exit(1);
        }

        fs.mkdirSync(`${appsDir}${appName}`, { recursive: true });

        fs.writeFileSync(`${appsDir}${appName}/index.js`, `export { App as ${appName} } from './App';`, 'utf8');

        fs.writeFileSync(`${appsDir}${appName}/App.jsx`, `import { Text } from './components';\nimport './style.scss';\n\nexport const App = () => {\n  return <div id="${appName}-app"><Text content="${appName} works!" /></div>;\n}`, 'utf8');

        fs.writeFileSync(`${appsDir}${appName}/style.scss`, `#${appName}-app {\n // Add your styles here \n}`, 'utf8');

        const componentsDir = `${appsDir}${appName}/components/`;

        fs.mkdirSync(componentsDir, { recursive: true });

        fs.writeFileSync(`${componentsDir}Text.jsx`, `export const Text = ({ content }) => {\n  return <>{content}</>;\n}`, 'utf8');

        fs.writeFileSync(`${componentsDir}index.js`, `export * from './Text';`, 'utf8');

        const indexJSXPath = './src/index.jsx';

        let data = fs.readFileSync(indexJSXPath, 'utf8');

        data = data.replace(
            /import\s+\{[^}]+\}\s+from\s+'\.\/Apps';/,
            (match) => match.replace('}', `, ${appName} }`)
        );

        data = data.replace(
            /const\s+apps\s*=\s*\{[^}]+\};/,
            (match) => match.replace('};', `, ${appName} };`)
        );

        const formattedData = await prettier.format(data, {
            parser: 'babel',
            singleQuote: true,
            trailingComma: 'none',
        });

        fs.writeFileSync(indexJSXPath, formattedData, 'utf8');

        fs.appendFileSync(`${appsDir}index.js`, `export * from './${appName}';\n`, 'utf8');

        console.log(`\n===============================\n|| App created successfully! ||\n===============================\n`);

    } catch (err) {

        console.error(err);

    }

})();
