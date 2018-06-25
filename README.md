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

3. create dotenv file `cp sample.env .env`

4. seed db `npm run seed`

4. npm run dev


## Running the tests

create .env.test file `cp sample.env .env.test`

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


Create a new mongodb on mLab, clone project and push to heroku.

```
git clone https://github.com/chingu-voyage4/Bears-Team-25.git
cd Bears-Team-25
heroku create <YOUR-APP-NAME>
setup heroku environment using dashboard. Don't set PORT.
git push heroku master
```


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **gnnsampaio** [Giovanni Sampaio](https://github.com/giovannisampaio)
* **jenovs** [Viktors Jenovs](https://github.com/jenovs)
* **keith1111** [Keith Martens](https://github.com/keith1111)
* **nik** - [nikrb](https://github.com/nikrb)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
