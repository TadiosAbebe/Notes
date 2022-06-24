# Level 8 to 9

## Question

> The password for the next level is stored in the file data.txt and is the only line of text that occurs only once

> Commands you may need to solve this level
> grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd

> Helpful Reading Material
> Piping and Redirection

## Login

```
`ssh bandit8@bandit.labs.overthewire.org -p 2220`
`cvX2JJa4CFALtqS87jk27qwqGhBM9plV`
```

## Note

[Sol](https://stackoverflow.com/questions/12782827/how-to-find-the-particular-text-stored-in-the-file-data-txt-and-it-occurs-only#:~:text=The%20uniq%20command%20reports%20or,in%20the%20terminal%20for%20you.)

## Solution

`sort data.txt | uniq -u`
