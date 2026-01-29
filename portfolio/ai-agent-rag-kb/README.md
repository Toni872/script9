# 🧠 Corporate Knowledge Base AI Agent

> **RAG (Retrieval Augmented Generation) System built with LangChain, Pinecone, and Slack API.**

## 📌 Project Overview
Internal information in companies is often scattered across PDFs, Google Docs, and Notion. This agent serves as a **Central Intelligence Node**:
1.  **Ingest**: Automatically reads and indexes verified company documents (HR Policies, Technical Manuals, Sales Scripts).
2.  **Vectorize**: Converts text into vector embeddings using OpenAI `text-embedding-3-small`.
3.  **Retrieve**: When a user asks a question in Slack, the agent searches for the most relevant context.
4.  **Answer**: Generates a factual answer citing the source document (No hallucinations).

## 🛠️ Tech Stack
*   **LLM**: GPT-4-turbo
*   **Framework**: LangChain v0.1
*   **Vector DB**: Pinecone / Qdrant
*   **Interface**: Slack Bot Integration

## 💻 Sample Code (Concept)
```python
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

def get_answer(query):
    # 1. Retrieve context
    docs = vectorstore.similarity_search(query)
    
    # 2. Strict Generation
    chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(temperature=0),
        retriever=vectorstore.as_retriever()
    )
    
    return chain.run(query)
```

## 🔒 Security
*   Role-Based Access Control (RBAC).
*   Data never trains the public model.

---
**Maintained by:** [Script9](https://script-9.com)
