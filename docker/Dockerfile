FROM docker.insops.net/instructure/node-passenger:4.2.1

USER root

# Add source and install dependencies

RUN mkdir -p /src/
WORKDIR /src/

COPY ./package.json /src/
RUN npm install --ignore-scripts --unsafe-perm
COPY . /src/

RUN chown -R docker:docker /src
USER docker

CMD npm start
