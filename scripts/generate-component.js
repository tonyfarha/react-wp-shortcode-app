const fs = require('fs');
const prettier = require('prettier');

(async () => {

    try {

        const componentName = process.argv[2];

        if (!componentName) {
            console.error('\n======================================\n|| Please provide a component name. ||\n======================================\n');
            process.exit(1);
        }

        if (!/^[A-Za-z]/.test(componentName) || !/^[A-Za-z0-9]+$/.test(componentName)) {
            console.error('\n============================================\n|| Please provide a valid component name. ||\n============================================\n');
            process.exit(1);
        }

        const appsDir = './src/Apps/';

        if (fs.existsSync(`${appsDir}${componentName}`)) {
            console.error(`\n===============================\n|| Component already exists. ||\n===============================\n`);
            process.exit(1);
        }

        fs.mkdirSync(`${appsDir}${componentName}`, { recursive: true });

        fs.writeFileSync(`${appsDir}${componentName}/index.js`, `export { App as ${componentName} } from './App';`, 'utf8');

        fs.writeFileSync(`${appsDir}${componentName}/App.jsx`, `import './style.scss';\n\nexport const App = () => {\n  return <div id="${componentName}-app">${componentName} works!</div>;\n}`, 'utf8');

        fs.writeFileSync(`${appsDir}${componentName}/style.scss`, `#${componentName}-app {\n // Add your styles here \n}`, 'utf8');

        const indexJSXPath = './src/index.jsx';

        let data = fs.readFileSync(indexJSXPath, 'utf8');

        data = data.replace(
            /import\s+\{[^}]+\}\s+from\s+'\.\/Apps';/,
            (match) => match.replace('}', `, ${componentName} }`)
        );

        data = data.replace(
            /const\s+apps\s*=\s*\{[^}]+\};/,
            (match) => match.replace('};', `, ${componentName} };`)
        );

        const formattedData = await prettier.format(data, {
            parser: 'babel',
            singleQuote: true,
            trailingComma: 'none',
        });

        fs.writeFileSync(indexJSXPath, formattedData, 'utf8');

        fs.appendFileSync(`${appsDir}index.js`, `export * from './${componentName}';\n`, 'utf8');

        console.log(`\n=====================================\n|| Component created successfully! ||\n=====================================\n`);

    } catch (err) {

        console.error(err);

    }

})();
