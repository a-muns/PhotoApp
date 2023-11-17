from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from markupsafe import escape
from PIL import Image
from io import BytesIO
import uuid, os, array, io, base64


app = Flask(__name__)
CORS(app)

photo_array = []
uploads = str("uploads")
host = "http://127.0.0.1:5000"

os.makedirs(uploads, exist_ok = True)

# Method to encode image from filepath to base64
# (from https://www.reddit.com/r/flask/comments/8pj0bg/return_image_as_api_response/)
def get_encoded_img(image_path, extension):
  assert (isinstance(image_path, str), f"Not right {image_path}")
  img = Image.open(image_path, mode="r")
  img_byte_arr = BytesIO()
  if (extension == ".gif"):
    img.save(img_byte_arr, format="GIF")
  if (extension == ".jpeg" or extension == ".jpg"):
    img.save(img_byte_arr, format="JPEG")
  if (extension == ".png"):
    img.save(img_byte_arr, format="PNG")
  
  my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode("ascii")
  return my_encoded_img

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
      photo_url = str(photo_id + extension)
      img = get_encoded_img(uploads + "/" + photo_url, extension)
      photos.append({"title":"Photo " + photo_id, "id": photo_id, "image": img})
      print(img)
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