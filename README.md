# Node/Mongo/Express CMS Project

Follow these steps to install and run this project.

Clone this repository into your vagrant sites folder using the following
command:

    $ git clone https://github.com/cgharford/?

Install dependencies on your computer (NOT THE VAGRANT MACHINE):

    $ cd /path/to/sites/mongodb-app-example
    $ npm install

Log into your vagrant machine:

    $ vagrant ssh

Move to the shared folder and start the server using these commands:

    $ cd /vagrant/project-2
    $ node index.js

Navigate to http://localhost:3000/users/. Enjoy!
