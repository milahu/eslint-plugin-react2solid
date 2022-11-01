#! /bin/sh

src=test/src/react-query-devtools/src/devtools.tsx

src=test/src/react-forward-ref/react-forward-ref.tsx

out=test/out/${src#test/src/}

while true
do

echo
date
echo src $src
echo out $out
echo

node test/index.js $src
# >/dev/null && cat $out | grep 'React\.'

echo
echo done. to continue, hit enter
read

done
