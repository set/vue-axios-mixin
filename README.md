# vue-axios-mixin
Axios mixin for auth required requests

This mixin configured for rules of Laravel/Passport.

### Installation

```
// main.js
import requests from './mixins/requests';
Vue.mixin(requests);
```

### Example Usage
```
this.post('users', request).then(response => {
  this.success( response.data.message );
}).catch(error => {
  if( error.message )
    this.error( error.message );
});
```

`this.success` and `this.error` are my notification mixins. Please configure it for your architecture.
