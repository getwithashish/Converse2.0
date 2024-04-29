import google.generativeai as genai
import google.ai.generativelanguage as glm
from PyPDF2 import PdfReader

# from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain


GOOGLE_API_KEY = "AIzaSyDTzAF3jNsbktskJLC_EIBz0_QKPFdnHds"
genai.configure(api_key=GOOGLE_API_KEY, transport="rest")


def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


def get_text_chunks(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = splitter.split_text(text)
    return chunks


def get_vector_store(chunks, prefix_name):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001", google_api_key=GOOGLE_API_KEY
    )
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    vector_store.save_local(f"faiss_indices/{prefix_name}-faiss_index")


def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer. Also instead of using your name ie Gemini please use the name Converse if asked\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(
        model="gemini-pro", client=genai, temperature=0.3, google_api_key=GOOGLE_API_KEY
    )
    prompt = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )
    chain = load_qa_chain(llm=model, chain_type="stuff", prompt=prompt)
    return chain


def handle_prompt(prompt, prefix_name):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001", google_api_key=GOOGLE_API_KEY
    )

    new_db = FAISS.load_local(
        f"faiss_indices/{prefix_name}-faiss_index",
        embeddings,
        allow_dangerous_deserialization=True,
    )
    docs = new_db.similarity_search(prompt)

    chain = get_conversational_chain()

    response = chain(
        {"input_documents": docs, "question": prompt},
        return_only_outputs=True,
    )

    print(response)
    return response


def create_faiss_index(file, prefix_name):
    raw_text = get_pdf_text(file)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks, prefix_name)


def generate_document_gemini_response(prompt, prefix_name):
    # raw_text = get_pdf_text(file)
    # text_chunks = get_text_chunks(raw_text)
    # get_vector_store(text_chunks)

    response = handle_prompt(prompt, prefix_name)
    return response
