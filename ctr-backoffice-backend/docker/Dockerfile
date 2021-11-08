FROM node:14.17.4-buster

RUN apt update

RUN apt install -y build-essential 

RUN apt install -y libpq-dev

ENV GIT_FOLDER_NAME="ctr-workspace"
ENV TARGET_FOLDER_NAME="ctr-workspace/ctr-backoffice-backend"
RUN git clone https://github.com/PharmaLedger-IMI/ctr-workspace.git $GIT_FOLDER_NAME

RUN cd $TARGET_FOLDER_NAME && \
    npm install --unsafe-perm

RUN cd $TARGET_FOLDER_NAME && \
    echo 'npm run start' >> startup-script.sh
RUN cd $TARGET_FOLDER_NAME && cat startup-script.sh

EXPOSE 3000/tcp

CMD cd $TARGET_FOLDER_NAME && \
    bash startup-script.sh
