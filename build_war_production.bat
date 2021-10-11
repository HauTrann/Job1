@echo off

@echo Started: %date% %time%

rem Build app
call ng build --prod --output-path=dist --base-href=/BlueRIDGE/ --aot=true
rem Copy WEB-INF to dist
rem jar -cvf IB.war *
call xcopy .\WEB-INF .\dist\WEB-INF /i
rem War app
rem npm install -g grunt -cli
rem npm install grunt --save-dev
rem npm install grunt-war --save-dev
rem call npm run warkhdn

cd dist

jar -cvf ..\warFile\BlueRIDGE.war .\

@echo Completed: %date% %time%
