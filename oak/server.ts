import {Application, Router} from 'https://deno.land/x/oak@v5.3.1/mod.ts'

const app = new Application();

const router = new Router();
router
  .get('/', (ctx) => {
    ctx.response.body = 'Home'
  })
  .get('/about', (ctx) => {
    ctx.response.body = 'About'
  })

app.use(router.routes());
app.use(router.allowedMethods())

app.addEventListener('listen', () => {
  console.log("Server started");
})

await app.listen({port: 8000})