---
to: _templates/<%= name %>/<%= action || 'new' %>/template.ejs.t
---
---
to: app/<%= name %>.ts
---
const hello = ```
Hello!
This is your first hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
```

console.log(hello)


