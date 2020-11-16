FROM openjdk:11

WORKDIR /app

COPY target/osworks-api-0.0.1.jar /app

EXPOSE 8080

#RUN sleep 30

ENV WAIT_VERSION 2.7.3
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

#ENTRYPOINT ["java", "-jar", "osworks-api-0.0.1.jar"]
