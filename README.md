# Usage

```
    docker run -v CONFIG_PATH:/config -v OUTPUT_PATH:/data dottorjekyll/atom-webscraper CONFIG_FILENAME.yaml URL OUTPUT_FILENAME.xml
```

Below the example usage for the two website examples on `/examples` folder:
```
    docker run -v $PWD/examples:/config -v $PWD/data:/data dottorjekyll/atom-webscraper ilpost.yaml https://www.ilpost.it/sport/ ilpost.xml
```

```
    docker run -v $PWD/examples:/config -v $PWD/data:/data dottorjekyll/atom-webscraper internazionale.yaml https://www.internazionale.it/ultimi-articoli internazionale.xml
```
