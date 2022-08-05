const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const getAll = dir => {
    // Read files at _posts/{directory}
    const directory = path.join(process.cwd(), `../content/${dir}`);
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

const allPosts = getAll("blog");

const postFileContents = `${allPosts}`;

// Create the cache folder if it doesn't exist
try {
    fs.readdirSync("../public/parsed");
} catch (e) {
    fs.mkdirSync("../public/parsed");
}

// Create our cached posts JSON
fs.writeFile("../public/parsed/posts.json", postFileContents, err => {
    if (err) return console.log(err);
    console.log("Posts cached.");
});