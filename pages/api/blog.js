import * as fs from "fs";

const getOneBlog = (req, res) => {
  console.log(`blogData/${req.query.slug.trim()}.json`, "This is query");
  fs.readFile(`blogData/${req.query.slug.trim().replace(/\s+/g, "-")}.json`, "utf8", function (err, data) {
    if (err) {
      return res.status(500).json({ error: "no blog found" });
    }
    return res.status(200).json(JSON.parse(data));
  });
};
export default getOneBlog;
