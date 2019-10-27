import { acceptance } from "helpers/qunit-helpers";

acceptance("so-style-topic-list", { loggedIn: true });

test("so-style-topic-list works", async assert => {
  await visit("/admin/plugins/so-style-topic-list");

  assert.ok(false, "it shows the so-style-topic-list button");
});
