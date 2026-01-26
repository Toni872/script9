import sys
try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf not installed")
    sys.exit(1)

try:
    reader = PdfReader(r"c:\Users\Antonio\Downloads\Preguntas y Contrato.pdf")
    with open("extracted_text.txt", "w", encoding="utf-8") as f:
        for i, page in enumerate(reader.pages):
            f.write(f"--- PAGE {i+1} ---\n")
            f.write(page.extract_text())
            f.write("\n\n")
except Exception as e:
    print(f"Error reading PDF: {e}")
