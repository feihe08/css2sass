# css2sass
convert css file to sass file
## what it does
css2sass is a easy way to convert css file to sass file. For example, it can convert

    .container {
        display: block;
        width: 100px;
        height: 100px;   
    }
to

    .container
      display: block
      width: 100px
      height: 100px

## how to use

## note
the little function convert css file to sass file by regexp, and it can't find grammer error,
so you shoule promise the css file is legal.