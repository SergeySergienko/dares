import { initializeApp } from './app';

const PORT = process.env.PORT || 5000;

initializeApp().then((app) => {
  app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', `[OK] App is running on ${PORT} port...`);
    console.log('--------------------------------------------');
  });
});
