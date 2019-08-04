echo 'START UPDATE';

git checkout gh-pages;

npm run cache;

git add -A .;

git commit -m 'update maps';

git push origin gh-pages;

git checkout master;

echo 'END UPDATE';