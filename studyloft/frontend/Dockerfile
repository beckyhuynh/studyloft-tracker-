FROM node:20-alpine
ENV PORT=5173
COPY . /frontend
WORKDIR /frontend
RUN npm install
EXPOSE 5173
CMD ["npm", "start"]