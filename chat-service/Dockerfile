FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /workspace

COPY pom.xml .
COPY src src

RUN mvn clean package -DskipTests

FROM openjdk:17
WORKDIR /app

COPY --from=build /workspace/target/*.jar chat-service.jar

ENTRYPOINT ["java", "-jar", "chat-service.jar"]