#!/bin/bash

# To run it locally (on mac), use:
# export PATH=$PATH:$PWD/build/selenium-server ; export CHROMEDRIVER_FILE="chromedriver_mac64.zip" ; ./run-selenium.sh

if [ -z "$SELENIUM_MAJOR_VERSION" ]; then
	export SELENIUM_MAJOR_VERSION=3.12
fi

if [ -z "$SELENIUM_VERSION" ]; then
	export SELENIUM_VERSION=3.12.0
fi

if [ -z "$CHROMEDRIVER_VERSION" ]; then
	export CHROMEDRIVER_VERSION=2.38
fi

if [ -z "$CHROMEDRIVER_FILE" ]; then
	export CHROMEDRIVER_FILE="chromedriver_linux64.zip"
fi

rm -rf build/selenium-server ; mkdir -p build/selenium-server ; cd build/selenium-server

wget -N http://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/${CHROMEDRIVER_FILE}
unzip ${CHROMEDRIVER_FILE}
chmod +x chromedriver

if [ -n "$SELENIUM_INSTALL_BIN" ]; then
	sudo mv -f chromedriver /usr/local/share/
	sudo chmod +x /usr/local/share/chromedriver
	sudo ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
fi

wget http://selenium-release.storage.googleapis.com/${SELENIUM_MAJOR_VERSION}/selenium-server-standalone-${SELENIUM_VERSION}.jar

java -jar selenium-server-standalone-${SELENIUM_VERSION}.jar -port 4444 > /dev/null &

# make build/fonts
# node server.js > /dev/null &