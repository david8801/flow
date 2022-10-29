const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const yaml = require('js-yaml');

const getAll = dir => {
    // Read files at _posts/{directory}
    const directory = path.join(process.cwd(), `./content/${dir}`);
    const fileNames = fs.readdirSync(directory);
    // Get the content of the files as JSON
    const content = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        return {
            slug,
            ...matterResult
        };
    });
    // Return a big array of JSON
    return JSON.stringify(content);
};

const getFile = (dir) => {
  const inputYML = `./content/${dir}.yml`;
  const outputJSON = `./public/parsed/${dir}.json`;
  const obj = yaml.load(fs.readFileSync(inputYML, {encoding: 'utf-8'}));

//this code if you want to save file locally
  fs.writeFileSync(outputJSON, JSON.stringify(obj, null, 2));

}

const allPosts = getAll("blog");
const allCategories = getAll("categories");

const postFileContents = `${allPosts}`;
const categoriesFileContents = `${allCategories}`;

// Create the cache folder if it doesn't exist
try {
    fs.readdirSync("./public/parsed");
} catch (e) {
    fs.mkdirSync("./public/parsed");
}

getFile("running_line")

// Create our cached posts JSON
fs.writeFile("./public/parsed/posts.json", postFileContents, err => {
    if (err) return console.log(err);
    console.log("Posts cached.");
});

fs.writeFile("./public/parsed/categories.json", categoriesFileContents, err => {
    if (err) return console.log(err);
    console.log("Categories cached.");
});
