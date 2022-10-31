#! /bin/sh

find src/component-party/content/ -name react |
while read reactDir
do
  dir=$(dirname $reactDir)
  path=${dir#*/} # remove src/ prefix
  mkdir -p $path
  cp -r $dir/react $dir/solid $path
  find $path -type f | xargs sed -i 's|\t|  |g' # indent with spaces
done
