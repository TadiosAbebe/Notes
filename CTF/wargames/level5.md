# Level 5 to 6

## Question

> The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:

- human-readable
- 1033 bytes in size
- not executable
  > Commands you may need to solve this level
  > ls, cd, cat, file, du, find

## Login

```
`ssh bandit5@bandit.labs.overthewire.org -p 2220`
`koReBOKuIDDepwhWk7jZC0RTdopnAYKh`
```

## Note

> Trying to list all files under a directory and one level sub directory with their full information(ls -l)

but this didnt list the hidden files

```
for i in *;
    do ls -l $i/*;
    done
```

Other approach

> using the find command to find for a file [More Detail](https://linuxize.com/post/how-to-find-files-in-linux-using-the-command-line/#:~:text=The%20find%20command%20is%20one,action%20on%20each%20matched%20file.)

## Solution

`find -type f -size 1033c`
