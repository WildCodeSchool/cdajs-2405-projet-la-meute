#!/bin/bash

# Downloading driver
curl -o ${JDBC_DIRECTORY}/${JDBC_VERSION} ${JDBC_URL}${JDBC_VERSION}

# Verifying driver installation
if [ -f ${JDBC_DIRECTORY}/${JDBC_VERSION} ]; then
    echo "JDBC driver installed"
else
    echo "JDBC driver installation failed"
    exit 1
fi