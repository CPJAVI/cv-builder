from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generar_pdf', methods=['POST'])
def generar_pdf():
    datos = request.json
    html_content = datos.get('html', '')
    
    with open('temp_cv.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return jsonify({'status': 'ok', 'message': 'HTML recibido'})

if __name__ == '__main__':
    app.run(debug=True)