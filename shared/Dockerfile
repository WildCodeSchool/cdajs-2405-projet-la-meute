FROM alpine:latest

RUN mkdir -p /shared
RUN mkdir -p /@shared

RUN ln -sf /shared/* /@shared/

CMD ["tail", "-f", "/dev/null"]