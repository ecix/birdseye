#
# Ecix Birdseye Server
#
# This makefile provides scripts for building
# the distribution and creating a .rpm file
#

APP=birdseye

# Remote RPM building server
BUILD_SERVER=''


### END CONFIGURATION ###
#
# Do not change anything below this line, unless you
# really know what you are doing.
#

APP_VERSION=$(shell cat VERSION)
VERSION=$(APP_VERSION)
ARCH=noarch

# Distribution directory
DIST=BUILD-RPM
REMOTE_DIST=$(APP)-$(DIST)
BUILD_ARCHIVE=.$(APP)-BUILD.tar.gz

APP_DIST=$(DIST)/opt/ecix/$(APP)

LOCAL_RPMS=RPMS

RPM=$(APP)-$(VERSION)-1.$(ARCH).rpm


dist:
	mkdir -p $(LOCAL_RPMS)
	mkdir -p $(DIST)/etc

	# Copy configuration and startup
	cp -r etc/* $(DIST)/etc/.

	# Exclude local config files from dist
	rm -f $(DIST)/etc/ecix/*local*

	# Create app install target
	mkdir -p $(APP_DIST)

	# Copy app
	rsync -av \
		--exclude Makefile \
		--exclude $(DIST) \
		--exclude $(LOCAL_RPMS) \
		--exclude node_modules \
		--exclude venv \
		--exclude *local* \
		--exclude *.pid \
		--exclude *.swp \
		--exclude *.swo \
		--exclude *.pyc \
		--exclude *.sqlite3 \
		* $(APP_DIST)

	# Copy deploy scripts
	cp -r deploy/* $(DIST)/.


rpm: dist

	# Clear rpm archive (CI related stuff)
	rm -fr $(LOCAL_RPMS)
	mkdir -p $(LOCAL_RPMS)

	fpm -s dir -t rpm -n $(APP) -v $(VERSION) -C $(DIST) \
		--architecture $(ARCH) \
		--depends gcc \
		--depends python-virtualenv \
		--config-files /etc/birdseye/birdseye.conf \
		--after-install $(DIST)/after_install \
		etc/ opt/

	# Move rpm to target directory
	mv $(RPM) $(LOCAL_RPMS)/.


fnord:
	echo $(BUILD_SERVER)


#
# Build the rpm on the build server
#
$(LOCAL_RPMS)/$(RPM): dist

	# Make build archive and copy to server
	tar czf $(BUILD_ARCHIVE) $(DIST)/*
	scp $(BUILD_ARCHIVE) $(BUILD_SERVER):.
	rm $(BUILD_ARCHIVE)

	# Unpack distribution  build server
	ssh $(BUILD_SERVER) -- rm -rf $(REMOTE_DIST)
	ssh $(BUILD_SERVER) -- mkdir  $(REMOTE_DIST)
	ssh $(BUILD_SERVER) -- "cd $(REMOTE_DIST) && tar xzf ../$(BUILD_ARCHIVE)"

	# Clean existing rpm on server
	ssh $(BUILD_SERVER) -- \
		rm -f $(RPM)

	ssh $(BUILD_SERVER) -- \
		fpm -s dir -t rpm -n $(APP) -v $(VERSION) -C $(REMOTE_DIST)/$(DIST) \
			--architecture $(ARCH) \
			--depends gcc \
			--depends python-virtualenv \
			--config-files /etc/birdseye/birdseye.conf \
			--after-install $(REMOTE_DIST)/$(DIST)/after_install \
			etc/ opt/

	# Get rpm from server
	scp $(BUILD_SERVER):$(RPM) $(LOCAL_RPMS)/.


build_server:
ifeq ($(BUILD_SERVER), '')
	$(error BUILD_SERVER not configured)
endif

remote_rpm: build_server $(LOCAL_RPMS)/$(RPM)

