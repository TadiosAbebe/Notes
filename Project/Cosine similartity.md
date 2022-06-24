# Cosine similarity

Cosine similarity measures the similarity between two vectors of an inner product space. It is measured by the cosine of the angle between tow vectors and determines whether two vectors are pointing in roughly the same direction. It is often used to measure document similarity in text analysis.

A document can be represented by thoudands of attributes, each recording the frequency of a particular word(such as a keyword) or phrase in the document. Thus, each document is an object represented by what is called a term-freqency vector. For example in the table we see that document1 contains five instances of the word team, while hockey occurs three times. the word coach is absent from the entire document, as indicated by a count value of 0.

Two term freqency vectors may have many 0 values in common meaning that they corresponding documents do not share many words, but this does not make them similar. we need a measure that will focus on the words that the two documents do have i common and the occurrence freqency of such word.

| Document  | team | coach | hockey | baseball | soccer | penality | score | win | loss | season |
| --------- | ---- | ----- | ------ | -------- | ------ | -------- | ----- | --- | ---- | ------ |
| document1 | 5    | 0     | 3      | 0        | 2      | 0        | 0     | 2   | 0    | 0      |
| document2 | 3    | 0     | 2      | 0        | 1      | 1        | 0     | 1   | 0    | 1      |
| document3 | 0    | 7     | 0      | 2        | 1      | 0        | 0     | 3   | 0    | 0      |
| document4 | 0    | 1     | 0      | 0        | 1      | 2        | 2     | 0   | 3    | 0      |

Cosine similarity is a measure of similarity that can be used to compare documents or, say, give a ranking of document with respect to a given vector of query words. Let x and y be two vectors for comparison. using the cosine measure as a similarity function

$ sim(x,y) $= $ x.y \over ||x|| ||y|| $

where $||x||$ is the euclidean norm of vector
$$x=(x_1,x_2,...,x_p)$$
defined as $$ \sqrt{x^2_1+x^2_2+...+x^2_p} $$

conceptually it is the length of the vector and similarly y is the eculidean norm of vector y.

The measure computes the cosine of the angle between vectors x and y. A cosine calue of 0 means that the two vectors are at 90 degrees to each other and have no match. The closer the cosine value to 1, the smaller the angle and the greater the match between vectors

_Example:_ from the above table

$$x= (5,0,3,0,2,0,0,2,0,0)$$
$$y= (3,0,2,0,1,1,0,1,0,1)$$
How similart are x and y?

x.y = 5*3+0+3*2+0+2*1+0+0+2*1+0+0 = 25
||x|| = 6.84
||y|| = 4.12
sim(x,y) = 0.94

# Implementaion of cosine similarity using Python

Assume we are working with some clothing data and we wold like to find products similar to each other. we have three types of apparel: a hoodie, a sweater, and a crop-top. the product data available is as follow

| Product  | Width | Lenght |
| -------- | ----- | ------ |
| hoodie   | 1     | 4      |
| Sweater  | 2     | 4      |
| Crop-top | 3     | 2      |

to do the calculation using python we need a couple of librarties

```
pip install pands
pip install sklearn
```

first we will create the above dataset as a data frame in python(only with columns containing numerical values that we will use)

```
import pandas as pd
data = {'width':[1,2,3], 'height':[4,4,2]}
df = pd.Dataframe(data, columns = ['width','height'])
```

this outputs
||width|height|
|-|-|-|
|0|1|4|
|1|2|4|
|2|3|2|

next using the cosine similarity method from sklearn library we can compute the cosine similarity between each element in the above dataframe:

```
from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity(df)
print(similarity)
```

the ourput is an array with similarities between each of the entries of the data frame

```
[[1.         0.97618706 0.73994007]
 [0.97618706 1.         0.86824314]
 [0.73994007 0.86824314 1.        ]]
```

for better understanding, the above array can be displayed as:

|     | A    | B    | C    |
| --- | ---- | ---- | ---- |
| A   | 1    | 0.98 | 0.74 |
| B   | 0.98 | 1    | 0.87 |
| C   | 0.74 | 0.87 | 1    |
