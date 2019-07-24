echo 'START DEPLOY';

npm version patch;

git checkout gh-pages;

git merge master;

npm run build;

cp public/CNAME CNAME
cp public/index.html index.html
cp public/README.md README.md;

git add -A .;

git commit -m 'update maps';

git push origin gh-pages;

git checkout master;

echo 'END DEPLOY';