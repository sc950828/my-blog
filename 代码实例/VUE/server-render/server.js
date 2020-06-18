const Vue = require("vue");
const Server = require("express")();
const Renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./index.template.html", "utf-8")
});

Server.get("/server", (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>您访问的url是{{url}}</div>`
  });

  const options = {
    title: "vue server render",
    meta: "<meta charset='utf-8'/>"
  };

  Renderer.renderToString(app, options)
    .then(html => {
      res.end(html);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end("server error");
    });
});

Server.listen(8000, () => {
  console.log("server is running");
});
