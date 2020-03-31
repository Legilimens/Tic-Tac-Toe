const config = require('config');
const app = require('./server');

const port = config.get('port');

app.listen(port, () => console.log(`App listening on port ${port}!`));
