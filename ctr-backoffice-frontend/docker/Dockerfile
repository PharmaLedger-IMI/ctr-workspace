# Stage 1 - build prod files inside docker - runs one level above
FROM node:14.17.4-buster as build-step


ENV GIT_FOLDER_NAME="ctr-workspace"
ENV TARGET_FOLDER_NAME="ctr-workspace/ctr-backoffice-frontend"
RUN git clone https://github.com/PharmaLedger-IMI/ctr-workspace $GIT_FOLDER_NAME

RUN cd $TARGET_FOLDER_NAME && \
    npm install --unsafe-perm

RUN cd $TARGET_FOLDER_NAME && \
    npm run build -- --prod

# Stage 2 - put files inside an apache 2.4 web server

FROM httpd:2.4

# httpd.conf contains some tweaks - compare with httpd.conf.orig
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

RUN mkdir /usr/local/apache2/htdocs/backoffice

COPY --from=build-step /ctr-workspace/ctr-backoffice-frontend/dist/clinicaltrials-frontend /usr/local/apache2/htdocs/backoffice/
