import { serve } from "https://deno.land/std@0.58.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.58.0/http/file_server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch(e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}

for await (const req of server) {
  const path = `${Deno.cwd()}/public${req.url}`;
  if (await fileExists(path)) {
    const content = await serveFile(req, path);
    req.respond(content);
    continue;
  }


  if (req.url === '/') {
    req.respond({ body: "Home" });
  } else if (req.url === '/about') {
    req.respond({ body: "About" });
  } else {
    req.respond({status: 404})
  }
}