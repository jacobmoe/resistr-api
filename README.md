## Data sources
- [Propublica](https://propublica.github.io/congress-api-docs/?shell#congress-api-documentation)
- [Sunlight foundation](https://sunlightfoundation.com/api/)
- [Sunlight labs districts (maybe replaced)](https://sunlightlabs.github.io/congress/districts.html)
- [Open States](https://blog.openstates.org/)


## Onboard `reistr-api`

```
#install postgres if not already installed
brew update 
brew upgrade node
npm install 
nvm install 7.8 #node 7 minimum requirement
nvm use 7.8
createuser -s postgres
psql -U postgres
create database patelc75 with owner = patelc75;
#reanme production.json.example to production.json
make db.create
make db.migrate
make db.seed 
make
```

## Onboard `reistr-ui`

nvm use 7.8
npm install
make