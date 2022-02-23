# Browser Support

Granted supports opening console sessions into your browser of choice.

On your first time using granted you will be prompted to set your default browser. 
Granted will attempt to find your systems default browser as the first preference but you can also opt to manually set Granteds default browser.

## Viewing your default Granted browser
To see which browser Granted will use to open up the console run `granted browser`

You will get a response like:
```
Default: CHROME
```


## Setting your default
At any time you can run `granted browser -set` to reset your default browser
For Example:
```
granted browser -s
```
You will get a response like this:
```
? Select your default browser  [Use arrows to move, type to filter]
> Chrome
  Brave
  Edge
  Firefox
```
- Select which browser you would like as your granted default and press enter
