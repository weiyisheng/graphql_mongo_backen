require("babel-register")({
  // Ignore everything in node_modules except node_modules/graphql-mongoose.
  ignore: /node_modules\/(?!graphql-orm-mongoose)/
});
require("babel-polyfill");
require('./app')
