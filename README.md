# cv-builder
CV BUILDER - INTERACTIVE CHATBOT CV GENERATOR

An interactive web application that guides users through creating a professional CV using a chat-based interface. The application collects information step by step and generates a beautifully formatted PDF CV.

FEATURES:

- Chatbot Interface - Interactive conversation-style data collection

- Bilingual Support - Available in English and Spanish

- Complete CV Sections: Personal information (name, birth date), Social/Professional links (LinkedIn, GitHub, etc.), Professional summary, Education (institution, dates, description), Work experience (position, company, dates, description), Languages with levels (A1 to C2), Driver's license information

- Dynamic Form Fields - Add multiple entries for links, education, experience, and languages

- Skip Options - Users can skip sections they don't need

- PDF Generation - One-click PDF download with clean, professional formatting

- Restart Functionality - Start over to create another CV without page reload

TECHNOLOGIES USED:

- Backend: Python with Flask

- Frontend: HTML5, CSS3, JavaScript (all in a single HTML file)

- PDF Generation: html2pdf.js library

PREREQUISITES:

- Python 3.7 or higher

- pip (Python package manager)

INSTALLATION AND EXECUTION GUIDE:

Step 1: Clone the repository

git clone -b develop https://github.com/CPJAVI/cv-builder.git

cd cv-builder

Step 2: Create and activate virtual environment

Windows:

python -m venv venv

.\venv\Scripts\activate

Mac/Linux:

python3 -m venv venv

source venv/bin/activate

Step 3: Install Requirements

pip install -r requirements.txt

If the above command fails due to SSL/Certificate errors, use:

pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt

Step 4: Run the application

python app.py

Step 5: Open your browser

Navigate to: http://localhost:5000

For Mac/Linux:

git clone -b develop https://github.com/CPJAVI/cv-builder.git

cd cv-builder

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

If fails:

pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt

python app.py

HOW TO USE:

1. Select Language - Choose between English or Spanish at startup

2. Follow Chat Prompts - Answer questions about your professional background

3. Add Multiple Entries - Use the form buttons to add multiple educations, experiences, or languages

4. Skip Sections - Click "I have no..." buttons to skip optional sections

5. Complete CV - After all questions, the download button appears

6. Download PDF - Click to generate and download your professional CV

7. Start Over - Use the "Start Over" button to create another CV

WORKFLOW:

Language Selection -> Name -> Birth Date -> Links -> Description -> Education -> Experience -> Languages -> Driver's License -> PDF Download

PDF OUTPUT FORMAT:

The generated PDF includes:

- Full name and birth date

- Clickable social/professional links

- Professional summary

- Education history with dates and descriptions

- Work experience with responsibilities

- Languages with proficiency levels

- Driver's license status

AUTHOR:

Created by CPJAVI (https://github.com/CPJAVI)

Made with love for creating professional CVs easily
