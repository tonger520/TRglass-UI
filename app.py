from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    print("=" * 48)
    print("  TRglass v1 - 玻璃拟态 UI 组件库")
    print("  by 童儿制作 · 仅供学习参考")
    print("=" * 48)
    print("  访问地址: http://127.0.0.1:5000")
    print("=" * 48)
    app.run(host="0.0.0.0", port=5000, debug=True)
