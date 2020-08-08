## Data.Month  Class
**endpoint** /products/update/data/monthbypos

### option 1
```JSON
{
    "posname": "pos1",  // pos1, pos2, pos3 or pos4
    "day" : "2",
    "thisMonth" : {
        "year" : 2020,
        "month" : 7
    }
}
```
```bash
out =>  all pos , same day in month selected.
```


### option 2
```JSON
{
    "posname": "all",
    "day" : "all",
    "thisMonth" : {
        "year" : 2020,
        "month" : 7
    }
}
```
```bash
out =>  all pos , all day in month selected.
```

### option 3
```JSON
{
    "posname": "all",
    "day" : "all",
    "thisMonth" : "all"
}
```

```bash
out =>  all pos , all day in current month
```