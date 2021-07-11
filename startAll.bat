@echo off
set back=%cd%
for /d %%i in (%cd%\*) do (
cd "%%i"
start npm start
cd
)
cd %back%