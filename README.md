# imagedrop


## Usage:

* Link imagedrop.css before every other styles inside your ```<head>``` tags

```
<head>
    <link rel="stylesheet" href="imagedrop.css" />
    <link rel="stylesheet" href="style.css" />
</head>
```

* Make an empty element(div is recommended) and give it a class

```
    <div class="your_div_classname"></div>
```

* Link imgdrop.js right before the end of the ```<body>``` tag.

```
    <body>
        <!-- other stuff  -->

        <script src="./path/imagedrop.js"></script>
    </body>
```

* Make a script tag after imgdrop.js

### Inside script tags you have to define new ImageDrop like this

```
    <body>
        <!-- other stuff  -->

        <script src="./path/imagedrop.js"></script>
        <script>
            new ImageDrop("your_div_classname").init()
        </script>
    </body>
```