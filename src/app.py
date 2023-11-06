from flask import Flask, request, jsonify, render_template
import RestrictedPython
from RestrictedPython import compile_restricted
from RestrictedPython.Guards import safe_builtins
import io
import sys
from exec_namespace import get_modules

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/run_python', methods=['POST'])
def run_python():
    data = request.get_json()
    python_code = data['code']

    # redirect stdout to capture print statements
    old_stdout = sys.stdout
    redirected_output = sys.stdout = io.StringIO()

    # restrict eval environment using RestrictedPython safe_builtins & namespace from exec_namespace.py (treating entire py file as namespace)
    local_vars = {}
    safe_globals = safe_builtins.copy()
    safe_globals.update(get_modules())  # Combine safe builtins with the allowed modules

    try:
        byte_code = compile_restricted(python_code, filename='<inline>', mode='exec')
        exec(byte_code, safe_globals, local_vars)
        execution_result = redirected_output.getvalue()
        return jsonify(success=True, result=execution_result)
    except Exception as e:
        return jsonify(success=False, error=str(e))
    finally:
        sys.stdout = old_stdout


if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=80, debug=True)
