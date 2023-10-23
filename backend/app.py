from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from markupsafe import escape
import uuid, os, array

app = Flask(__name__)
CORS(app)

photo_array = []
uploads = str("uploads")
host = "http://127.0.0.1:5000"

os.makedirs(uploads, exist_ok = True)

@app.route("/")
def greeting():
  return "Hello."


# Fix route to see individual photos (/photos/<photo_id> GET?)
@app.route("/photos", methods=["GET"])
def get_photos():
  photos = []
  print(os.listdir(uploads))
  for file_name in os.listdir(uploads):
    photo_id, extension = os.path.splitext(file_name)
    if (extension.lower() in {".jpeg", ".png", ".jpg", ".gif"}):
      photos.append({"title":"Photo " + photo_id, "id": photo_id, "url":f"{host}/{photo_id}{extension}"})
  return jsonify(photos)

@app.route("/photos", methods=["POST"])
def post_photos(): 
  title = request.form.get("title")
  file = request.files["file"]
  photo_id = uuid.uuid4()

  file.save(os.path.join(uploads, f"{photo_id}{os.path.splitext(file.filename)[1]}"))
  return jsonify({"id": photo_id, "title": title, "url": f"{host}/photos/{photo_id}"}), 201

@app.route("/photos/<photo_id>", methods=["GET"])
def get_photo(photo_id):
  for file_name in os.listdir(uploads): # for every file in the uploads folder
    photo, extension = os.path.splitext(file_name) # split the file into name and extension
    photo_url = str(photo + extension) # photo_url is new variable for the full file name & extension
    print(f"photo_id: {photo_id} | photo_url: {photo_url}")
    print(photo_id in photo_url)
    if (photo_id == photo_url): # if the <photo_id> is in the photo_url
      return jsonify({"title":"Photo " + photo_id, "id": photo_id, "url":f"{host}/{photo_url}"}) # return
  return "nothing"

@app.route("/photos/<photo_id>", methods=["PUT"])
def put_photo():
  return jsonify({"id": photo_id, "title": title, "url": f"{host}/photos/{photo_id}"}), 201

@app.route("/photos/<photo_id>", methods=["DELETE"])
def delete_photos():
  return 