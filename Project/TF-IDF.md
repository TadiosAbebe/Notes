# What is TF-IDF

is a statistic that aims to better define how important a word is for a document, while also taking into account the relation to other documents from the same corpus.

This is performed by looking at how many times a word appears into a document while also paying attention to how many times the same word appears in other documents in the corpus.

- a word that frequently appears in a document has more relevancy for that document, meaning that there is higher probability that the document is about or in relation to that specific word
- a word that frequently appears in more documents may prevent us from finding the right document in a collection; the word is relevant either for all documents or for none. Either way, it will not help us filter out a single document or a small subset of documents from the whole set.

> So then TF-IDF is a score which is applied to every word in every document in our dataset. And for every word, the TF-IDF value increases with every appearance of the word in a document, but is gradually decreased with every appearance in other documents.

i.e let us say we have 10000 documents and we want to know which document our search query relates to, TF-IDF help us to determine the degree to which a term is used in a document(our search query) relative to those other documents. in other way it is a way of finding out or figuring out the value of certain searches for a set of courps

# How is it calculated?

- it is TF times IDF
- TF\*IDF

# How is TF calculated?

Example: lets say

- we have 10000 documents
- 100 words each
- and our search_word = "violence"

---

TF = Term frequency
lets take one document from those 10000 document
then count how many times our search term occured in this document
and our search_word(violence) has occured 30 times in this document

dividing the number of times the search term occured to the total number of terms
30/100 = .3 yelids our the TF of the search term in that specific document

---

IDF = Inverse Document freqeuncey
in here we count, On how many documents does our search term occured in the entire courps(10000 documents)
in our case the word violence occured in 352 documents
log(10000/352) = 1.45

---

so now our TF-IDF become

0.3 \* 1.45 = 0.44

so in that one doucment its TF-IDF score for the term violence is 0.44

# When is it useful?

- used in search engines to understand a value of a term in a document relative to a large corpus of a document, allows search engines to quickly find the most relevant pages and put them infornt of the user

# Mathematical Computation

- N is the number of documents we have in our dataset
- d is a given document from our dataset
- D is the collection of all documents
- w is a given word in a document

$$tf(w,d)=log(1+f(w,d))$$
Here f(w,d) is the frequency of word w in document d.
$$idf(w,D)=log(N/f(w,D))$$
With N documents in the dataset and f(w, D) the frequency of word w in the whole dataset, this number will be lower with more appearances of the word in the whole dataset.
$$tf-idf(w,d,D)=tf(w,d)*idf(w,D)$$

# TF-IDF Sklearn Python Implementation

With such awesome libraries like scikit-learn implementing TD-IDF is a breeze. First off we need to install 2 dependencies for our project, so let’s do that now.

```
pip3 install scikit-learn
pip3 install pandas
```

In order to see the full power of TF-IDF we would actually require a proper, larger dataset.

```
import pandas as pd
from sklearn.feature_extraction.text import TfidfTransformer
dataset = [
    "I enjoy reading about Machine Learning and Machine Learning is my PhD subject",
    "I would enjoy a walk in the park",
    "I was reading in the library"
]
```

```
tfIdfVectorizer=TfidfVectorizer(use_idf=True)
tfIdf = tfIdfVectorizer.fit_transform(dataset)
df = pd.DataFrame(tfIdf[0].T.todense(), index=tfIdfVectorizer.get_feature_names(), columns=["TF-IDF"])
df = df.sort_values('TF-IDF', ascending=False)
print (df.head(25))
```

```
Output
TF-IDF
machine   0.513720
learning  0.513720
about     0.256860
subject   0.256860
phd       0.256860
and       0.256860
my        0.256860
is        0.256860
reading   0.195349
enjoy     0.195349
library   0.000000
park      0.000000
in        0.000000
the       0.000000
walk      0.000000
was       0.000000
would     0.000000
```

there are 2 different ways of implementing TF-IDF using Scikit-Learn. One is using the TfidfVectorizer class(like we just did) and the other one is by using the TfidfTransformer class.

Theoretically speaking, there is actually no difference between the 2 implementations.

The main difference between the 2 implementations is that TfidfVectorizer performs both term frequency and inverse document frequency for you, while using TfidfTransformer will require you to use the CountVectorizer class from Scikit-Learn to perform Term Frequency.
