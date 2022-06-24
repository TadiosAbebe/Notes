# What is Gensim?

Gensim is free open-source python library for representing documents as semantic vectors, as efficeiently(computer-wise) and painlessly(human-wise) as possible. it is designed to process raw unstructured digital text(plain text) using unsupervised machine learning algorithums

the algorithms in gensim, such as Word2Vec, FastText, Latent Semantic Indexing(LSI), Latent Dirichlet Allocation(LDA), etc automatically discover the semantic structure of documents by examining statistical co-occurrence patterns within a corpus of traninig documents. These algorithum are unsupervised, which means no human input is necessary - you only need a corpus of pain text documents.

Once these statistical patterns are found, any plain text document(sentence, phrase, word) can be succinctly expressed in the new semantic representation and queried for topical similarity against other documents(words, phrases)

>**Vector Space Model** or term vector model is an algebraic model for representing text documetn as vectors of identifiers(such as index terms). It is used in inforamation filtering, information retrieval, indexing and relevancy rankings.

>Document and queries are represented as vectors. each dimention corresponds to a separate term. if a term occurs in the document, its value in the vector is non-zero. several different ways of computing these values, also known as term weights, have been developed. One of the best known schemes is tf-idf weighting

>The definition of term depends on the application. Typically terms are single words, keywords, or longer phrases. If words are chosen to be the terms, the dimensionality of the vector is the number of words in the vocabulary(the number of distinict words occuring in the corpus)