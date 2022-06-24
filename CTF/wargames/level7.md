# Level 7 to 8

## Question

> The password for the next level is stored in the file data.txt next to the word millionth

> Commands you may need to solve this level
> grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

## Login

```
`ssh bandit5@bandit.labs.overthewire.org -p 2220`
`HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs`
```

## Note

use the grep cli utility to search for a string in a text file [More](https://linuxconfig.org/how-to-find-a-string-or-text-in-a-file-on-linux)

## Solution

`grep millionth data.txt`
