FROM instructure/node:8

EXPOSE 8080

ENV YARN_VERSION 1.7.0-1

## Add Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
 && apt-get update --quiet=2 \
 && apt-get install --quiet=2 yarn="$YARN_VERSION" \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV YARN_CACHE /home/docker/.cache/yarn

RUN yarn config set prefer-offline true \
  && yarn config set no-progress true \
  && yarn config set cache-folder $YARN_CACHE

CMD ["yarn", "run", "start:watch"]
