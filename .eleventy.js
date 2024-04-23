const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: {
            safari10: false,
            ecma: undefined,
            output: { comments: false },
          },
        });
        return minified;
      }

      return content;
    });
  }

  return {
    dir: {
      input: "src-11ty",
      output: "dist",
    },
  };
};
