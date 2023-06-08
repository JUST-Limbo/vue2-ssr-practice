const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");

// 要判断一次路径存在?
const versionDocPath = path.resolve(__dirname, "../dist/public/version.json");

const lastBuildTimeStamp = new Date().toLocaleString();
const newVersionJSON = JSON.stringify({
    lastBuildTimeStamp,
    pkg: {
        dependencies: pkg.dependencies,
        devDependencies: pkg.devDependencies,
    },
});
try {
    fs.writeFileSync(versionDocPath, newVersionJSON, "utf8");
} catch (error) {
    console.log(error);
}
