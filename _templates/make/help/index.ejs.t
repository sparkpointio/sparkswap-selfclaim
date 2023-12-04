---
message: |

  yarn make:crud [name]
  - scaffolds generic CRUD needed libraries
  - Runs make:api, make:model, and make:controller

  yarn make:model[:only] [name]
  - Creates a model along with a factory and seeder
  - Inserts a new table [name] in schema.prisma
  - use make:model:only to create a model only

  yarn make:api [name]
  - Creates two api handler, 1) index for generic actions. 2) [id] for dealing with specific records

  yarn make:controller [name] [-o]
  - Creates a controller along with a request/validator library
  - use the -o option to create a controller only

  yarn make:request [name] [-c]
  - Creates a new request/validator library along with a controller if -c option is provided

  yarn make:table [name]
  - Inserts a new table [name] in schema.prisma

  yarn make:test [name]
  - Creates a test file under the jest directory

  yarn make:factory [name]
  - generate a model factory

  yarn make:seeder [name]
  - generate a database seeder
---
