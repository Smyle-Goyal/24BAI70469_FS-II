@echo off
cd /d "%~dp0backend"
echo Starting Spring Boot Backend on http://localhost:8080...
mvnw.cmd spring-boot:run
pause
