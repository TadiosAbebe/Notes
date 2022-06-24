# Level 6 to 7

## Question

> The password for the next level is stored somewhere on the server and has all of the following properties:

- owned by user bandit7
- owned by group bandit6
- 33 bytes in size

## Login

```
`ssh bandit6@bandit.labs.overthewire.org -p 2220`
`DXjZPULLxYr17uwoI01bNLQbtFemEgo7`
```

## Note

search for the password with the listed parameters using the find command[Find Command](https://linuxize.com/post/how-to-find-files-in-linux-using-the-command-line/#:~:text=The%20find%20command%20is%20one,action%20on%20each%20matched%20file.)

## Solution

`find / -type f -user bandit7 -group bandit6 -size 33c`
