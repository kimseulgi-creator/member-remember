from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.jytwxr9.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

import requests
from bs4 import BeautifulSoup

@app.route('/')
def home():
    return render_template('sg.html')

@app.route("/intro", methods=["POST"])
def intro_post():
    url_receive = request.form['url_give']
    name_receive = request.form['name_give']
    mbti_receive = request.form['mbti_give']
    blog_receive = request.form['blog_give']

    doc={
        'image':url_receive,
        'name':name_receive,
        'mbti':mbti_receive,
        'blog':blog_receive
    }
    db.introduce.insert_one(doc)

    return jsonify({'msg':'저장 완료!'})

@app.route("/intro", methods=["GET"])
def intro_get():
    all_introduce = list(db.introduce.find({},{'_id':False}))
    return jsonify({'result':all_introduce})

if __name__ == '__main__':
	app.run('0.0.0.0', port=5000, debug=True)