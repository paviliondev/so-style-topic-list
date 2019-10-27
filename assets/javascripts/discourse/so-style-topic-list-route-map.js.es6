export default function() {
  this.route("so-style-topic-list", function() {
    this.route("actions", function() {
      this.route("show", { path: "/:id" });
    });
  });
};
