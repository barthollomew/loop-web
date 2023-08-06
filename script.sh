#!/bin/bash

declare -a components=("Header" "Footer" "NavBar" 
"LandingPage" "SignIn" "SignUp" "Profile" "Reviews" "Movies")

for component in "${components[@]}"
do
  mkdir -p src/components/$component
  touch src/components/$component/$component.js
  touch src/components/$component/$component.css
done

touch src/App.js
