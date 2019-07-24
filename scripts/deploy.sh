echo 'START DEPLOY';

git checkout gh-pages

git rebase master

cp public/CNAME CNAME
cp public/index.html index.html
cp public/README.md README.md

git add -A .

git commit -m 'update maps'

git push origin gh-pages

git checkout master

echo 'END DEPLOY';