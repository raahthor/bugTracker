import { app } from "./app";
import { env } from "./utils/env";

const port = Number(env.PORT || 4000);

app.listen(port, "0.0.0.0", () => {
  env.NODE_ENV !== "production" && console.log("Server running on port:", port);
});
