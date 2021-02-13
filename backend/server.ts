import { app } from './app'

app.set("PORT", process.env.PORT || 5000)

const PORT = app.get("PORT")

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`)
})