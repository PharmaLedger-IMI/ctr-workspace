FROM node:14.17.4-buster

# lforms build needs zip
RUN apt update
RUN apt install -y zip unzip

RUN npm install -g node-gyp
# lforms - bower needs to run as root
# Warning: Error: Cannot find where you keep your Bower packages. Use --force to continue.
RUN echo '{ "allow_root": true }' > ~/.bowerrc


ENV GIT_FOLDER_NAME="ctr-workspace"
ENV TARGET_FOLDER_NAME="ctr-workspace/ctr-patient"
RUN git clone https://github.com/PharmaLedger-IMI/ctr-workspace.git $GIT_FOLDER_NAME

#92 landing page is merged with apihub-root for now
RUN cp -rpv /ctr-workspace/ctr-homepage/assets/* /ctr-workspace/ctr-patient/apihub-root/assets/
RUN cp -rpv /ctr-workspace/ctr-homepage/doc-root/* /ctr-workspace/ctr-patient/apihub-root/doc-root/

RUN cd $TARGET_FOLDER_NAME && \
    npm install --unsafe-perm

#All of the next lines will be handled from deployment.yaml

#ADD config/env.json /$TARGET_FOLDER_NAME/env.json
#After the custimization of config/server.json file uncomment the next line
#ADD config/server.json /$TARGET_FOLDER_NAME/apihub-root/external-volume/config/server.json
#ADD config/BDNS.hosts /$TARGET_FOLDER_NAME/apihub-root/external-volume/config/BDNS.hosts
#ADD config/ssl_certs /$TARGET_FOLDER_NAME/apihub-root/external-volume/config/ssl/server.crt
#ADD config/ssl_certs /$TARGET_FOLDER_NAME/apihub-root/external-volume/config/ssl/server.key

RUN cd $TARGET_FOLDER_NAME && \
    echo 'npm run server & \n sleep 1m \n npm run build-all \n tail -f /dev/null' >> startup-script.sh
RUN cd $TARGET_FOLDER_NAME && \
    echo 'npm run switch-to-test-chain ; npm run server & \n sleep 1m \n npm run build-all \n tail -f /dev/null' >> startup-eth-script.sh
RUN cd $TARGET_FOLDER_NAME && cat startup-script.sh

EXPOSE 8080/tcp

CMD cd $TARGET_FOLDER_NAME && \
    bash startup-script.sh
