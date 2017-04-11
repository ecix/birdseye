# Birdseye - Your friendly bird looking glass

Birdseye is a frontend to the API exposed by 
services implementing Barry O'Donovan's
[birds-eye API design](https://github.com/inex/birds-eye-design/) to
[the BIRD routing daemon](http://bird.network.cz/):

 * INEX Birdseye API (https://github.com/inex/birdseye)
 * Birdwatcher (https://github.com/ecix/birdwatcher)


The project was started at the
[RIPE IXP Tools Hackathon](https://atlas.ripe.net/hackathon/ixp-tools/) 
just prior to [RIPE73](https://ripe73.ripe.net/) in Madrid, Spain.



## Installation

Clone the repository and initialize the virtualenv:

    git clone https://github.com/ecix/birdseye
    cd birdseye/

    ./bin/venv_init

Make sure you run the program in a place
to which user _nobody_ has at least read only access.

The **user** and **group** can be configured in the **[server]**
section of your config file.


A startup script for `upstart` is available
under `etc/init/birdseye.conf`.


For systemwide deployment it is advised to add the contents
of the local `etc/` to your system's `/etc`
directory.


### Debian / Ubuntu

You need to have `python`, `python-dev` and `gcc` installed for uwsgi to compile.


## Configuration

An example configuration can be found under
[etc/birdseye/birdseye.example.conf](https://github.com/ecix/birdseye/blob/master/etc/birdseye/birdseye.example.conf).

You can copy it to any of the following locations:

    etc/birdseye/birdseye.conf # local
    etc/birdseye/birdseye.local.conf # local as well
    /etc/birdseye/birdseye.conf # global


You will have to at least edit it to add bird API servers:

    [bird.0]
    name = rs1.example.com (IPv4)
    api = http://rs1.example.com:29184/

    [bird.1]
    name = rs1.example.net (IPv6)
    api = http://rs1.example.com:29185/

You can edit uWSGI server settings and any other section
in the same file.


## Running

Launch the server by running

    ./bin/start_uwsgi

This will automatically download the React based UI build, so you
don't have to install all dependencies for building the UI yourself.



## Deployment

We added a `Makefile` for packaging Birdseye as an RPM using [fpm](https://github.com/jordansissel/fpm).

If you have all tools available locally, you can just type:

    make rpm

If you want to build the package on a remote machine, just use

    make remote_rpm BUILD_SERVER=my-rpm-building-server.example.com

which will copy the dist to the remote server and executes fpm via ssh.


## Upgrading

If you installed birdseye by cloning the repository,
the server will fetch on startup a prebuilt version
of the client UI.

To upgrade to the latest version just do a

		git pull

and restart birdseye.

You may have to clear the cache in the browser afterwards.


## Hacking

The client is a Single Page React Application.
All sources are available in `client/`. 

Install build tools as needed:

    npm install -g gulp-cli


Create a fresh UI build with

    cd client/
    make client

This will install all dependencies and run `gulp`.

While working on the UI you might want to use `make watch`,
which will keep the `gulp watch` task up and running.



