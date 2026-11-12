// Starts a local embedded Postgres on :54329 (no Docker needed). Data lives in .pgdata/
import EmbeddedPostgres from "embedded-postgres";
import fs from "node:fs";

const dir = ".pgdata";
const fresh = !fs.existsSync(dir);
const pg = new EmbeddedPostgres({ databaseDir: dir, user: "postgres", password: "postgres", port: 54329, persistent: true });

if (fresh) await pg.initialise();
await pg.start();
if (fresh) await pg.createDatabase("altivox");
console.log("Local Postgres ready on postgresql://postgres:postgres@localhost:54329/altivox");
process.on("SIGINT", async () => { await pg.stop(); process.exit(0); });
process.on("SIGTERM", async () => { await pg.stop(); process.exit(0); });
setInterval(() => {}, 1 << 30);
