# Bears-Team-25
Voyage-4

CMS to organise chingu github wiki's.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Mongo
```
sudo apt-get install mongodb-org
```

### Installing

A step by step series of examples that tell you have to get a development env running

2. clone repo
`git clone https://github.com/chingu-voyage4/Bears-Team-25.git`

3. install packages:
```
cd frontend
npm install
cd ..
npm install
```

4. Populate db:
```
./scripts/seedDb.js
./scripts/seedPmrok.js
```

4. npm run dev


## Running the tests

`npm run test`
or
`yarn test`

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

`npm run lint`
or
`yarn lint`

## Deployment

### heroku


Create a new mongodb on mLab and clone project.

```
git clone https://github.com/nikrb/auth-redux-react-base.git
cd auth-redux-react-base/
heroku create
git push heroku master
```

After creating the heroku app (```heroku create```) setup the environment using
the heroku dashboard. Don't set PORT.

`heroku create` creates a random name for the heroku app, so it's better to use
heroku dashboard to create the app, then set the git remote manually, in place
of the heroku create above.
```
git remote rm heroku
heroku git:remote -a newname
```


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **gnnsampaio**
* **jenovs**
* **keith1111**
* **nik** - [nikrb](https://github.com/nikrb)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
