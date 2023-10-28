import * as fs from "fs";

const getOneBlog = (req, res) => {
  fs.readFile(`blogData/${req.query.slug.trim()}.json`, "utf8", function (err, data) {
    if (err) {
      return res.status(500).json({ error: "no blog found" });
    }
    return res.status(200).json(JSON.parse(data));
  });
};
export default getOneBlog;
