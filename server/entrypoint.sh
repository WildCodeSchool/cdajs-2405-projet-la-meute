#!/bin/sh
if [ ! -d "/@shared" ]; then
  ln -sf /shared /@shared
fi
exec "$@"
