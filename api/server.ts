import { app, server } from './app';

app.set('PORT', process.env.PORT || 5000);

const PORT = app.get('PORT');

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
