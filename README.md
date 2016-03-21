# Node/Mongo/Express Example App

To install:

Clone this repository into your vagrant sites folder

```
git clone https://github.com/asethwright/mongodb-app-example.git
```

Install dependencies on your computer (NOT THE VAGRANT MACHINE)

```
cd /path/to/sites/mongodb-app-example
npm install
```

Log into your vagrant machine

```
vagrant ssh
```

Move to the shared folder and start the server

```
cd /vagrant/mongodb-app-example
node index.js
```

Navigate to http://localhost:8080/users/

