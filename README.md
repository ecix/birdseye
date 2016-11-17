
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


A startup script for `upstart` is available
under `etc/init/birdseye.conf`.


For systemwide deployment it is advised to add the contents
of the local `etc/` to your system's `/etc`
directory.

## Configuration

Edit your `/etc/birdseye/birdseye.conf` and add bird api servers:

    [bird.0]
    name = rs1.example.com (IPv4)
    api = http://rs1.example.com:29184/

    [bird.1]
    name = rs1.example.net (IPv6)
    api = http://rs1.example.com:29185/

You can edit uWSGI server settings in the same configuration file.


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


## Hacking

The client is a Single Page React Application.
All sources are available in `client/`. 

Install build tools as needed:

    npm install -g gulp


Create a fresh UI build with

    cd client/
    make client

This will install all dependencies and run `gulp`.

While working on the UI you might want to use `make watch`,
which will keep the `gulp watch` task up and running.


