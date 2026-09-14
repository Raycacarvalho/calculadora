from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/calcular", methods=["POST"])
def calcular():
    dados = request.get_json()

    num1 = dados.get("num1")
    num2 = dados.get("num2")
    operacao = dados.get("operacao")

    if num1 is None or num2 is None or not operacao:
        return jsonify({"erro": "Informe num1, num2 e operacao."}), 400

    try:
        num1 = float(num1)
        num2 = float(num2)
    except (ValueError, TypeError):
        return jsonify({"erro": "Os números informados são inválidos."}), 400

    if operacao == "+":
        resultado = num1 + num2
    elif operacao == "-":
        resultado = num1 - num2
    elif operacao == "*":
        resultado = num1 * num2
    elif operacao == "/":
        if num2 == 0:
            return jsonify({"erro": "Não é possível dividir por zero."}), 400
        resultado = num1 / num2
    else:
        return jsonify({"erro": "Operação inválida."}), 400

    return jsonify({"resultado": resultado})


if __name__ == "__main__":
    app.run(debug=True)