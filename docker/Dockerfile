FROM instructure/node:8

EXPOSE 8080

ENV YARN_CACHE /home/docker/.cache/yarn

RUN yarn config set prefer-offline true \
  && yarn config set no-progress true \
  && yarn config set cache-folder $YARN_CACHE

CMD ["yarn", "run", "start:watch"]
