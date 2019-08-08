echo 'START UPDATE';

git checkout master;

npm version patch;

git checkout gh-pages;

git merge master;

npm run cache;

git add -A .;

git commit -m 'update maps';

git push origin gh-pages;

git checkout master;

echo 'END UPDATE';