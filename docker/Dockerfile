FROM instructure/node

USER root

# Add source and install dependencies

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY ./package.json /usr/src/app/
RUN npm install --ignore-scripts --unsafe-perm
COPY . /usr/src/app/

RUN chown -R docker:docker /usr/src/app
USER docker

CMD npm start
