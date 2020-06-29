import { serve } from "https://deno.land/std@0.58.0/http/server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const req of server) {
  if (req.url === '/') {
    req.respond({ body: "Home" });
  } else if (req.url === '/about') {
    req.respond({ body: "About" });
  } else {
    req.respond({status: 404})
  }
}