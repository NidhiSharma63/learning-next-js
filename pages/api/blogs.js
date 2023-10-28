import * as fs from "fs";

const getAllBlog = (req, res) => {
  const allBlogData = [];
  const readFolder = new Promise((resolve, reject) => {
    fs.readdir("blogData", (err, data) => {
      if (err) {
        reject("An Error occured");
      } else {
        resolve(data);
      }
    });
  });
  readFolder
    .then((blogsData) => {
      const promises = blogsData.map((item) => {
        return new Promise((resolve, reject) => {
          fs.readFile(`blogData/${item}`, "utf8", function (err, data) {
            if (err) {
              reject({ error: "no blog found" });
            } else {
              allBlogData.push(JSON.parse(data));
              resolve();
            }
          });
        });
      });

      return Promise.all(promises);
    })
    .then(() => {
      res.status(200).json(allBlogData);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
export default getAllBlog;
