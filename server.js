var app = require('./index');

app.listen(8080, function (error) {
  if (error) {
    log.error('Unable to listen for connections', error);
    process.exit(10);
  }
});
