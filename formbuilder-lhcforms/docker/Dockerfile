FROM node:14.16-buster

# lforms - bower needs to run as root
# Warning: Error: Cannot find where you keep your Bower packages. Use --force to continue.
RUN echo '{ "allow_root": true }' > ~/.bowerrc


ENV TARGET_FOLDER_NAME="formbuilder-lhcforms"
RUN git clone --depth 1 --branch 6.4.4 https://github.com/lhncbc/formbuilder-lhcforms.git $TARGET_FOLDER_NAME

RUN cd $TARGET_FOLDER_NAME && \
    npm ci --unsafe-perm && \
    npx bower install && \
    npx grunt template
    
EXPOSE 9030/tcp

CMD cd $TARGET_FOLDER_NAME && \
    npx grunt serve
